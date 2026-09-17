---
layout: home

hero:
  name: Meddleware
  text: Sui tools, documented
  tagline: Decentralised storage, encryption, and NFT access control on Sui — with a hosted UI for each. Learn what they are, how to use them, and when.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: How they fit together
      link: /architecture

features:
  - title: DAO
    details: The platform console — treasury, commission policy, community access gates, and live on-chain activity. Read-only; no wallet needed to browse.
    link: /dao/
    linkText: Read more
  - title: Walrus Storage
    details: Upload files (blobs) to Walrus, decentralised storage on Sui. Manage blob lifetimes and extend them before they expire.
    link: /walrus-storage/
    linkText: Read more
  - title: Sealed Storage
    details: Encrypt a file in your browser, store the ciphertext on Walrus, and let only the right people decrypt it — enforced by an on-chain policy.
    link: /sealed-storage/
    linkText: Read more
  - title: Access Gate
    details: Sell or grant NFT passes that gate access to content, APIs, or apps. Ownership is checked on-chain; single-use or unlimited.
    link: /access-gate/
    linkText: Read more
---

## What is this?

Meddleware runs a small family of **Sui tools**, each with a hosted web app you can use with your own
wallet. This site explains each one in plain terms:

- **[DAO](/dao/)** — a read-only console showing the platform's treasury, commission rate, the
  community access gates it controls, and a live feed of gate activity.
- **[Walrus Storage](/walrus-storage/)** — upload files to [Walrus](https://walrus.xyz), a
  decentralised storage network on Sui, and manage how long they live.
- **[Sealed Storage](/sealed-storage/)** — client-side encryption ([Seal](https://seal-docs.wal.app/))
  layered on Walrus, so a file can be stored publicly yet only decrypted by whoever an on-chain
  **policy** allows.
- **[Access Gate](/access-gate/)** — create NFT "passes" that gate access to something; buyers
  purchase a pass, and ownership is verified on-chain.

New here? Start with **[Getting started](/getting-started)**, then see
**[how the tools fit together](/architecture)** — Sealed Storage, for example, is Walrus + Seal +
Access Gate working as one.

::: tip Where's the developer documentation?
This site is for **using** the tools. Building against the SDKs, self-hosting, and white-label
deployment are covered separately on the forthcoming `dev.meddleware.co.uk`. The **API reference**
sections here are still handy if you're a developer who just wants the shapes.
:::
