from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.db import get_db
from models.Campanha_model import Campanha
from schemas import CampanhaCreate, CampanhaResponse, CampanhaUpdate
from security.security import required_roles
from models.Ong_model import Ong

router = APIRouter(prefix="/campanhas", tags=["Campanhas"])

@router.post("/", response_model=CampanhaResponse)
def create_campanha(campanha: CampanhaCreate,current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    """Cria uma nova campanha no banco de dados."""
    db_campanha = Campanha(**campanha.model_dump())
    db.add(db_campanha)
    db.commit()
    db.refresh(db_campanha)
    return db_campanha

@router.get("/{campanha_id}", response_model=CampanhaResponse)
def get_campanha(campanha_id: int,current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    """Obtém uma campanha pelo ID."""
    campanha = db.query(Campanha).filter(Campanha.id == campanha_id).first()
    if not campanha:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")
    return campanha

@router.get("/", response_model=list[CampanhaResponse])
def get_campanhas(skip: int = 0, limit: int = 10,current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    """Retorna uma lista de campanhas paginada."""
    return db.query(Campanha).order_by(Campanha.titulo).offset(skip).limit(limit).all()


@router.put("/{campanha_id}", response_model=CampanhaResponse)
def update_campanha(campanha_id: int, campanha: CampanhaUpdate,current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    """Atualiza uma campanha existente."""
    db_campanha = db.query(Campanha).filter(Campanha.id == campanha_id).first()
    if not db_campanha:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")

    for key, value in campanha.model_dump(exclude_unset=True).items():
        setattr(db_campanha, key, value)

    db.commit()
    db.refresh(db_campanha)
    return db_campanha

@router.delete("/{campanha_id}", response_model=CampanhaResponse)
def delete_campanha(campanha_id: int,current_ong: Ong = Depends(required_roles(["master"])), db: Session = Depends(get_db)):
    """Deleta uma campanha do banco de dados."""
    db_campanha = db.query(Campanha).filter(Campanha.id == campanha_id).first()
    if not db_campanha:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")

    db.delete(db_campanha)
    db.commit()
    return db_campanha
