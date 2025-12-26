# sendpost.StatStat

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**processed** | **Number** | Number of emails accepted by SendPost API. | [optional] 
**sent** | **Number** | Number of emails sent. | [optional] 
**delivered** | **Number** | Number of emails we were able to successfully deliver at SMTP without encountering any error | [optional] 
**dropped** | **Number** | Number of emails drop without attempting to deliver either because the email is invalid or email in in existing suppression list | [optional] 
**smtpDropped** | **Number** | Number of emails dropped by SMTP. | [optional] 
**hardBounced** | **Number** | Number of emails where we got SMTP hard bounce error code by the recipient mail provider | [optional] 
**softBounced** | **Number** | Number of emails where we got temporary soft bounce error by the recipent mail provider. Soft bounced emails are retried upto 5 times over 24 hour period before marking them as hardBounced. | [optional] 
**opened** | **Number** | Number of emails opened by recipients | [optional] 
**clicked** | **Number** | Number of email links clicked by recipients | [optional] 
**unsubscribed** | **Number** | Number of email recipients who unsubscribed from receiving further emails | [optional] 
**spam** | **Number** | Number of email recipients who marked emails as spam | [optional] 


