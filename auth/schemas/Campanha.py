from pydantic import BaseModel, Field

class CampanhaBase(BaseModel):
    """Schema base para Campanha"""
    titulo: str = Field(..., max_length=255)
    descricao: str | None = None
    cor: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    prioridade: int

class CampanhaCreate(CampanhaBase):
    """Schema para criação de Campanha"""
    pass

class CampanhaUpdate(CampanhaBase):
    """Schema para atualização de Campanha"""
    pass

class CampanhaResponse(CampanhaBase):
    """Schema para resposta da API"""
    id: int

    class Config:
        from_attributes = True
