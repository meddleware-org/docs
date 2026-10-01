# Interface: GatePolicy

Defined in: types.ts:47

Operator-selectable restrictions stored immutably on a gate at creation (`GatePolicy` on-chain).
Every flag is `false` by default (the unrestricted behaviour). A tool's operator chooses which to
apply to the gates it creates; buyers can read them from the gate.

## Properties

### freezeRequiresUnpaused

> **freezeRequiresUnpaused**: `boolean`

Defined in: types.ts:49

`make_gate_immutable` aborts while the gate is paused (no permanently unsellable frozen gates).

***

### lockCommissionOnFreeze

> **lockCommissionOnFreeze**: `boolean`

Defined in: types.ts:51

Freezing snapshots the platform commission; frozen purchases use the snapshot.

***

### pauseBlocksAccess

> **pauseBlocksAccess**: `boolean`

Defined in: types.ts:55

While paused, `consume` aborts and access gateways deny holders.

***

### pauseBlocksDecryption

> **pauseBlocksDecryption**: `boolean`

Defined in: types.ts:53

Dependent decryption policies (Seal `nft_gate`) deny access while the gate is paused.
