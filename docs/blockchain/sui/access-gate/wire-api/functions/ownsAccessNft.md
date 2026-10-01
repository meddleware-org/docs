# Function: ownsAccessNft()

> **ownsAccessNft**(`client`, `owner`, `nftType`, `gateId?`): `Promise`\<`boolean`\>

Defined in: ownership.ts:116

True if `owner` holds at least one access NFT of `nftType` (optionally for `gateId`).
This is the cheap check a frontend runs to decide whether to show a gated option, and a
gateway runs (server-side) as part of access verification.

## Parameters

### client

[`OwnedObjectsClient`](../interfaces/OwnedObjectsClient.md)

### owner

`string`

### nftType

`string`

### gateId?

`string`

## Returns

`Promise`\<`boolean`\>

## Throws

if the underlying RPC call fails.
