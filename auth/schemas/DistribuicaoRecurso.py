from pydantic import BaseModel
from datetime import date
from typing import Optional

# Supondo que as classes Familia, Ong, Recurso e Beneficiario já possuam schemas ou
# você criaria esses schemas também.

class DistribuicaoRecursoBase(BaseModel):
    id_familia: int
    id_ong: int
    id_recurso: int
    id_beneficiario: int
    data: date
    descricao: Optional[str] = None

    class Config:
        from_attributes = True 

class DistribuicaoRecursoCreate(DistribuicaoRecursoBase):
    """Usado para criar uma nova DistribuicaoRecurso."""

    pass

class DistribuicaoRecursoUpdate(DistribuicaoRecursoBase):
    """Usado para atualizar uma DistribuicaoRecurso."""

    pass

class DistribuicaoRecursoInDB(DistribuicaoRecursoBase):
    """Representa uma DistribuicaoRecurso no banco de dados (com id)."""

    id: int

    class Config:
        from_attributes = True 