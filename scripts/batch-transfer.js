const { ethers } = require("hardhat");
const contractInJSON = require("../artifacts/contracts/AdesdeskNFTCollection.sol/AdesdeskNFTCollection.json");
const { FxERC721RootTunnelABI } = require('../FxERC721RootTunnel.json');
require("dotenv").config();

async function batchTransferNFTs() {
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

  // The address of the root tunnel on Polygon Mumbai
  const rootTunnelAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";

  // The address of the receiver on Polygon Mumbai
  const receiverAddress = "0x1928062edfafbccb7d1c788b24f6acde80869048";

  // The token IDs you want to transfer
  const tokenIds = [1, 2, 3, 4, 5];

  // 1: Approve the NFTs to be transferred
  for (const tokenId of tokenIds) {
    await AdesdeskNFTCollectionContract.approve(rootTunnelAddress, tokenId);
    console.log(`Approved token ID ${tokenId} for transfer.`);
  }

  // 2: Deposit the NFTs to the Bridge
  const FxERC721RootTunnelContract = new ethers.Contract(rootTunnelAddress, FxERC721RootTunnelABI, provider);

  // Convert the token Ids to BigNumbers
  myCustomMetadata = "0x42 0x79 0x20 0x41 0x64 0x65";

  // Deposit the NFTs
  for (const tokenId of tokenIds) {
    const depositTx = await FxERC721RootTunnelContract.deposit(AdesdeskNFTCollectionAddress, receiverAddress, tokenIdsBigNumber, myCustomMetadata);
    await depositTx.wait();
    console.log("NFTs have been deposited to the FxPortal Bridge.");
    console.log("Transfer from Goerli to Polygon Mumbai network completed!");
  }
}

// Execute the transfer script
batchTransferNFTs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });












// npx hardhat run scripts/batch-transfer.js --network goerli
