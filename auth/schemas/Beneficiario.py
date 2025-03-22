from pydantic import BaseModel, Field
from datetime import date
from pydantic.dataclasses import dataclass

# Definir o modelo Pydantic para o corpo da solicitação para Beneficiario
class BeneficiarioCreate(BaseModel):
    '''Schema para a criar uma entidade Beneficiario'''
    id_familia: int = Field(default=None, alias="id_familia")
    nome: str = Field(default=None, alias="nome")
    idade: int = Field(default=None, alias="idade")
    responsavel: bool = Field(default=False, alias="responsavel")
    id_ong: int = Field(default=None, alias="id_ong")
    data_nascimento: date = Field(default=None, alias="data_nascimento")
    cpf: str = Field(default=None, alias="cpf")

class BeneficiarioUpdate(BaseModel):
    '''Schema para alterar uma entidade Beneficiario'''
    nome: str = Field(default=None, alias="nome")
    idade: int = Field(default=None, alias="idade")
    responsavel: bool = Field(default=False, alias="responsavel")
    data_nascimento: date = Field(default=None, alias="data_nascimento")
    cpf: str = Field(default=None, alias="cpf")

# Caso você precise de um modelo para a resposta, você pode incluir:
class BeneficiarioResponse(BaseModel):
    '''Schema para representar um Beneficiario'''
    id: int
    id_familia: int
    nome: str
    idade: int
    responsavel: bool
    id_ong: int
    data_nascimento: date
    cpf: str

    class Config:
        from_attributes = True 
