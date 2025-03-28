from fastapi import FastAPI, HTTPException
from nearapi import connect, Account, Contract, KeyPair
from pydantic import BaseModel
import json

app = FastAPI()

# Conectar com a NEAR Testnet
def get_near_connection():
    return connect(
        network_id="testnet",
        key_path="~/.near-credentials/testnet/your-account.json"  # Caminho para a chave de conta
    )

# Criar um modelo de dados para transações
class PaymentRequest(BaseModel):
    to: str
    amount: int

class WithdrawRequest(BaseModel):
    amount: int

@app.post("/pay")
async def pay(payment: PaymentRequest):
    try:
        # Conectar à rede NEAR
        near = get_near_connection()
        sender_account = near.account("payment.giovanna-britto.testnet")  # Subconta
        contract = sender_account.contract("contract_zec.giovanna-britto.testnet")

        # Enviar pagamento
        result = contract.pay(
            sender_account,
            to=payment.to,
            attached_deposit=payment.amount  # Valor em NEAR (em yoctoNEAR)
        )
        
        return {"status": "success", "result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/withdraw")
async def withdraw(withdraw_request: WithdrawRequest):
    try:
        # Conectar à rede NEAR
        near = get_near_connection()
        sender_account = near.account("payment.giovanna-britto.testnet")  # Subconta
        contract = sender_account.contract("contract_zec.giovanna-britto.testnet")

        # Retirar pagamento
        result = contract.withdraw(
            sender_account,
            amount=withdraw_request.amount  # Valor em NEAR (em yoctoNEAR)
        )

        return {"status": "success", "result": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/balance/{account_id}")
async def get_balance(account_id: str):
    try:
        # Conectar à rede NEAR
        near = get_near_connection()
        contract = near.account("contract_zec.giovanna-britto.testnet").contract("contract_zec.giovanna-britto.testnet")

        # Consultar saldo
        balance = contract.get_balance(account_id)
        
        return {"account_id": account_id, "balance": balance}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/set_owner")
async def set_owner(new_owner: str):
    try:
        # Conectar à rede NEAR
        near = get_near_connection()
        sender_account = near.account("payment.giovanna-britto.testnet")  # Subconta
        contract = sender_account.contract("contract_zec.giovanna-britto.testnet")

        # Alterar dono do contrato
        result = contract.set_owner(
            sender_account,
            new_owner=new_owner
        )

        return {"status": "success", "result": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
