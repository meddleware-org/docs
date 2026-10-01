# Interface: PlatformConfigInfo

Defined in: types.ts:65

An `access_gate` package's shared `PlatformConfig`.

## Properties

### commissionBps

> **commissionBps**: `bigint`

Defined in: types.ts:69

Commission in basis points (≤ 1000).

***

### freeGateFeeMist

> **freeGateFeeMist**: `bigint`

Defined in: types.ts:73

One-off fee (MIST) to make a gate free.

***

### minCommissionMist

> **minCommissionMist**: `bigint`

Defined in: types.ts:71

Floor on a paid mint's commission (MIST).

***

### treasury

> **treasury**: `string`

Defined in: types.ts:67

Receives commissions and fees.
