# sendpost.EmailMessage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**messageID** | **String** | Unique identifier for this email message | [optional] 
**accountID** | **Number** | ID of the SendPost account that sent this email | [optional] 
**subAccountID** | **Number** | ID of the sub-account that sent this email | [optional] 
**ipID** | **Number** | ID of the dedicated IP used for sending (0 if a shared IP was used) | [optional] 
**publicIP** | **String** | The public IP address used to send this email | [optional] 
**localIP** | **String** | The internal/local IP address used to send this email | [optional] 
**emailType** | **String** | Classification of the email based on recipient domain: - &#x60;gmail&#x60; - Gmail recipient - &#x60;yahoo&#x60; - Yahoo recipient - &#x60;microsoft&#x60; - Outlook/Hotmail recipient - &#x60;default&#x60; - Other email providers  | [optional] 
**submittedAt** | **Number** | UNIX epoch timestamp in nanoseconds when the email was submitted | [optional] 
**from** | [**EmailAddress**](EmailAddress.md) | The sender&#39;s email address | [optional] 
**replyTo** | [**EmailAddress**](EmailAddress.md) | The reply-to address (if different from sender) | [optional] 
**to** | [**Recipient**](Recipient.md) | The envelope recipient (actual delivery address) | [optional] 
**groups** | **[String]** | Tags/groups for categorization and analytics | [optional] 
**ipPool** | **String** | Name of the IP pool used for sending | [optional] 
**headers** | **{String: String}** | Custom headers included in the email | [optional] 
**customFields** | **{String: Object}** | Custom fields sent with the email, available for personalization | [optional] 
**trackOpens** | **Boolean** | Whether open tracking was enabled | [optional] 
**trackClicks** | **Boolean** | Whether click tracking was enabled | [optional] 
**webhookEndpoint** | **String** | Custom webhook endpoint for this email (if specified) | [optional] 


