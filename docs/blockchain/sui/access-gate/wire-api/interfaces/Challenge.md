# Interface: Challenge

Defined in: types.ts:111

A server-issued, time-bound challenge the wallet signs to prove control of an address.

## Properties

### expiresAt

> **expiresAt**: `number`

Defined in: types.ts:115

Unix epoch milliseconds after which the challenge is rejected.

***

### nonce

> **nonce**: `string`

Defined in: types.ts:113

Opaque nonce (as issued by the gateway; treated as a UTF-8 string end-to-end).
