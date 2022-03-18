import { useState } from 'react'
import { ethers } from 'ethers'
import { abi } from '../ABI/Greeter.json'
import getEthData from '../utils/getEthData'

function App() {
  const [isLoading, setLoading] = useState(false)
  const [details, setDetails] = useState({
    address: 'Not connected',
    balance: 'Not connected',
    inputText: ''
  })
  const deployedAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

  async function connectWallet() {
    try {
      setLoading(true)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      const address = await signer.getAddress()

      setDetails((prev) => ({ ...prev, address }))

      const balance = await provider.getBalance(address)

      setDetails((prev) => ({
        ...prev,
        balance: ethers.utils.formatEther(balance)
      }))

      setLoading(false)
    } catch (error) {
      console.error('err', error)
      setLoading(false)
    }
  }

  async function fetchData() {
    const { provider } = await getEthData()

    const contract = new ethers.Contract(deployedAddress, abi, provider)
    try {
      const response = await contract.greeting()
      console.log(response)
      setDetails((prev) => ({ ...prev, response }))
    } catch (error) {
      console.error('err', error)
    }
  }

  async function editData(e) {
    e.preventDefault()

    const { signer } = await getEthData()

    const contract = new ethers.Contract(deployedAddress, abi, signer)

    try {
      const transaction = await contract.setGreeting(details.inputText)
      await transaction.wait()
      fetchData()
      console.log('transaction', transaction)
    } catch (error) {
      console.error('editDataError', error)
    }
  }

  return (
    <div className='App'>
      <button onClick={connectWallet}>
        {isLoading
          ? 'Loading...'
          : details.address
          ? 'Connected'
          : 'Connect to the wallet'}
      </button>

      <ul>
        <li>Address: {details.address}</li>
        <li>Balance: Ξ {details.balance}</li>
      </ul>

      <h2>Our special data from Contract</h2>
      <button onClick={fetchData}>Fetch Data</button>
      <p>Greeting: {details?.response}</p>

      <form onSubmit={editData}>
        <label htmlFor='text'>
          <strong>Edit data</strong>{' '}
        </label>
        <input
          type='text'
          id='text'
          required
          value={details.inputText}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, inputText: e.target.value }))
          }
        />
        <button type='submit'>Edit</button>
      </form>
    </div>
  )
}

export default App
