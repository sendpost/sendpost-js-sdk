# sendpost.UpdateWebhook

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**enabled** | **Boolean** | Is the webhook active or in a paused state? | [optional] 
**url** | **String** | URL endpoint to which webhook calls are sent. | [optional] 
**processed** | **Boolean** | Trigger webhook on email message being processed. | [optional] 
**delivered** | **Boolean** | Trigger webhook on email message being delivered. | [optional] 
**dropped** | **Boolean** | Trigger webhook on email message being dropped. | [optional] 
**softBounced** | **Boolean** | Trigger webhook on email message being soft bounced. | [optional] 
**hardBounced** | **Boolean** | Trigger webhook on email message being hard bounced. | [optional] 
**opened** | **Boolean** | Trigger webhook on email message being opened. | [optional] 
**clicked** | **Boolean** | Trigger webhook on email message link being clicked. | [optional] 
**unsubscribed** | **Boolean** | Trigger webhook on email message being unsubscribed. | [optional] 
**spam** | **Boolean** | Trigger webhook on email message being marked as spam. | [optional] 
**sent** | **Boolean** | Trigger webhook on email message being sent. | [optional] 
**smtpDropped** | **Boolean** | Trigger webhook on email message being dropped by SMTP. | [optional] 
**uniqueOpen** | **Boolean** | Trigger webhook on unique email opens. | [optional] 
**uniqueClick** | **Boolean** | Trigger webhook on unique email clicks. | [optional] 


