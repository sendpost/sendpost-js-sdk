# sendpost.SuppressionApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSuppression**](SuppressionApi.md#createSuppression) | **POST** /subaccount/suppression | Create Suppressions
[**deleteSuppression**](SuppressionApi.md#deleteSuppression) | **DELETE** /subaccount/suppression | Delete Suppressions
[**getSuppressionList**](SuppressionApi.md#getSuppressionList) | **GET** /subaccount/suppression | List Suppressions



## createSuppression

> [Suppression] createSuppression(createSuppressionRequest)

Create Suppressions

Creates new suppressions by posting to the suppression resource. You can specify different types of suppressions including &#x60;hardBounce&#x60;, &#x60;manual&#x60;, &#x60;unsubscribe&#x60;, and &#x60;spamComplaint&#x60;. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SuppressionApi();
let createSuppressionRequest = new sendpost.CreateSuppressionRequest(); // CreateSuppressionRequest | 
apiInstance.createSuppression(createSuppressionRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createSuppressionRequest** | [**CreateSuppressionRequest**](CreateSuppressionRequest.md)|  | 

### Return type

[**[Suppression]**](Suppression.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteSuppression

> [DeleteSuppression200ResponseInner] deleteSuppression(deleteSuppressionRequest)

Delete Suppressions

Deletes one or more suppressions for a given sub-account. The request can contain a list of emails to delete specific suppressions or delete a single suppression. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SuppressionApi();
let deleteSuppressionRequest = new sendpost.DeleteSuppressionRequest(); // DeleteSuppressionRequest | 
apiInstance.deleteSuppression(deleteSuppressionRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deleteSuppressionRequest** | [**DeleteSuppressionRequest**](DeleteSuppressionRequest.md)|  | 

### Return type

[**[DeleteSuppression200ResponseInner]**](DeleteSuppression200ResponseInner.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getSuppressionList

> [Suppression] getSuppressionList(from, to, opts)

List Suppressions

Retrieves a list of suppressions associated with a specific sub-account within a given date range. The maximum difference between &#x60;from&#x60; and &#x60;to&#x60; dates should not exceed 60 days. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SuppressionApi();
let from = new Date("2013-10-20"); // Date | Start date for the suppression records
let to = new Date("2013-10-20"); // Date | End date for the suppression records (Note: `from` should be earlier than `to` and the date range should not exceed 60 days) 
let opts = {
  'limit': 20, // Number | Number of records to return per request
  'offset': 0, // Number | Number of initial records to skip
  'search': "search_example", // String | Case-insensitive search against suppression email
  'type': "type_example" // String | Type of suppression. Valid values: `hardBounce`, `manual`, `spamComplaint`, `unsubscribe` 
};
apiInstance.getSuppressionList(from, to, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| Start date for the suppression records | 
 **to** | **Date**| End date for the suppression records (Note: &#x60;from&#x60; should be earlier than &#x60;to&#x60; and the date range should not exceed 60 days)  | 
 **limit** | **Number**| Number of records to return per request | [optional] [default to 20]
 **offset** | **Number**| Number of initial records to skip | [optional] [default to 0]
 **search** | **String**| Case-insensitive search against suppression email | [optional] 
 **type** | **String**| Type of suppression. Valid values: &#x60;hardBounce&#x60;, &#x60;manual&#x60;, &#x60;spamComplaint&#x60;, &#x60;unsubscribe&#x60;  | [optional] 

### Return type

[**[Suppression]**](Suppression.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

