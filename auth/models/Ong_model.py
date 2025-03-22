from sqlalchemy import Integer, String
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base
from passlib.context import CryptContext

# Cria um contexto para o hashing da senha com passlib
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class Ong(Base):
    """Define o modelo de dados para Ong."""

    __tablename__ = "ong"

    id = mapped_column(Integer, primary_key=True)
    nome = mapped_column(String(255), nullable=False)
    endereco = mapped_column(String(255), nullable=False)
    complemento = mapped_column(String(255), nullable=True)
    cep = mapped_column(String(40), nullable=True)
    regiao = mapped_column(String(100), nullable=True)
    estado = mapped_column(String(50), nullable=True)
    responsavel = mapped_column(String(255), nullable=False)
    email = mapped_column(String(255), nullable=False)
    senha = mapped_column(String(255), nullable=False)  # A senha será armazenada como hash
    tipo = mapped_column(String(50), nullable=True)
    voluntarios = mapped_column(Integer, nullable=True)
    vice = mapped_column(String(255), nullable=True)

    cnpj = mapped_column(String(18), nullable=False)
    telefone = mapped_column(String(15), nullable=False)
    cidade = mapped_column(String(255), nullable=False)

    familia = relationship("Familia", back_populates="ong")
    beneficiario = relationship("Beneficiario", back_populates="ong")
    distribuicaoRecurso = relationship("DistribuicaoRecurso", back_populates="ong")
    estoqueRecurso = relationship("EstoqueRecurso", back_populates="ong")

    class Config:
        exclude = {"senha"}

    def __init__(self, **kwargs):
        """Modifica o comportamento de criação da instância para garantir que a senha seja hashada."""
        if 'senha' in kwargs:
            # Gerar o hash da senha
            senha_plana = kwargs.pop('senha')
            hashed_password = pwd_context.hash(senha_plana)
            kwargs['senha'] = hashed_password  # Armazenar como string
        super().__init__(**kwargs)

    @staticmethod
    def verificar_senha(senha_plana, senha_hashada):
        """Verifica se a senha fornecida corresponde ao hash armazenado."""
        return pwd_context.verify(senha_plana, senha_hashada)
