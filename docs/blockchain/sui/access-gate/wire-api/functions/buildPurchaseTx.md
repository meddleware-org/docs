# Function: buildPurchaseTx()

> **buildPurchaseTx**(`cfg`, `priceMist`): `Transaction`

Defined in: ptb.ts:27

Build a PTB that purchases access: split `priceMist` from the gas coin and call
`access_gate::purchase(gate, payment)`. Overpayment is refunded on-chain, so the split
must be exactly the price. The caller signs + executes with their wallet.

## Parameters

### cfg

[`AccessGateConfig`](../interfaces/AccessGateConfig.md)

### priceMist

`number` \| `bigint`

## Returns

`Transaction`
