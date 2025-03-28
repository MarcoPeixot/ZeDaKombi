
from bitcoinlib.wallets import Wallet

def enviar_btc(wallet_name, to_address, amount):
    w = Wallet(wallet_name)
    tx = w.send_to(to_address, amount, network='bitcoin')
    return tx.txid
