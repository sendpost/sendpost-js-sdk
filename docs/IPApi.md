# sendpost.IPApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**allocateNewIp**](IPApi.md#allocateNewIp) | **PUT** /account/ip/allocate | Allocate IP
[**deleteIp**](IPApi.md#deleteIp) | **DELETE** /account/ip/{ip_id} | Delete IP
[**getAllIps**](IPApi.md#getAllIps) | **GET** /account/ip/ | List IPs
[**getSpecificIp**](IPApi.md#getSpecificIp) | **GET** /account/ip/{ip_id} | Get IP
[**updateIp**](IPApi.md#updateIp) | **PUT** /account/ip/{ip_id} | Update IP



## allocateNewIp

> IP allocateNewIp(iPAllocationRequest)

Allocate IP

Allocates a new IP resource to the account. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let iPAllocationRequest = new sendpost.IPAllocationRequest(); // IPAllocationRequest | 
apiInstance.allocateNewIp(iPAllocationRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **iPAllocationRequest** | [**IPAllocationRequest**](IPAllocationRequest.md)|  | 

### Return type

[**IP**](IP.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteIp

> IPDeletionResponse deleteIp(ipId)

Delete IP

Deletes a specific IP resource based on the provided IP ID. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let ipId = 56; // Number | The ID of the IP resource to delete
apiInstance.deleteIp(ipId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ipId** | **Number**| The ID of the IP resource to delete | 

### Return type

[**IPDeletionResponse**](IPDeletionResponse.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllIps

> [IP] getAllIps(opts)

List IPs

Retrieves a list of all IPs associated with the main account. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let opts = {
  'limit': 56, // Number | Number of records to return per request
  'offset': 56, // Number | Number of initial records to skip
  'search': "search_example" // String | Case insensitive search against IP's public IP address
};
apiInstance.getAllIps(opts).then((data) => {
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
 **search** | **String**| Case insensitive search against IP&#39;s public IP address | [optional] 

### Return type

[**[IP]**](IP.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSpecificIp

> IP getSpecificIp(ipId)

Get IP

Retrieves detailed information about a specific IP based on the provided ID. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let ipId = 56; // Number | The ID of the IP resource to retrieve
apiInstance.getSpecificIp(ipId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ipId** | **Number**| The ID of the IP resource to retrieve | 

### Return type

[**IP**](IP.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateIp

> IP updateIp(iPUpdateRequest, ipId)

Update IP

Updates an existing IP resource based on the provided IP ID. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let iPUpdateRequest = new sendpost.IPUpdateRequest(); // IPUpdateRequest | 
let ipId = 56; // Number | The ID of the IP resource to update
apiInstance.updateIp(iPUpdateRequest, ipId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **iPUpdateRequest** | [**IPUpdateRequest**](IPUpdateRequest.md)|  | 
 **ipId** | **Number**| The ID of the IP resource to update | 

### Return type

[**IP**](IP.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

