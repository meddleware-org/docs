# Interface: OwnedGate

Defined in: types.ts:77

A gate an operator administers, parsed from its on-chain `Gate` object + owning `AdminCap`.

## Properties

### adminCapId

> **adminCapId**: `string`

Defined in: types.ts:81

The `AdminCap` object ID that authorises administering this gate.

***

### autoBurnAtZero

> **autoBurnAtZero**: `boolean`

Defined in: types.ts:91

Whether a single-use NFT is deleted (vs. kept as a receipt) at zero uses.

***

### defaultUses

> **defaultUses**: `bigint`

Defined in: types.ts:87

0 ⇒ unlimited passes; N ⇒ single-use NFTs with N uses.

***

### freeFeePaid

> **freeFeePaid**: `boolean`

Defined in: types.ts:107

True once the free-gate fee has been paid (the price may then be 0).

***

### frozen

> **frozen**: `boolean`

Defined in: types.ts:95

Whether the gate has been made immutable (all admin/airdrop permanently disabled).

***

### gateId

> **gateId**: `string`

Defined in: types.ts:79

The shared `Gate` object ID.

***

### lockedCommission

> **lockedCommission**: [`CommissionTerms`](CommissionTerms.md)

Defined in: types.ts:105

Commission terms snapshotted at freeze (when `policy.lockCommissionOnFreeze`), else `null`.

***

### nftDescription

> **nftDescription**: `string`

Defined in: types.ts:101

Default NFT description minted into future NFTs.

***

### nftImageUrl

> **nftImageUrl**: `string`

Defined in: types.ts:99

Default NFT image URL minted into future NFTs.

***

### nftName

> **nftName**: `string`

Defined in: types.ts:97

Default NFT display name minted into future NFTs.

***

### paused

> **paused**: `boolean`

Defined in: types.ts:93

Whether `purchase` is currently disabled.

***

### paymentRecipient

> **paymentRecipient**: `string`

Defined in: types.ts:85

Address that receives the operator share of each paid `purchase`.

***

### policy

> **policy**: [`GatePolicy`](GatePolicy.md)

Defined in: types.ts:103

Immutable restrictions (all `false` for gates of package versions that predate policies).

***

### priceMist

> **priceMist**: `bigint`

Defined in: types.ts:83

Price in MIST charged by `purchase` (0 = free).

***

### soulbound

> **soulbound**: `boolean`

Defined in: types.ts:89

Whether newly-minted NFTs are soulbound.
