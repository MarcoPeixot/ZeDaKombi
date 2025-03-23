import requests

# Set up the ZCash API endpoint and credentials
zcash_url = "https://api.zcash.network"
zcash_username = "your_username"
zcash_password = "your_password"

# Set up the payment details
recipient_address = "recipient_address"
amount = 10.0

# Create a payment transaction
transaction = {
    "recipient": recipient_address,
    "amount": amount
}

# Send the payment transaction to the ZCash API
response = requests.post(zcash_url + "/transactions", auth=(zcash_username, zcash_password), json=transaction)

# Check if the payment was successful
if response.status_code == 200:
    print("Payment sent successfully!")
else:
    print("Error sending payment:", response.text)