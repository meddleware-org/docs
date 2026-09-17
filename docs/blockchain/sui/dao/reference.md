# DAO — reference

Shapes and identifiers the DAO console reads. These are **on-chain** objects and events from the
`access_gate` package; the console only displays them.

## Deployed identifiers (testnet)

| Thing | ID |
| --- | --- |
| `access_gate` package | `0x0bedd0b27d993d3292ca6a5315f7562de8bc0ff3752b445b4c53252c76f2d20d` |
| `PlatformConfig` object | `0x7c5aed0ce7f29a4dfb60657858df31c12410a67098b4bcdd1d8cb1e531be4884` |

Mainnet identifiers are pending. The console reads these from its build-time configuration; on a
Sui explorer you can inspect them directly.

## `PlatformConfig`

The shared object holding platform-wide settings.

```json
{
  "treasury": "0x…",        // address that receives commission
  "commission_bps": 20       // commission in basis points (20 = 0.20%)
}
```

The console derives the commission percentage as `commission_bps / 100` and enforces awareness of the
on-chain hard cap of **1000 bps (10%)**.

## `Gate`

A shared object representing one access class. The console surfaces a subset of its fields:

```json
{
  "nft_name": "My Community Pass",
  "price_mist": "1000000000",   // price in MIST (1 SUI = 1e9 MIST)
  "paused": false,
  "frozen": false,
  "admin_cap_id": "0x…"          // the AdminCap authorised to manage this gate
}
```

## `AdminCap`

The owned capability that authorises managing a gate. Gate discovery walks the treasury's `AdminCap`
objects and resolves each gate:

```json
{
  "gate_id": "0x…"   // the Gate this cap administers
}
```

**Why capability-based discovery?** Sui testnet fullnodes prune old events (including the one-time
`GateCreatedEvent`) after ~3 months, so counting gates from events under-reports. Reading
`treasury → AdminCap objects → Gate` always reflects live on-chain reality.

## Events

The History tab and activity counters read these event types (emitted by `access_gate`):

| Event | Meaning | Key fields |
| --- | --- | --- |
| `AccessMintedEvent` | A pass was purchased/minted | recipient, gate |
| `AccessConsumedEvent` | A single-use pass was spent | `nonce`, address |
| `AccessBurnedEvent` | A pass was burned | id |

Example (as decoded JSON):

```json
{
  "type": "AccessConsumedEvent",
  "recipient": "0x…",
  "nonce": "…",
  "txDigest": "…",
  "checkpoint": "12345678"
}
```

The console queries each event type independently and merges them, sorted by checkpoint
(newest first), tolerating any single type being pruned or unavailable.

## Roadmap: `vault_dao`

The **Proposals** and **Governance actions** are placeholders pending an on-chain `vault_dao` module.
When it ships, proposals will be read from its registry; the console's display shapes are already
stable so wiring it in won't change the UI.

::: tip Developer note
Full SDK/contract API reference (entry functions, exhaustive event schemas) is covered in the
forthcoming developer documentation. The [Access Gate reference](/blockchain/sui/access-gate/reference) already
lists the gate contract's entry points and events, which is the on-chain source these DAO views read.
:::
