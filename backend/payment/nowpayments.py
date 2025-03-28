import requests

# nowpayments.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NOWPAYMENTS_API_KEY")

headers = {
    "x-api-key": API_KEY,
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}


def send_zec(address: str, amount: float):
    url = "https://api.nowpayments.io/v1/payout"
    data = {
        "currency": "zec",
        "address": address,
        "amount": str(amount)
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()

def create_payment(price_amount: float, pay_currency: str = "zec"):
    url = "https://api.nowpayments.io/v1/invoice"
    data = {
        "price_amount": price_amount,
        "price_currency": "usd",
        "pay_currency": pay_currency,
        "order_id": "order_" + str(price_amount).replace(".", ""),
        "order_description": "Pagamento para pesquisador"
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()

def check_payment_status(payment_id: str):
    url = f"https://api.nowpayments.io/v1/payment/{payment_id}"
    response = requests.get(url, headers=headers)
    return response.json()