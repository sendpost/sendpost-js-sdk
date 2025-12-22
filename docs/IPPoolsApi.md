# sendpost.IPPoolsApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createIPPool**](IPPoolsApi.md#createIPPool) | **POST** /account/ippool | Create IPPool
[**deleteIPPool**](IPPoolsApi.md#deleteIPPool) | **DELETE** /account/ippool/{ippool_id} | Delete IPPool
[**getAllIPPools**](IPPoolsApi.md#getAllIPPools) | **GET** /account/ippool | List IPPools
[**getIPPoolById**](IPPoolsApi.md#getIPPoolById) | **GET** /account/ippool/{ippool_id} | Get IPPool
[**updateIPPool**](IPPoolsApi.md#updateIPPool) | **PUT** /account/ippool/{ippool_id} | Update IPPool



## createIPPool

> IPPool createIPPool(iPPoolCreateRequest)

Create IPPool

Creates a new IPPool with the specified name, IPs, and third-party sending providers.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPPoolsApi();
let iPPoolCreateRequest = {"name":"Marketing Promotional","tpsps":[1],"ips":[{"publicIP":"3.238.19.87"}]}; // IPPoolCreateRequest | 
apiInstance.createIPPool(iPPoolCreateRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **iPPoolCreateRequest** | [**IPPoolCreateRequest**](IPPoolCreateRequest.md)|  | 

### Return type

[**IPPool**](IPPool.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteIPPool

> IPPoolDeleteResponse deleteIPPool(ippoolId)

Delete IPPool

Delete a specific IPPool based on its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';

let apiInstance = new sendpost.IPPoolsApi();
let ippoolId = 756; // Number | The ID of the IPPool to delete
apiInstance.deleteIPPool(ippoolId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ippoolId** | **Number**| The ID of the IPPool to delete | 

### Return type

[**IPPoolDeleteResponse**](IPPoolDeleteResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllIPPools

> [IPPool] getAllIPPools(opts)

List IPPools

Retrieves a list of all IPPools and information about all IPs contained in that pool.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPPoolsApi();
let opts = {
  'limit': 10, // Number | Number of records to return per request
  'offset': 0, // Number | Number of initial records to skip
  'search': "Transactional" // String | Case insensitive search against IPPool name
};
apiInstance.getAllIPPools(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Number of records to return per request | [optional] 
 **offset** | **Number**| Number of initial records to skip | [optional] 
 **search** | **String**| Case insensitive search against IPPool name | [optional] 

### Return type

[**[IPPool]**](IPPool.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getIPPoolById

> IPPool getIPPoolById(ippoolId)

Get IPPool

Retrieves details of a specific IPPool based on its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPPoolsApi();
let ippoolId = 74; // Number | The ID of the IPPool whose information you want to retrieve
apiInstance.getIPPoolById(ippoolId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ippoolId** | **Number**| The ID of the IPPool whose information you want to retrieve | 

### Return type

[**IPPool**](IPPool.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateIPPool

> IPPool updateIPPool(iPPoolUpdateRequest, ippoolId)

Update IPPool

Update the details of an existing IPPool by its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';

let apiInstance = new sendpost.IPPoolsApi();
let iPPoolUpdateRequest = {"name":"Marketing Promotional","ips":[{"publicIP":"52.12.10.12"},{"publicIP":"52.10.12.17"},{"publicIP":"35.11.10.5"}]}; // IPPoolUpdateRequest | 
let ippoolId = 756; // Number | The ID of the IPPool to update
apiInstance.updateIPPool(iPPoolUpdateRequest, ippoolId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **iPPoolUpdateRequest** | [**IPPoolUpdateRequest**](IPPoolUpdateRequest.md)|  | 
 **ippoolId** | **Number**| The ID of the IPPool to update | 

### Return type

[**IPPool**](IPPool.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

