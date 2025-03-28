use near_sdk::borsh::{self, BorshSerialize, BorshDeserialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise};

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
pub struct PaymentContract {
    owner: AccountId,
    balances: std::collections::HashMap<AccountId, Balance>,
}

#[near_bindgen]
impl PaymentContract {
    #[init]
    pub fn new() -> Self {
        Self {
            owner: "default.testnet".parse().unwrap(), // Dono fixo
            balances: std::collections::HashMap::new(),
        }
    }
    

    pub fn pay(&mut self, to: AccountId) {
        let sender = env::predecessor_account_id();
        let attached_deposit = env::attached_deposit();

        assert!(attached_deposit > 0, "Pagamento deve ser maior que zero.");

        let balance = self.balances.entry(to.clone()).or_insert(0);
        *balance += attached_deposit;

        env::log_str(&format!(
            "Pagamento de {} NEAR enviado de {} para {}",
            attached_deposit, sender, to
        ));
    }

    pub fn withdraw(&mut self, amount: Balance) {
        let recipient = env::predecessor_account_id();
        let balance = self.balances.entry(recipient.clone()).or_insert(0);

        assert!(*balance >= amount, "Saldo insuficiente para retirada.");

        *balance -= amount;

        Promise::new(recipient.clone()).transfer(amount);
        env::log_str(&format!(
            "Pagamento de {} NEAR retirado por {}",
            amount, recipient
        ));
    }

    pub fn get_balance(&self, account: AccountId) -> Balance {
        self.balances.get(&account).cloned().unwrap_or(0)
    }

    pub fn set_owner(&mut self, new_owner: AccountId) {
        assert_eq!(env::predecessor_account_id(), self.owner, "Somente o dono pode mudar a propriedade.");
        self.owner = new_owner;
    }
}

// Fora do bloco de implementação principal
impl Default for PaymentContract {
    fn default() -> Self {
        Self {
            owner: "default.testnet".parse().unwrap(),
            balances: std::collections::HashMap::new(),
        }
    }
}
