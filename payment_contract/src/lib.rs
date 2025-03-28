use near_sdk::env;
use near_sdk::near_bindgen;
use near_sdk::collections::LookupMap;
use near_sdk::json_types::U128;
use near_sdk::Promise;
use near_sdk::AccountId;
use near_sdk::NearToken;

#[near_bindgen]
pub struct PaymentContract {
    // Maps beneficiary account to balance
    pub balances: LookupMap<AccountId, U128>,
}

impl Default for PaymentContract {
    fn default() -> Self {
        PaymentContract {
            balances: LookupMap::new(b"b".to_vec()),
        }
    }
}

#[near_bindgen]
impl PaymentContract {
    // Function to deposit balance to beneficiary account
    pub fn deposit(&mut self, account_id: AccountId, amount: U128) {
        let current_balance = self.balances.get(&account_id).unwrap_or(U128(0));
        let new_balance = U128(current_balance.0 + amount.0);
        self.balances.insert(&account_id, &new_balance);
    }

    // Function for beneficiary to withdraw balance
    pub fn withdraw(&mut self, amount: U128) -> Promise {
        let account_id = env::predecessor_account_id();
        let current_balance = self.balances.get(&account_id).unwrap_or(U128(0));
        if current_balance.0 < amount.0 {
            env::panic_str("Insufficient funds");
        }
        let new_balance = U128(current_balance.0 - amount.0);
        self.balances.insert(&account_id, &new_balance);
        
        // Correctly convert U128 to NearToken
        let near_amount = NearToken::from_yoctonear(amount.0);
        Promise::new(account_id).transfer(near_amount)
    }

    // Function to check balance
    pub fn get_balance(&self, account_id: AccountId) -> U128 {
        self.balances.get(&account_id).unwrap_or(U128(0))
    }
}
