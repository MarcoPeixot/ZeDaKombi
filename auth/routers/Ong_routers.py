from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db  # A função get_db deve fornecer a sessão do banco de dados
from schemas import OngCreate, OngUpdate
from models.Ong_model import Ong
from security.security import get_current_master_ong, get_current_filial_ong, get_current_ong, required_roles

router = APIRouter(prefix="/ongs")

@router.get("/listar-ongs/", tags=["Ong"])
async def get_ongs(
    current_ong: Ong = Depends(required_roles(["master"])),  # Dependência de autorização primeiro
    logradouro: str = '', 
    db: Session = Depends(get_db)
):
    try:
        if logradouro:
            ongs = db.query(Ong).filter(Ong.endereco == logradouro).all()
        else:
            ongs = db.query(Ong).all()
        return ongs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@router.post("/inserir/", tags=["Ong"])
async def create_ong(ong: OngCreate, current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    try:
        # Criando o objeto Ong a partir do modelo
        ong_obj = Ong(**ong.dict())
        db.add(ong_obj)  # Adiciona o objeto ao banco
        db.commit()  # Realiza o commit
        db.refresh(ong_obj)  # Atualiza o objeto com os dados do banco, como o ID
        return ong.dict()  # Retorna os dados da ONG criada
    except Exception as e:
        db.rollback()  # Em caso de erro, faz o rollback da transação
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/{id}", tags=["Ong"])
async def list_Ongs(id: int, current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        Ongs = db.query(Ong).filter(Ong.id == id).all()
        return Ongs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.delete("/deletar/{id_ong}", tags=["Ong"])
async def delete_ong(id_ong: int, current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    try:
        # Busca a ONG pelo ID
        ong = db.query(Ong).filter(Ong.id == id_ong).first()
        if ong:
            db.delete(ong)  # Deleta o objeto
            db.commit()  # Realiza o commit da exclusão
            return {"message": "Ong deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Ong not found")
    except Exception as e:
        db.rollback()  # Em caso de erro, faz o rollback
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.put("/atualizar/{id_ong}", tags=["Ong"])
async def update_ong(id_ong: int, ong: OngUpdate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        # Busca a ONG pelo ID
        ong_obj = db.query(Ong).filter(Ong.id == id_ong).first()
        if ong_obj:
            # Atualiza os dados da ONG com os novos valores
            for key, value in ong.model_dump().items():
                setattr(ong_obj, key, value)
            db.commit()  # Realiza o commit das alterações
            db.refresh(ong_obj)  # Atualiza o objeto com os dados do banco
            return {**ong.model_dump()}
        else:
            raise HTTPException(status_code=404, detail="Ong not found")
    except Exception as e:
        db.rollback()  # Em caso de erro, faz o rollback
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
