
from web3 import Web3

def enviar_eth(from_private_key, to_address, amount_ether, rpc_url):
    w3 = Web3(Web3.HTTPProvider(rpc_url))
    from_account = w3.eth.account.privateKeyToAccount(from_private_key)

    nonce = w3.eth.getTransactionCount(from_account.address)
    tx = {
        'to': to_address,
        'value': w3.to_wei(amount_ether, 'ether'),
        'gas': 21000,
        'gasPrice': w3.to_wei('50', 'gwei'),
        'nonce': nonce
    }

    signed_tx = w3.eth.account.sign_transaction(tx, from_private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    return w3.to_hex(tx_hash)
