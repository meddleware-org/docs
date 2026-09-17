# Walrus Storage — reference

Shapes and identifiers behind the Walrus Storage app. Conceptual here; the **exhaustive, always-current
API** is auto-generated from the `@meddleware/walrus-client` SDK — see [SDK API](#sdk-api).

## Blob lifetime

Walrus measures storage in **epochs**. The client exposes protocol-bounded constants (e.g. a
long-term default and a maximum single reservation) that reflect Walrus's `max_epochs_ahead`. You
choose a duration at upload time and can extend later; extension must happen **before** expiry.

## Upload result

An upload returns a stable **blob ID** plus registration details. Conceptually:

```ts
interface UploadResult {
  blobId: string          // stable handle used to read the blob back
  // …registration/certification details (see generated SDK API for exact fields)
}
```

## Owned blob

*My Blobs* lists the blobs your address owns:

```ts
interface OwnedBlob {
  blobId: string
  // …end epoch / size / object id (see generated SDK API for exact fields)
}
```

## Storage cost estimate

Before confirming, the app estimates cost from the chosen duration:

```ts
interface StorageCost {
  // …storage + write cost in MIST (see generated SDK API for exact fields)
}
```

## Gated relay: access-proof wire format

When uploading through the **gated** relay, the client proves NFT ownership with a signed proof. The
wire format is shared with the [Access Gate](/blockchain/sui/access-gate/) gateway:

- **Personal message signed by the wallet:** `nft-gate:access:<nonce>`
- **Proof token** (sent as `Authorization: Bearer …`): base64 of

```json
{ "address": "0x…", "nonce": "…", "signature": "…", "consumeDigest": "…" }
```

The relay verifies the signature and on-chain pass ownership, then accepts the upload. See the
[Access Gate reference](/blockchain/sui/access-gate/reference) for the full protocol.

## SDK API

The full `@meddleware/walrus-client` API — client factory, upload flows, lifetime management, owned-blob
queries, and relay access helpers — is generated here:

- [Walrus client API](./api/)

::: tip Using the SDK in your own app?
This reference lists the shapes; the **how-to** for integrating the SDK (and self-hosting a relay) is
covered in the forthcoming developer documentation.
:::
