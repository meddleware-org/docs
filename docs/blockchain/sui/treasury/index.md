# Treasury

The **Treasury** console is a read-only view of the Meddleware platform's on-chain revenue. Open it
at [treasury.meddleware.co.uk](https://treasury.meddleware.co.uk) or from the
[dashboard](https://dash.meddleware.co.uk).

## What it is

A console that reads directly from Sui and shows:

- the platform **treasury** address and its SUI balance,
- the **commission rate** charged on Access Gate purchases,
- the **gates** the treasury administers (its revenue sources),
- a live feed of **pass activity** (passes sold and used).

You do **not** need to connect a wallet — everything shown is public on-chain data.

## When to use it

- You want to **verify** the platform's commission rate or treasury address.
- You want to see which gates the platform runs and their prices.
- You're tracking **activity** — passes sold and used.

To *create* or manage a gate, use the [Access Gate](/blockchain/sui/access-gate/) tool.

## The tabs

### Overview

At a glance: the treasury balance, commission rate and address, counters for active gates and
passes minted and consumed, and the most recent activity.

### Accounts

The Sui treasury account — commission rate (as a percentage and in **basis points**), current
balance and address — and a **Revenue Sources** table of the gates the treasury administers, each
with its name, price and object ID (linked to a Sui explorer). The treasury is presented as one
account among potentially many, so other revenue streams can be added later.

### Activity

Recent **Access Sold** and **Access Used** events, newest first, each with the buyer or holder, the
checkpoint and the transaction, linked to a Sui explorer.

## What the balance includes

The balance is everything the treasury address holds in SUI: coin objects **and** its address
balance. Commission arrives as coins; SUI sent with `send_funds` lands in the address balance, and
both count.

## How "active gates" is counted

The console finds gates by looking up the **admin capabilities** the treasury owns, then resolving the
gate each one controls — rather than replaying historical events. Sui full nodes **prune** old events,
which would make an event-based count under-report; the capability-based approach always reflects
live state. (Details in [Reference](/blockchain/sui/treasury/reference).)

## Commission, in one line

When someone buys an Access Gate pass, a share of the price — `commission_bps / 10000`, with a
platform minimum — goes to the treasury and the rest to the gate's operator. The rate is read live
from on-chain config and is capped at 10%.
