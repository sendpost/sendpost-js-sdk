# sendpost.DomainApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAllDomains**](DomainApi.md#getAllDomains) | **GET** /subaccount/domain | List Domains
[**subaccountDomainDomainIdDelete**](DomainApi.md#subaccountDomainDomainIdDelete) | **DELETE** /subaccount/domain/{domain_id} | Delete Domain
[**subaccountDomainDomainIdGet**](DomainApi.md#subaccountDomainDomainIdGet) | **GET** /subaccount/domain/{domain_id} | Get Domain
[**subaccountDomainPost**](DomainApi.md#subaccountDomainPost) | **POST** /subaccount/domain | Create Domain



## getAllDomains

> [Domain] getAllDomains(opts)

List Domains

Retrieve a list of all domains associated with the sub-account, including their DNS records and authentication status. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let opts = {
  'limit': 56, // Number | Number of records to return per request
  'offset': 56, // Number | Number of initial records to skip
  'search': "search_example" // String | Case insensitive search against domain names
};
apiInstance.getAllDomains(opts).then((data) => {
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
 **search** | **String**| Case insensitive search against domain names | [optional] 

### Return type

[**[Domain]**](Domain.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## subaccountDomainDomainIdDelete

> DeleteResponse subaccountDomainDomainIdDelete(domainId)

Delete Domain

Delete a specific domain using its &#x60;id&#x60;.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let domainId = "domainId_example"; // String | The unique ID of the domain to delete.
apiInstance.subaccountDomainDomainIdDelete(domainId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domainId** | **String**| The unique ID of the domain to delete. | 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## subaccountDomainDomainIdGet

> Domain subaccountDomainDomainIdGet(domainId)

Get Domain

Retrieve details of a specific domain using its &#x60;id&#x60;.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let domainId = "domainId_example"; // String | The unique ID of the domain to retrieve.
apiInstance.subaccountDomainDomainIdGet(domainId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domainId** | **String**| The unique ID of the domain to retrieve. | 

### Return type

[**Domain**](Domain.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## subaccountDomainPost

> Domain subaccountDomainPost(createDomainRequest)

Create Domain

Add a new domain using its &#x60;name&#x60;.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let createDomainRequest = new sendpost.CreateDomainRequest(); // CreateDomainRequest | 
apiInstance.subaccountDomainPost(createDomainRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createDomainRequest** | [**CreateDomainRequest**](CreateDomainRequest.md)|  | 

### Return type

[**Domain**](Domain.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

