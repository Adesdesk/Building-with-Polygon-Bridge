// scripts/batchMintNFTs.js
const hre = require("hardhat");

async function main() {
    // Get the deployer's address
    const [deployer] = await hre.ethers.getSigners();
    const deployerAddress = deployer.address;

    // Contract and constructor arguments
    const name = "Adesdesk NFTs";
    const symbol = "ANFT";
    const recipients = [
        deployerAddress,
        deployerAddress,
        deployerAddress,
        deployerAddress,
        deployerAddress,
    ];
    const tokenIds = [ 1, 2, 3, 4, 5, ];
    const tokenURIs = [
            "https://gateway.pinata.cloud/ipfs/QmTbwURfUmTv6dfhuTuZhwUgoedfj91RxCrcrxzLQf5bK9",
            "https://gateway.pinata.cloud/ipfs/QmaWFHMnhFEa47PGTXQoRjAxDJRahjhjUA7Mo5JewLH1e9",
            "https://gateway.pinata.cloud/ipfs/QmVvNhvezYPCK5tm699BttG6vDMswVCge7uMk6Fam4BqWZ",
            "https://gateway.pinata.cloud/ipfs/QmdBVekv7ecjnd2mMa3EGP9ywfHnz87j5TjHaRxfiUmPbm",
            "https://gateway.pinata.cloud/ipfs/Qmb4FS9fqhLYn4dRM25TZf5eRHhArL5uQ4HCvPmwJMstEH",
          ];
    const descriptions = [
            "Illustrate a man whose wallet is well shielded in insurance against cyrptocurrency losses",
            "Colorful application icon for a chat bot, design, uxui, ux, ui —ar 11",
            "A photorealistic image of a research scientist examining a pathogen in a sophisticated laboratory",
            "A photorealistic image of a diver coming face to face with a whale at about 2000 feet deep into the sea",
            "A petroleum engineer supervising activities at an oil rig",
          ];

    // Deploy the contract
    const AdesdeskNFTs = await hre.ethers.getContractFactory("AdesdeskNFTs");
    const contract = await AdesdeskNFTs.deploy(name, symbol);

    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

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





// const AdesdeskNFTs = artifacts.require("AdesdeskNFTs");

// module.exports = async function (deployer) {
//   const contract = await AdesdeskNFTs.deployed();

//   // Mint a collection of 5 unique NFTs.
//   const tokenIds = [ 1, 2, 3, 4, 5, ];
//   const tokenURIs = [
//     "https://gateway.pinata.cloud/ipfs/QmTbwURfUmTv6dfhuTuZhwUgoedfj91RxCrcrxzLQf5bK9",
//     "https://gateway.pinata.cloud/ipfs/QmaWFHMnhFEa47PGTXQoRjAxDJRahjhjUA7Mo5JewLH1e9",
//     "https://gateway.pinata.cloud/ipfs/QmVvNhvezYPCK5tm699BttG6vDMswVCge7uMk6Fam4BqWZ",
//     "https://gateway.pinata.cloud/ipfs/QmdBVekv7ecjnd2mMa3EGP9ywfHnz87j5TjHaRxfiUmPbm",
//     "https://gateway.pinata.cloud/ipfs/Qmb4FS9fqhLYn4dRM25TZf5eRHhArL5uQ4HCvPmwJMstEH",
//   ];
//   const descriptions = [
//     "Illustrate a man whose wallet is well shielded in insurance against cyrptocurrency losses",
//     "Colorful application icon for a chat bot, design, uxui, ux, ui —ar 11",
//     "A photorealistic image of a research scientist examining a pathogen in a sophisticated laboratory",
//     "A photorealistic image of a diver coming face to face with a whale at about 2000 feet deep into the sea",
//     "A petroleum engineer supervising activities at an oil rig",
//   ];

//   for (let i = 0; i < tokenIds.length; i++) {
//     await contract.mint(
//       deployer.address,
//       tokenIds[i],
//       tokenURIs[i],
//       descriptions[i]
//     );
//   }
// console.log("Minting complete")
// };




// npx hardhat run scripts/batchMintNFTs.js --network <network_name>
