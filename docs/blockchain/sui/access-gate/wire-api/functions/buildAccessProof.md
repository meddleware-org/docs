# Function: buildAccessProof()

> **buildAccessProof**(`opts`): `Promise`\<`string`\>

Defined in: proof.ts:78

Sign a challenge and assemble the encoded access-proof token to hand to any gateway as its
auth bearer (e.g. an upload-relay client's auth-token option, an `Authorization` header).

## Parameters

### opts

#### address

`string`

#### challenge

[`Challenge`](../interfaces/Challenge.md)

#### consumeDigest?

`string`

Present for single-use gates: the `consume` tx digest.

#### sign

[`PersonalMessageSigner`](../type-aliases/PersonalMessageSigner.md)

## Returns

`Promise`\<`string`\>

## Throws

if the wallet signer rejects or fails to sign the message.
