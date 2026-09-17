# Sui

Meddleware's Sui platform is a set of four connected tools — each useful on its own, designed to
compose. They run against Sui's object model and use Walrus for decentralised storage where needed.

## The tools

| Tool | What it does |
| --- | --- |
| [DAO](/blockchain/sui/dao/) | A read-only console showing the platform's treasury, commission rate, community access gates, and live on-chain activity |
| [Walrus Storage](/blockchain/sui/walrus-storage/) | Upload files to Walrus (decentralised blob storage on Sui) and manage how long they live |
| [Sealed Storage](/blockchain/sui/sealed-storage/) | Client-side encryption layered on Walrus, with the access rule enforced on-chain by a policy you choose |
| [Access Gate](/blockchain/sui/access-gate/) | Create NFT passes that gate access to content, APIs, or apps — ownership checked on-chain |

## How they fit together

The tools are designed to compose. [Sealed Storage](/blockchain/sui/sealed-storage/) uses Walrus for
storage and optionally [Access Gate](/blockchain/sui/access-gate/) passes as the decryption key. The
[DAO](/blockchain/sui/dao/) reads the live economics of the Access Gate platform — commission rate,
treasury, active gates.

See **[How the tools fit together](/blockchain/sui/architecture)** for the full picture.

## Apps

Each tool has a hosted web app:

| Tool | App |
| --- | --- |
| Tools hub | [sui.meddleware.co.uk](https://sui.meddleware.co.uk) |
| DAO console | [sui-dao.meddleware.co.uk](https://sui-dao.meddleware.co.uk) |
| Walrus Storage | [sui-walrus.meddleware.co.uk](https://sui-walrus.meddleware.co.uk) |
| Sealed Storage | [sui-seal.meddleware.co.uk](https://sui-seal.meddleware.co.uk) |
| Access Gate | [sui-access-gate.meddleware.co.uk](https://sui-access-gate.meddleware.co.uk) |

New here? **[Getting started with Sui →](/blockchain/sui/getting-started)**

::: tip Developer documentation
This site covers using the tools. SDK integration, self-hosting, and white-label deployment are
covered in the forthcoming developer documentation.
:::
