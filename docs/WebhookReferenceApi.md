# sendpost.WebhookReferenceApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**sendPostWebhooksPost**](WebhookReferenceApi.md#sendPostWebhooksPost) | **POST** /SendPostWebhooks | SendPost Webhook Object



## sendPostWebhooksPost

> sendPostWebhooksPost(opts)

SendPost Webhook Object

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';

let apiInstance = new sendpost.WebhookReferenceApi();
let opts = {
  'webhookObject': new sendpost.WebhookObject() // WebhookObject | 
};
apiInstance.sendPostWebhooksPost(opts).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhookObject** | [**WebhookObject**](WebhookObject.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

