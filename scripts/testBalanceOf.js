const { ethers } = require("hardhat");
const contractInJSON = require("../artifacts/contracts/AdesdeskNFTCollection.sol/AdesdeskNFTCollection.json");
require("dotenv").config();

async function testBalanceOf() {
  // Setting up the signer with MetaMask private key
  const privateKey = process.env.RECEICER_PRIVATE_KEY;
  const AdesdeskNFTCollectionABI = contractInJSON.abi;
  const AdesdeskNFTCollectionAddress = '0x5B30a9CcE60FB6c8099c643e018Ed278ed9be6F7';
  if (!privateKey) {
    throw new Error("Private key not found in the .env file.");
  }

  // Getting the wallet provider for the Mumbai network
  const providerMumbai = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);
  const signerMumbai = new ethers.Wallet(privateKey, providerMumbai);
  const AdesdeskNFTCollectionContractMumbai = new ethers.Contract(
    AdesdeskNFTCollectionAddress,
    AdesdeskNFTCollectionABI,
    signerMumbai
  );

  // The address where to check the balance
  const addressToCheck = "0x1928062edfafbccb7d1c788b24f6acde80869048";

  // Getting the balance of the address
  const balance = await AdesdeskNFTCollectionContractMumbai.balanceOf(addressToCheck);
  console.log(`Balance of address ${addressToCheck}: ${balance.toString()}`);
}

// Executing the balanceOf test
testBalanceOf()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts/batch-transfer.js --network mumbai
