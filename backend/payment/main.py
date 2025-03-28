from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from nowpayments import send_zec, create_payment, check_payment_status
from supabase_client import supabase
from datetime import datetime

app = FastAPI()

class SendZecRequest(BaseModel):
    from_id: str
    to_id: str
    amount: float

class CreatePaymentRequest(BaseModel):
    amount_usd: float

class CheckStatusRequest(BaseModel):
    payment_id: str

@app.post("/send_zec/")
def send_zec_route(req: SendZecRequest):
    from_user = supabase.table("users").select("*").eq("id", req.from_id).single().execute().data
    to_user = supabase.table("users").select("*").eq("id", req.to_id).single().execute().data

    if not from_user or not to_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    if not to_user["zec_wallet"]:
        raise HTTPException(status_code=400, detail="Destinatário não possui carteira ZEC.")

    result = send_zec(to_user["zec_wallet"], req.amount)

    supabase.table("transactions").insert({
        "from_id": req.from_id,
        "to_id": req.to_id,
        "amount": req.amount,
        "token_type": "ZEC",
        "status": result.get("payment_status", "pending"),
        "tx_hash": result.get("payment_id", "sem_hash"),
        "timestamp": datetime.utcnow().isoformat()
    }).execute()

    return {"status": "success", "result": result}

@app.post("/create_payment/")
def create_payment_route(req: CreatePaymentRequest):
    result = create_payment(price_amount=req.amount_usd)
    return result

@app.post("/check_payment_status/")
def check_payment_status_route(req: CheckStatusRequest):
    result = check_payment_status(req.payment_id)
    return result