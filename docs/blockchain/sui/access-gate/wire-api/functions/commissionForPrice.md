# Function: commissionForPrice()

> **commissionForPrice**(`priceMist`, `terms`): `bigint`

Defined in: ptb.ts:267

Commission (MIST) on `priceMist` under `terms`, exactly as the contract computes it:
`max(price × bps / 10000, minMist)` (percentage rounded down), never more than 10% of the price;
0 for a price of 0.

## Parameters

### priceMist

`number` \| `bigint`

### terms

[`CommissionTerms`](../interfaces/CommissionTerms.md)

## Returns

`bigint`
