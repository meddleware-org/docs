# Sealed Storage — reference

Shapes and identifiers behind Sealed Storage. The **exhaustive, always-current API** is auto-generated
from the `@meddleware/seal-client` SDK — see [SDK API](#sdk-api).

## Deployed identifiers (testnet)

| Thing | ID |
| --- | --- |
| `seal_policies` package | `0x9f0563bfe42fbd29932cd280cc47efe17f5339b4dc569eb110114665eecc231e` |

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

## Policy identities

Each policy encodes its access condition into the encryption **identity**. Conceptually:

| Policy | Identity layout | On-chain check |
| --- | --- | --- |
| `nft-gate` | `[32-byte gate id][random nonce]` | Holder of a valid pass for that gate |
| `time-lock` | `[8-byte unlock time][random nonce]` | On-chain clock ≥ unlock time |

The gate id in the identity namespaces the content: a pass for gate A cannot decrypt gate B.

## Threshold committee

Decryption uses a **t-of-n** committee of key servers (e.g. 2 of 3). Encryption targets all
configured servers; decryption needs a threshold of them to release shares. A short-lived **session
key** (signed once per session) authorises the release.

## Discoverable content pointer (optional)

Publishing a pointer for gate-unlockable content emits an on-chain event so pass-holders can discover
it:

```json
{
  "contentId": "0x…",
  "gateId": "0x…",
  "blobId": "…",
  "sealId": "…",
  "label": "…",
  "publisher": "0x…"
}
```

The pointer is public and grants nothing on its own — confidentiality stays enforced by Seal + the
gate.

## SDK API

The full `@meddleware/seal-client` API — the `SealController`, the policy registry, both built-in
providers, and the manifest/byte helpers — is generated here:

- [Seal client API](./api/)

::: tip Writing your own policy?
That's covered in the forthcoming developer documentation (a `seal_policies` Move module + a matching
client provider).
:::
