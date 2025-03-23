# db/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.base import Base  # Importação correta da Base
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("DATABASE_URL não está definida!")

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Importa os modelos APÓS criar a Base"""
    from models.User_model import User  # Importação local
    from models.Message_model import Message
    Base.metadata.create_all(bind=engine)

def drop_tables():
    Base.metadata.drop_all(bind=engine)

# Chame create_tables() apenas se executado diretamente
if __name__ == "__main__":
    create_tables()