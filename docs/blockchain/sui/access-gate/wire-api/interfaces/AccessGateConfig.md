# Interface: AccessGateConfig

Defined in: types.ts:9

Identifies a deployed gate and the NFT type that satisfies it.

## Properties

### gateId

> **gateId**: `string`

Defined in: types.ts:13

The shared `Gate` object ID.

***

### nftType

> **nftType**: `string`

Defined in: types.ts:21

Fully-qualified NFT type string to filter ownership by, e.g.
`<pkg>::access_gate::AccessNFT` or `<pkg>::access_gate::SoulboundAccessNFT`.
Choose the variant matching the gate's `soulbound` flag.

***

### packageId

> **packageId**: `string`

Defined in: types.ts:11

Published `access_gate` package ID.

***

### platformConfigId

> **platformConfigId**: `string`

Defined in: types.ts:15

The shared `PlatformConfig` object ID. Required for `buildPurchaseTx`.

***

### soulbound?

> `optional` **soulbound?**: `boolean`

Defined in: types.ts:23

Whether this gate mints soulbound NFTs (selects `consume` vs `consume_soulbound`).
