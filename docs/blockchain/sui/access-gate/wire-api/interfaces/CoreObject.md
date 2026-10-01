# Interface: CoreObject

Defined in: types.ts:146

A single owned/read object as returned by the unified core API (`SuiGrpcClient`): the id and
Move struct type are top-level; the struct fields come back under `json` (opt-in). Kept as a
structural subset so any client exposing the core API satisfies it without importing the SDK.

## Properties

### json?

> `optional` **json?**: `Record`\<`string`, `unknown`\>

Defined in: types.ts:149

***

### objectId

> **objectId**: `string`

Defined in: types.ts:147

***

### type?

> `optional` **type?**: `string`

Defined in: types.ts:148
