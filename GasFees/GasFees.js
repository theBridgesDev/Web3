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
    let gasLimitBN = ethers.BigNumber.from(gasLimitHex) // Convert gas .limit from hex to wei
    let gasPriceWei = gasPriceBN.toNumber() // Convert gas price wei from string to number
    let gasLimitWei = gasLimitBN.toNumber() // Convert gas limit wei from string to number
    gasFee = gasFee + gasPriceWei + gasLimitWei // Increment gas fee by price and limit

    console.log(`Tx ${i+1} gas fee ${gasPriceWei + gasLimitWei}`)
  }

  console.log(`Total gas fee: ${ethers.utils.formatEther(gasFee)}\n`)
}

main()
