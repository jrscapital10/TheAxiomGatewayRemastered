require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

const contractAddress = "0xf573d7D0E7d78f41B5f7f352B466c1ED1D3Abaa3";
// 2. This is the "ID card" (ABI) for your Smart Contract
// Once you deploy AxiomAnchor.sol, you'll put its address here!
"0xf573d7D0E7d78f41B5f7f352B466c1ED1D3Abaa3"
const abi = [
    "function getOwner(string memory domain) public view returns (address)"
];
const contract = new ethers.Contract(contractAddress, abi, provider);

app.post('/resolve', async (req, res) => {
    const { domain } = req.body;
    
    try {
        // 3. Ask the blockchain who owns the domain
        const owner = await contract.getOwner(domain);
        
        res.json({
            domain: domain,
            status: "success",
            resolvedAddress: owner,
            message: "Axiom Gateway verified via blockchain."
        });
    } catch (error) {
        res.status(404).json({ domain: domain, status: "error", message: "Domain not found." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Axiom Gateway live on port ${PORT}`));
