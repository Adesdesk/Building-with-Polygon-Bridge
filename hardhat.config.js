require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { MUMBAI_URL, GOERLI_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, POLYGONSCAN_KEY } = process.env;

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: MUMBAI_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    goerli: {
      url: GOERLI_URL,
      chainId: 5,
      currencySymbol: "GoerliETH",
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
      goerli: ETHERSCAN_API_KEY,
    },
  },
};