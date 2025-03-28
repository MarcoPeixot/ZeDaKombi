const express = require("express");
const bodyParser = require("body-parser");
const nearAPI = require("near-api-js");

const app = express();
const port = 3000;

// Configuração do corpo da requisição para JSON
app.use(bodyParser.json());

// Função para conectar à rede NEAR
async function getNearConnection() {
    const config = {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
    };

    const near = await nearAPI.connect(config);
    return near;
}

// Rota para pagar
app.post("/pay", async (req, res) => {
    const { to, amount } = req.body;

    try {
        const near = await getNearConnection();
        const account = await near.account("payment.giovanna-britto.testnet");
        const contract = new nearAPI.Contract(account, "contract_zec.giovanna-britto.testnet", {
            changeMethods: ["pay"],
        });

        const result = await contract.pay(
            {
                sender_id: account.accountId,
                to,
                attached_deposit: amount, // valor em yoctoNEAR
            }
        );

        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para retirar
app.post("/withdraw", async (req, res) => {
    const { amount } = req.body;

    try {
        const near = await getNearConnection();
        const account = await near.account("payment.giovanna-britto.testnet");
        const contract = new nearAPI.Contract(account, "contract_zec.giovanna-britto.testnet", {
            changeMethods: ["withdraw"],
        });

        const result = await contract.withdraw({
            sender_id: account.accountId,
            amount, // valor em yoctoNEAR
        });

        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter o saldo
app.get("/balance/:account_id", async (req, res) => {
    const { account_id } = req.params;

    try {
        const near = await getNearConnection();
        const account = await near.account("contract_zec.giovanna-britto.testnet");
        const contract = new nearAPI.Contract(account, "contract_zec.giovanna-britto.testnet", {
            viewMethods: ["get_balance"],
        });

        const balance = await contract.get_balance({ account_id });

        res.json({ account_id, balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para definir o novo dono do contrato
app.post("/set_owner", async (req, res) => {
    const { new_owner } = req.body;

    try {
        const near = await getNearConnection();
        const account = await near.account("payment.giovanna-britto.testnet");
        const contract = new nearAPI.Contract(account, "contract_zec.giovanna-britto.testnet", {
            changeMethods: ["set_owner"],
        });

        const result = await contract.set_owner({
            sender_id: account.accountId,
            new_owner,
        });

        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
