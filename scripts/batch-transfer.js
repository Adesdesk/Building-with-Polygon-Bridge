const { ethers } = require("hardhat");

async function main() {
  // Contract and token ID details
  const contractAddress = "CONTRACT_ADDRESS"; // Replace with the address of your AdesdeskNFTs contract
  const tokenIds = [/* Array of token IDs to transfer */];
  const recipientAddress = "RECIPIENT_ADDRESS"; // Replace with the address where you want to receive the NFTs

  // Get the contract instance and the signer
  const contract = await ethers.getContractAt("AdesdeskNFTs", contractAddress);
  const [deployer] = await ethers.getSigners();

  // Step 1: Approve NFTs for transfer
  for (const tokenId of tokenIds) {
    await contract.connect(deployer).approve("FxPortal: RECEIVER_ADDRESS", tokenId);
    console.log(`Token ID ${tokenId} approved for transfer`);
  }

  // Step 2: Deposit NFTs to the Bridge
  await contract.batchTransferFrom(deployer.address, "FxPortal: RECEIVER_ADDRESS", tokenIds);
  console.log("NFTs deposited to the FxPortal Bridge");

  // Step 3: Test balanceOf on Mumbai
  const mumbaiChainId = 80001; // Mumbai testnet chain ID
  const mumbaiProvider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today");
  const mumbaiContract = await ethers.getContractAt("AdesdeskNFTs", "MUMBAI_CONTRACT_ADDRESS", mumbaiProvider);

  for (const tokenId of tokenIds) {
    const balance = await mumbaiContract.balanceOf(recipientAddress, tokenId);
    console.log(`Recipient's balance of Token ID ${tokenId} on Mumbai: ${balance}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});











// const AdesdeskNFTs = artifacts.require("AdesdeskNFTs");
// const FxPortalBridge = artifacts.require("FxPortalBridge");

// module.exports = async function (deployer) {
//   const contract = await AdesdeskNFTs.deployed();
//   const bridge = await FxPortalBridge.deployed();

//   // Get the list of token IDs that were batch minted.
//   const tokenIds = await contract.tokenIds();

//   // Batch transfer the NFTs to Polygon Mumbai.
//   for (let i = 0; i < tokenIds.length; i++) {
//     await bridge.transferNFT(
//       deployer.address,
//       tokenIds[i],
//       "0x0000000000000000000000000000000000000000"
//     );
//   }
// };