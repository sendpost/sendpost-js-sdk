# sendpost.Event

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eventId** | **String** | Unique identifier for this specific event. Use this for idempotency - the same event may be delivered multiple times.  | [optional] 
**messageId** | **String** | Unique identifier of the email message this event belongs to. Use this to correlate events with the original send request.  | [optional] 
**type** | **Number** | Numeric event type code: - &#x60;0&#x60; &#x3D; processed (email accepted by API) - &#x60;1&#x60; &#x3D; dropped (not sent - suppression, invalid, etc.) - &#x60;2&#x60; &#x3D; delivered (accepted by recipient&#39;s mail server) - &#x60;3&#x60; &#x3D; softBounced (temporary failure, will retry) - &#x60;4&#x60; &#x3D; hardBounced (permanent failure) - &#x60;5&#x60; &#x3D; opened (tracking pixel loaded) - &#x60;6&#x60; &#x3D; clicked (link clicked) - &#x60;7&#x60; &#x3D; unsubscribed (clicked unsubscribe link) - &#x60;8&#x60; &#x3D; spam (marked as spam by recipient) - &#x60;9&#x60; &#x3D; sent (sent to mail server) - &#x60;10&#x60; &#x3D; smtpDropped (dropped at SMTP level)  | [optional] 
**typeName** | **String** | Human-readable event type name | [optional] 
**from** | **String** | Sender email address | [optional] 
**to** | **String** | Recipient email address | [optional] 
**subject** | **String** | Email subject line (useful for identifying the email) | [optional] 
**groups** | **[String]** | Tags/groups that were associated with the email | [optional] 
**submittedAt** | **Number** | UNIX epoch timestamp in nanoseconds when the email was originally submitted | [optional] 
**timestamp** | **Number** | UNIX epoch timestamp in nanoseconds when this event occurred | [optional] 
**eventMetadata** | [**EventMetadata**](EventMetadata.md) |  | [optional] 



## Enum: TypeEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `2` (value: `2`)

* `3` (value: `3`)

* `4` (value: `4`)

* `5` (value: `5`)

* `6` (value: `6`)

* `7` (value: `7`)

* `8` (value: `8`)

* `9` (value: `9`)

* `10` (value: `10`)





## Enum: TypeNameEnum


* `processed` (value: `"processed"`)

* `dropped` (value: `"dropped"`)

* `delivered` (value: `"delivered"`)

* `softBounced` (value: `"softBounced"`)

* `hardBounced` (value: `"hardBounced"`)

* `opened` (value: `"opened"`)

* `clicked` (value: `"clicked"`)

* `unsubscribed` (value: `"unsubscribed"`)

* `spam` (value: `"spam"`)

* `sent` (value: `"sent"`)

* `smtpDropped` (value: `"smtpDropped"`)




