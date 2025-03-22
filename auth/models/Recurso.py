from sqlalchemy import Integer, String
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base

class Recurso(Base):
    """Define o modelo de dados para Recurso."""

    __tablename__ = "recurso"

    id = mapped_column(Integer, primary_key=True)
    nome = mapped_column(String(255), nullable=False)

    # Relação com a classe 'EstoqueRecurso'
    estoqueRecurso = relationship("EstoqueRecurso", back_populates="recurso")
    distribuicaoRecurso = relationship("DistribuicaoRecurso", back_populates="recurso")
