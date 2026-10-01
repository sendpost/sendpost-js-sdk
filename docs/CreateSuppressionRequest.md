# sendpost.CreateSuppressionRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**hardBounce** | [**[CreateSuppressionRequestHardBounceInner]**](CreateSuppressionRequestHardBounceInner.md) | Email addresses with known permanent delivery issues (invalid, non-existent domains). | [optional] 
**manual** | [**[CreateSuppressionRequestManualInner]**](CreateSuppressionRequestManualInner.md) | Email addresses to suppress without specific categorization (do-not-contact requests, etc.). | [optional] 
**unsubscribe** | [**[CreateSuppressionRequestUnsubscribeInner]**](CreateSuppressionRequestUnsubscribeInner.md) | Email addresses of users who opted out via external unsubscribe mechanisms. | [optional] 
**spamComplaint** | [**[CreateSuppressionRequestSpamComplaintInner]**](CreateSuppressionRequestSpamComplaintInner.md) | Email addresses that reported spam via external feedback loops. | [optional] 


