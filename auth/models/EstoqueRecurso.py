from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base
# from .Recurso import Recurso

class EstoqueRecurso(Base):
    """Define o modelo de dados para EstoqueRecurso."""

    __tablename__ = "estoqueRecurso"

    id = mapped_column(Integer, primary_key=True)
    id_recurso = mapped_column(Integer, ForeignKey('recurso.id'), nullable=False)
    id_ong = mapped_column(Integer, ForeignKey('ong.id'), nullable=False)
    quantidade = mapped_column(Integer, nullable=False)

    # def get_ong():
    #     from .Ong_model import Ong
    #     return Ong
    
    # def get_recurso():
    #     from .Recurso import Recurso
    #     return Recurso

    recurso = relationship("Recurso", back_populates="estoqueRecurso")
    ong = relationship("Ong", back_populates="estoqueRecurso")
