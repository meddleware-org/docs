# Function: parseGate()

> **parseGate**(`entry`): `Omit`\<[`OwnedGate`](../interfaces/OwnedGate.md), `"adminCapId"`\>

Defined in: ownership.ts:155

Parse a `getObject` entry for a `Gate` shared object into an [OwnedGate](../interfaces/OwnedGate.md) (minus
`adminCapId`, which comes from the owning cap). Returns `null` if the object is missing its
expected `Gate` fields.

## Parameters

### entry

`any`

## Returns

`Omit`\<[`OwnedGate`](../interfaces/OwnedGate.md), `"adminCapId"`\>
