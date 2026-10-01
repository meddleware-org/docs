# Function: parsePlatformConfig()

> **parsePlatformConfig**(`res`): [`PlatformConfigInfo`](../interfaces/PlatformConfigInfo.md)

Defined in: ownership.ts:238

Parse a `PlatformConfig` object (gRPC `{ object }` or a bare core object); `null` if malformed.

## Parameters

### res

[`CoreObject`](../interfaces/CoreObject.md) \| \{ `object?`: [`CoreObject`](../interfaces/CoreObject.md); \}

## Returns

[`PlatformConfigInfo`](../interfaces/PlatformConfigInfo.md)
