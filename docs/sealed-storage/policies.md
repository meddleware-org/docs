# Sealed Storage — policies

A **policy** is the on-chain rule that decides who may decrypt sealed content. You choose one when you
encrypt. Each policy is a self-contained on-chain module with a matching option in the app.

## Built-in policies

### Access-gate NFT (`nft-gate`)

**Only holders of a valid pass for a chosen [Access Gate](/access-gate/) can decrypt.**

- **Encrypt with:** the gate's object ID.
- **Decrypt with:** the pass NFT you hold for that gate (and whether it's soulbound).
- **Use it when:** you want membership- or purchase-gated content — a paid community, subscriber-only
  files, gated downloads. Combine it with the Access Gate tool to sell the passes.

Content is namespaced to the specific gate, so a pass for one gate can never decrypt another gate's
content. A single-use pass acts as **membership** here — decrypting doesn't consume a use — but an
already-exhausted pass is rejected.

### Time-lock (`time-lock`)

**Anyone can decrypt once a chosen unlock time has passed.**

- **Encrypt with:** an unlock time.
- **Decrypt with:** nothing special — just wait until the time arrives.
- **Use it when:** you want a timed reveal — embargoed announcements, scheduled disclosures, "open
  after" content, commit-and-reveal schemes.

The unlock time is checked against the on-chain clock, so it can't be faked by changing your device
clock.

## Choosing a policy

| You want… | Use |
| --- | --- |
| Access limited to holders of a pass you sell or grant | **Access-gate NFT** |
| A timed reveal open to everyone after a date | **Time-lock** |
| Both (e.g. gated *and* not before a date) | Not a single built-in today — see roadmap |

## Roadmap

The policy system is **extensible** — each new policy is an additional on-chain module plus an app
option, without touching existing ones. Planned policies (not yet available) include allowlists,
time-bound subscriptions, owner-only, token/balance gating, and more. These will appear in the app's
policy picker automatically as they ship.

::: tip Developer note
The mechanics of writing a new policy (the on-chain `seal_approve` module + the matching client
provider) are `dev.meddleware.co.uk` material, planned in the `seal-policies` and `seal-client`
package docs. The [Reference](/sealed-storage/reference) lists the current policy identifiers.
:::
