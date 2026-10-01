# sendpost.SubAccountApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSubAccount**](SubAccountApi.md#createSubAccount) | **POST** /account/subaccount/ | Create Sub-Account
[**deleteSubAccount**](SubAccountApi.md#deleteSubAccount) | **DELETE** /account/subaccount/{subaccount_id} | Delete Sub-Account
[**getAllSubAccounts**](SubAccountApi.md#getAllSubAccounts) | **GET** /account/subaccount/ | List Sub-Accounts
[**getSubAccount**](SubAccountApi.md#getSubAccount) | **GET** /account/subaccount/{subaccount_id} | Get Sub-Account
[**updateSubAccount**](SubAccountApi.md#updateSubAccount) | **PUT** /account/subaccount/{subaccount_id} | Update Sub-Account



## createSubAccount

> SubAccount createSubAccount(newSubAccount)

Create Sub-Account

Create a new sub-account to segment your email sending. Each sub-account gets its own API key, suppression list, and statistics.  **What You Get:** - Unique &#x60;X-SubAccount-ApiKey&#x60; for authentication - Isolated email statistics - Separate suppression management - Independent domain configuration - Optional SMTP credentials  **Naming Best Practices:** - Use descriptive names: &#x60;Transactional_Orders&#x60;, &#x60;Marketing_Newsletter&#x60; - Include environment: &#x60;Production_Alerts&#x60;, &#x60;Staging_Tests&#x60; - For multi-tenant: &#x60;Client_CompanyName&#x60;  **Use Cases:** - New application or microservice needing email - Onboarding a new client in multi-tenant setup - Creating isolated testing environment - Separating email streams for analytics 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let newSubAccount = new sendpost.NewSubAccount(); // NewSubAccount | 
apiInstance.createSubAccount(newSubAccount).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newSubAccount** | [**NewSubAccount**](NewSubAccount.md)|  | 

### Return type

[**SubAccount**](SubAccount.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteSubAccount

> DeleteSubAccountResponse deleteSubAccount(subaccountId)

Delete Sub-Account

Remove a sub-account from your organization. This action is irreversible.  **⚠️ Before Deleting:** - Export any needed statistics or suppression lists - Update applications using this sub-account&#39;s API key - Ensure no active email sending relies on this sub-account  **What Gets Deleted:** - All sub-account configuration - Associated API keys (will stop working) - Statistics are retained for your account records  **Note:** The default sub-account (type &#x60;0&#x60;) cannot be deleted. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let subaccountId = 12; // Number | The unique ID of the sub-account to delete.
apiInstance.deleteSubAccount(subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subaccountId** | **Number**| The unique ID of the sub-account to delete. | 

### Return type

[**DeleteSubAccountResponse**](DeleteSubAccountResponse.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllSubAccounts

> [SubAccount] getAllSubAccounts(opts)

List Sub-Accounts

Retrieve all sub-accounts under your main account. Sub-accounts allow you to segment email sending for different applications, brands, or use cases.  **Sub-Account Types:** | Type | Value | Description | |------|-------|-------------| | Default | &#x60;0&#x60; | Primary sub-account created with your account (cannot be deleted) | | Custom | &#x60;1&#x60; | Additional sub-accounts you create |  **Each Sub-Account Has:** - Unique &#x60;X-SubAccount-ApiKey&#x60; for API authentication - Independent suppression list - Isolated email statistics - Own domain configurations - SMTP credentials (if enabled)  **Use Cases:** - Separate transactional and marketing emails - Multi-tenant SaaS applications (one sub-account per customer) - Different brands or product lines - Development/staging/production environments  **Note:** &#x60;isPlus&#x60; indicates SendX Plus customers with premium features. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let opts = {
  'limit': 10, // Number | Number of records to return per request. Default 20.
  'offset': 0, // Number | Number of initial records to skip for pagination.
  'search': "Production" // String | Case-insensitive search against sub-account names.
};
apiInstance.getAllSubAccounts(opts).then((data) => {
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
 **search** | **String**| Case-insensitive search against sub-account names. | [optional] 

### Return type

[**[SubAccount]**](SubAccount.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSubAccount

> SubAccount getSubAccount(subaccountId)

Get Sub-Account

Retrieve detailed information about a specific sub-account, including API keys, SMTP credentials, and configuration.  **Response Includes:** - Sub-account name and ID - API key for sub-account authentication - SMTP credentials (if enabled) - Team members with access - Labels/tags for categorization - Creation timestamp 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let subaccountId = 11; // Number | The unique ID of the sub-account to retrieve.
apiInstance.getSubAccount(subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subaccountId** | **Number**| The unique ID of the sub-account to retrieve. | 

### Return type

[**SubAccount**](SubAccount.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateSubAccount

> SubAccount updateSubAccount(updateSubAccount, subaccountId)

Update Sub-Account

Modify settings for an existing sub-account. Use this to rename sub-accounts, update labels, or modify configuration.  **What Can Be Updated:** - Sub-account name - Labels/tags for categorization - Other configuration settings  **Use Cases:** - Rename sub-account for clarity - Update labels for organizational changes - Modify settings after initial setup 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let updateSubAccount = new sendpost.UpdateSubAccount(); // UpdateSubAccount | 
let subaccountId = 12; // Number | The unique ID of the sub-account to update.
apiInstance.updateSubAccount(updateSubAccount, subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateSubAccount** | [**UpdateSubAccount**](UpdateSubAccount.md)|  | 
 **subaccountId** | **Number**| The unique ID of the sub-account to update. | 

### Return type

[**SubAccount**](SubAccount.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

