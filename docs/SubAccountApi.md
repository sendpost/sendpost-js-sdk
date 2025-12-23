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

> SubAccount createSubAccount(createSubAccountRequest)

Create Sub-Account

Creates a new sub-account under the current account.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let createSubAccountRequest = new sendpost.CreateSubAccountRequest(); // CreateSubAccountRequest | 
apiInstance.createSubAccount(createSubAccountRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createSubAccountRequest** | [**CreateSubAccountRequest**](CreateSubAccountRequest.md)|  | 

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

Deletes a specific sub-account by its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let subaccountId = 12; // Number | The ID of the sub-account to delete.
apiInstance.deleteSubAccount(subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subaccountId** | **Number**| The ID of the sub-account to delete. | 

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

Retrieves a list of all sub-accounts associated with a specific account.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let opts = {
  'limit': 10, // Number | Number of records to return per request.
  'offset': 0, // Number | Number of initial records to skip.
  'search': "Hooli" // String | Case-insensitive search against the sub-account name.
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
 **limit** | **Number**| Number of records to return per request. | [optional] 
 **offset** | **Number**| Number of initial records to skip. | [optional] 
 **search** | **String**| Case-insensitive search against the sub-account name. | [optional] 

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

Retrieves a specific sub-account by its ID.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let subaccountId = 11; // Number | The ID of the sub-account to retrieve.
apiInstance.getSubAccount(subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subaccountId** | **Number**| The ID of the sub-account to retrieve. | 

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

Updates the details of an existing sub-account.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SubAccountApi();
let updateSubAccount = new sendpost.UpdateSubAccount(); // UpdateSubAccount | 
let subaccountId = 12; // Number | The ID of the sub-account to update.
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
 **subaccountId** | **Number**| The ID of the sub-account to update. | 

### Return type

[**SubAccount**](SubAccount.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

