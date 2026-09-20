# Access Gate reference

The on-chain `access_gate` contract, its gateway, and the client SDK. Move tables are curated from
source; the TypeScript SDK reference is [auto-generated](#sdk-api).

## Deployed identifiers (testnet)

| Thing | ID |
| --- | --- |
| `access_gate` package | `0x0bedd0b27d993d3292ca6a5315f7562de8bc0ff3752b445b4c53252c76f2d20d` |
| `PlatformConfig` object | `0x7c5aed0ce7f29a4dfb60657858df31c12410a67098b4bcdd1d8cb1e531be4884` |

Mainnet identifiers are pending.

## Objects

### `Gate` (shared)

```move
Gate {
  price_mist         // pass price in MIST
  payment_recipient  // operator address that receives the post-commission amount
  default_uses       // 0 ⇒ unlimited pass; N ⇒ single-use with N uses
  soulbound          // whether minted passes are non-transferable
  auto_burn_at_zero  // spent single-use pass: delete (true) or return as receipt (false)
  paused             // purchases blocked while true
  admin_cap_id       // the AdminCap authorised to manage this gate
}
```

### Passes

- **`AccessNFT`** (has `store`) — a transferable pass.
- **`SoulboundAccessNFT`** (no `store`) — non-transferable; only the contract's `consume`/`burn` can
  destroy it.

Both wrap **`AccessData`** `{ gate_id, variant, minted_epoch }`, where **`AccessVariant`** is
`UnlimitedPass` or `SingleUse { uses_remaining }`.

### `AdminCap`

Owned capability authorising management of one gate (`{ gate_id }`). Authorisation is by
`cap.gate_id == object::id(gate)`.

## Entry functions

| Function | Who | Effect |
| --- | --- | --- |
| `create_gate` | anyone | Create a gate; mints an `AdminCap` to the creator. |
| `purchase` | anyone | Pay `price_mist`; commission → treasury, remainder → `payment_recipient`; mint pass; refund overpayment. |
| `consume` | pass owner | Spend one use of a single-use pass; emits `AccessConsumedEvent { nonce }`. |
| `airdrop` | AdminCap | Grant a pass to an address without payment. |
| `burn` | pass owner | Voluntarily destroy a pass; emits `AccessBurnedEvent`. |
| admin setters | AdminCap | Update price / recipient / paused / etc. |
| `make_gate_immutable` | AdminCap | **Irreversible** — consumes the AdminCap; ends settings + airdrops. |
| `set_platform_treasury`, `set_commission_bps` | platform admin | Platform-only; not exposed in the operator console. |

## Events

| Event | Emitted when | Key fields |
| --- | --- | --- |
| `GateCreatedEvent` | a gate is created | gate config |
| `AccessMintedEvent` | a pass is purchased/airdropped | recipient, gate |
| `AccessConsumedEvent` | a single-use pass is spent | **`nonce`**, address |
| `AccessBurnedEvent` | a pass is burned | id |

::: warning Event pruning
Sui testnet prunes old events after ~3 months. Systems that need a reliable gate list should read
**`AdminCap` ownership → `Gate`** rather than replaying `GateCreatedEvent` (this is what the
[DAO console](/blockchain/sui/dao/) does).
:::

## Error codes

| Code | Constant | Meaning |
| --- | --- | --- |
| 1 | `E_PAUSED` | Gate is paused |
| 2 | `E_INSUFFICIENT_PAYMENT` | Payment below price |
| 3 | `E_NOT_SINGLE_USE` | Consume called on an unlimited pass |
| 4 | `E_NO_USES_REMAINING` | Single-use pass already exhausted |
| 5 | `E_WRONG_GATE` | NFT/cap doesn't belong to the supplied gate |

## Gateway (nft-gate)

Any HTTP service can be placed **behind** a gate using the nft-gate reverse proxy. It verifies a
signed proof and on-chain pass ownership, failing **closed** on any ambiguity.

- **Personal message signed by the wallet:** `nft-gate:access:<nonce>`
- **Proof token** (`Authorization: Bearer …` or `X-Access-Proof`): base64 of

```json
{ "address": "0x…", "nonce": "…", "signature": "…", "consumeDigest": "…" }
```

The gateway consumes the nonce immediately (single-use replay protection) and, for single-use passes,
verifies the on-chain consumption by digest. Two wire-identical implementations exist (Cloudflare
Workers and Rust); running one is covered in the forthcoming developer documentation.

## SDK API

The full `@meddleware/nft-gate-client` API — PTB builders (`create_gate`, `purchase`, `consume`,
airdrop, admin setters), ownership reads, and the challenge/proof helpers — is generated here:

- [NFT-gate client API](./api/)

::: tip Deploying the gateway or integrating the SDK?
See the [Access Gate integration guide](https://dev.meddleware.co.uk/sui/access-gate/) on the developer site — SDK setup, purchase/verify flow, challenge/proof protocol, and Rust/Worker gateway deployment.
:::
<!-- white-label: link to white-label gateway operator guide when published -->
