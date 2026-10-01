# Function: personalMessageForNonce()

> **personalMessageForNonce**(`nonce`): `Uint8Array`

Defined in: proof.ts:7

The exact bytes a wallet signs (as a personal message) to answer a challenge. Both the
client (signing) and the gateway (verifying) MUST derive the message identically.

## Parameters

### nonce

`string`

## Returns

`Uint8Array`
