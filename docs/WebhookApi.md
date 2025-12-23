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

> Webhook createWebhook(createWebhookRequest)

Create Webhook

Create a new webhook by specifying its properties.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let createWebhookRequest = new sendpost.CreateWebhookRequest(); // CreateWebhookRequest | 
apiInstance.createWebhook(createWebhookRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createWebhookRequest** | [**CreateWebhookRequest**](CreateWebhookRequest.md)|  | 

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

Delete a webhook by its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let webhookId = 117; // Number | ID of the webhook to delete.
apiInstance.deleteWebhook(webhookId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhookId** | **Number**| ID of the webhook to delete. | 

### Return type

[**DeleteWebhookResponse**](DeleteWebhookResponse.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllWebhooks

> [Webhook] getAllWebhooks(opts)

List Webhooks

Retrieves a list of all webhooks, their endpoints, and the events for which they are active.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let opts = {
  'limit': 10, // Number | Number of records to return per request.
  'offset': 0, // Number | Number of initial records to skip.
  'search': "hooli" // String | Case insensitive search against webhook URL.
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
 **limit** | **Number**| Number of records to return per request. | [optional] 
 **offset** | **Number**| Number of initial records to skip. | [optional] 
 **search** | **String**| Case insensitive search against webhook URL. | [optional] 

### Return type

[**[Webhook]**](Webhook.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getWebhook

> Webhook getWebhook(webhookId)

Get Webhook

Retrieves a specific webhook based on its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let webhookId = 117; // Number | The ID of the webhook to retrieve.
apiInstance.getWebhook(webhookId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhookId** | **Number**| The ID of the webhook to retrieve. | 

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

Update the properties of an existing webhook.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.WebhookApi();
let updateWebhook = new sendpost.UpdateWebhook(); // UpdateWebhook | 
let webhookId = 117; // Number | ID of the webhook to update.
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
 **webhookId** | **Number**| ID of the webhook to update. | 

### Return type

[**Webhook**](Webhook.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

