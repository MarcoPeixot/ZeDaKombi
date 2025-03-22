# security.py
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models.Ong_model import Ong
from db import get_db
import os
from dotenv import load_dotenv
from typing import List

# Carrega variáveis do .env
load_dotenv()

# Configurações (use variáveis de ambiente na produção!)
SECRET_KEY = os.getenv(
    "SECRET_KEY"
)
ALGORITHM = os.getenv(
    "ALGORITHM"
)
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_ong(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        tipo: str = payload.get("tipo")
    except JWTError:
        raise credentials_exception
    
    ong = db.query(Ong).filter(Ong.email == email).first()
    if ong is None:
        raise credentials_exception
    return ong

def get_current_master_ong(current_ong: Ong = Depends(get_current_ong)):
    if current_ong.tipo != "master":
        raise HTTPException(status_code=403, detail="Acesso permitido apenas para ONGs master")
    return current_ong

def get_current_filial_ong(current_ong: Ong = Depends(get_current_ong)):
    if current_ong.tipo != "filial":
        raise HTTPException(status_code=403, detail="Acesso permitido apenas para ONGs filiais")
    return current_ong

def required_roles(required_roles: List[str]):
    def role_checker(current_ong: Ong = Depends(get_current_ong)):
        if current_ong.tipo not in required_roles:
            raise HTTPException(
                status_code=403,
                detail=f"Acesso requerido: {', '.join(required_roles)}"
            )
        return current_ong
    return role_checker