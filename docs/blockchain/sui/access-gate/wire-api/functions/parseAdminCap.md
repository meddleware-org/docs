# Function: parseAdminCap()

> **parseAdminCap**(`entry`): `object`

Defined in: ownership.ts:139

Parse a single `getOwnedObjects`/`getObject` entry into `{ adminCapId, gateId }`, or `null` if
it is not an `AdminCap`. Validates the object **type** when present and reads `fields.gate_id`.

## Parameters

### entry

`any`

## Returns

`object`

### adminCapId

> **adminCapId**: `string`

### gateId

> **gateId**: `string`
