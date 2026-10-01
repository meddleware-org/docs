# Function: minimumPaidPriceMist()

> **minimumPaidPriceMist**(`minCommissionMist`): `bigint`

Defined in: ptb.ts:280

The lowest price a paid gate may have (`min_paid_price_mist` on-chain): 10 × the minimum
commission, so the floor never exceeds the 10% cap; at least 1 MIST.

## Parameters

### minCommissionMist

`number` \| `bigint`

## Returns

`bigint`
