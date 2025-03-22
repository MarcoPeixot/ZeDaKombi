from pydantic import BaseModel
from typing import Optional

# Schema para criar um EstoqueRecurso
class EstoqueRecursoCreate(BaseModel):
    id_recurso: int
    id_ong: int
    quantidade: int

    class Config:
        from_attributes = True  # Permite que o modelo se converta para dados de banco de dados

# Schema para resposta (para a listagem e detalhes)
class EstoqueRecursoInDB(EstoqueRecursoCreate):
    id: int

    class Config:
        from_attributes = True   # Permite que o modelo se converta para dados de banco de dados

# Schema para atualizar o EstoqueRecurso
class EstoqueRecursoUpdate(BaseModel):
    id_recurso: Optional[int]
    id_ong: Optional[int]
    quantidade: Optional[int]

    class Config:
        from_attributes = True  # Permite que o modelo se converta para dados de banco de dados
