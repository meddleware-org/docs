# Walrus Storage

Upload files to [Walrus](https://walrus.xyz) — decentralised "blob" storage on Sui — and manage how
long they live. Open the app at [sui-walrus.meddleware.co.uk](https://sui-walrus.meddleware.co.uk).

## What it is

Walrus stores arbitrary files (called **blobs**) across a decentralised network, with the metadata and
lifetime tracked on Sui. The Meddleware Walrus Storage app is a thin front-end for it: connect a
wallet, upload a file, get back a **blob ID**, and later list and extend the blobs you own.

## When to use it

- You need **durable, decentralised** file storage addressable by a stable ID.
- You're storing content for an app, NFT media, datasets, or documents.
- You want to store **encrypted** content — pair it with [Sealed Storage](/blockchain/sui/sealed-storage/), which
  uses Walrus underneath.

When **not** to: Walrus is not a permanent free drive. Storage is paid and **time-bounded** (see
below), and blobs are public unless you encrypt them first.

## The one thing to understand: blobs expire

::: warning Walrus storage is time-bounded
A blob is stored for a number of **epochs** (Walrus's unit of time), not forever. When the paid
period ends, the blob can be deleted by the network. If you need to keep something, **extend its
lifetime before it expires** — the app's *My Blobs* view lets you do this.
:::

Roughly: more epochs = longer storage = higher up-front cost. The app shows you the cost before you
confirm, and long-term durations are supported for content you intend to keep.

## Public vs gated uploads (relays)

Browser uploads go through an **upload relay**. Two modes:

- **Public relay** — the default fallback (Mysten's public relay). Works for anyone.
- **Gated relay** — Meddleware's relay, gated by an [Access Gate](/blockchain/sui/access-gate/) NFT. You prove you
  hold a valid pass and the relay accepts your upload. A small **tip** covers the relay's costs, and
  the app caps the tip so you never overpay.

If you don't hold a pass, uploads simply use the public relay. Either way, the blob ends up on the
same Walrus network.

## What you get back

After an upload completes you receive a **blob ID** — the stable handle you use to read the content
back (via a Walrus aggregator) or to reference it elsewhere. See [Reference](/blockchain/sui/walrus-storage/reference)
for the exact shapes.

## Next

- **[Walkthrough](/blockchain/sui/walrus-storage/walkthrough)** — upload, view, and extend blobs step by step.
- **[Reference](/blockchain/sui/walrus-storage/reference)** — blob/relay shapes and the SDK API.
