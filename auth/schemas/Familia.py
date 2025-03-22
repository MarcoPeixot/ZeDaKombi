from pydantic import BaseModel, Field
from decimal import Decimal
from pydantic.dataclasses import dataclass

# Definir o modelo Pydantic para o corpo da solicitação para Familia
class FamiliaCreate(BaseModel):
    '''Schema para criar uma entidade Família'''
    nome: str = Field(default=None, alias="nome")
    endereco: str = Field(default=None, alias="endereco")
    complemento: str = Field(default=None, alias="complemento")
    cep: str = Field(default=None, alias="cep")
    regiao: str = Field(default=None, alias="regiao")
    estado: str = Field(default=None, alias="estado")
    renda_total: Decimal = Field(default=None, alias="renda_total")
    renda_per_capita: Decimal = Field(default=None, alias="renda_per_capita")
    numero_pessoas: int = Field(default=None, alias="numero_pessoas")
    id_ong: int = Field(default=None, alias="id_ong")

    class Config:
        from_attributes = True 

class FamiliaUpdate(BaseModel):
    '''Schema para alterar uma entidade Família'''
    nome: str = Field(default=None, alias="nome")
    endereco: str = Field(default=None, alias="endereco")
    complemento: str = Field(default=None, alias="complemento")
    cep: str = Field(default=None, alias="cep")
    regiao: str = Field(default=None, alias="regiao")
    estado: str = Field(default=None, alias="estado")
    renda_total: Decimal = Field(default=None, alias="renda_total")
    renda_per_capita: Decimal = Field(default=None, alias="renda_per_capita")
    numero_pessoas: int = Field(default=None, alias="numero_pessoas")

    class Config:
        from_attributes = True 
    
class FamiliaResponse(BaseModel):
    '''Schema para representar a entidade Família'''
    id: int
    nome: str
    endereco: str
    complemento: str
    cep: str
    regiao: str
    estado: str
    renda_total: Decimal
    renda_per_capita: Decimal
    numero_pessoas: int
    id_ong: int

    class Config:
        from_attributes = True 