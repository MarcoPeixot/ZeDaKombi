from pydantic import BaseModel, Field
from typing import List, Optional

# Definir o modelo de dados para Ong
class OngCreate(BaseModel):
    '''Schema para criar uma nova entidade ONG'''
    nome: str = Field(default=None, alias="nome")
    endereco: str = Field(default=None, alias="endereco")
    complemento: Optional[str] = Field(default=None, alias="complemento")
    cep: Optional[str] = Field(default=None, alias="cep")
    regiao: Optional[str] = Field(default=None, alias="regiao")
    estado: Optional[str] = Field(default=None, alias="estado")
    responsavel: str = Field(default=None, alias="responsavel")
    email: str = Field(default=None, alias="email")
    senha: str = Field(default=None, alias="senha")
    tipo: Optional[str] = Field(default=None, alias="tipo")
    voluntarios: Optional[int] = Field(default=None, alias="voluntarios")
    vice: Optional[str] = Field(default=None, alias="vice")
    cnpj: str = Field(default=None, alias="cnpj")
    telefone: str = Field(default=None, alias="telefone")
    cidade: str = Field(default=None, alias="cidade")

    class Config:
        from_attributes = True 
        populate_by_name = True
        # Excluir a senha da resposta por questões de segurança
        exclude = {"senha"}


class OngUpdate(BaseModel):
    '''Schema para atualizar uma entidade ONG'''
    nome: Optional[str] = Field(default=None, alias="nome")
    endereco: Optional[str] = Field(default=None, alias="endereco")
    complemento: Optional[str] = Field(default=None, alias="complemento")
    cep: Optional[str] = Field(default=None, alias="cep")
    regiao: Optional[str] = Field(default=None, alias="regiao")
    estado: Optional[str] = Field(default=None, alias="estado")
    responsavel: Optional[str] = Field(default=None, alias="responsavel")
    email: Optional[str] = Field(default=None, alias="email")
    senha: Optional[str] = Field(default=None, alias="senha")
    tipo: Optional[str] = Field(default=None, alias="tipo")
    voluntarios: Optional[int] = Field(default=None, alias="voluntarios")
    vice: Optional[str] = Field(default=None, alias="vice")
    cnpj: Optional[str] = Field(default=None, alias="cnpj")
    telefone: Optional[str] = Field(default=None, alias="telefone")
    cidade: Optional[str] = Field(default=None, alias="cidade")

    class Config:
        from_attributes = True
        populate_by_name = True
        exclude = {"senha"}  # Exclui a senha da resposta


class OngResponse(BaseModel):
    '''Schema para representar uma entidade ONG na resposta'''
    id: int
    nome: str
    endereco: str
    complemento: Optional[str]
    cep: Optional[str]
    regiao: Optional[str]
    estado: Optional[str]
    responsavel: str
    email: str
    tipo: Optional[str]
    voluntarios: Optional[int]
    vice: Optional[str]
    cnpj: str
    telefone: str
    cidade: str

    # Relacionamentos
    familia: List[str] = []  # Representa as famílias associadas à ONG
    distribuicao_recurso: List[str] = []  # Representa a distribuição de recursos
    estoque_recurso: List[str] = []  # Representa o estoque de recursos
    beneficiario: List[str] = []  # Representa os beneficiários associados à ONG

    class Config:
        from_attributes = True
