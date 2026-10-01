# Function: fetchAccessNfts()

> **fetchAccessNfts**(`client`, `owner`, `nftType`, `gateId?`): `Promise`\<[`OwnedAccessNft`](../interfaces/OwnedAccessNft.md)[]\>

Defined in: ownership.ts:92

Fetch all access NFTs of `nftType` owned by `owner`, optionally restricted to a specific
`gateId`. Uses `getOwnedObjects` filtered by `StructType` (the standard owned-objects query).

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

`Promise`\<[`OwnedAccessNft`](../interfaces/OwnedAccessNft.md)[]\>

## Throws

if the RPC call fails at the network or transport layer.
