# sendpost.Recipient

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **String** | The recipient&#39;s email address | 
**name** | **String** | The recipient&#39;s display name | [optional] 
**cc** | [**[CopyTo]**](CopyTo.md) | Carbon copy recipients for this specific recipient&#39;s email. CC addresses will be visible to all recipients of this email copy.  | [optional] 
**bcc** | [**[CopyTo]**](CopyTo.md) | Blind carbon copy recipients for this specific recipient&#39;s email. BCC addresses are hidden from all other recipients.  | [optional] 
**customFields** | **{String: Object}** | Custom fields for personalizing the email content for this recipient. Use Handlebars syntax ({{fieldName}}) in subject, htmlBody, or textBody to insert values. Reserved field names: &#x60;unsubscribe&#x60; (auto-generated unsubscribe link).  | [optional] 


