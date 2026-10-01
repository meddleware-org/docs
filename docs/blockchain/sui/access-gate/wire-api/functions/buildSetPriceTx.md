# Function: buildSetPriceTx()

> **buildSetPriceTx**(`ctx`, `priceMist`): `Transaction`

Defined in: ptb.ts:148

Set the gate price (in MIST) for future purchases. A paid price must be at least the platform's
minimum (`E_PRICE_TOO_LOW`, 11); 0 only once the free-gate fee is paid (`E_FREE_FEE_UNPAID`, 12 —
use `buildMakeGateFreeTx`).

## Parameters

### ctx

[`GateAdminContext`](../interfaces/GateAdminContext.md)

### priceMist

`number` \| `bigint`

## Returns

`Transaction`
