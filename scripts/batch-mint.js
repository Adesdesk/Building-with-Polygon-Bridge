const { ethers } = require("hardhat");

async function main() {
  // Set up the signer with your MetaMask private key
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Private key not found in the .env file.");
  }

  // Get the wallet provider for the Goerli network
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const signer = new ethers.Wallet(privateKey, provider);

  // Contract and constructor arguments
  const name = "Adesdesk NFTs";
  const symbol = "ANFT";
  const recipients = Array(5).fill(signer.address); // Create an array with 5 elements, all set to the signer's address
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

  // Deploy the contract
  const AdesdeskNFTCollection = await ethers.getContractFactory("AdesdeskNFTCollection");
  const contract = await AdesdeskNFTCollection.connect(signer).deploy(name, symbol);
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  

  // Verify the contract
  console.log("Sleeping.....");
  // Wait for block explorer to notice that the contract has been deployed
  await sleep(80000);


  // Verify the MyToken contract after deploying
  await hre.run("verify:verify", {
    contract: "contracts/AdesdeskNFTCollection.sol:AdesdeskNFTCollection",
    address: contract.address,
    constructorArguments: [name, symbol],
  });
  console.log("Verified AdesdeskNFTCollection ")

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  // Batch mint NFTs
  await contract.batchMint(recipients, tokenIds, tokenURIs, descriptions);
  console.log("Batch minting completed!");
}

// Execute the batch minting script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });







// npx hardhat run scripts/batch-mint.js --network goerli
