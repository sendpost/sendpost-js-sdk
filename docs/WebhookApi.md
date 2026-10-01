# sendpost.WebhookApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createWebhook**](WebhookApi.md#createWebhook) | **POST** /account/webhook | Create Webhook
[**deleteWebhook**](WebhookApi.md#deleteWebhook) | **DELETE** /account/webhook/{webhook_id} | Delete Webhook
[**getAllWebhooks**](WebhookApi.md#getAllWebhooks) | **GET** /account/webhook | List Webhooks
[**getWebhook**](WebhookApi.md#getWebhook) | **GET** /account/webhook/{webhook_id} | Get Webhook
[**updateWebhook**](WebhookApi.md#updateWebhook) | **PUT** /account/webhook/{webhook_id} | Update Webhook



## createWebhook

> Webhook createWebhook(newWebhook)

Create Webhook

Create a new webhook to receive real-time notifications for email events. Your endpoint will receive HTTP POST requests with event data as they occur.  **Endpoint Requirements:** - Must be publicly accessible HTTPS URL - Should return 2xx status within 30 seconds - Handle potential duplicate events (use event ID for deduplication) - Implement retry/queue logic for reliability  **Choosing Events:** - **Engagement Tracking:** &#x60;uniqueOpened&#x60;, &#x60;uniqueClicked&#x60; for metrics - **Full History:** &#x60;opened&#x60;, &#x60;clicked&#x60; for complete event logs - **Delivery Monitoring:** &#x60;delivered&#x60;, &#x60;hardBounced&#x60;, &#x60;softBounced&#x60; - **Compliance:** &#x60;unsubscribed&#x60;, &#x60;spam&#x60;  **Best Practices:** - Only enable events you actually need - Store events before processing (async processing) - Implement idempotency using event IDs - Set up monitoring for webhook failures  **Webhook Payload Example:** &#x60;&#x60;&#x60;json {   \&quot;eventId\&quot;: \&quot;evt_123\&quot;,   \&quot;event\&quot;: \&quot;delivered\&quot;,   \&quot;messageId\&quot;: \&quot;msg_456\&quot;,   \&quot;recipient\&quot;: \&quot;user@example.com\&quot;,   \&quot;timestamp\&quot;: \&quot;2024-01-15T10:30:00Z\&quot; } &#x60;&#x60;&#x60; 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let newWebhook = new sendpost.NewWebhook(); // NewWebhook | 
apiInstance.createWebhook(newWebhook).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newWebhook** | [**NewWebhook**](NewWebhook.md)|  | 

### Return type

[**Webhook**](Webhook.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteWebhook

> DeleteWebhookResponse deleteWebhook(webhookId)

Delete Webhook

Remove a webhook from your account. After deletion, no further events will be sent to that endpoint.  **Before Deleting:** - Ensure your application doesn&#39;t rely on these events - Consider updating to a new webhook instead if you&#39;re migrating  **Note:** Events that occurred before deletion are not affected. Historical data remains intact. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let webhookId = 117; // Number | The unique ID of the webhook to delete.
apiInstance.deleteWebhook(webhookId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhookId** | **Number**| The unique ID of the webhook to delete. | 

### Return type

[**DeleteWebhookResponse**](DeleteWebhookResponse.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllWebhooks

> [AccountWebhookWithStats] getAllWebhooks(opts)

List Webhooks

Retrieve all configured webhooks for your account. Webhooks enable real-time notifications when email events occur, allowing you to build reactive applications.  **Supported Events:** | Event | Description | |-------|-------------| | &#x60;processed&#x60; | Email accepted and queued for delivery | | &#x60;dropped&#x60; | Email blocked (suppressed, invalid, policy) | | &#x60;delivered&#x60; | Email successfully delivered to recipient | | &#x60;hardBounced&#x60; | Permanent delivery failure | | &#x60;softBounced&#x60; | Temporary delivery failure | | &#x60;opened&#x60; | Recipient opened the email (all opens) | | &#x60;uniqueOpened&#x60; | First open per recipient only | | &#x60;clicked&#x60; | Recipient clicked a link (all clicks) | | &#x60;uniqueClicked&#x60; | First click per recipient only | | &#x60;unsubscribed&#x60; | Recipient unsubscribed | | &#x60;spam&#x60; | Recipient marked email as spam |  **Use Cases:** - Audit configured webhook endpoints - Verify webhook URLs are correct - Review enabled events per webhook - Debug webhook delivery issues 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let opts = {
  'limit': 10, // Number | Number of records to return per request. Default 20.
  'offset': 0, // Number | Number of initial records to skip for pagination.
  'search': "api.yoursite.com" // String | Case insensitive search against webhook URLs.
};
apiInstance.getAllWebhooks(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Number of records to return per request. Default 20. | [optional] [default to 20]
 **offset** | **Number**| Number of initial records to skip for pagination. | [optional] [default to 0]
 **search** | **String**| Case insensitive search against webhook URLs. | [optional] 

### Return type

[**[AccountWebhookWithStats]**](AccountWebhookWithStats.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getWebhook

> Webhook getWebhook(webhookId)

Get Webhook

Retrieve detailed information about a specific webhook, including its endpoint URL and enabled events.  **Use Cases:** - Verify webhook configuration - Debug event delivery issues - Check enabled events for a webhook - Audit webhook settings 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let webhookId = 117; // Number | The unique ID of the webhook to retrieve.
apiInstance.getWebhook(webhookId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhookId** | **Number**| The unique ID of the webhook to retrieve. | 

### Return type

[**Webhook**](Webhook.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateWebhook

> Webhook updateWebhook(updateWebhook, webhookId)

Update Webhook

Modify an existing webhook&#39;s configuration. Use this to change the endpoint URL or update which events trigger notifications.  **What Can Be Updated:** - Webhook endpoint URL - Enabled/disabled events - Event-specific settings  **Use Cases:** - Migrate to a new endpoint URL - Enable additional events as needs grow - Disable events to reduce traffic - Update after infrastructure changes 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let updateWebhook = new sendpost.UpdateWebhook(); // UpdateWebhook | 
let webhookId = 117; // Number | The unique ID of the webhook to update.
apiInstance.updateWebhook(updateWebhook, webhookId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateWebhook** | [**UpdateWebhook**](UpdateWebhook.md)|  | 
 **webhookId** | **Number**| The unique ID of the webhook to update. | 

### Return type

[**Webhook**](Webhook.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

