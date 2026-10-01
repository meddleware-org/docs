# Function: buildMakeGateImmutableTx()

> **buildMakeGateImmutableTx**(`ctx`): `Transaction`

Defined in: ptb.ts:240

Make the gate immutable — **irreversible**. Consumes the `AdminCap` (passed by value) and sets
`Gate.frozen = true`, permanently ending all setters and `airdrop`. `purchase`/`consume` remain
permissionless. Grant everything first, then freeze.

Reads the shared `PlatformConfig` (the commission snapshot for gates whose policy has
`lockCommissionOnFreeze`). Aborts `E_FREEZE_WHILE_PAUSED` (10) if the gate is paused and its
policy has `freezeRequiresUnpaused`.

## Parameters

### ctx

[`GateAdminContext`](../interfaces/GateAdminContext.md)

## Returns

`Transaction`
