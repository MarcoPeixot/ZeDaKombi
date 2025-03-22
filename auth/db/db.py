from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .base import Base
from models.Ong_model import Ong
from models.Beneficiario_model import Beneficiario
from models.Familia_model import Familia

import os
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

Ong.metadata = Base.metadata
Beneficiario.metadata = Base.metadata
Familia.metadata = Base.metadata


SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL"
)

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("A variável de ambiente DATABASE_URL não está definida!")

# Configuração do engine para MSSQL
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# Criando o sessionmaker para gerenciar as sessões
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def get_db():
    """Função para obter uma sessão de banco de dados."""
    db = SessionLocal()
    try:
        yield db  # Retorna a sessão para uso nas rotas
    finally:
        db.close()  # Fecha a sessão ao final

def create_tables():
    """Função para criar as tabelas no banco de dados."""
    Base.metadata.create_all(bind=engine)

def drop_tables():
    """Função para excluir as tabelas do banco de dados."""
    Base.metadata.drop_all(bind=engine)  # Exclui todas as tabelas registradas na metadata
create_tables()
