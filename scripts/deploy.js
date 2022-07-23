const { ethers } = require("hardhat");

async function main() { 
    const MyNFT = await ethers.getContractFactory("MyNFT") ; 
    const myNFT = await MyNFT.deploy() ; 
    await myNFT.deployed() ; 
    console.log("Contract deployed to address: ",myNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1) ;
    })