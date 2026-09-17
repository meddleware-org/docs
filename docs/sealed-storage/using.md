# Sealed Storage — using it

A walkthrough of the [Sealed Storage app](https://sui-seal.meddleware.co.uk). You'll need a
[Sui wallet](/getting-started); browsing policies needs nothing, but decrypting requires a signature.

## Encrypt and store

1. Open the **Encrypt** tab.
2. **Choose a file.**
3. **Pick a policy** (see [Policies](/sealed-storage/policies)). The form adapts to the policy — for
   an Access Gate policy you select the gate; for a time-lock you pick an unlock time.
4. Encrypt. The file is sealed **in your browser** and the ciphertext is uploaded to Walrus.
5. You receive a **manifest** — save or share it. It's the pointer needed to decrypt later, and it
   holds no secrets.

::: tip Choose the policy deliberately
The policy is baked into the encryption — you can't change who's allowed after the fact without
re-encrypting. Pick the right gate or unlock time up front.
:::

## Share

Send the **manifest** to whoever should be able to decrypt. Because access is enforced on-chain, you
can share it openly: only those who satisfy the policy (e.g. hold a valid pass, or wait until the
unlock time) can actually decrypt.

## Decrypt / unlock

1. Open the **Decrypt** (or **Unlock**) tab and provide the **manifest**.
2. For a gate policy, provide the **pass NFT** you hold; for a time-lock, just proceed once the time
   has passed.
3. **Sign one wallet message.** This mints a short-lived **session key** — you won't be prompted again
   until it expires.
4. If the on-chain check passes, a threshold of key servers releases their shares and the file is
   decrypted locally. If not (no valid pass, too early), decryption is refused.

## Publishing discoverable content (optional)

For Access Gate content, you can optionally **publish a pointer on-chain** so a gate's pass-holders
can *discover* your sealed content without you sending each of them a manifest. The pointer is public
and grants nothing on its own — confidentiality is still enforced by the encryption and the gate.

## Common questions

**Can Meddleware read my file?** No. Encryption happens in your browser and the keys are split across
independent key servers. Meddleware never holds key material.

**What if a key server is down?** The committee is threshold-based (e.g. 2 of 3), so it tolerates some
servers being unavailable.

**I lost the manifest — can I recover the file?** The manifest holds no secret, but you need it (its
**identity** value in particular) to locate and decrypt the ciphertext. Keep it safe.

**Why did decryption fail?** The on-chain policy said no — commonly: you don't hold a valid pass for
the gate, or a time-lock hasn't elapsed yet.
