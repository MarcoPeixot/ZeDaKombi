require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { uploadToIPFS } = require("./pinata");
const { salvarNaBlockchain, chamarMetodoView } = require("./near");

const app = express();
const upload = multer({ dest: "artigos/" });

app.use(express.json());

// Endpoint para salvar artigo
app.post("/artigos", upload.single("arquivo"), async (req, res) => {
  try {
    const { titulo, autor } = req.body;
    const filePath = req.file.path;

    console.log(" Upload no IPFS...");
    const ipfs_url = await uploadToIPFS(filePath);

    console.log(" Salvando na NEAR...");
    const txHash = await salvarNaBlockchain(titulo, autor, ipfs_url);

    fs.unlinkSync(filePath);

    res.json({ success: true, ipfs_url, txHash });
  } catch (err) {
    console.error("Erro ao salvar artigo:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para listar todos os artigos
app.get("/artigos", async (req, res) => {
  try {
    const artigos = await chamarMetodoView("listar_artigos", {});
    res.json(artigos);
  } catch (err) {
    console.error("Erro ao listar artigos:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para consultar um artigo específico por índice
app.get("/artigos/:index", async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    if (isNaN(index)) return res.status(400).json({ error: "Índice inválido" });

    const artigo = await chamarMetodoView("obter_artigo", { index });

    if (!artigo) return res.status(404).json({ error: "Artigo não encontrado" });

    res.json(artigo);
  } catch (err) {
    console.error("Erro ao buscar artigo:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para redirecionar download de arquivo IPFS
app.get("/download/:cid", (req, res) => {
  const { cid } = req.params;
  const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
  res.redirect(ipfsUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});