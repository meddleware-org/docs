# Interface: OwnedObjectsClient

Defined in: types.ts:153

Minimal structural subset of a core Sui client used for owned-object listing (`SuiGrpcClient`).

## Properties

### core

> **core**: `object`

Defined in: types.ts:154

#### listOwnedObjects()

> **listOwnedObjects**(`options`): `Promise`\<\{ `cursor`: `string`; `hasNextPage`: `boolean`; `objects`: [`CoreObject`](CoreObject.md)[]; \}\>

##### Parameters

###### options

###### cursor?

`string`

###### include?

\{ `json?`: `boolean`; \}

###### include.json?

`boolean`

###### limit?

`number`

###### owner

`string`

###### type?

`string`

##### Returns

`Promise`\<\{ `cursor`: `string`; `hasNextPage`: `boolean`; `objects`: [`CoreObject`](CoreObject.md)[]; \}\>
