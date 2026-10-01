# sendpost.Suppression

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique identifier for the suppression record | [optional] 
**email** | **String** | The suppressed email address | [optional] 
**reason** | **Number** | Reason code for the suppression: - &#x60;0&#x60; &#x3D; Manual (added via API or dashboard) - &#x60;1&#x60; &#x3D; Unsubscribe (recipient clicked unsubscribe link) - &#x60;2&#x60; &#x3D; Hard Bounce (permanent delivery failure) - &#x60;3&#x60; &#x3D; Spam Complaint (recipient marked as spam) - &#x60;4&#x60; &#x3D; Hard Bounce (detected by post-send validation)  | [optional] 
**reasonText** | **String** | Human-readable suppression reason | [optional] 
**smtpError** | **String** | SMTP error message from the receiving server (only for hard bounce suppressions). Useful for diagnosing delivery issues.  | [optional] 
**messageUUID** | **String** | UUID of the message whose bounce/complaint caused this suppression. Empty for manually added suppressions. Useful for tracing the origin.  | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds when the suppression was added | [optional] 



## Enum: ReasonEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `2` (value: `2`)

* `3` (value: `3`)

* `4` (value: `4`)





## Enum: ReasonTextEnum


* `manual` (value: `"manual"`)

* `unsubscribe` (value: `"unsubscribe"`)

* `hardBounce` (value: `"hardBounce"`)

* `spamComplaint` (value: `"spamComplaint"`)




