from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Familia, DistribuicaoRecurso, Recurso, Ong, Beneficiario
from schemas import FamiliaCreate, FamiliaUpdate
from models.Ong_model import Ong
from security.security import required_roles

router = APIRouter(prefix="/familias")

@router.post("/inserir/", tags=["Familias"])
async def create_familia(familia: FamiliaCreate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        familia_obj = Familia(**familia.model_dump())
        db.add(familia_obj)
        db.commit()
        return {**familia.model_dump(), "id_familia": familia_obj.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/listar-familias/", tags=["Familias"])
async def list_familias(current_ong: Ong = Depends(required_roles(["master"])),db: Session = Depends(get_db)):
    try:
        familias = db.query(Familia).all()
        return familias
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@router.get("/{id}", tags=["Familias"])
async def list_familias(id: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        familias = db.query(Familia).filter(Familia.id == id).all()
        return familias
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    

@router.get("/familias/por-nome/{nome}", tags=["Familias"])
async def list_familias_por_nome(nome: str,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        familias = db.query(Familia).filter(Familia.nome.ilike(f"%{nome}%")).all()
        
        if not familias:
            raise HTTPException(status_code=404, detail="Nenhuma família encontrada com esse nome.")

        return familias
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")
    
@router.get("/familias/{id_familia}/status-auxilio", tags=["Familias"])
async def get_status_auxilio(id_familia: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        # Buscar a família no banco de dados
        familia = db.query(Familia).filter(Familia.id == id_familia).first()
        if not familia:
            raise HTTPException(status_code=404, detail="Família não encontrada.")

        # Buscar todas as distribuições de recursos feitas para essa família
        distribuicoes = (
            db.query(DistribuicaoRecurso)
            .filter(DistribuicaoRecurso.id_familia == id_familia)
            .join(Recurso, Recurso.id == DistribuicaoRecurso.id_recurso)
            .join(Ong, Ong.id == DistribuicaoRecurso.id_ong)
            .join(Beneficiario, Beneficiario.id == DistribuicaoRecurso.id_beneficiario)
            .all()
        )

        if not distribuicoes:
            return {"id_familia": id_familia, "status": "Nenhum auxílio recebido."}

        # Construindo a resposta com os detalhes das distribuições
        status_auxilio = []
        for distribuicao in distribuicoes:
            status_auxilio.append({
                "id_distribuicao": distribuicao.id,
                "data_distribuicao": distribuicao.data,
                "descricao": distribuicao.descricao,
                "recurso": {
                    "id_recurso": distribuicao.recurso.id,
                    "nome_recurso": distribuicao.recurso.nome
                },
                "ong": {
                    "id_ong": distribuicao.ong.id,
                    "nome_ong": distribuicao.ong.nome
                },
                "beneficiario": {
                    "id_beneficiario": distribuicao.beneficiario.id,
                    "nome_beneficiario": distribuicao.beneficiario.nome
                }
            })

        return {
            "id_familia": id_familia,
            "nome_familia": familia.nome,
            "auxilios_recebidos": status_auxilio
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")
    
@router.put("/atualizar/{id_familia}", tags=["Familias"])
async def update_familia(id_familia: int, familia: FamiliaUpdate,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        familia_obj = db.query(Familia).filter(Familia.id == id_familia).first()
        if familia_obj:
            for key, value in familia.model_dump().items():
                setattr(familia_obj, key, value)
            db.commit()
            return {"message": "Familia atualizada com sucesso"}
        raise HTTPException(status_code=404, detail="Familia not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.delete("/deletar/{id_familia}", tags=["Familias"])
async def delete_familia(id_familia: int,current_ong: Ong = Depends(required_roles(["master", "filial"])), db: Session = Depends(get_db)):
    try:
        familia_obj = db.query(Familia).filter(Familia.id == id_familia).first()
        if familia_obj:
            db.delete(familia_obj)
            db.commit()
            return {"message": "Familia deleted successfully"}
        raise HTTPException(status_code=404, detail="Familia not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
