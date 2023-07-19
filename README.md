# Project Title

Building-with-Polygon-Bridge

## Description

This project illustrates execution of an organization's need to move an NFT project from Ethereum to Polygon to increase demand and save on gas.

It features deployment of an NFT collection on the Ethereum blockchain, which is then mapped to Polygon, and corresponding assets transferred over via the Polygon Bridge. To put a twist on the project, the image generation tool - lexica was used to create the images for each NFT in the collection. This images were stored on IPFS using pinata.cloud and the NFT contract includes a "promptDescription" function, which when called, returns the prompt used to generate the respective image for an NFT.

The project includes a hardhat script to batch mint all NFTs (employing the ERC721A standard) and to batch transfer all NFTs from Ethereum to Polygon Mumbai using the FxPortal Bridge specifically. It first approves the NFTs to be transferred, deposits them to the Bridge, and later tests the "balanceOf" on Mumbai when state sync has happened.

## Getting Started

### Installing

* Clone this repository to get an exact copy of this program on your computer by running thee following command.

```
git clone https://github.com/Adesdesk/Building-with-Polygon-Bridge.git
```
* Navigate into the repository folder in your preferred command line interface. Using the terminal in VSCode is a good option.

### Executing program

* Ensure that the terminal now points to the Building-with-Polygon-Bridge folder, then run the following command.

```
yarn install
```
* create a new file named ".env" (quotes not included) and specify each environment variable, naming them just as used throughout the scripts. 
* When completed, run the commands below in the same order so as to execute the corresponding scripts accordingly

```
npx hardhat run scripts/deploy.js --network goerli
npx hardhat run scripts/batch-mint.js --network goerli
npx hardhat run scripts/batch-transfer.js --network goerli
npx hardhat run scripts/testBalanceOf.js --network mumbai
```

## Help

* You need to have NodeJS installed to your computer in order to run this program locally.
* Ensure to name your environment variables as used in the scripts or you would need to rename those in the scripts to match your own naming preference.
* this project uses yarn to install its dependencies. If you prefer to use npm, it is recommended to use the following command.

```
npm ci
```

## Authors

Contributor(s) names and contact info

Name: Adeola David Adelakun

Email: adesdesk@outlook.com


## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Appendix
Verified NFT contract address: 0x5B30a9CcE60FB6c8099c643e018Ed278ed9be6F7
https://goerli.etherscan.io/address/0x5B30a9CcE60FB6c8099c643e018Ed278ed9be6F7#code
Verified AdesdeskNFTCollection

### After Mapping...
Child Address:
0xD3F6575c03d8d023797aE525b47c654E36722130