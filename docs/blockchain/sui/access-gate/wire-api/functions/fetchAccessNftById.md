# Function: fetchAccessNftById()

> **fetchAccessNftById**(`client`, `objectId`): `Promise`\<[`OwnedAccessNft`](../interfaces/OwnedAccessNft.md)\>

Defined in: ownership.ts:78

Typed single-object read of one access NFT by id (`getObject` with `showType`+`showContent`),
used when a UI needs the **exact** `usesRemaining` reliably rather than the best-effort parse
of an owned-objects page. Returns `null` if the object is missing or not an access NFT.

## Parameters

### client

[`SuiObjectClient`](../interfaces/SuiObjectClient.md)

### objectId

`string`

## Returns

`Promise`\<[`OwnedAccessNft`](../interfaces/OwnedAccessNft.md)\>

## Throws

if the RPC call fails at the network or transport layer.
