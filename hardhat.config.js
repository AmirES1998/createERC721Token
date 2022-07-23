/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config() ;
const {INFURA_API_URL, META_MASK_PRIVATE_KEY} = process.env ;
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "ropsten",
  networks: {
    hardhat : {},
    ropsten:{
      url :INFURA_API_URL,
      accounts:[`0x${META_MASK_PRIVATE_KEY}`]
    } 
    
  }
};
