# Access Gate reference

The on-chain `access_gate` contract, its gateway, and the client SDK. The contract reference is
imported from the Move package ([below](#on-chain-contract)); the TypeScript SDK reference is
[auto-generated](#sdk-api).

## Deployed identifiers (testnet)

| Thing | ID |
| --- | --- |
| `access_gate` package | `0xa55789d77b8ae41e604c1c2e9ad9f7b034ca69b028ad0f1eee7d7cc8ad886d41` |
| `PlatformConfig` object | `0x53a325dc1ebd083c80fd5bed77e3e7cc989285283f188835793af3a7bd8504fa` |

Mainnet identifiers are pending.

## On-chain contract

The Move contract's objects, functions, events and abort codes are documented **with the Move
package itself** and imported into these sites at build time, so they always match the deployed
source:

- [On-chain overview](/blockchain/sui/onchain/access-gate/overview) — objects, pass flavours, money
  flow and trust boundaries.
- [Using passes and gates](/blockchain/sui/onchain/access-gate/user-guide) — what you can do, who can
  do it, and what to watch for.
- [On-chain API reference](https://dev.meddleware.co.uk/sui/onchain/access-gate/api-reference) (developer
  site) — every function, event and abort code.

::: warning Event pruning
Sui testnet prunes old events after ~3 months. Systems that need a reliable gate list should read
**`AdminCap` ownership → `Gate`** rather than replaying `GateCreatedEvent` (this is what the
[Treasury console](/blockchain/sui/treasury/) does).
:::

## Gateway (nft-gate)

Any HTTP service can be placed **behind** a gate using the nft-gate reverse proxy. It verifies a
signed proof and on-chain pass ownership, failing **closed** on any ambiguity.

- **Personal message signed by the wallet:** `nft-gate:access:<nonce>`
- **Proof token** (`Authorization: Bearer …` or `X-Access-Proof`): base64 of

```json
{ "address": "0x…", "nonce": "…", "signature": "…", "consumeDigest": "…" }
```

The gateway consumes the nonce immediately (single-use replay protection) and, for single-use passes,
verifies the on-chain consumption by digest. Two wire-identical implementations exist (Cloudflare
Workers and Rust); running one is covered in the forthcoming developer documentation.

## SDK API

Two SDKs, each with a generated reference:

- [Access-gate client API](./api/) — `@meddleware/access-gate-client`: transaction builders
  (`create_gate`, `purchase`, `consume`, airdrop, admin setters), ownership and gate reads, typed
  events, abort messages, and the deployed ids per network.
- [Gateway wire-protocol API](./wire-api/) — `@meddleware/nft-gate-client`: the challenge and
  access-proof helpers a gateway verifies.

::: tip Deploying the gateway or integrating the SDK?
See the [Access Gate integration guide](https://dev.meddleware.co.uk/sui/access-gate/) on the developer site — SDK setup, purchase/verify flow, challenge/proof protocol, and Rust/Worker gateway deployment.
:::
<!-- white-label: link to white-label gateway operator guide when published -->
