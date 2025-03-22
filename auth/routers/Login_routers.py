from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from security.security import (
    create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_db
)
from models.User_model import User  # Importe o novo modelo

router = APIRouter()

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Busca o usuário pelo email (username é o padrão do OAuth2)
    user = db.query(User).filter(User.email == form_data.username).first()
    
    # Verifica se o usuário existe e a senha está correta
    if not user or not User.verificar_senha(form_data.password, user.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Cria o token de acesso
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},  # Dados incluídos no token
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "user_role": user.role.value  # Retorna o papel do usuário
    }