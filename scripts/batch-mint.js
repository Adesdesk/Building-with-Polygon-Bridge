const { ethers } = require("hardhat");
const contractInJSON = require("../artifacts/contracts/AdesdeskNFTCollection.sol/AdesdeskNFTCollection.json");
require("dotenv").config();

async function main() {
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

  const recipients = Array(5).fill(signer.address); // An array with 5 elements, all set to the signer's address
  const tokenIds = [6, 7, 8, 9, 10];
  const tokenURIs = [
    "https://gateway.pinata.cloud/ipfs/QmTbwURfUmTv6dfhuTuZhwUgoedfj91RxCrcrxzLQf5bK9",
    "https://gateway.pinata.cloud/ipfs/QmaWFHMnhFEa47PGTXQoRjAxDJRahjhjUA7Mo5JewLH1e9",
    "https://gateway.pinata.cloud/ipfs/QmVvNhvezYPCK5tm699BttG6vDMswVCge7uMk6Fam4BqWZ",
    "https://gateway.pinata.cloud/ipfs/QmdBVekv7ecjnd2mMa3EGP9ywfHnz87j5TjHaRxfiUmPbm",
    "https://gateway.pinata.cloud/ipfs/Qmb4FS9fqhLYn4dRM25TZf5eRHhArL5uQ4HCvPmwJMstEH",
  ];
  const descriptions = [
    "Illustrate a man whose wallet is well shielded in insurance against cryptocurrency losses",
    "Colorful application icon for a chat bot, design, uxui, ux, ui —ar 11",
    "A photorealistic image of a research scientist examining a pathogen in a sophisticated laboratory",
    "A photorealistic image of a diver coming face to face with a whale at about 2000 feet deep into the sea",
    "A petroleum engineer supervising activities at an oil rig",
  ];

  // Batch mint NFTs
  await AdesdeskNFTCollectionContract.batchMint(recipients, tokenIds, tokenURIs, descriptions);
  console.log("Batch minting completed!");
}

// Execute the batch minting script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
