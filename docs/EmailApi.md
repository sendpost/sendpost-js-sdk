# sendpost.EmailApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**sendEmail**](EmailApi.md#sendEmail) | **POST** /subaccount/email/ | Send Email
[**sendEmailWithTemplate**](EmailApi.md#sendEmailWithTemplate) | **POST** /subaccount/email/template | Send Email With Template



## sendEmail

> [EmailResponse] sendEmail(emailMessageObject)

Send Email

Use this API to send either a single or batch email.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.EmailApi();
let emailMessageObject = new sendpost.EmailMessageObject(); // EmailMessageObject | Email message details
apiInstance.sendEmail(emailMessageObject).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailMessageObject** | [**EmailMessageObject**](EmailMessageObject.md)| Email message details | 

### Return type

[**[EmailResponse]**](EmailResponse.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sendEmailWithTemplate

> [EmailResponse] sendEmailWithTemplate(emailMessageWithTemplate)

Send Email With Template

Use this API to send an email with a predefined template. This makes it easy to integrate transactional emails with minimal code. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.EmailApi();
let emailMessageWithTemplate = new sendpost.EmailMessageWithTemplate(); // EmailMessageWithTemplate | Email message details with template information
apiInstance.sendEmailWithTemplate(emailMessageWithTemplate).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailMessageWithTemplate** | [**EmailMessageWithTemplate**](EmailMessageWithTemplate.md)| Email message details with template information | 

### Return type

[**[EmailResponse]**](EmailResponse.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

