# sendpost.Message

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**messageID** | **String** | Unique ID for the message. | [optional] 
**accountID** | **Number** | Account ID associated with the message. | [optional] 
**subAccountID** | **Number** | Sub-account ID associated with the message. | [optional] 
**ipID** | **Number** | IP ID used for sending the message. | [optional] 
**accountIPPoolID** | **Number** | Account IP Pool ID associated with the message. | [optional] 
**publicIP** | **String** | Public IP address used for sending the message. | [optional] 
**localIP** | **String** | Local IP address used for sending the message. | [optional] 
**emailType** | **String** | Type of email service used. | [optional] 
**submittedAt** | **Number** | UNIX epoch nano timestamp when message was submitted. | [optional] 
**from** | [**Person**](.md) | Object comprising name and email address of the sender | [optional] 
**replyTo** | [**Person**](.md) | Object comprising name and email addresses to which email replies will go to | [optional] 
**to** | [**MessageTo**](MessageTo.md) |  | [optional] 
**headerTo** | [**MessageHeaderTo**](MessageHeaderTo.md) |  | [optional] 
**headerCc** | **[String]** | List of CC recipients from email headers | [optional] 
**headerBcc** | **[String]** | List of BCC recipients from email headers | [optional] 
**attachments** | **[String]** | List of attachments | [optional] 
**groups** | **[String]** | List of groups associated with the message | [optional] 
**ipPool** | **String** | IP Pool from which emails will go out. Relevant only for customers on dedicated IP plans. | [optional] 
**headers** | **{String: String}** | Key-Value pair which are added to every email message being sent and also with webhooks triggered on events such as email delivered, open, click etc. They are useful to identify email, recipient etc. in your internal system | [optional] 
**customFields** | **{String: String}** | Key-Value pair of custom fields at message level | [optional] 
**subject** | **String** | Email subject line. | [optional] 
**preText** | **String** | Text which appears on mobile right after email subject line. | [optional] 
**htmlBody** | **String** | HTML email content. | [optional] 
**textBody** | **String** | Text email content. | [optional] 
**ampBody** | **String** | AMP email content. | [optional] 
**trackOpens** | **Boolean** | Indicates if email opens need to be tracked. | [optional] 
**trackClicks** | **Boolean** | Indicates if email clicks need to be tracked. | [optional] 
**attempt** | **Number** | Number of delivery attempts made for the message. | [optional] 
**webhookEndpoint** | **String** | Webhook endpoint URL for the message. | [optional] 
**mxRecords** | **[String]** | List of MX records for the recipient domain | [optional] 


