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

Request allocation of a new dedicated IP address to your account. New IPs start in warmup state to build sender reputation gradually.  **Warmup Process:** - New IPs have limited daily sending capacity - Volume increases automatically each day while &#x60;autoWarmupEnabled&#x60; is set - Full capacity typically reached after 30-45 days - Consistent, engagement-positive sending accelerates warmup  **When to Allocate New IPs:** - Scaling beyond current IP capacity - Separating different email streams (transactional vs marketing) - Geographic IP requirements - Replacing an IP with poor reputation  **Best Practices:** - Dedicated IPs require consistent volume (10k+ emails/month ideal) - Low volume on dedicated IPs can harm deliverability - Consider shared IPs for low-volume senders 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
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

Remove an IP address from your account. This action is irreversible.  **⚠️ Before Deleting:** - Remove the IP from all IP pools first - Ensure no active sending relies on this IP - Consider impact on overall sending capacity  **Note:** You cannot delete an IP that is currently assigned to an IP pool. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let ipId = 11322; // Number | The unique ID of the IP resource to delete.
apiInstance.deleteIp(ipId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ipId** | **Number**| The unique ID of the IP resource to delete. | 

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

Retrieve all IP addresses allocated to your account. IPs are the foundation of your sending infrastructure and directly impact deliverability.  **IP Types:** | Type | Value | Description | |------|-------|-------------| | Shared | &#x60;0&#x60; | IP shared with other SendPost senders. Cost-effective, reputation is pooled. | | Dedicated | &#x60;1&#x60; | Exclusive IP for your account. Full control over sender reputation. |  **IP States:** | State | Value | Description | |-------|-------|-------------| | Warmup | &#x60;0&#x60; | New IP building reputation. Volume is limited and gradually increases. | | Normal | &#x60;1&#x60; | Fully warmed IP ready for normal sending volume. |  **Warmup Information:** - &#x60;autoWarmupEnabled&#x60; - Whether SendPost is automatically increasing volume  **Use Cases:** - Monitor IP warmup progress for new IPs - Audit shared vs dedicated IP allocation - Plan IP pool configurations - Check available sending capacity 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let opts = {
  'limit': 50, // Number | Number of records to return per request. Default 20.
  'offset': 0, // Number | Number of initial records to skip for pagination.
  'search': "52.34" // String | Case insensitive search against public IP addresses.
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
 **limit** | **Number**| Number of records to return per request. Default 20. | [optional] [default to 20]
 **offset** | **Number**| Number of initial records to skip for pagination. | [optional] [default to 0]
 **search** | **String**| Case insensitive search against public IP addresses. | [optional] 

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

Retrieve detailed information about a specific IP address, including its warmup status, type, and configuration.  **Use Cases:** - Check warmup progress for a new dedicated IP - Verify IP configuration before adding to a pool - Debug deliverability issues by checking IP state - Monitor auto-warmup progress 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let ipId = 11322; // Number | The unique ID of the IP resource to retrieve.
apiInstance.getSpecificIp(ipId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ipId** | **Number**| The unique ID of the IP resource to retrieve. | 

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

Modify settings for an existing IP address. Use this to manage warmup configuration.  **Configurable Settings:** - &#x60;autoWarmupEnabled&#x60; - Enable/disable automatic warmup schedule  **Use Cases:** - Pause auto-warmup during low-volume periods - Re-enable warmup after manual intervention - Adjust warmup settings based on sending patterns 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPApi();
let iPUpdateRequest = new sendpost.IPUpdateRequest(); // IPUpdateRequest | 
let ipId = 11322; // Number | The unique ID of the IP resource to update.
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
 **ipId** | **Number**| The unique ID of the IP resource to update. | 

### Return type

[**IP**](IP.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

