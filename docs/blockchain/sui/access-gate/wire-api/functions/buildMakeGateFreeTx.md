# Function: buildMakeGateFreeTx()

> **buildMakeGateFreeTx**(`ctx`, `feeMist`): `Transaction`

Defined in: ptb.ts:156

Make the gate free (price 0), paying `feeMist` from gas — the platform's `free_gate_fee_mist`, or
0 if this gate already paid it (`OwnedGate.freeFeePaid`). Any excess is refunded on-chain.

## Parameters

### ctx

[`GateAdminContext`](../interfaces/GateAdminContext.md)

### feeMist

`number` \| `bigint`

## Returns

`Transaction`
