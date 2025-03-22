from sqlalchemy import Boolean, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base

class Beneficiario(Base):
    """Define o modelo de dados para Beneficiário."""

    __tablename__ = "beneficiario"

    id = mapped_column(Integer, primary_key=True)
    id_familia = mapped_column(Integer, ForeignKey('familia.id'), nullable=False)
    nome = mapped_column(String(255), nullable=False)
    idade = mapped_column(Integer, nullable=False)
    responsavel = mapped_column(Boolean, nullable=False, default=False)
    id_ong = mapped_column(Integer, ForeignKey('ong.id'), nullable=False)
    data_nascimento = mapped_column(Date, nullable=False)
    cpf = mapped_column(String(14), nullable=False)
    
    # def get_ong():
    #     from .Ong_model import Ong
    #     return Ong
    
    # def get_familia():
    #     from .Familia_model import Familia
        # return Familia

    familia = relationship("Familia", back_populates="beneficiario")
    ong = relationship("Ong", back_populates="beneficiario")
    distribuicaoRecurso = relationship("DistribuicaoRecurso", back_populates="beneficiario")
