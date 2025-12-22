# sendpost.Webhook

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique ID for the webhook. | [optional] 
**enabled** | **Boolean** | Indicates if the webhook is active or paused. | [optional] 
**url** | **String** | URL endpoint to which webhook calls need to be made. | [optional] 
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
**created** | **Number** | UNIX epoch nano timestamp when the webhook was created. | [optional] 
**createdBy** | [**Member**](.md) | Member who created the webhook | [optional] 
**updatedBy** | [**Member**](.md) | Member who updated the webhook | [optional] 


