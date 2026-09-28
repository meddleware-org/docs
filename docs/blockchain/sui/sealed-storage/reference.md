# Sealed Storage reference

Shapes and identifiers behind Sealed Storage. The **exhaustive, always-current API** is auto-generated
from the `@meddleware/seal-client` SDK — see [SDK API](#sdk-api).

## Deployed identifiers (testnet)

| Thing | ID |
| --- | --- |
| `seal_policies` package | `0x42cc181f851ef702c1fddc9b925553f03b71784edff49d80fbc260055f86d612` |

Mainnet is pending; the app is enabled by configuration once the package and key-server committee are
available.

## The manifest

The portable pointer produced when you seal a file. It contains **no secrets**:

```json
{
  "policyType": "nft-gate",     // which policy sealed this content
  "id": "…",                     // Seal identity (hex) — required to decrypt; cannot be recomputed
  "blobId": "…",                 // Walrus blob id of the ciphertext
  "network": "testnet",
  "params": { "gateId": "0x…" }, // non-secret policy params (e.g. which gate)
  "label": "optional human label"
}
```

Keep the manifest safe — its `id` (the encryption identity) is needed to locate and decrypt the
ciphertext.

## Policies on-chain

Each policy encodes its access condition into the encryption **identity** and is checked on-chain by
the `seal_policies` Move package. The policies, identity layouts and the content-pointer registry are
documented **with the Move package** and imported here at build time:

- [On-chain overview](/blockchain/sui/onchain/sealed-storage/overview) — modules, identity layouts and
  key properties.
- [What the policies allow](/blockchain/sui/onchain/sealed-storage/user-guide) — who can decrypt, when,
  and the limits.
- [On-chain API reference](https://dev.meddleware.co.uk/sui/onchain/sealed-storage/api-reference)
  (developer site).

## Threshold committee

Decryption uses a **t-of-n** committee of key servers (e.g. 2 of 3). Encryption targets all
configured servers; decryption needs a threshold of them to release shares. A short-lived **session
key** (signed once per session) authorises the release.

## Discoverable content pointer (optional)

Apps can publish a public pointer so pass-holders can discover gate-unlockable content. **Anyone can
publish a pointer under any gate with any label** — it grants nothing on its own and must not be
trusted as proof of who made the content. Its exact shape is in the
[on-chain overview](/blockchain/sui/onchain/sealed-storage/overview).

## SDK API

The full `@meddleware/seal-client` API — the `SealController`, the policy registry, both built-in
providers, and the manifest/byte helpers — is generated here:

- [Seal client API](./api/)

::: tip Writing your own policy or integrating the SDK?
See the [Sealed Storage integration guide](https://dev.meddleware.co.uk/sui/sealed-storage/) on the developer site — SDK setup, encrypt/store/decrypt flow, policy authoring in Move, and Vue composables.
:::
<!-- white-label: link to white-label policy operator guide when published -->
