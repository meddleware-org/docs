# Function: fetchChallenge()

> **fetchChallenge**(`gatewayHost`, `opts?`): `Promise`\<[`Challenge`](../interfaces/Challenge.md)\>

Defined in: challenge.ts:10

Fetch a fresh challenge from a gateway's `GET /v1/challenge` endpoint. Tolerates both
`expiresAt` (camelCase) and `expires_at` (snake_case) response shapes.

## Parameters

### gatewayHost

`string`

### opts?

#### signal?

`AbortSignal`

## Returns

`Promise`\<[`Challenge`](../interfaces/Challenge.md)\>

## Throws

if the network request fails or the gateway returns a non-2xx status.

## Throws

if the response body is missing the required `nonce` field.
