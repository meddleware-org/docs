# Function: parseOwnedAccessNft()

> **parseOwnedAccessNft**(`entry`): [`OwnedAccessNft`](../interfaces/OwnedAccessNft.md)

Defined in: ownership.ts:54

Parse a single core-API object (a `listOwnedObjects` item or a `getObject`'s `{ object }`) into
an [OwnedAccessNft](../interfaces/OwnedAccessNft.md), or `null` if it is not an access NFT. Validates the object **type**
when present (typed), and reads the nested `data` fields deterministically.

## Parameters

### entry

`any`

## Returns

[`OwnedAccessNft`](../interfaces/OwnedAccessNft.md)
