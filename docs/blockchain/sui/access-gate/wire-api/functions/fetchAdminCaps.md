# Function: fetchAdminCaps()

> **fetchAdminCaps**(`client`, `owner`, `packageId`): `Promise`\<`object`[]\>

Defined in: ownership.ts:208

List the `{ adminCapId, gateId }` pairs for every `access_gate::AdminCap` owned by `owner`
under `packageId`. Uses `getOwnedObjects` filtered by `StructType` (the standard query).

## Parameters

### client

[`OwnedObjectsClient`](../interfaces/OwnedObjectsClient.md)

### owner

`string`

### packageId

`string`

## Returns

`Promise`\<`object`[]\>

## Throws

if the underlying RPC call fails.
