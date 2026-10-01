# sendpost.SubAccount

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique identifier for the sub-account | [optional] 
**accountId** | **Number** | Identifier of the parent account this sub-account belongs to | [optional] 
**name** | **String** | Display name for the sub-account. Must be unique within your account. Use descriptive names.  | [optional] 
**apiKey** | **String** | API key for this sub-account. Use this as the &#x60;X-SubAccount-ApiKey&#x60; header when making API calls for this sub-account (sending emails, managing domains, etc.).  **Security:** Treat this like a password. Rotate if compromised.  | [optional] 
**type** | **Number** | Type of sub-account: - &#x60;0&#x60; &#x3D; Default (the primary sub-account created with your account) - &#x60;1&#x60; &#x3D; Custom (additional sub-accounts you create)  Note: The default sub-account cannot be deleted.  | [optional] 
**isPlus** | **Boolean** | Whether this sub-account belongs to a SendX Plus customer. SendX Plus is a premium tier that provides enhanced features and support.  | [optional] 
**labels** | [**[Label]**](Label.md) | Custom labels for organizing and filtering sub-accounts | [optional] 
**blocked** | **Boolean** | Whether the sub-account is blocked from sending. A blocked sub-account cannot send emails. Common reasons: - High bounce/spam rates - Billing issues - Policy violations - Manual suspension by administrator  | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds when the sub-account was created | [optional] 



## Enum: TypeEnum


* `0` (value: `0`)

* `1` (value: `1`)




