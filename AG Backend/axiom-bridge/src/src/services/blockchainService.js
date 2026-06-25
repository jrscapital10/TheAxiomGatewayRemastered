const { ethers } = require('ethers');
// This imports the blueprint you just saved!
const abi = require('../config/abi.json');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.MASTER_WALLET_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.FACTORY_CONTRACT_ADDRESS, abi, wallet);

async function triggerContractDeployment(domainName) {
    try {
        console.log(`🚀 Sending instruction to blockchain for: ${domainName}`);
        const tx = await contract.registerDomain(domainName);
        console.log(`⌛ Waiting for mining... Hash: ${tx.hash}`);
        await tx.wait();
        console.log(`✅ Deployment Successful!`);
    } catch (error) {
        console.error('❌ Blockchain deployment failed:', error);
    }
}

module.exports = { triggerContractDeployment };
