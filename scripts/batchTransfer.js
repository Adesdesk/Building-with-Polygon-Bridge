const { ethers } = require("hardhat");
const FxERC721RootTunnelABI = require('../FxERC721RootTunnel.json');

async function batchTransferNFTs() {
  const [deployer] = await hre.ethers.getSigners();

  // The address of the root tunnel on Polygon Mumbai
  const rootTunnelAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";  
  // Get an instance of the FxERC721RootTunnel contract
  const FxERC721RootTunnelContract = await ethers.getContractAt(FxERC721RootTunnelABI, rootTunnelAddress);

  // Get an instance of the AdesdeskNFTCollection contract
  const AdesdeskNFTCollectionAddress = "0x8A85544b11ad7E6F274F13eEF4628EC2dDd313DB";
  const AdesdeskNFTCollection = await ethers.getContractFactory("AdesdeskNFTCollection");
  const adesdeskNFTCollection = await AdesdeskNFTCollection.attach(AdesdeskNFTCollectionAddress);

  // The address of the receiver wallet - Polygon Mumbai
  const receiverAddress = "0x1928062edfafbccb7d1c788b24f6acde80869048";

  // The token IDs you want to transfer
  const tokenIds = [1, 2, 3, 4, 5];

  // 1: Approve the NFTs to be transferred
  for (const tokenId of tokenIds) {
    const approval = await adesdeskNFTCollection.approve(rootTunnelAddress, tokenId);
    await approval.wait();
    console.log(`Approved token ID ${tokenId} for transfer.`);
  }


  // 2: Deposit the NFTs to the Bridge
  myCustomMetadata = "0x427920416465";

  // Deposit the NFTs
  for (const tokenId of tokenIds) {
    const depositTx = await FxERC721RootTunnelContract.connect(deployer).deposit(AdesdeskNFTCollectionAddress, receiverAddress, tokenId, myCustomMetadata);
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




// npx hardhat run scripts/batchTransfer.js --network goerli