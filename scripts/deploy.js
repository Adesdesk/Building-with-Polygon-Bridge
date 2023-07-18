const { ethers, upgrades } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Setting contract name and symbol
  const name = 'AdesdeskNFTCollection';
  const symbol = 'ANFT';

  // Deploy the AdesdeskNFTCollection contract
  const AdesdeskNFTCollection = await ethers.getContractFactory('AdesdeskNFTCollection');
  const contract = await upgrades.deployProxy(AdesdeskNFTCollection, [name, symbol]);

  // Wait for complete contract deployment
  await contract.deployed();

  console.log('Contract deployed to:', contract.address);

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

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
