# Interface: SuiObjectClient

Defined in: types.ts:166

Minimal structural subset of a core Sui client used for a typed single-object read.

## Properties

### core

> **core**: `object`

Defined in: types.ts:167

#### getObject()

> **getObject**(`options`): `Promise`\<\{ `object`: [`CoreObject`](CoreObject.md); \}\>

##### Parameters

###### options

###### include?

\{ `json?`: `boolean`; \}

###### include.json?

`boolean`

###### objectId

`string`

##### Returns

`Promise`\<\{ `object`: [`CoreObject`](CoreObject.md); \}\>
