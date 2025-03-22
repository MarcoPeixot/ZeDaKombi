from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from db.db import get_db
from typing import List, Optional
from datetime import date
from models.DistribuicaoRecurso import DistribuicaoRecurso as DistribuicaoRecursoModel
from models.Recurso import Recurso as RecursoModel
from models.Familia_model import Familia as FamiliaModel
from models.Ong_model import Ong as OngModel
from security.security import required_roles

router = APIRouter(prefix="/relatorios", tags=["Relatorios"])

@router.get("/recursos-entregues")
async def recursos_entregues(current_ong: OngModel = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    """Retorna estatísticas sobre os recursos entregues"""
    resultado = (
        db.query(RecursoModel.nome, func.count(DistribuicaoRecursoModel.id).label("quantidade"))
        .join(DistribuicaoRecursoModel, DistribuicaoRecursoModel.id_recurso == RecursoModel.id)
        .group_by(RecursoModel.nome)
        .all()
    )

    if not resultado:
        raise HTTPException(status_code=404, detail="Nenhum dado encontrado sobre recursos entregues.")

    return [{"recurso": nome, "quantidade": quantidade} for nome, quantidade in resultado]

@router.get("/voluntarios")
async def numero_voluntarios(current_ong: OngModel = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    """Retorna o número total de voluntários por ONG"""
    resultado = db.query(OngModel.nome, OngModel.voluntarios).all()

    if not resultado:
        raise HTTPException(status_code=404, detail="Nenhuma ONG cadastrada.")

    return [{"ong": nome, "quantidade_voluntarios": qtd_voluntarios} for nome, qtd_voluntarios in resultado]

@router.get("/distribuicoes-diarias")
async def distribuicoes_diarias(current_ong: OngModel = Depends(required_roles(["master", "filial"])),db: Session = Depends(get_db)):
    """Retorna o número de distribuições realizadas no dia"""
    hoje = date.today()

    total_distribuicoes = (
        db.query(func.count(DistribuicaoRecursoModel.id))
        .filter(DistribuicaoRecursoModel.data == hoje)
        .scalar()
    )

    return {
        "data": hoje,
        "total_distribuicoes": total_distribuicoes
    }

# Endpoint para visualizar todos os dados com filtros avançados
@router.get("/dados-gerais/")
async def dados_gerais(filtro: Optional[str] = Query(None),current_ong: OngModel = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    """Retorna dados gerais com filtros avançados"""
    
    if filtro == "ongs":
        resultado = db.query(OngModel).all()
    elif filtro == "familias":
        resultado = db.query(FamiliaModel).all()
    elif filtro == "recursos":
        resultado = db.query(RecursoModel).all()
    elif filtro == "distribuicoes":
        resultado = db.query(DistribuicaoRecursoModel).all()
    else:
        raise HTTPException(status_code=400, detail="Filtro inválido. Use 'ongs', 'familias', 'recursos' ou 'distribuicoes'.")

    if not resultado:
        raise HTTPException(status_code=404, detail="Nenhum dado encontrado.")

    return resultado
