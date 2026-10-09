# Treasury reference

Shapes and identifiers the Treasury console reads. These are **on-chain** objects and events from the
`access_gate` package; the console only displays them.

## Deployed identifiers (testnet)

| Thing | ID |
| --- | --- |
| `access_gate` package | `0xd7ddaa94b74330979b2b618fc81206d160a264f1c9ca148a77fa2144301388c9` |
| `PlatformConfig` object | `0x3f81489df58233d96798f34ad44de325e1b4df7e4d615affe72ca181969ee7b5` |

Mainnet identifiers are pending. The console takes these from the published
`@meddleware/access-gate-client` deployment record (never from its own configuration); the canonical
list is on the [on-chain reference](/blockchain/sui/onchain/access-gate/overview) pages.

## `PlatformConfig`

The shared object holding platform-wide settings.

```json
{
  "version": "1",                    // the only package version allowed to act (raised by `migrate`)
  "treasury": "0x…",                 // address that receives commission
  "commission_bps": "20",            // commission in basis points (20 = 0.20%)
  "min_commission_mist": "1000000",  // floor on a paid purchase's commission
  "free_gate_fee_mist": "100000000"  // one-off fee for a free (price 0) gate
}
```

A paid purchase's commission is `price × commission_bps / 10000`, raised to `min_commission_mist`
and never more than 10% of the price. The console shows the rate as `commission_bps / 100` percent;
the contract caps `commission_bps` at **1000 (10%)**.

## Treasury balance

The balance is the treasury address's total SUI: coin objects plus its address balance (the gRPC
`GetBalance` `balance` field, which is `coinBalance + addressBalance`).

## `Gate`

A shared object representing one access class. The console shows a subset of its fields:

```json
{
  "nft_name": "My Community Pass",
  "price_mist": "1000000000",   // price in MIST (1 SUI = 1e9 MIST)
  "paused": false,
  "frozen": false
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

**Why capability-based discovery?** Full nodes prune old events (including the one-time
`GateCreatedEvent`), so counting gates from events under-reports. Reading
`treasury → AdminCap objects → Gate` always reflects live state.

## Events

The Activity tab and the counters read these `access_gate` events:

| Event | Meaning | Address shown |
| --- | --- | --- |
| `AccessMintedEvent` | a pass was bought or airdropped | `recipient` |
| `AccessConsumedEvent` | a use of a pass was spent | `consumer` |

Events are decoded from their BCS bytes with the Move layouts, accepted only from the deployment's
package, and listed newest first. When the operator's read-indexer is configured the console reads
from it (display data only) and falls back to the full node.

::: tip Developer note
To read the same objects and events from code, use `@meddleware/access-gate-client` — see the
[Access Gate integration guide](https://dev.meddleware.co.uk/sui/access-gate/) on the developer site.
:::
<!-- white-label: link to white-label treasury operator guide when published -->
