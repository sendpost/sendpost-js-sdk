# sendpost.EmailStatsStats

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**processed** | **Number** | Number of emails accepted by SendPost API | [optional] 
**sent** | **Number** | Number of emails sent | [optional] 
**delivered** | **Number** | Number of emails successfully delivered to SMTP without errors | [optional] 
**dropped** | **Number** | Number of emails dropped without attempting to deliver due to invalid email or suppression list | [optional] 
**smtpDropped** | **Number** | Number of emails dropped by SMTP | [optional] 
**hardBounced** | **Number** | Number of emails that resulted in a hard bounce error | [optional] 
**softBounced** | **Number** | Number of emails that resulted in a temporary soft bounce error | [optional] 
**opened** | **Number** | Number of emails opened by recipients | [optional] 
**clicked** | **Number** | Number of email links clicked by recipients | [optional] 
**unsubscribed** | **Number** | Number of email recipients who unsubscribed | [optional] 
**spam** | **Number** | Number of emails marked as spam by recipients | [optional] 


