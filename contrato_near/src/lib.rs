use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::{Deserialize, Serialize};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub account_id: AccountId,
    pub role: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    users: UnorderedMap<AccountId, User>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            users: UnorderedMap::new(b"u".to_vec()),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn register_user(&mut self, role: String) {
        let account_id = env::predecessor_account_id();

        assert!(
            self.users.get(&account_id).is_none(),
            "Usuário já registrado."
        );
        

        let user = User {
            account_id: account_id.clone(),
            role,
        };

        self.users.insert(&account_id, &user);
    }

    pub fn get_user(&self, account_id: AccountId) -> Option<User> {
        self.users.get(&account_id)
    }
}
