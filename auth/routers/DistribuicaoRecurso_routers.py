from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from db import get_db
from typing import List, Optional
from models.Ong_model import Ong
from models.DistribuicaoRecurso import DistribuicaoRecurso as DistribuicaoRecursoModel
from models.Recurso import Recurso as RecursoModel
from schemas import DistribuicaoRecursoInDB, DistribuicaoRecursoCreate
from security.security import required_roles

router = APIRouter(prefix="/distribuicoes", tags=["Distribuições"])

@router.post("/inserir/", response_model=DistribuicaoRecursoInDB)
async def criar_distribuicao(distribuicao: DistribuicaoRecursoCreate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    nova_distribuicao = DistribuicaoRecursoModel(**distribuicao.dict())
    db.add(nova_distribuicao)
    db.commit()
    db.refresh(nova_distribuicao)
    return nova_distribuicao

@router.get("/", response_model=List[DistribuicaoRecursoInDB])
async def obter_distribuicoes(tipo_recurso: Optional[str] = Query(None),current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    query = db.query(DistribuicaoRecursoModel).join(RecursoModel, RecursoModel.id == DistribuicaoRecursoModel.id_recurso)
    
    if tipo_recurso:
        query = query.filter(RecursoModel.nome == tipo_recurso)
    
    distribuicoes = query.all()
    
    return distribuicoes

@router.get("/ultima-coleta/{id_beneficiario}", response_model=DistribuicaoRecursoInDB)
async def ultima_coleta_beneficiario(id_beneficiario: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    ultima_distribuicao = (
        db.query(DistribuicaoRecursoModel)
        .filter(DistribuicaoRecursoModel.id_beneficiario == id_beneficiario)
        .order_by(desc(DistribuicaoRecursoModel.data))
        .first()
    )

    if not ultima_distribuicao:
        raise HTTPException(status_code=404, detail="Nenhuma distribuição encontrada para este beneficiário.")
    
    return ultima_distribuicao

@router.get("/ultima-coleta-familia/{id_familia}", response_model=DistribuicaoRecursoInDB)
async def ultima_coleta_familia(id_familia: int, current_ong: Ong = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    ultima_distribuicao = (
        db.query(DistribuicaoRecursoModel)
        .filter(DistribuicaoRecursoModel.id_familia == id_familia)
        .order_by(desc(DistribuicaoRecursoModel.data))
        .first()
    )

    if not ultima_distribuicao:
        raise HTTPException(status_code=404, detail="Nenhuma distribuição encontrada para esta família.")
    
    return ultima_distribuicao

@router.get("/historico/{id_beneficiario}", response_model=List[DistribuicaoRecursoInDB])
async def historico_beneficiario(id_beneficiario: int, current_ong: Ong = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    historico = (
        db.query(DistribuicaoRecursoModel)
        .filter(DistribuicaoRecursoModel.id_beneficiario == id_beneficiario)
        .order_by(desc(DistribuicaoRecursoModel.data))
        .all()
    )

    if not historico:
        raise HTTPException(status_code=404, detail="Nenhum histórico encontrado para este beneficiário.")
    
    return historico

@router.get("/historico-familia/{id_familia}", response_model=List[DistribuicaoRecursoInDB])
async def historico_familia(id_familia: int, current_ong: Ong = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    historico = (
        db.query(DistribuicaoRecursoModel)
        .filter(DistribuicaoRecursoModel.id_familia == id_familia)
        .order_by(desc(DistribuicaoRecursoModel.data))
        .all()
    )

    if not historico:
        raise HTTPException(status_code=404, detail="Nenhum histórico encontrado para esta família.")
    
    return historico
