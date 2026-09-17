# DAO

The **DAO console** is a read-only window onto the Meddleware platform's on-chain state. Open it at
[sui-dao.meddleware.co.uk](https://sui-dao.meddleware.co.uk) (it's also the default view in the
[tools hub](https://sui.meddleware.co.uk)).

## What it is

A dashboard that reads directly from Sui and shows:

- the platform **treasury** balance and address,
- the **commission rate** charged on Access Gate purchases,
- the **community gates** the treasury controls,
- a live feed of **gate activity** (passes sold, used, burned).

You do **not** need to connect a wallet to browse it — everything shown is public on-chain data.

## When to use it

- You want to **verify** the platform's commission rate or treasury address.
- You want to see **how many gates** exist and their prices.
- You're tracking **activity** — how many passes have been sold or used.
- You hold a platform admin capability and want to confirm the tool **detects** it (see
  [Governance](#governance)).

If you want to *create* a gate, that's the [Access Gate](/blockchain/sui/access-gate/) tool, not this one.

## The tabs

### Overview

At-a-glance: treasury balance, commission rate, counters for active gates and accesses
minted/consumed, and a recent-activity feed.

### Treasury

The commission rate (shown both as a percentage and in **basis points**), the treasury's live SUI
balance, and its address, plus a table of **Community Gates** the treasury controls — each with its
name, price, and object ID (linked to a Sui explorer).

### Proposals

Reserved for on-chain governance proposals. This is a **placeholder** today — the governance module
isn't deployed yet, so the tab shows an empty state. It will list fundraising/governance proposals
when that module ships.

### Governance

Shows the platform parameters (commission rate, the **10% / 1000 bps hard cap** enforced on-chain,
treasury address) and an **Admin Actions** panel. If you connect a wallet that holds a
`PlatformAdminCap`, the console detects it; admin controls will appear here as they're implemented.
Wallets without the capability simply see that privileged actions aren't available.

### History

A paginated log of on-chain gate events — **Access Sold**, **Access Used**, **Access Burned** — each
with the associated address and transaction, linked to a Sui explorer.

## How "active gates" is counted

The console finds gates by looking up the **admin capabilities** the treasury owns, then resolving the
gate each one controls — rather than replaying historical events. This matters because Sui testnet
**prunes** old events after a few months, which would otherwise make a naive event-based count read
as zero. The capability-based approach always reflects live reality. (The technical details are in
[Reference](/blockchain/sui/dao/reference).)

## Commission, in one line

When someone buys an Access Gate pass, a share of the price — `commission_bps / 10000` — goes to the
treasury and the rest to the gate's operator. The rate is read live from on-chain config and is
capped at 10%.
