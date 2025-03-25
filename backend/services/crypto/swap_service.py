# crypto_services/swap_service.py

import requests

class SwapService:
    BASE_URL = "https://api.coingecko.com/api/v3"

    @staticmethod
    def get_exchange_rate(from_coin: str, to_coin: str) -> float:
        """
        Obtém a taxa de câmbio atual entre duas criptomoedas usando a CoinGecko API.
        """
        url = f"{SwapService.BASE_URL}/simple/price"
        params = {
            "ids": from_coin,
            "vs_currencies": to_coin
        }
        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception("Erro ao consultar taxa de câmbio")

        data = response.json()
        try:
            return data[from_coin][to_coin]
        except KeyError:
            raise Exception(f"Par de moedas inválido: {from_coin}/{to_coin}")

    @staticmethod
    def swap(from_coin: str, to_coin: str, amount: float) -> float:
        """
        Converte um valor de uma criptomoeda para outra usando a taxa atual.
        """
        rate = SwapService.get_exchange_rate(from_coin, to_coin)
        converted_amount = amount * rate
        print(f"🔄 {amount} {from_coin.upper()} → {converted_amount:.6f} {to_coin.upper()} @ taxa {rate}")
        return converted_amount
