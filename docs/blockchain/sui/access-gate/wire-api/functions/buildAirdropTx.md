# Function: buildAirdropTx()

> **buildAirdropTx**(`ctx`, `recipient`, `commissionMist`): `Transaction`

Defined in: ptb.ts:211

AdminCap-gated grant (airdrop) of the gate's NFT flavour to `recipient`. The admin pays the
platform the commission a purchase would carry (`gateCommissionMist`; 0 for a free gate), split
from gas as `commissionMist`; any excess is refunded on-chain.

## Parameters

### ctx

[`GateAdminContext`](../interfaces/GateAdminContext.md)

### recipient

`string`

### commissionMist

`number` \| `bigint`

## Returns

`Transaction`
