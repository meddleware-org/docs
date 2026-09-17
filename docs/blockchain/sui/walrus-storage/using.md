# Walrus Storage — using it

A walkthrough of the [Walrus Storage app](https://sui-walrus.meddleware.co.uk). You'll need a
[Sui wallet with a little SUI](/blockchain/sui/getting-started).

## Upload a blob

1. **Connect** your wallet (header).
2. Go to the **Upload** tab and **choose a file**.
3. Pick a **storage duration** (in epochs). The app estimates the cost — longer durations cost more
   up front.
4. If you hold an [Access Gate](/blockchain/sui/access-gate/) pass for the gated relay, the app detects it and uses
   the gated relay (a capped **tip** applies); otherwise it uses the public relay.
5. **Confirm** the transaction(s) in your wallet. Uploading registers the blob on Sui and stores the
   bytes on Walrus.
6. When it finishes you get a **blob ID** — copy it. That's how you (or anyone) reads the content back.

::: tip Interrupted upload?
The gated flow is designed so an interrupted or retried upload **doesn't waste** a single-use pass —
the app remembers the in-progress redemption and resumes it rather than consuming another use.
:::

## View your blobs

Open **My Blobs**. The app lists the Walrus blobs your address owns, with their IDs and remaining
lifetime. This reads on-chain ownership directly — no extra login.

## Extend a blob's lifetime

Because blobs expire, *My Blobs* lets you **extend** one before it lapses:

1. Find the blob in **My Blobs**.
2. Choose **Extend** and pick how many additional epochs.
3. Confirm the transaction. The blob's stored-until point moves out accordingly.

Do this **before** expiry — once a blob has lapsed and been removed, it can't be extended, only
re-uploaded.

## Read a blob back

A blob ID resolves through a Walrus **aggregator** over plain HTTP. Anyone with the ID can fetch the
bytes (blobs are public unless you encrypted them first with [Sealed Storage](/blockchain/sui/sealed-storage/)).

## Common questions

**Is my file private?** No — Walrus blobs are public. If you need privacy, use
[Sealed Storage](/blockchain/sui/sealed-storage/), which encrypts before storing.

**Why did I sign more than once?** Registering and storing can involve more than one step; the app
guides you through each wallet prompt.

**What does the tip do?** On the gated relay, the tip covers the relay's operating cost. The app
requests the minimum and caps it so you can't overpay.
