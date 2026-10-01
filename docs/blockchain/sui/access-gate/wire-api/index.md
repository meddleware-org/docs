# Gateway wire-protocol API

## Interfaces

- [AccessGateConfig](interfaces/AccessGateConfig.md)
- [AccessProof](interfaces/AccessProof.md)
- [Challenge](interfaces/Challenge.md)
- [CommissionTerms](interfaces/CommissionTerms.md)
- [CoreObject](interfaces/CoreObject.md)
- [GateAdminContext](interfaces/GateAdminContext.md)
- [GatePolicy](interfaces/GatePolicy.md)
- [OwnedAccessNft](interfaces/OwnedAccessNft.md)
- [OwnedGate](interfaces/OwnedGate.md)
- [OwnedObjectsClient](interfaces/OwnedObjectsClient.md)
- [PlatformConfigInfo](interfaces/PlatformConfigInfo.md)
- [SuiObjectClient](interfaces/SuiObjectClient.md)

## Type Aliases

- [PersonalMessageSigner](type-aliases/PersonalMessageSigner.md)

## Variables

- [BPS\_DENOMINATOR](variables/BPS_DENOMINATOR.md)
- [DEFAULT\_GATE\_POLICY](variables/DEFAULT_GATE_POLICY.md)
- [MAX\_COMMISSION\_BPS](variables/MAX_COMMISSION_BPS.md)

## Functions

- [buildAccessProof](functions/buildAccessProof.md)
- [buildAirdropTx](functions/buildAirdropTx.md)
- [buildConsumeTx](functions/buildConsumeTx.md)
- [buildCreateGateTx](functions/buildCreateGateTx.md)
- [buildMakeGateFreeTx](functions/buildMakeGateFreeTx.md)
- [buildMakeGateImmutableTx](functions/buildMakeGateImmutableTx.md)
- [buildPurchaseTx](functions/buildPurchaseTx.md)
- [buildSetAutoBurnAtZeroTx](functions/buildSetAutoBurnAtZeroTx.md)
- [buildSetDefaultUsesTx](functions/buildSetDefaultUsesTx.md)
- [buildSetNftDescriptionTx](functions/buildSetNftDescriptionTx.md)
- [buildSetNftImageUrlTx](functions/buildSetNftImageUrlTx.md)
- [buildSetNftNameTx](functions/buildSetNftNameTx.md)
- [buildSetPausedTx](functions/buildSetPausedTx.md)
- [buildSetPaymentRecipientTx](functions/buildSetPaymentRecipientTx.md)
- [buildSetPriceTx](functions/buildSetPriceTx.md)
- [buildSetSoulboundTx](functions/buildSetSoulboundTx.md)
- [commissionForPrice](functions/commissionForPrice.md)
- [decodeAccessProof](functions/decodeAccessProof.md)
- [encodeAccessProof](functions/encodeAccessProof.md)
- [fetchAccessNftById](functions/fetchAccessNftById.md)
- [fetchAccessNfts](functions/fetchAccessNfts.md)
- [fetchAdminCaps](functions/fetchAdminCaps.md)
- [fetchChallenge](functions/fetchChallenge.md)
- [fetchGate](functions/fetchGate.md)
- [fetchOwnedGates](functions/fetchOwnedGates.md)
- [fetchPlatformConfig](functions/fetchPlatformConfig.md)
- [gateCommissionMist](functions/gateCommissionMist.md)
- [isRestrictivePolicy](functions/isRestrictivePolicy.md)
- [minimumPaidPriceMist](functions/minimumPaidPriceMist.md)
- [ownsAccessNft](functions/ownsAccessNft.md)
- [parseAdminCap](functions/parseAdminCap.md)
- [parseGate](functions/parseGate.md)
- [parseOwnedAccessNft](functions/parseOwnedAccessNft.md)
- [parsePlatformConfig](functions/parsePlatformConfig.md)
- [personalMessageForNonce](functions/personalMessageForNonce.md)
- [platformCommissionTerms](functions/platformCommissionTerms.md)
