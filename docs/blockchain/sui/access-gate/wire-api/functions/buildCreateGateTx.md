# Function: buildCreateGateTx()

> **buildCreateGateTx**(`packageId`, `platformConfigId`, `opts`): `Transaction`

Defined in: ptb.ts:65

Build a PTB that creates a new gate with an immutable `policy` (default: unrestricted).

- `priceMist > 0` calls `create_gate`; the price must be at least the platform's
  `minimumPaidPriceMist` or the call aborts (`E_PRICE_TOO_LOW`, 11).
- `priceMist == 0` calls `create_free_gate`, paying `freeGateFeeMist` (the platform's current
  `free_gate_fee_mist`, from `fetchPlatformConfig`) out of gas; an excess is refunded on-chain.

## Parameters

### packageId

`string`

### platformConfigId

`string`

### opts

#### autoBurnAtZero

`boolean`

#### defaultUses

`number` \| `bigint`

#### freeGateFeeMist?

`number` \| `bigint`

Required when `priceMist` is 0: the free-gate fee to pay.

#### nftDescription

`string`

#### nftImageUrl

`string`

#### nftName

`string`

#### paymentRecipient

`string`

#### policy?

[`GatePolicy`](../interfaces/GatePolicy.md)

Immutable restrictions for this gate; omit for the unrestricted default.

#### priceMist

`number` \| `bigint`

#### soulbound

`boolean`

## Returns

`Transaction`
