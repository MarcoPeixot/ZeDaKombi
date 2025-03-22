from sqlalchemy import Integer, String, DECIMAL
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy import ForeignKey
from db.base import Base

# Importação das classes necessárias
# from .Ong_model import Ong
# from .Beneficiario_model import Beneficiario
# from .DistribuicaoRecurso import DistribuicaoRecurso

class Familia(Base):
    """Define o modelo de dados para Familia."""

    __tablename__ = "familia"
    id = mapped_column(Integer, primary_key=True)
    nome = mapped_column(String(255), nullable=False)
    endereco = mapped_column(String(255), nullable=False)
    complemento = mapped_column(String(255), nullable=True)
    cep = mapped_column(String(255), nullable=False)
    regiao = mapped_column(String(100), nullable=True)
    estado = mapped_column(String(50), nullable=True)
    renda_total = mapped_column(DECIMAL(10, 2), nullable=True)
    renda_per_capita = mapped_column(DECIMAL(10, 2), nullable=True)
    numero_pessoas = mapped_column(Integer, nullable=False)

    id_ong = mapped_column(Integer, ForeignKey("ong.id"), nullable=False)

    # Relações
    ong = relationship("Ong", back_populates="familia")
    beneficiario = relationship("Beneficiario", back_populates="familia")
    distribuicaoRecurso = relationship("DistribuicaoRecurso", back_populates="familia")
