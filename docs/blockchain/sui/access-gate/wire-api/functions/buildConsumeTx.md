# Function: buildConsumeTx()

> **buildConsumeTx**(`cfg`, `nftId`, `nonce`): `Transaction`

Defined in: ptb.ts:42

Build a PTB that consumes one use of a single-use NFT, binding it to `nonce`. Selects
`consume` or `consume_soulbound` from `cfg.soulbound`. For unlimited passes there is
nothing to consume — do not call this.

## Parameters

### cfg

[`AccessGateConfig`](../interfaces/AccessGateConfig.md)

### nftId

`string`

### nonce

`string`

## Returns

`Transaction`
