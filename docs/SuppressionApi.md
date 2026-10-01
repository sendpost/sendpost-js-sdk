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

Add email addresses to your suppression list to prevent future emails from being sent. This is essential for maintaining sender reputation and compliance.  **When to Use Each Type:** | Type | Use When | |------|----------| | &#x60;hardBounce&#x60; | You know an address is permanently invalid | | &#x60;manual&#x60; | Processing do-not-contact requests from support | | &#x60;unsubscribe&#x60; | Syncing unsubscribes from external systems | | &#x60;spamComplaint&#x60; | Importing complaints from other providers |  **Common Use Cases:** - **Migration:** Import suppression list from previous email provider - **CRM Sync:** Add unsubscribes from your marketing platform - **Bulk Cleanup:** Add known invalid addresses from data cleaning - **Support Tickets:** Honor do-not-contact requests  **Best Practices:** - Import historical bounce data when migrating providers - Sync unsubscribes immediately when received from external sources - Process support-requested suppressions within 24 hours - Use &#x60;manual&#x60; for addresses you want to suppress without categorization 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
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

> DeleteSuppression200Response deleteSuppression(deleteSuppressionRequest)

Delete Suppressions

Remove email addresses from your suppression list, allowing them to receive emails again.  **⚠️ Important: Use with caution!** Re-enabling sending to previously suppressed addresses can harm your sender reputation if used incorrectly.  **Valid Use Cases:** - User confirms their valid email was incorrectly bounced - Manual suppression was added by mistake - User explicitly requests re-subscription after unsubscribing - Testing/development addresses that were suppressed  **Not Recommended:** - Bulk removing hard bounces without individual verification - Removing spam complaints (users rarely want to receive emails again) - Attempting to re-engage addresses that bounced  **Best Practice:** Before removing a suppression, verify with the recipient that they want to receive emails and that their address is valid. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
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

[**DeleteSuppression200Response**](DeleteSuppression200Response.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getSuppressionList

> [Suppression] getSuppressionList(from, to, opts)

List Suppressions

Retrieve the suppression list for your sub-account. Suppressions are email addresses that should not receive emails to protect your sender reputation and ensure compliance.  **Suppression Types:** | Type | Reason Code | Description | |------|-------------|-------------| | &#x60;manual&#x60; | 0 | Manually added by your team | | &#x60;unsubscribe&#x60; | 1 | User clicked unsubscribe link | | &#x60;hardBounce&#x60; | 2 | Permanent delivery failure (invalid address) | | &#x60;spamComplaint&#x60; | 3 | User marked email as spam |  **Why Suppressions Matter:** - **Reputation Protection:** Repeatedly sending to bounced addresses damages sender reputation - **Compliance:** Required for CAN-SPAM, GDPR, and other regulations - **Cost Savings:** Avoid paying to send undeliverable emails - **Deliverability:** ISPs penalize senders with high bounce/complaint rates  **Use Cases:** - Export suppression list for compliance audits - Sync suppressions with your CRM or marketing platform - Review recent bounces to identify data quality issues - Monitor spam complaints for content/targeting problems  **Pagination:** Use &#x60;limit&#x60; and &#x60;offset&#x60; for large suppression lists.  **Note:** Maximum date range is 60 days. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.SuppressionApi();
let from = new Date("2024-01-01"); // Date | Start date for suppression records (inclusive). Format YYYY-MM-DD.
let to = new Date("2024-01-31"); // Date | End date for suppression records (inclusive). Max 60 days from `from` date.
let opts = {
  'limit': 50, // Number | Number of records to return per request. Default 20, max 100.
  'offset': 0, // Number | Number of initial records to skip for pagination.
  'search': "@example.com", // String | Case-insensitive search against suppression email addresses.
  'type': "hardBounce" // String | Filter by suppression type. Omit to return all types.
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
 **from** | **Date**| Start date for suppression records (inclusive). Format YYYY-MM-DD. | 
 **to** | **Date**| End date for suppression records (inclusive). Max 60 days from &#x60;from&#x60; date. | 
 **limit** | **Number**| Number of records to return per request. Default 20, max 100. | [optional] [default to 20]
 **offset** | **Number**| Number of initial records to skip for pagination. | [optional] [default to 0]
 **search** | **String**| Case-insensitive search against suppression email addresses. | [optional] 
 **type** | **String**| Filter by suppression type. Omit to return all types. | [optional] 

### Return type

[**[Suppression]**](Suppression.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

