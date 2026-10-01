# Function: fetchOwnedGates()

> **fetchOwnedGates**(`client`, `owner`, `packageId`): `Promise`\<[`OwnedGate`](../interfaces/OwnedGate.md)[]\>

Defined in: ownership.ts:271

Fetch every gate `owner` administers: list their owned `AdminCap`s, then fetch each referenced
`Gate` shared object and merge in the owning `adminCapId`. Gates whose object can no longer be
read (e.g. deleted) are skipped.

## Parameters

### client

[`OwnedObjectsClient`](../interfaces/OwnedObjectsClient.md) & [`SuiObjectClient`](../interfaces/SuiObjectClient.md)

### owner

`string`

### packageId

`string`

## Returns

`Promise`\<[`OwnedGate`](../interfaces/OwnedGate.md)[]\>

## Throws

if an underlying RPC call fails at the network or transport layer.
