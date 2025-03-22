from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db  # Suponho que você tenha uma função que fornece a sessão do DB
from models import Beneficiario
from models import Ong
from schemas import BeneficiarioCreate, BeneficiarioUpdate
from typing import List
from security.security import get_current_master_ong, get_current_filial_ong, get_current_ong, required_roles

router = APIRouter(prefix="/beneficiario")

# Quero saber quais são os beneficiarios atendidos por cada ong
# Quero saber quais foram as últimas vezes que determinado beneficiario retirou determinado recurso e qual foi a ong responsável pela entrega
# Quero pegar os beneficiarios dado um nome de familia

@router.get("/listar", tags=["Beneficiario"])
async def list_beneficiarios(current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    try:
        beneficiarios = db.query(Beneficiario).all()
        return beneficiarios
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(err)}")

@router.get("/listar_por_familia/{id_familia}", tags=["Beneficiario"])
async def list_beneficiarios_por_familia(id_familia: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        beneficiarios = db.query(Beneficiario).filter(Beneficiario.id_familia == id_familia).all()
        return beneficiarios
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(err)}")
    
@router.get("/{id}", tags=["Beneficiario"])
async def list_beneficiarios_por_familia(id: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        beneficiarios = db.query(Beneficiario).filter(Beneficiario.id == id).all()
        return beneficiarios
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(err)}")

@router.post("/", tags=["Beneficiario"])
async def create_beneficiario(beneficiario: BeneficiarioCreate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        beneficiario_obj = Beneficiario(**beneficiario.model_dump())
        db.add(beneficiario_obj)
        db.commit()
        return {**beneficiario.model_dump()}
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(err)}")

@router.delete("/{id}", tags=["Beneficiario"])
async def delete_beneficiario(id_beneficiario: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        beneficiario = db.query(Beneficiario).filter(Beneficiario.id == id_beneficiario).first()
        if beneficiario:
            db.delete(beneficiario)
            db.commit()
            return {"message": "Beneficiario deleted successfully"}
        raise HTTPException(status_code=404, detail="Beneficiario not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.put("/{id}", tags=["Beneficiario"])
async def update_beneficiario(id: int, beneficiario: BeneficiarioUpdate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        beneficiario_obj = db.query(Beneficiario).filter(Beneficiario.id == id).first()
        if beneficiario_obj:
            for key, value in beneficiario.model_dump().items():
                setattr(beneficiario_obj, key, value)
            db.commit()
            return {"message": "Beneficiario updated successfully"}
        raise HTTPException(status_code=404, detail="Beneficiario not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
