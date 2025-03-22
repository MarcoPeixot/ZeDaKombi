use near_sdk::near_bindgen;
use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Artigo {
    pub titulo: String,
    pub autor: String,
    pub ipfs_hash: String,
}

#[derive(BorshDeserialize, BorshSerialize, Default)]
#[near_bindgen]
pub struct Contrato {
    artigos: Vec<Artigo>,
}

#[near_bindgen]
impl Contrato {
    #[init]
    pub fn new() -> Self {
        Self {
            artigos: vec![],
        }
    }

    pub fn adicionar_artigo(&mut self, titulo: String, autor: String, ipfs_hash: String) {
        let artigo = Artigo {
            titulo,
            autor,
            ipfs_hash,
        };
        self.artigos.push(artigo);
    }

    pub fn listar_artigos(&self) -> Vec<Artigo> {
        self.artigos.clone()
    }
    
    pub fn obter_artigo(&self, index: usize) -> Option<Artigo> {
        self.artigos.get(index).cloned()
    }    
}
