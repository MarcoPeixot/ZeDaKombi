from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from security.security import (
    create_access_token,
    send_password_reset_email,
    ACCESS_TOKEN_EXPIRE_MINUTES, 
    get_db,
    get_password_reset_token,
    verify_password_reset_token
)
from models.User_model import User

router = APIRouter(tags=["Autenticação"])

# ----------------------------
# Schemas de Validação (Pydantic)
# ----------------------------

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    senha: str
    role: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    token: str
    new_password: str

# ----------------------------
# Endpoints
# ----------------------------

@router.post("/registrar", status_code=status.HTTP_201_CREATED)
async def registrar_usuario(
    user_data: UserCreate, 
    db: Session = Depends(get_db)
):
    """Registra um novo usuário no sistema"""

    user_data.role = user_data.role.lower()
    
    # Verifica se o email já está cadastrado
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )

    # Verifica a role
    if user_data.role not in ["pesquisador", "empresario"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role inválida. Valores permitidos: pesquisador, empresario"
        )

    # Cria o usuário
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        senha=user_data.senha,  # Será hasheado no __init__
        role=user_data.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Usuário criado com sucesso",
        "user_id": new_user.id
    }

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Busca o usuário pelo email
    user = db.query(User).filter(User.email == form_data.username).first()
    
    # Verifica credenciais
    if not user or not user.verify_password(form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Gera o token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "user_role": user.role.value
    }

@router.post("/solicitar-redefinicao-senha")
async def solicitar_redefinicao_senha(
    request: PasswordResetRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Inicia o processo de redefinição de senha"""
    
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )

    # Gera token de redefinição (expira em 1 hora)
    reset_token = get_password_reset_token(email=user.email)
    
    # Simula envio de email (implemente sua lógica real aqui)
    background_tasks.add_task(
        send_password_reset_email,
        user.email,
        reset_token
    )

    return {"message": "Instruções de redefinição enviadas para o email"}

@router.post("/redefinir-senha")
async def redefinir_senha(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
):
    """Finaliza a redefinição de senha com token válido"""
    
    email = verify_password_reset_token(reset_data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token inválido ou expirado"
        )

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )

    # Atualiza a senha
    user.senha = reset_data.new_password  # O hash será feito no model
    db.commit()

    return {"message": "Senha redefinida com sucesso"}