require('dotenv').config() ; 
const Web3 = require('web3') ;


const INFURA_API_URL = process.env.INFURA_API_URL ;
const PUBLIC_KEY  = process.env.META_MASK_PUBLIC_KEY ; 
const PRIVATE_KEY  = process.env.META_MASK_PRIVATE_KEY ; 
const web3 = new Web3(INFURA_API_URL) ;

const contract = require('../artifacts/contracts/MyContract.sol/MyNFT.json') ; 
const contractAddress = "0x1Af7d36249A05Db61D68ceCC3BB08F914938F29C" ; 
const nftContract  = new web3.eth.Contract(contract.abi, contractAddress) ; 


async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') ;


    // the transaction

    const tx = {
        'from' : PUBLIC_KEY, 
        'to' : contractAddress ,
        'nonce' : nonce , 
        'gas' : 500000 , 
        'data' : nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI() 
    };


    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
            
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmPR1ZqMFvY2CJkbxjoiZsVJu2DEApvk4ohjST8vcBngUK") ;