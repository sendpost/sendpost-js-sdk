# sendpost.NewWebhook

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**enabled** | **Boolean** | Whether the webhook is active immediately after creation. Set to false to configure and test before activating.  | [optional] [default to true]
**url** | **String** | HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency)  | 
**processed** | **Boolean** | Fire when email is accepted by SendPost API | [optional] [default to false]
**sent** | **Boolean** | Fire when email is sent to recipient&#39;s mail server | [optional] [default to false]
**delivered** | **Boolean** | Fire when email is accepted by recipient&#39;s mail server | [optional] [default to true]
**dropped** | **Boolean** | Fire when email is not sent (suppression, invalid, etc.) | [optional] [default to true]
**smtpDropped** | **Boolean** | Fire when email is rejected at SMTP level | [optional] [default to false]
**softBounced** | **Boolean** | Fire on temporary delivery failure (will retry) | [optional] [default to true]
**hardBounced** | **Boolean** | Fire on permanent delivery failure | [optional] [default to true]
**opened** | **Boolean** | Fire when email is opened. Fires on EVERY open. Consider using &#x60;uniqueOpen&#x60; instead to reduce volume.  | [optional] [default to true]
**clicked** | **Boolean** | Fire when a link is clicked. Fires on EVERY click. Consider using &#x60;uniqueClick&#x60; instead to reduce volume.  | [optional] [default to true]
**unsubscribed** | **Boolean** | Fire when recipient clicks unsubscribe link | [optional] [default to true]
**spam** | **Boolean** | Fire when recipient marks email as spam | [optional] [default to true]
**uniqueOpen** | **Boolean** | Fire only on FIRST open of each email (unique opens). More efficient than &#x60;opened&#x60; if you only need engagement metrics.  | [optional] [default to false]
**uniqueClick** | **Boolean** | Fire only on FIRST click of each email (unique clicks). More efficient than &#x60;clicked&#x60; if you only need engagement metrics.  | [optional] [default to false]


