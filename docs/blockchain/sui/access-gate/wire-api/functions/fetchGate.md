# Function: fetchGate()

> **fetchGate**(`client`, `gateId`): `Promise`\<`Omit`\<[`OwnedGate`](../interfaces/OwnedGate.md), `"adminCapId"`\>\>

Defined in: ownership.ts:229

Typed single-object read of one `Gate` by id, returning its parsed state (without `adminCapId`).
Returns `null` if the object is missing or not a `Gate`.

## Parameters

### client

[`SuiObjectClient`](../interfaces/SuiObjectClient.md)

### gateId

`string`

## Returns

`Promise`\<`Omit`\<[`OwnedGate`](../interfaces/OwnedGate.md), `"adminCapId"`\>\>

## Throws

if the RPC call fails at the network or transport layer.
