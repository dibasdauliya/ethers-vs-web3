# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

```shell
npx hardhat # choose 'create simple app and follow the instructions given in CLI'

npx hardhat node

npx hardhat run scripts/sample-script.js --network localhost

# go to the tab running local blockchain node and it will show the transaction. Scroll towards the first test address. Copy the private key and import in metamask

## img

Now paste the private key and them click import. Switch your network to the Localhost and you must see 9999.9996 ETH balance in that account.

```
