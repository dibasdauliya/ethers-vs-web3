import { ethers } from 'ethers'

export default async function getEthData() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])

  //   const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545')
  const signer = provider.getSigner()

  return { provider, signer }
}
