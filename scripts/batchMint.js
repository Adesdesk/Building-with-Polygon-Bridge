const { ethers } = require("hardhat");

async function batchMintNFTs() {
  AdesdeskNFTCollectionAddress = "";
  const AdesdeskNFTCollection = await ethers.getContractFactory("AdesdeskNFTCollection");
  const adesdeskNFTCollection = await AdesdeskNFTCollection.attach(AdesdeskNFTCollectionAddress);

  const recipients = Array(5).fill(signer.address); // An array with 5 elements, all set to the signer's address
  const tokenIds = [1, 2, 3, 4, 5];
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
  const minted = await adesdeskNFTCollectionContract.batchMint(recipients, tokenIds, tokenURIs, descriptions);
  await minted.wait();
  console.log("Batch minting completed!");
}


batchMintNFTs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });