# Function: fetchPlatformConfig()

> **fetchPlatformConfig**(`client`, `platformConfigId`): `Promise`\<[`PlatformConfigInfo`](../interfaces/PlatformConfigInfo.md)\>

Defined in: ownership.ts:257

Read a package's shared `PlatformConfig` (treasury, commission terms, free-gate fee).

## Parameters

### client

[`SuiObjectClient`](../interfaces/SuiObjectClient.md)

### platformConfigId

`string`

## Returns

`Promise`\<[`PlatformConfigInfo`](../interfaces/PlatformConfigInfo.md)\>

## Throws

if the RPC call fails at the network or transport layer.
