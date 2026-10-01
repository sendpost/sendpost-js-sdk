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

Create a new IP pool to organize your sending infrastructure. Pools group IPs and third-party sending providers (TPSPs) for intelligent routing.  **Pool Components:** - **IPs:** Dedicated IP addresses from your account - **TPSPs:** Third-party sending providers (SendGrid, Mailgun, etc.)  **TPSP Types:** | Value | Provider | |-------|----------| | &#x60;0&#x60; | Amazon SES | | &#x60;1&#x60; | SendGrid | | &#x60;2&#x60; | Mailgun | | &#x60;3&#x60; | Custom SMTP | | &#x60;4&#x60; | PostMark | | &#x60;5&#x60; | Gmail |  **Routing Strategies:** - &#x60;0&#x60; &#x3D; Round Robin - Distribute traffic evenly - &#x60;1&#x60; &#x3D; Email Provider - Route by recipient&#39;s mailbox provider - &#x60;2&#x60; &#x3D; Volume Percentage - Split by defined percentages - &#x60;3&#x60; &#x3D; Sending Domain - Route by your from domain  **Use Cases:** - Separate transactional from marketing emails - Route high-volume traffic through TPSPs - Implement provider-specific routing for deliverability - Create backup pools for failover  **Naming Best Practices:** - Use descriptive names: &#x60;Transactional_Orders&#x60;, &#x60;Marketing_Newsletter&#x60; - Include purpose: &#x60;HighPriority_Alerts&#x60;, &#x60;Bulk_Promotions&#x60; 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
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

Remove an IP pool from your account. This action is irreversible.  **⚠️ Before Deleting:** - Ensure no sub-accounts are actively using this pool - Update any sending configurations that reference this pool - IPs in the pool will become unassigned (not deleted)  **Note:** The default system pool cannot be deleted. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPPoolsApi();
let ippoolId = 756; // Number | The unique ID of the IP pool to delete.
apiInstance.deleteIPPool(ippoolId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ippoolId** | **Number**| The unique ID of the IP pool to delete. | 

### Return type

[**IPPoolDeleteResponse**](IPPoolDeleteResponse.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllIPPools

> [IPPool] getAllIPPools(opts)

List IPPools

Retrieve all IP pools configured for your account. IP pools group IPs and third-party sending providers (TPSPs) for intelligent traffic routing.  **Pool Types:** | Type | Value | Description | |------|-------|-------------| | Shared | &#x60;0&#x60; | Pool uses shared IPs (shared with other SendPost customers) | | Dedicated | &#x60;1&#x60; | Pool uses dedicated IPs (exclusive to your account) |  **Routing Strategies:** | Strategy | Value | Description | |----------|-------|-------------| | Round Robin | &#x60;0&#x60; | Distribute traffic evenly across pool members | | Email Provider | &#x60;1&#x60; | Route based on recipient&#39;s mailbox provider (Gmail, Yahoo, etc.) | | Volume Percentage | &#x60;2&#x60; | Split traffic by defined percentages | | Sending Domain | &#x60;3&#x60; | Route based on your sending domain |  **Use Cases:** - Audit your sending infrastructure configuration - View IPs and TPSPs in each pool - Plan routing strategy changes - Verify pool setup before sending campaigns 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPPoolsApi();
let opts = {
  'limit': 10, // Number | Number of records to return per request. Default 20.
  'offset': 0, // Number | Number of initial records to skip for pagination.
  'search': "Transactional" // String | Case insensitive search against IP pool names.
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
 **limit** | **Number**| Number of records to return per request. Default 20. | [optional] [default to 20]
 **offset** | **Number**| Number of initial records to skip for pagination. | [optional] [default to 0]
 **search** | **String**| Case insensitive search against IP pool names. | [optional] 

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

Retrieve complete details about a specific IP pool, including all IPs and TPSPs assigned to it.  **Response Includes:** - Pool name, ID, and creation date - Complete list of IPs with warmup status - All configured TPSPs with their settings - Current routing strategy and metadata - Warmup and monitoring configuration  **Use Cases:** - Verify pool configuration before sending - Check which IPs/TPSPs are in a pool - Debug routing issues - Audit pool settings for compliance 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.IPPoolsApi();
let ippoolId = 74; // Number | The unique ID of the IP pool to retrieve.
apiInstance.getIPPoolById(ippoolId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ippoolId** | **Number**| The unique ID of the IP pool to retrieve. | 

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

Modify an existing IP pool&#39;s configuration, including name, IPs, TPSPs, and routing strategy.  **What Can Be Updated:** - Pool name - IP addresses assigned to the pool - Third-party sending providers (TPSPs) - Routing strategy and metadata - Warmup and monitoring settings  **Use Cases:** - Add new IPs to scale capacity - Remove underperforming IPs - Change routing strategy - Add/remove TPSP integrations - Rename pool for clarity  **Best Practices:** - Test routing changes during low-traffic periods - Ensure at least one sending option remains in the pool - Document changes for team awareness 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';

let apiInstance = new sendpost.IPPoolsApi();
let iPPoolUpdateRequest = {"name":"Marketing Promotional","ips":[{"publicIP":"52.12.10.12"},{"publicIP":"52.10.12.17"},{"publicIP":"35.11.10.5"}]}; // IPPoolUpdateRequest | 
let ippoolId = 756; // Number | The unique ID of the IP pool to update.
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
 **ippoolId** | **Number**| The unique ID of the IP pool to update. | 

### Return type

[**IPPool**](IPPool.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

