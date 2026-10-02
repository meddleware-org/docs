# Interface: AccessProof

Defined in: types.ts:15

The proof a client presents to a gateway to demonstrate gated access.

## Properties

### address

> **address**: `string`

Defined in: types.ts:17

The Sui address claimed by the caller.

***

### consumeDigest?

> `optional` **consumeDigest?**: `string`

Defined in: types.ts:26

For single-use gates: the digest of the on-chain `consume` transaction, so the gateway can
confirm the matching `AccessConsumedEvent` before allowing the request.

***

### nonce

> **nonce**: `string`

Defined in: types.ts:19

The challenge nonce that was signed.

***

### signature

> **signature**: `string`

Defined in: types.ts:21

Base64 personal-message signature over [personalMessageForNonce](../functions/personalMessageForNonce.md).
