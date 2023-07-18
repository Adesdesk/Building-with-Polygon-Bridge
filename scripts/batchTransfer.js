const { ethers } = require("hardhat");
const contractInJSON = require("../artifacts/contracts/AdesdeskNFTCollection.sol/AdesdeskNFTCollection.json");
require("dotenv").config();

async function transferNFT() {
  // Set up the signer with your MetaMask private key
  const privateKey = process.env.PRIVATE_KEY;
  const AdesdeskNFTCollectionABI = contractInJSON.abi;
  const AdesdeskNFTCollectionAddress = '0x5B30a9CcE60FB6c8099c643e018Ed278ed9be6F7';
  if (!privateKey) {
    throw new Error("Private key not found in the .env file.");
  }

  // Get the wallet provider for the Goerli network
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const signer = new ethers.Wallet(privateKey, provider);
  AdesdeskNFTCollectionContract = new ethers.Contract(AdesdeskNFTCollectionAddress, AdesdeskNFTCollectionABI, signer);


  // Transfer in units of tokenId
  const receiverAddress = "0x1928062edfafbccb7d1c788b24f6acde80869048";
  await AdesdeskNFTCollectionContract.approve(fxPortalRootTunnelAddress, tokenId);
  await fxPortalRootTunnel.deposit(receiverAddress, tokenId);
}

transferNFT().then(() => {
  console.log("NFT transferred successfully");
}).catch((error) => {
  console.error(error);
});