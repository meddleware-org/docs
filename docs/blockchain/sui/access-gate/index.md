# Access Gate

Create NFT **passes** that gate access to something — content, an API, an app, a download — with
ownership verified on-chain. Operators manage gates at
[sui-access-gate.meddleware.co.uk](https://sui-access-gate.meddleware.co.uk).

## What it is

An **access gate** is an on-chain object with a price and rules. Anyone can **purchase** a pass
(an NFT) from it; holding a valid pass is the proof of access. Passes can be **unlimited** (a
membership) or **single-use** (spent once), and optionally **soulbound** (non-transferable).

There are two perspectives:

- **Operators** create and manage gates (set the price, airdrop passes, pause, freeze).
- **Buyers/holders** purchase a pass and use it to access whatever the gate protects.

## When to use it

- You want to **sell access** — a paid community, premium content, a members' area.
- You want to **gate an API or app** behind on-chain ownership (pair it with the
  [nft-gate gateway](/blockchain/sui/access-gate/reference), which puts any HTTP service behind a gate).
- You want to gate **encrypted content** — combine it with [Sealed Storage](/blockchain/sui/sealed-storage/), where
  a pass becomes the key.
- You want **single-use tickets** or **memberships** represented as NFTs.

## How a purchase works

1. A buyer calls **purchase** on the gate and pays the price.
2. The payment is split on-chain: a **commission** goes to the platform treasury, the rest to the
   gate's **operator** — atomically, in one transaction. Overpayment is refunded.
3. The buyer receives the pass NFT.

No operator co-signature is needed — purchase is permissionless and atomic.

## Single-use vs unlimited

- **Unlimited pass** — acts as ongoing membership; using it doesn't consume it.
- **Single-use** — carries a number of uses; **consuming** one is done on-chain by the owner and
  emits a verifiable event (with a **nonce**) that a verifier binds to. Off-chain systems can't spend
  a pass on your behalf.

When a single-use pass hits zero, the gate's policy decides: auto-burn it, or return it as a spent
receipt.

## Soulbound passes

A gate can mint **soulbound** (non-transferable) passes — useful when access should be tied to one
identity and not resold. The non-transferability is enforced at the contract level.

## Commission

Every purchase routes a commission (in basis points, capped on-chain at 10%) to the platform
treasury; the rest goes to the operator. The rate is set in shared on-chain config and shown in the
[DAO console](/blockchain/sui/dao/). Operators don't set the commission — only the price.

## Next

- **[Walkthrough](/blockchain/sui/access-gate/walkthrough)** — create and manage a gate; buy and use a pass.
- **[Reference](/blockchain/sui/access-gate/reference)** — objects, entry functions, events, the gateway, and the
  SDK API.
