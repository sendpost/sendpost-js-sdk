# sendpost.Webhook

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique identifier for the webhook configuration | [optional] 
**enabled** | **Boolean** | Whether the webhook is active. When false, no events will be sent to this webhook. Useful for temporarily pausing notifications during maintenance.  | [optional] 
**url** | **String** | HTTPS endpoint URL to receive webhook POST requests. Must be publicly accessible and return 2xx status code.  | [optional] 
**processed** | **Boolean** | Trigger webhook when an email is accepted for processing. Fires immediately when API call is successful.  | [optional] 
**sent** | **Boolean** | Trigger webhook when an email is sent to the recipient&#39;s mail server. Indicates the email left SendPost&#39;s infrastructure.  | [optional] 
**dropped** | **Boolean** | Trigger webhook when an email is dropped before sending. Common reasons: suppressed address, invalid email, unverified domain.  | [optional] 
**smtpDropped** | **Boolean** | Trigger webhook when an email is dropped at SMTP level. Usually due to policy rejection by receiving server.  | [optional] 
**delivered** | **Boolean** | Trigger webhook when an email is successfully delivered. Note: \&quot;Delivered\&quot; means accepted by mail server, not inbox placement.  | [optional] 
**softBounced** | **Boolean** | Trigger webhook on temporary delivery failure (soft bounce). SendPost will retry delivery automatically.  | [optional] 
**hardBounced** | **Boolean** | Trigger webhook on permanent delivery failure (hard bounce). The recipient is automatically added to suppression list.  | [optional] 
**opened** | **Boolean** | Trigger webhook when recipient opens the email. Fires on every open (can fire multiple times per email).  | [optional] 
**clicked** | **Boolean** | Trigger webhook when recipient clicks a link. Fires on every click (can fire multiple times per email).  | [optional] 
**unsubscribed** | **Boolean** | Trigger webhook when recipient clicks the unsubscribe link. The recipient is automatically added to suppression list.  | [optional] 
**spam** | **Boolean** | Trigger webhook when recipient marks email as spam. The recipient is automatically added to suppression list. Monitor this closely - high spam rates damage sender reputation.  | [optional] 
**uniqueOpen** | **Boolean** | Trigger webhook only on the first open of an email (unique opens). Use this instead of &#39;opened&#39; if you only care about unique engagement.  | [optional] 
**uniqueClick** | **Boolean** | Trigger webhook only on the first click of an email (unique clicks). Use this instead of &#39;clicked&#39; if you only care about unique engagement.  | [optional] 
**status** | **String** | Health status of the webhook (read-only): - &#x60;active&#x60; - delivering normally - &#x60;degraded&#x60; - recent delivery failures - &#x60;disabled&#x60; - auto-disabled after repeated consecutive failures  | [optional] 
**disabledAt** | **Number** | UNIX epoch timestamp in nanoseconds when the webhook was auto-disabled (0 if never). Read-only. | [optional] 
**disabledReason** | **String** | Human-readable reason the webhook was auto-disabled (empty if active). Read-only. | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds when the webhook was created | [optional] 



## Enum: StatusEnum


* `active` (value: `"active"`)

* `degraded` (value: `"degraded"`)

* `disabled` (value: `"disabled"`)




