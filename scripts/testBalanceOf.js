const { ethers } = require("hardhat");
require("dotenv").config();

async function testBalanceOf() {
  // Set up the signer with wallet private key
  const privateKey = process.env.RECEICER_PRIVATE_KEY;
  if (!privateKey) {
      throw new Error("Private key not found in the .env file.");
  }


  // Getting the wallet provider for the Mumbai network
  const providerMumbai = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);
  const signerMumbai = new ethers.Wallet(privateKey, providerMumbai);

  const AdesdeskNFTCollectionContractAtMumbai = await ethers.getContractFactory("AdesdeskNFTCollection");
  const adesdeskNFTCollectionContractAtMumbai = await AdesdeskNFTCollectionContractAtMumbai.attach("0x7Aee444cfaadE656CF1aAEd82D887cEB66DC5d2F");

  // The address where to check the balance
  const receiverAddressToCheck = "0x1928062edfafbccb7d1c788b24f6acde80869048";

  // Getting the balance of the address
  const balance = await adesdeskNFTCollectionContractAtMumbai.balanceOf(receiverAddressToCheck);
  console.log(`Balance of address ${receiverAddressToCheck}: ${balance.toString()}`);
}

// Executing the balanceOf test
testBalanceOf()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts/testBalanceOf.js --network polygon_mumbai
