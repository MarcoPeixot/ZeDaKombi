from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db  # Função para obter a sessão do banco de dados
from typing import List
from models.Recurso import Recurso # Importando o modelo do banco de dados
from schemas import RecursoCreate, RecursoUpdate, RecursoInDB  # Schemas criados
from models.Ong_model import Ong
from security.security import required_roles

router = APIRouter(prefix="/recursos", tags=["Recursos"])

# Rota para criar um novo recurso
@router.post("/inserir/", response_model=RecursoInDB)
async def criar_recurso(recurso: RecursoCreate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        # Criar uma instância do modelo Recurso
        novo_recurso = Recurso(nome=recurso.nome)
        db.add(novo_recurso)
        db.commit()  # Comitar a transação
        db.refresh(novo_recurso)  # Atualizar o objeto com os dados do banco
        return novo_recurso  # Retornar o recurso criado
    except Exception as e:
        db.rollback()  # Em caso de erro, faz o rollback
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para listar todos os recursos
@router.get("/", response_model=List[RecursoInDB])
async def listar_recursos(current_ong: Ong = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    try:
        recursos = db.query(Recurso).all()  # Busca todos os recursos no banco
        return recursos  # Retorna a lista de recursos
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para obter um recurso específico pelo ID
@router.get("/{id_recurso}", response_model=RecursoInDB)
async def obter_recurso(id_recurso: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        recurso = db.query(Recurso).filter(Recurso.id == id_recurso).first()  # Busca o recurso pelo ID
        if not recurso:
            raise HTTPException(status_code=404, detail="Recurso não encontrado")
        return recurso  # Retorna o recurso encontrado
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para atualizar um recurso existente
@router.put("/{id_recurso}", response_model=RecursoInDB)
async def atualizar_recurso(id_recurso: int, recurso: RecursoUpdate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        recurso_obj = db.query(Recurso).filter(Recurso.id == id_recurso).first()
        if not recurso_obj:
            raise HTTPException(status_code=404, detail="Recurso não encontrado")

        # Atualiza os campos do recurso
        for key, value in recurso.dict().items():
            setattr(recurso_obj, key, value)

        db.commit()  # Comita a transação
        db.refresh(recurso_obj)  # Atualiza o objeto com os dados do banco
        return recurso_obj  # Retorna o recurso atualizado
    except Exception as e:
        db.rollback()  # Em caso de erro, faz o rollback
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Rota para deletar um recurso
@router.delete("/{id_recurso}", response_model=dict)
async def deletar_recurso(id_recurso: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        recurso = db.query(Recurso).filter(Recurso.id == id_recurso).first()
        if not recurso:
            raise HTTPException(status_code=404, detail="Recurso não encontrado")

        db.delete(recurso)  # Deleta o recurso
        db.commit()  # Comita a transação
        return {"message": "Recurso deletado com sucesso"}
    except Exception as e:
        db.rollback()  # Em caso de erro, faz o rollback
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
