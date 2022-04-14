---
title: 'Setup Developer environment and deploy ERC20 Token'
authors: huhn511
tags: [Smart Contracts, EVM]
keywords:
- Smart Contracts
- EVM
- Solidity
- ERC20
- eip-20
- token creation
- mint tokens
description: Solidity smart contract ERC20.
---

In this guide you will learn how to set up your development environment with Hardhat, which helps you to work with your smart contracts. Remix is nice to quickly test something, but if you want to develop your own decentralised application, you need a more solid environment. Let's quickly set up Hardhat and discover the advantages.

- Setting up your Node.js environment
- Creating and configuring a Hardhat project
- Create a smart contract that implements a ERC20 token
- Writing automated tests for your contract using Ethers.js and Waffle
- Debugging Solidity with console.log() using Hardhat Network
- Deploying your contract to the public IOTA EVM testnet


1. Setting up your Node.js environment

The ground layers or Hardhat is a JavaScript runtime - Node.js. 
You can skip this section if you already have a working Node.js >=12.0 installation. 

Otherwise, visit [https://nodejs.org/](https://nodejs.org/), download the "16.X.X LTS" Version wich is recommended for most users and follow the installation instructions.

Check in your terminal with this command, if your Node.js installation is working:

```
node -v
```

Then you could see something like this:
```
v16.13.2
```

If you don't see a version number, there is something wrong. Checkout the error message and search for it in your favourite search machine. IF you can't fix the problem, ask in the [Discord Chat Server](https://discord.iota.org) for help.



2. Creating and configuring a Hardhat project

Now we will create a new folder for our project and install the hardhat dependency. Go to your favourite directory and execute this into your terminal:
```bash
mkdir iota-evm-tutorial
cd iota-evm-tutorial
npm init --yes
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Now you can run the hardhat installation command:
```bash
npx hardhat
```

Now you are in the installation process, please choose the following commands:

- Choose `Create an empty hardhat.config.js` and press Enter.


Open your favourite Code editor and add this line on the top of the `hardhat.config.js` file:

> require("@nomiclabs/hardhat-waffle");

```TIP
If you are using Windows Visual Studio Code (VSC) as code editor, you can open you project into VSC with this command: `code .`
```

Your `hardhat.config.js` file should now look like this:

```javascript
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};
```


3. Create a smart contract that implements a ERC20 token

Let's create a new directory called `contracts` with a file inside which we name `Token.sol`. YOu can do it with your mouse, or with these commands:
```bash
mkdir contracts
touch contracts/Token.sol
```

Now we add our ERc20 Token Code from the previously chapter into the Solidity file `.sol`:

```solidity
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("ExampleERC20Token", "EET") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

The line `3`imports another Solidity file with the name `ERC20.sol`. This file is provided by a library called @openzeppelin. @openzeppelin library has several useful Smart Contracts, which we can use and build upon. Just install the library with:

 
```bash
npm install @openzeppelin/contracts --save-dev
```

Next step is to compile the smart contract with the following command:

```bash
npx hardhat compile
```

Then you should see something like the following lines in your console:
```
Downloading compiler 0.8.4
Compiling 5 files with 0.8.4
```

Yay - You just compiled your first smart contract on your local machine!

4. Writing automated tests for your contract using Ethers.js and Waffle
Before we deploy our smart contract, we want to be sure that he does exactly what want. We can use automated tests to ensure that.

Create a new directory called test inside our project root directory and create a new file called Token.js

```bash
mkdir test
touch test/Token.js
```

Copy the following code inside Token.js file:

```
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
```

Run the rust with this command and see the result: 
```
npx hardhat test
```

This should be the result:
```
  Token contract
    √ Deployment should assign the total supply of tokens to the owner (948ms)


  1 passing (952ms)
```

It shows you that the test passes. Did you already understand what the test is checking?

First, we will store the owner of the smart contract in a variable called `owner`. After that, we build and deploy the contract to a temporary local test network. Then we check the balance of the owner address. In the last line, we fire the actual test - and we check if the owner has all new generated tokens. That's all!

Try to add more tests by yourself and play a bit! 
Tip: With this, you can use more addresses and send some tokens in your test environment:
```
const [owner, addr1, addr2] = await ethers.getSigners();
```

5. Debugging Solidity with console.log() using Hardhat Network

Debugging is a strong utility if something happens when you have not expected. You can use loggin in the local test environment, just import this into your smart contract:


```solidity

pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("ExampleERC20Token", "EET") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        console.log("Sender is:", msg.sender);
    }
}

```

And the output looks like this:
```
Solidity compilation finished successfully


  Token contract
Sender is: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    √ Deployment should assign the total supply of tokens to the owner (1121ms)


  1 passing (1s)
```


6. Deploying your contract to the public IOTA EVM testnet

