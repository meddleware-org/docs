# How the tools fit together

The four tools are useful on their own, but they're designed to compose. This page shows how.

## The building blocks

| Tool | Provides | Depends on |
| --- | --- | --- |
| **Access Gate** | NFT passes that prove someone is allowed access | Sui only |
| **Walrus Storage** | Decentralised file (blob) storage | Sui + Walrus |
| **Sealed Storage** | Client-side encryption with on-chain access rules | Walrus + Seal + (optionally) Access Gate |
| **DAO** | A read-only view of the platform: treasury, commission, gates | Access Gate on-chain state |

## Sealed Storage = Walrus + Seal + Access Gate

The clearest example of composition is **[Sealed Storage](/sealed-storage/)**. When you seal a file:

1. **Seal** encrypts it in your browser, under a **policy** you choose.
2. **Walrus** stores the resulting ciphertext — publicly, because it's useless without the key.
3. The **policy** decides who can decrypt. One built-in policy is **Access Gate NFT ownership**: only
   holders of a valid pass for a chosen gate can unlock the content.

So an Access Gate pass can act as the key to encrypted Walrus content — three tools, one flow.

```
        ┌─────────────┐   encrypt in browser    ┌──────────────┐
  file  │    Seal     │ ───────────────────────▶│  ciphertext  │
        └─────────────┘                          └──────┬───────┘
               ▲                                         │ store
        policy │ (who may decrypt)                       ▼
        ┌──────┴───────┐                          ┌──────────────┐
        │ Access Gate  │  ← pass holders only     │    Walrus    │
        │  (NFT pass)  │                          │   storage    │
        └──────────────┘                          └──────────────┘
```

## How gated Walrus uploads work

**[Walrus Storage](/walrus-storage/)** can route uploads through a **relay**. Meddleware's relay can
be **gated** by an Access Gate NFT: you prove you hold a valid pass, and the relay accepts your
upload. A commission on gate purchases funds the service. If you don't need the gated relay, uploads
fall back to the public relay.

## Where the DAO fits

The **[DAO console](/dao/)** doesn't create anything — it *observes*. It reads the platform's
on-chain configuration: the treasury address, the **commission rate** charged on Access Gate
purchases, the community gates the treasury controls, and a live feed of gate activity (passes sold,
used, burned). It's the transparency window over the Access Gate economics.

## The commission thread

One number ties the economics together: the **commission** (in basis points) charged on-chain when an
Access Gate pass is purchased. It's set in a shared `PlatformConfig` object, capped on-chain, routed
to the treasury, and shown in the DAO console. The web apps can't change it — only an on-chain admin
capability can. This is the pattern throughout: **economics live in the smart contracts.**

## Next

- [DAO](/dao/) · [Walrus Storage](/walrus-storage/) · [Sealed Storage](/sealed-storage/) ·
  [Access Gate](/access-gate/)
