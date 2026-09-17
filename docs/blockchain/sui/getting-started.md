# Getting started with Sui

Everything here runs on [Sui](https://sui.io). You interact with each tool through its hosted web app
using a **Sui wallet**. This page covers the basics that apply to all of them.

## 1. Get a Sui wallet

Install a Sui wallet browser extension (for example [Slush](https://slush.app/), the official Sui
wallet, or any wallet that supports the Sui wallet standard). Create or import an account and keep
your recovery phrase safe — no one at Meddleware can recover it for you.

## 2. Choose a network: testnet vs mainnet

Sui has separate networks:

- **Testnet** — a free sandbox using **test** SUI with no real value. Best for trying things out. The
  Meddleware tools currently run against **testnet**.
- **Mainnet** — the real network, where SUI has value. Some tools are mainnet-pending; each app shows
  its current network in the header.

Make sure your wallet is set to the **same network** as the app you're using. On testnet you can get
free test SUI from the [Sui faucet](https://faucet.sui.io/).

::: tip You need a little SUI for gas
Every on-chain action (a purchase, an upload registration, extending a blob) costs a small **gas**
fee in SUI. On testnet this is free from the faucet; on mainnet it's real but typically tiny.
:::

## 3. Open a tool and connect

Each tool has its own subdomain, and they're all linked from the **tools hub**:

| Tool | App |
| --- | --- |
| Tools hub | [sui.meddleware.co.uk](https://sui.meddleware.co.uk) |
| DAO console | [sui-dao.meddleware.co.uk](https://sui-dao.meddleware.co.uk) |
| Walrus Storage | [sui-walrus.meddleware.co.uk](https://sui-walrus.meddleware.co.uk) |
| Sealed Storage | [sui-seal.meddleware.co.uk](https://sui-seal.meddleware.co.uk) |
| Access Gate | [sui-access-gate.meddleware.co.uk](https://sui-access-gate.meddleware.co.uk) |

Click **Connect** and approve the connection in your wallet. The tools hub shares one wallet
connection across every tool embedded in it.

- **Browsing** the [DAO console](/blockchain/sui/dao/) needs **no wallet** — it's read-only.
- **Uploading, encrypting, buying, or managing** needs a connected wallet to sign transactions.

## 4. Understand what's on-chain

A recurring theme across these tools: **the blockchain is the source of truth.** Prices, ownership,
commission, and access rules are enforced by Sui smart contracts, not by the web app. The apps are
thin front-ends — they show you state and help you build transactions, but they can't override what
the chain says. Anything an app displays can be independently verified on a
[Sui explorer](https://suiscan.xyz).

## Next steps

- **[How the tools fit together](/blockchain/sui/architecture)** — the big picture.
- Jump into a tool: [DAO](/blockchain/sui/dao/) · [Walrus Storage](/blockchain/sui/walrus-storage/) ·
  [Sealed Storage](/blockchain/sui/sealed-storage/) · [Access Gate](/blockchain/sui/access-gate/).
