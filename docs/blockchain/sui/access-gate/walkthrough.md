# Using Access Gate

Two audiences: **operators** who run gates, and **buyers** who hold passes.

## For operators

Manage gates in the [operator console](https://sui-access-gate.meddleware.co.uk). You'll need a
[Sui wallet](/blockchain/sui/getting-started).

### Create a gate

1. **Connect** your wallet and open **Create gate**.
2. Set the pass details:
   - **Name** — shown to buyers and in the DAO console.
   - **Price** (in SUI) — what a buyer pays.
   - **Uses** — `0` for an unlimited membership pass, or `N` for single-use with N uses.
   - **Soulbound** — whether passes are non-transferable.
   - **Auto-burn at zero** — for single-use, whether a spent pass is deleted or kept as a receipt.
3. Confirm. Creating the gate gives your wallet an **admin capability** (`AdminCap`) for it.

### Manage a gate

Under **My gates**, each gate you administer offers:

- **Settings** — update price and metadata (via the AdminCap).
- **Pause** — temporarily stop purchases.
- **Airdrop** — grant passes directly to addresses (no payment).
- **Freeze** — see below.

### Freeze (irreversible)

::: warning Freezing is permanent
**Freeze** makes a gate immutable: it consumes the AdminCap and permanently ends all settings and
airdrops. Purchases and consumption keep working. The console guards this behind a typed **FREEZE**
confirmation. There is no undo.
:::

## For buyers / holders

### Buy a pass

Purchase from the gate (through whatever surface the operator exposes — the console, a link, or an
app integrating the gate). You pay the price; the commission and operator split happen on-chain; you
receive the pass NFT. Overpayment is refunded automatically.

### Use a pass

- For **access checks** (e.g. a gated relay or API), your wallet signs a short challenge and the
  service verifies you hold a valid pass on-chain.
- For **single-use** passes, **consuming** a use is an on-chain action you take as the owner; it emits
  a verifiable event that the service binds to. This is why an off-chain service can't silently spend
  your pass.

### Use a pass to unlock encrypted content

If content was sealed to a gate with [Sealed Storage](/blockchain/sui/sealed-storage/), holding a valid pass lets you
**decrypt** it — provide your pass when unlocking.

## Common questions

**Who receives my payment?** Split on-chain: a capped commission to the platform treasury, the rest
to the operator.

**Can the operator take my pass back?** No — it's your NFT. (A soulbound pass can't be transferred by
anyone, including you.)

**What's a nonce for?** When you consume a single-use pass, the emitted **nonce** lets a verifier
confirm *that specific* consumption, rather than trusting a bare address.
