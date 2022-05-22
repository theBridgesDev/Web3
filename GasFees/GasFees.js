const { ethers } = require("ethers");

const API_KEY = ''
const provider = new ethers.providers.EtherscanProvider("homestead", API_KEY)

const address = ''

const main = async () => {
  const history = await provider.getHistory(address) // Fetch all tx for a given address

  let gasFee = 0

  for(let i = 0; i < history.length; i++) {
    let gasPriceHex = history[i].gasPrice._hex // Parse out just the gas fee in hex
    let gasLimitHex = history[i].gasLimit._hex // Parse out just the gas limit in hex
    let gasPriceBN = ethers.BigNumber.from(gasPriceHex) // Convert gas fee from hex to wei
    let gasLimitBN = ethers.BigNumber.from(gasLimitHex) // Convert gas limit from hex to wei
    let gasPriceWei = gasPriceBN.toNumber() // Convert gas price wei from string to number
    let gasLimitWei = gasLimitBN.toNumber() // Convert gas limit wei from string to number
    let gasPriceEth = ethers.utils.formatEther(gasPriceWei) // Convert gas price from wei to eth
    gasFee = gasFee + gasPriceEth * gasLimitWei // Increment gas fee by price and limit

    // console.log(`Tx ${i+1} gas fee ${gasPriceEth * gasLimitWei}`)
  }
  console.log(`\nGas data for ${address}`)
  console.log(`Number of transactions: ${history.length}`)
  console.log(`Average gas fee: ${gasFee / history.length}\n`)
  console.log(`Total gas fee: ${gasFee}`)
  console.log(`USD Value (@ $2000/ETH): ${gasFee * 2000}`)
  console.log(`USD Value (@ $4000/ETH): ${gasFee * 4000}`)
  console.log(`USD Value (@ $6000/ETH): ${gasFee * 6000}`)
  console.log(`USD Value (@ $8000/ETH): ${gasFee * 8000}`)
  console.log(`USD Value (@ $10000/ETH): ${gasFee * 10000}\n`)
}

main()
