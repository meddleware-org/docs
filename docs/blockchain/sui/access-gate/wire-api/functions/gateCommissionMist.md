# Function: gateCommissionMist()

> **gateCommissionMist**(`gate`, `platform`): `bigint`

Defined in: ptb.ts:289

Commission a mint (purchase or airdrop) of `gate` pays now: under its freeze-time snapshot if it
locked one, otherwise under the live platform terms.

## Parameters

### gate

`Pick`\<[`OwnedGate`](../interfaces/OwnedGate.md), `"priceMist"` \| `"lockedCommission"`\>

### platform

[`PlatformConfigInfo`](../interfaces/PlatformConfigInfo.md)

## Returns

`bigint`
