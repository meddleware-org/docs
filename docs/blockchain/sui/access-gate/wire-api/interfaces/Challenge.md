# Interface: Challenge

Defined in: types.ts:7

A server-issued, time-bound challenge the wallet signs to prove control of an address.

## Properties

### expiresAt

> **expiresAt**: `number`

Defined in: types.ts:11

Unix epoch milliseconds after which the challenge is rejected.

***

### nonce

> **nonce**: `string`

Defined in: types.ts:9

Opaque nonce (as issued by the gateway; treated as a UTF-8 string end-to-end).
