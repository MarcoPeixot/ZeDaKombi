# models/User_model.py
from sqlalchemy import Integer, String, Enum, TIMESTAMP
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base  # Importação direta da Base
from passlib.context import CryptContext
from enum import Enum as PyEnum

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class UserRole(str, PyEnum):
    PESQUISADOR = 'pesquisador'
    EMPRESARIO = 'empresario'

class User(Base):
    __tablename__ = "users"

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(255), nullable=False)
    email = mapped_column(String(255), unique=True, nullable=False)
    senha = mapped_column(String(255), nullable=False)
    role = mapped_column(Enum(UserRole), nullable=False)
    created_at = mapped_column(TIMESTAMP, server_default='NOW()')

    # Relacionamento com string para evitar import
    messages = relationship("Message", back_populates="user")

    def __init__(self, **kwargs):
        if 'senha' in kwargs:
            senha_plana = kwargs.pop('senha')
            self.senha = pwd_context.hash(senha_plana)
        super().__init__(**kwargs)

    def verify_password(self, senha_plana):
        return pwd_context.verify(senha_plana, self.senha)