# sendpost.SubAccount

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique ID for the sub-account. | [optional] 
**apiKey** | **String** | API key for the sub-account. | [optional] 
**name** | **String** | Name of the sub-account. | [optional] 
**labels** | **[String]** | Labels associated with the sub-account | [optional] 
**smtpAuths** | [**[SMTPAuth]**](SMTPAuth.md) | SMTP Auths associated with the sub-account | [optional] 
**type** | **Number** | Type of the sub-account | [optional] 
**isPlus** | **Boolean** | Indicates whether the sub-account is a Plus sub-account | [optional] 
**created** | **Number** | UNIX epoch nano timestamp when the sub-account was created. | [optional] 
**createdBy** | [**Member**](.md) | Member who created the sub-account | [optional] 
**updatedBy** | [**Member**](.md) | Member who updated the sub-account | [optional] 
**blocked** | **Boolean** | Indicates whether the sub-account is blocked | [optional] 
**blockedAt** | **Number** | UNIX epoch nano timestamp when the sub-account was blocked (0 if not blocked) | [optional] 
**blockReason** | **String** | Reason for blocking the sub-account | [optional] 
**hbExempt** | **Boolean** | Indicates whether the sub-account is exempt from hard bounce tracking | [optional] 
**generateWeeklyReport** | **Boolean** | Indicates whether weekly reports are generated for this sub-account | [optional] 
**handlers** | **[String]** | Handlers associated with the sub-account | [optional] 



## Enum: TypeEnum


* `0` (value: `0`)

* `1` (value: `1`)




