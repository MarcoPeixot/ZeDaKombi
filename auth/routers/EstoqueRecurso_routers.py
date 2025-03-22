from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db  # Função para obter a sessão do banco de dados
from typing import List
from models.EstoqueRecurso import EstoqueRecurso  # Importando o modelo EstoqueRecurso
from schemas import EstoqueRecursoCreate, EstoqueRecursoUpdate, EstoqueRecursoInDB  # Importando os schemas
from security.security import required_roles
from models.Ong_model import Ong

router = APIRouter(prefix="/estoque-recurso", tags=["EstoqueRecurso"])

# Rota para criar um novo EstoqueRecurso
@router.post("/inserir/", response_model=EstoqueRecursoInDB)
async def criar_estoque_recurso(estoque_recurso: EstoqueRecursoCreate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        # Criar a instância do modelo EstoqueRecurso
        novo_estoque_recurso = EstoqueRecurso(**estoque_recurso.dict())
        db.add(novo_estoque_recurso)  # Adiciona ao banco de dados
        db.commit()  # Comita a transação
        db.refresh(novo_estoque_recurso)  # Atualiza o objeto com dados do banco
        return novo_estoque_recurso  # Retorna o EstoqueRecurso criado
    except Exception as e:
        db.rollback()  # Rollback em caso de erro
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para listar todos os EstoquesRecurso
@router.get("/", response_model=List[EstoqueRecursoInDB])
async def listar_estoque_recurso(current_ong: Ong = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    try:
        estoque_recurso = db.query(EstoqueRecurso).all()  # Busca todos os EstoquesRecurso no banco
        return estoque_recurso  # Retorna a lista
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para obter um EstoqueRecurso específico pelo ID
@router.get("/{id_estoque}", response_model=EstoqueRecursoInDB)
async def obter_estoque_recurso(id_estoque: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        estoque_recurso = db.query(EstoqueRecurso).filter(EstoqueRecurso.id == id_estoque).first()
        if not estoque_recurso:
            raise HTTPException(status_code=404, detail="EstoqueRecurso não encontrado")
        return estoque_recurso  # Retorna o EstoqueRecurso encontrado
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para atualizar um EstoqueRecurso existente
@router.put("/{id_estoque}", response_model=EstoqueRecursoInDB)
async def atualizar_estoque_recurso(id_estoque: int, estoque_recurso: EstoqueRecursoUpdate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        # Buscar EstoqueRecurso no banco de dados
        estoque_recurso_obj = db.query(EstoqueRecurso).filter(EstoqueRecurso.id == id_estoque).first()
        if not estoque_recurso_obj:
            raise HTTPException(status_code=404, detail="EstoqueRecurso não encontrado")
        
        # Atualizar campos do EstoqueRecurso
        for key, value in estoque_recurso.dict(exclude_unset=True).items():
            setattr(estoque_recurso_obj, key, value)

        db.commit()  # Comita as alterações
        db.refresh(estoque_recurso_obj)  # Atualiza com dados mais recentes do banco
        return estoque_recurso_obj  # Retorna o EstoqueRecurso atualizado
    except Exception as e:
        db.rollback()  # Rollback em caso de erro
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para deletar um EstoqueRecurso pelo ID
@router.delete("/{id_estoque}", response_model=dict)
async def deletar_estoque_recurso(id_estoque: int, current_ong: Ong = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    try:
        # Buscar o EstoqueRecurso no banco de dados
        estoque_recurso = db.query(EstoqueRecurso).filter(EstoqueRecurso.id == id_estoque).first()
        if not estoque_recurso:
            raise HTTPException(status_code=404, detail="EstoqueRecurso não encontrado")
        
        db.delete(estoque_recurso)  # Deleta o EstoqueRecurso
        db.commit()  # Comita a transação
        return {"message": "EstoqueRecurso deletado com sucesso"}  # Retorna uma mensagem de sucesso
    except Exception as e:
        db.rollback()  # Rollback em caso de erro
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
