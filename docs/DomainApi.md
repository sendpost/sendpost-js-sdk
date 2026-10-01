# sendpost.DomainApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSubAccountDomain**](DomainApi.md#createSubAccountDomain) | **POST** /subaccount/domain | Create Domain
[**deleteSubAccountDomain**](DomainApi.md#deleteSubAccountDomain) | **DELETE** /subaccount/domain/{domain_id} | Delete Domain
[**getAllDomains**](DomainApi.md#getAllDomains) | **GET** /subaccount/domain | List Domains
[**getSubAccountDomain**](DomainApi.md#getSubAccountDomain) | **GET** /subaccount/domain/{domain_id} | Get Domain



## createSubAccountDomain

> Domain createSubAccountDomain(createDomainRequest)

Create Domain

Register a new sending domain with SendPost. After creation, you&#39;ll receive DNS records that must be configured with your DNS provider before you can send emails.  **Domain Setup Process:** 1. Call this endpoint with your domain name 2. Copy the returned DNS records (DKIM, Return-Path, Track, DMARC) 3. Add records to your DNS provider (GoDaddy, Cloudflare, Route53, etc.) 4. Wait for DNS propagation (typically 15 minutes to 48 hours) 5. Verification happens automatically, or trigger manual verification  **DNS Records Explained:** | Record | Purpose | Required | |--------|---------|----------| | DKIM | Cryptographically signs emails to prove authenticity | Yes | | Return-Path | Routes bounce notifications through SendPost | Recommended | | Track | Enables click tracking with your domain | Optional | | DMARC | Adds additional authentication layer | Recommended |  **Best Practices:** - Use a subdomain like &#x60;mail.yourdomain.com&#x60; for sending - Keep your root domain for your website - Configure all records for best deliverability 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let createDomainRequest = new sendpost.CreateDomainRequest(); // CreateDomainRequest | 
apiInstance.createSubAccountDomain(createDomainRequest).then((data) => {
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


## deleteSubAccountDomain

> DeleteResponse deleteSubAccountDomain(domainId)

Delete Domain

Remove a sending domain from your sub-account. Once deleted, you can no longer send emails from addresses on this domain.  **Before Deleting:** - Ensure no active email campaigns use this domain - Update sender addresses in your applications - Consider impact on email deliverability  **Note:** DNS records for the domain will become orphaned. You may want to remove them from your DNS provider. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let domainId = "domainId_example"; // String | The unique ID of the domain to delete.
apiInstance.deleteSubAccountDomain(domainId).then((data) => {
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


## getAllDomains

> [Domain] getAllDomains(opts)

List Domains

Retrieve all sending domains configured for this sub-account. Use this endpoint to audit your domain setup, check verification status, or retrieve DNS records for configuration.  **Each domain record includes:** - Domain name and unique ID - DNS records to configure (DKIM, Return-Path, Track, DMARC) - Verification status for each record type - Failure messages for troubleshooting - Creation timestamp  **Verification Status Values:** - &#x60;true&#x60; - Record verified and active - &#x60;false&#x60; - Record not verified (check DNS configuration)  **Use Cases:** - Audit all configured sending domains - Export DNS records for documentation - Identify domains pending verification - Monitor domain health across multiple domains  **Pagination:** Use &#x60;limit&#x60; and &#x60;offset&#x60; for large domain lists. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let opts = {
  'limit': 20, // Number | Number of records to return per request. Default is 20.
  'offset': 0, // Number | Number of initial records to skip for pagination.
  'search': "mycompany" // String | Case insensitive search against domain names. Useful for finding specific domains in large lists.
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
 **limit** | **Number**| Number of records to return per request. Default is 20. | [optional] [default to 20]
 **offset** | **Number**| Number of initial records to skip for pagination. | [optional] [default to 0]
 **search** | **String**| Case insensitive search against domain names. Useful for finding specific domains in large lists. | [optional] 

### Return type

[**[Domain]**](Domain.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSubAccountDomain

> Domain getSubAccountDomain(domainId)

Get Domain

Retrieve detailed information about a specific sending domain, including DNS record configuration and verification status.  **Response includes:** - Domain name and ID - DKIM, Return-Path, Track, and DMARC DNS records to configure - Verification status for each record type - Failure reasons if verification failed - Domain registration date  **Use Cases:** - Check verification status before sending emails - Retrieve DNS records during domain setup - Debug DNS configuration issues - Audit domain settings for compliance 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.DomainApi();
let domainId = "domainId_example"; // String | The unique ID of the domain to retrieve.
apiInstance.getSubAccountDomain(domainId).then((data) => {
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

