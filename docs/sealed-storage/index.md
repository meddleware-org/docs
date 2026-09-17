# Sealed Storage

Encrypt a file in your browser, store the ciphertext on [Walrus](/walrus-storage/), and let only the
right people decrypt it — with the access rule enforced **on-chain**. Open the app at
[sui-seal.meddleware.co.uk](https://sui-seal.meddleware.co.uk).

## What it is

Sealed Storage combines three things:

- **[Seal](https://seal-docs.wal.app/)** — threshold encryption where the decryption keys are held by
  a committee of independent **key servers**, not by any single party (or by Meddleware).
- **[Walrus](/walrus-storage/)** — decentralised storage for the encrypted bytes.
- A **policy** — an on-chain rule that decides who is allowed to decrypt.

You encrypt under a policy, share a small **manifest** (a pointer), and anyone who satisfies the
policy can decrypt. Nobody else can — even though the ciphertext itself is stored publicly.

## When to use it

- You want to store something **private** on public/decentralised storage.
- You want access tied to an **on-chain condition** — for example, "only holders of this
  [Access Gate](/access-gate/) pass" or "only after a certain time".
- You want to **share** encrypted content without running your own key server or handing anyone a raw
  key.

When plain [Walrus Storage](/walrus-storage/) is enough: if the content isn't sensitive, skip
encryption.

## How it works, in three steps

1. **Encrypt** — the file is encrypted in your browser under the policy you choose. No key material
   ever touches a server.
2. **Store** — the opaque ciphertext is uploaded to Walrus; you keep the returned blob ID in the
   manifest.
3. **Decrypt** — you sign **one** wallet message (which mints a short-lived session key); a threshold
   of the key servers releases key shares **only if** the on-chain policy check passes.

```
 encrypt (browser)         store            decrypt (if policy allows)
   file → ciphertext  →  Walrus blob  →  sign once → committee releases shares → file
             ▲
        policy: who may decrypt (NFT pass / time-lock / …)
```

## The manifest

Sealing produces a small **manifest** — the portable pointer you share or save. It records the policy
type, the encryption **identity**, the Walrus blob ID, the network, and any non-secret parameters
(like which gate). It contains **no secrets**; it's just enough to locate the ciphertext and rebuild
the on-chain access check. See [Reference](/sealed-storage/reference).

## Who holds the keys?

No one you have to trust unilaterally. Decryption keys are split across a **committee** of independent
key servers; a configurable **threshold** (e.g. 2 of 3) must agree. Meddleware never holds your keys,
and the app never sends key material to a server.

::: tip Network availability
Committee mode currently runs on **testnet**. Mainnet is enabled purely by configuration once the
committee is available — the app shows a clear notice until then.
:::

## Next

- **[Using it](/sealed-storage/using)** — encrypt, share, and decrypt step by step.
- **[Policies](/sealed-storage/policies)** — the access rules you can choose, and when to use each.
- **[Reference](/sealed-storage/reference)** — manifest shape and the SDK API.
