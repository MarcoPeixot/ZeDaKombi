from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.transaction_model import Transaction
from models.User_model import User
from db.base import Base
from pydantic import BaseModel
from security.security import get_db

router = APIRouter(tags=["Transações"])

class TransactionRequest(BaseModel):
    from_id: int
    to_id: int
    amount: float
    token_type: str  # zec, eth, btc, near

@router.post("/executar-transacao")
def executar_transacao(data: TransactionRequest, db: Session = Depends(get_db)):
    from_user = db.query(User).filter(User.id == data.from_id).first()
    to_user = db.query(User).filter(User.id == data.to_id).first()

    if not from_user or not to_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # Placeholder - aqui futuramente entra o código que envia a transação via NEAR/ZEC/ETH
    print(f"💸 Executando transação de {data.amount} {data.token_type} de {from_user.name} para {to_user.name}")

    nova_transacao = Transaction(
        from_id=from_user.id,
        to_id=to_user.id,
        amount=data.amount,
        token_type=data.token_type,
        status="completed",
        tx_hash="simulado_1234567890"
    )

    db.add(nova_transacao)
    db.commit()
    db.refresh(nova_transacao)

    return {
        "message": "Transação executada com sucesso",
        "tx": {
            "id": nova_transacao.id_transaction,
            "hash": nova_transacao.tx_hash
        }
    }
