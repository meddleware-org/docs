# Interface: GateAdminContext

Defined in: types.ts:31

Identifies a gate an operator administers, for the AdminCap-gated management PTB builders
(setters, airdrop, freeze). The three ids together authorise a call: `adminCapId` must be the
`AdminCap` whose `gate_id` matches `gateId`, under the published `packageId`.

## Properties

### adminCapId

> **adminCapId**: `string`

Defined in: types.ts:37

The `AdminCap` object ID authorised over `gateId` (held by the operator).

***

### gateId

> **gateId**: `string`

Defined in: types.ts:35

The shared `Gate` object ID being administered.

***

### packageId

> **packageId**: `string`

Defined in: types.ts:33

Published `access_gate` package ID.

***

### platformConfigId

> **platformConfigId**: `string`

Defined in: types.ts:39

The package's shared `PlatformConfig` (read by set-price, airdrop, make-free and freeze).
