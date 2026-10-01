# Interface: AccessProof

Defined in: types.ts:119

The proof a client presents to a gateway to demonstrate gated access.

## Properties

### address

> **address**: `string`

Defined in: types.ts:121

The Sui address claimed by the caller.

***

### consumeDigest?

> `optional` **consumeDigest?**: `string`

Defined in: types.ts:130

For single-use gates: the digest of the on-chain `consume(nft, nonce)` transaction, so
the gateway can confirm the matching `AccessConsumedEvent` before allowing the request.

***

### nonce

> **nonce**: `string`

Defined in: types.ts:123

The challenge nonce that was signed.

***

### signature

> **signature**: `string`

Defined in: types.ts:125

Base64 personal-message signature over [personalMessageForNonce](../functions/personalMessageForNonce.md).
