/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require ("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { MUMBAI_URL, GOERLI_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, RECEICER_PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;


module.exports = {
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [ PRIVATE_KEY ],
    },
    polygon_mumbai: {
      url: MUMBAI_URL,
      accounts: [ RECEICER_PRIVATE_KEY ],
    },
  },
  solidity: {
    version: '0.8.7',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
        apiKey: {
          polygonMumbai: POLYGONSCAN_KEY,
          goerli: ETHERSCAN_API_KEY,
        },
      },
    };









// module.exports = {
//   solidity: "0.8.7",
//   defaultNetwork: "goerli",
//   networks: {
//     hardhat: {},
//     mumbai: {
//       url: MUMBAI_URL,
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//     goerli: {
//       url: GOERLI_URL,
//       chainId: 5,
//       currencySymbol: "GoerliETH",
//     },
//   },
//   etherscan: {
//     apiKey: {
//       polygonMumbai: POLYGONSCAN_KEY,
//       goerli: ETHERSCAN_API_KEY,
//     },
//   },
// };