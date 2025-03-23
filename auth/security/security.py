# security.py
from datetime import datetime, timedelta
from typing import Optional, List
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models.User_model import User  # Alterado para o novo modelo
from db import get_db
import os
from dotenv import load_dotenv

from email.mime.text import MIMEText
import smtplib
import os

# Carrega variáveis do .env
load_dotenv()

# Configurações
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
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

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Funções de verificação de role
def require_role(required_role: str):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acesso restrito a {required_role}s"
            )
        return current_user
    return role_checker

def require_any_role(required_roles: List[str]):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acesso requerido: {', '.join(required_roles)}"
            )
        return current_user
    return role_checker

def get_password_reset_token(email: str, expires_delta: timedelta = None):
    """Gera token JWT para redefinição de senha"""
    if not expires_delta:
        expires_delta = timedelta(hours=1)
    
    to_encode = {
        "sub": email,
        "reset": True,  # Identifica o propósito do token
        "exp": datetime.utcnow() + expires_delta
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password_reset_token(token: str):
    """Verifica e retorna o email do token de redefinição"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("reset") is not True:
            return None
        email: str = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None

def send_password_reset_email(email: str, token: str):
    """Simula envio de email (implemente com seu serviço de email)"""
    reset_link = f"https://seusite.com/redefinir-senha?token={token}"
    
    message = f"""
    Olá,

    Você solicitou a redefinição de senha. 
    Clique no link abaixo para prosseguir:

    {reset_link}

    Este link expira em 1 hora.

    Caso não tenha solicitado, ignore este email.
    """
    
    # Configurações de email (exemplo para Gmail)
    msg = MIMEText(message)
    msg["Subject"] = "Redefinição de Senha"
    msg["From"] = os.getenv("EMAIL_FROM")
    msg["To"] = email

    # Conexão com servidor SMTP
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(
            os.getenv("EMAIL_FROM"),
            os.getenv("EMAIL_PASSWORD")
        )
        server.sendmail(
            os.getenv("EMAIL_FROM"),
            email,
            msg.as_string()
        )

# Dependências específicas (opcional, mas útil)
get_current_pesquisador = require_role("pesquisador")
get_current_empresario = require_role("empresario")