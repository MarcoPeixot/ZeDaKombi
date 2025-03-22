const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function uploadToIPFS(filePath) {
  const data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    headers: {
      ...data.getHeaders(),
      Authorization: process.env.PINATA_JWT,
    },
  });

  const cid = response.data.IpfsHash;

  // Retorne apenas o CID na URL — sem subpath com nome de arquivo
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
