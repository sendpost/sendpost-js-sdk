# sendpost.MessageApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAllMessages**](MessageApi.md#getAllMessages) | **GET** /account/message | List Messages
[**getMessageById**](MessageApi.md#getMessageById) | **GET** /account/message/{message_id} | Get Message



## getAllMessages

> [Message] getAllMessages(from, to, opts)

List Messages

Retrieve a paginated list of all email messages sent through your account. Each message includes delivery status, timestamps, and metadata.  **Message Information Includes:** - Sender and recipient details - Subject line and message ID - Delivery status (delivered, bounced, opened, etc.) - Timestamps for each event - IP address and pool used for sending  **Use Cases:** - Search for specific emails sent to customers - Debug delivery issues for specific recipients - Audit email delivery for compliance - Export message logs for analysis - Customer support - lookup specific email by recipient  **Example:** Find all emails to a specific domain in the last week: &#x60;&#x60;&#x60; GET /account/message?from&#x3D;2024-01-01T00:00:00Z&amp;to&#x3D;2024-01-07T23:59:59Z &#x60;&#x60;&#x60;  **Note:** Maximum date range is 60 days. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.MessageApi();
let from = new Date("2024-01-01T00:00:00Z"); // Date | Start timestamp for message retrieval. ISO 8601 format.
let to = new Date("2024-01-31T23:59:59Z"); // Date | End timestamp for message retrieval. Max 60 days from `from`.
let opts = {
  'limit': 50, // Number | Number of records to return per request. Default 50, max 100.
  'offset': 0 // Number | Number of initial records to skip for pagination.
};
apiInstance.getAllMessages(from, to, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| Start timestamp for message retrieval. ISO 8601 format. | 
 **to** | **Date**| End timestamp for message retrieval. Max 60 days from &#x60;from&#x60;. | 
 **limit** | **Number**| Number of records to return per request. Default 50, max 100. | [optional] [default to 50]
 **offset** | **Number**| Number of initial records to skip for pagination. | [optional] [default to 0]

### Return type

[**[Message]**](Message.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getMessageById

> Message getMessageById(messageId)

Get Message

Retrieve complete details about a specific email message, including full event timeline and metadata.  **Response Includes:** - Full message details (sender, recipients, subject) - Complete event timeline (submitted, sent, delivered, opened, clicked) - Bounce/drop information with reasons - IP and pool used for sending - Click and open tracking data  **Use Cases:** - Debug why a specific email wasn&#39;t delivered - Customer support - provide delivery proof - Audit trail for compliance requirements - Analyze engagement for specific messages 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.MessageApi();
let messageId = "msg_01H2X3Y4Z5A6B7C8D9E0F1G2H3"; // String | The unique message ID returned when the email was sent.
apiInstance.getMessageById(messageId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **messageId** | **String**| The unique message ID returned when the email was sent. | 

### Return type

[**Message**](Message.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

