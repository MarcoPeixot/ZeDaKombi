from pydantic import BaseModel, Field
from typing import List, Optional

class RecursoBase(BaseModel):
    """Schema base para Recurso"""
    nome: str = Field(..., example="Recurso Exemplo")

    class Config:
        from_attributes = True  # Permite que os dados sejam serializados a partir de modelos do SQLAlchemy

class RecursoCreate(RecursoBase):
    """Schema para criar um novo Recurso"""
    pass  # Herda de RecursoBase, podendo adicionar mais campos se necessário

class RecursoUpdate(RecursoBase):
    """Schema para atualizar um Recurso existente"""
    pass  # Herda de RecursoBase, permitindo atualizações

class RecursoInDB(RecursoBase):
    """Schema para um Recurso no banco de dados (inclusão de ID)"""
    id: int = Field(..., example=1)

    class Config:
        from_attributes = True  # Permite que o modelo do SQLAlchemy seja mapeado para o schema
