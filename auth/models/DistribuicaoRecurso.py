from sqlalchemy import Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base

class DistribuicaoRecurso(Base):
    """Define o modelo de dados para DistribuicaoRecurso."""

    __tablename__ = "distribuicaoRecurso"

    id = mapped_column(Integer, primary_key=True)
    id_familia = mapped_column(Integer, ForeignKey('familia.id'), nullable=False)
    id_ong = mapped_column(Integer, ForeignKey('ong.id'), nullable=False)
    id_recurso = mapped_column(Integer, ForeignKey('recurso.id'), nullable=False)
    id_beneficiario = mapped_column(Integer, ForeignKey('beneficiario.id'), nullable=False)
    data = mapped_column(Date, nullable=False)
    descricao = mapped_column(String, nullable=True)

    # def get_familia():
    #     from .Familia_model import Familia 

    # def get_ong():
    #     from .Ong_model import Ong
    # def get_recurso():
    #     from .Recurso import Recurso
    #     return Recurso
    # def get_beneficiario():
    #     from .Beneficiario_model import Beneficiario
    #     return Beneficiario
    
    # Relações
    familia = relationship("Familia", back_populates="distribuicaoRecurso")
    ong = relationship("Ong", back_populates="distribuicaoRecurso")
    recurso = relationship("models.Recurso.Recurso", back_populates="distribuicaoRecurso")
    beneficiario = relationship("Beneficiario", back_populates="distribuicaoRecurso")