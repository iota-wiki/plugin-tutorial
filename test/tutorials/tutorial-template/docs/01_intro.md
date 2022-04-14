---
title: 'The complete Ethereum Virtual Machine (EVM) Guide on IOTA'
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
---

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Dr-Electron/tutorial-template/tree/main)

## Introduction

In this tutorial, you will learn how the IOTA Smart Contract EVM works and how you can use it. You will also learn how to develop your own decentralised application and deploy it.

It's a complete guide to get a kickstart and learn the common concepts to become a successful Smart Contract developer.

This guide is split into different parts: the

- Introduction to the EVM
- Deploy your first Smart Contract - ERC20 Token
- Setup a local development environment with hardhat.
- Create your own NFT Smart Contract
- What's next?

## Getting Started
So we will start with some history and the creation of the Ethereum Virtual Machine (EVM). If you want to skip this, feel free to directly start with chapter two and start developing with the Testnet EVM.

Ethereum was conceived in 2013 by Vitalik Buterin [*](https://de.wikipedia.org/wiki/Ethereum) as a Blockchain with smart contract functionality. The platform allows anyone to deploy permanent and immutable decentralised applications onto it, with which users can interact. This enables developers to build applications for Decentralised finance (DeFi) and the Non-fungible Token (NFT) was born. 

Nowadays, almost ten years after the birth of Ethereum we see a big hype around NFTs. It was a long journey from it's standard (ERC-721), which was first formulated in 2018 and its nothing more than functional description of a smart contract, which defines the attribute of a Non-Fungible Token - a special token which has an unique attribute. We dive into this whole NFT Topic later in this guide.

Let's get back the the Main topic - the Ethereum Virtual Machine (EVM).


### Why does IOTA have an Ethereum Virtual Machine (EVM)?
The IOTA Foundation announces with the Beta Release that IOTA Smart Contracts is also EVM compatible. That means, developers can develop besides Rust, Go and Typescript their Smart Contracts also in the Solidity programming language. You can imagine the EVM as an VIrtual Machine and IOTA as a Computer. So IOTA runs the Ethereum Virtual Machine, which allows SMart Contracts in Solidity, and the WASM-VM, which allows Smart Contracts in any language which can compile to webassembly - currently it's Rust, Go and Typescript. IOTA Smart Contracts is a book for itself and we just focus on the EVM into this GUide. So let's dive a bit deeper into the EVM.

>  Ethereum is a distributed state machine. Ethereum's state is a large data structure which holds not only all accounts and balances, but a machine state, which can change from block to block according to a predefined set of rules, and which can execute arbitrary machine code. The specific rules of changing state from block to block are defined by the EVM. [*](https://ethereum.org/en/developers/docs/evm/)

All implementations of the EVM must adhere to the specification described in the [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf). With the Beta Release of IOTA Smart Contracts the IOTA Foundation released a EVM version which allows developers to get a preview of EVM based smart contract solutions on top of IOTA. There are some limitations you should be aware of at this time - [read more about the limitations here](https://wiki.iota.org/smart-contracts/guide/evm/limitations).


### The Architecture of an Decentralised Application

The term "web3" describes the next evolutionary step of the internet. 
Web1 stands for a reliable internet, which was created to share information with others. The web2 brings interactivity and writability. With things like javascript, interactive web applications and games in the browser became a reality. With servers with functions and databases, internet users could login into these systems and create content. The social networks, streaming services and cloud services arise. With web3 and the cryptocurrency area brings trust and ownership to the internet. Blockchains and `distributed state machines`becomes the new backbone of websites. This is called a decentralised application, where a Applications in the browser just interact with one or multiple smart contracts. The data is stored on the user device and on the blockchain. The most applications uses a browser plugin to interact with the smart contract. So secret credentials like the private key is stored in a secured environment and the website can interact with plugin. THe most used plugin for EVM chains is Metamask. In this guide, we also will use Metamask which will we setup to the public IOTA EVM Testnet chain. So please install it after this chapter, so you are prepared for that step.


### A sample Smart Contract
Let's discover the programming language behind the EVM based Smart Contract - Solidity.

Solidity is an object-oriented programming language and was initially proposed in 2014 by Gavin Wood. Object-oriented means, you can define objects like Car, House or NFT and provide individual properties and functions. Objects also can inherit from other objects and use or override the properties and functions.

Here is an example of a Solidity Smart Contract, which describes a simple Coin. 


```
pragma solidity >= 0.7.0 <0.8.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent (address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() public {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent (msg.sender, receiver, amount);
    }
}
```

You don't need to understand every line- This smart contract describes a Coin, which lives inside the smart contract. The deployer of the smart contract can mint new coins and a list ``balances`` tracks all the balances of the Coin holders. The function `send` allows anyone who holds a Coin to transfer them to another address. The "emit" function is an event, which allows applications to react on it, like display a message,  "Alice send some tokens to Bob" for example. So with this possibility to create own tokens on Ethereum, everyone created their own coins. After some iterations, the development resulted into a new standard - the ERC20 standard which defines "fungible tokens".

- ERC20 is a standard for fungible tokens and is defined in the [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20) by Ethereum.

- With the ERC20 standard you can create your own tokens and transfer them in the EVM on IOTA Smart Contracts without fees.

You can use the [Remix IDE](https://remix.ethereum.org/) to deploy any regular Solidity Smart Contract.

Set the environment to `Injected Web3`, and connect Remix with your MetaMask wallet. 
Read this [how to connect your Metamask with the public Testnet.](/smart-contracts/guide/chains_and_nodes/testnet#interact-with-evm).

## 1. Create a Smart Contract

Create a new Solidity file, for example `ÈRC20.sol` in the contracts folder of your [Remix IDE](https://remix.ethereum.org/) and add this code snippet:

```solidity
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("ExampleERC20Token", "EET") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

This imports all functions from the OpenZeppelin smart contract and creates a new ERC20 token with your name and Symbol. OpenZeppelin provides many audited smart contracts and is a good point to start and learn.

You can change the token name `ExampleERC20Token` and the token symbol `EET`.

## 2. Compile

Go to the second tab and compile your smart contract with the "Compile ERC20.sol" button.

[![Compile ERC20.sol](/compile.png)](/compile.png)


## 3. Deploy
Go to the next tab and select `Injected Web3` as your environment. Ensure that your MetaMask is installed and set up correctly.

Choose your ´ExampleERC20Token´ smart contract in the contract dropdown.

Press the "Deploy" button - then your MetaMask will popup and you need to accept the deployment. 

[![Deploy ERC20.sol](/deploy.png)](/deploy.png)

Your MetaMask browser extension will open automatically - press confirm.
[![Confirm in MetaMask](/deploy-metamask.png)](/deploy-metamask.png)


## 4. Add your token to MetaMask

Get the `contract address` from the transaction after successful deployment. You can click on the latest transaction in your MetaMask Activity tab. If your MetaMask is configured correctly, the [IOTA EVM Explorer](https://explorer.wasp.sc.iota.org/) opens the transaction. Copy the contract address and import your token into MetaMask.

[![Copy contract address](/explorer-contract-address.png)](/explorer-contract-address.png)

## 5. Have some Fun!

Now you should see your token in MetaMask - send them to your friends without any fees or gas costs.

[![Copy contract address](/erc20-balance.png)](/erc20-balance.png)

You also can ask in the [Discord Chat Server](https://discord.iota.org) to send them around and discover what the community is building on IOTA Smart Contracts.

In the next chapter you will learn how to set up a local development environment and write and deploy smart contracts from your device.

