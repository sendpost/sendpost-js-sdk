# sendpost.StatsApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accountSubaccountStatSubaccountIdAggregateGet**](StatsApi.md#accountSubaccountStatSubaccountIdAggregateGet) | **GET** /account/subaccount/stat/{subaccount_id}/aggregate | Get Aggregate Stats
[**accountSubaccountStatSubaccountIdGet**](StatsApi.md#accountSubaccountStatSubaccountIdGet) | **GET** /account/subaccount/stat/{subaccount_id} | List Stats
[**getAggregateStatsByGroup**](StatsApi.md#getAggregateStatsByGroup) | **GET** /account/subaccount/stat/{subaccount_id}/group | Get Group Aggregate Stats



## accountSubaccountStatSubaccountIdAggregateGet

> AggregateStat accountSubaccountStatSubaccountIdAggregateGet(from, to, subaccountId)

Get Aggregate Stats

Retrieves aggregated email stats for a specific sub-account for a date range.   **Note**: The maximum date range is 366 days. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsApi();
let from = new Date("2013-10-20"); // Date | Start date for stats retrieval.
let to = new Date("2013-10-20"); // Date | Date to which stats should be retrieved ( Note than from date should be earlier than to date. Also the difference between from and to date shouldn't ne more than 60 days ) 
let subaccountId = 11; // Number | The ID of the subaccount to retrieve
apiInstance.accountSubaccountStatSubaccountIdAggregateGet(from, to, subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| Start date for stats retrieval. | 
 **to** | **Date**| Date to which stats should be retrieved ( Note than from date should be earlier than to date. Also the difference between from and to date shouldn&#39;t ne more than 60 days )  | 
 **subaccountId** | **Number**| The ID of the subaccount to retrieve | 

### Return type

[**AggregateStat**](AggregateStat.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## accountSubaccountStatSubaccountIdGet

> [Stat] accountSubaccountStatSubaccountIdGet(from, to, subaccountId)

List Stats

Retrieves a list of email stats for a specific sub-account within a given date range. Both &#x60;from&#x60; and &#x60;to&#x60; dates are inclusive.   **Note**: The maximum date range is 31 days. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsApi();
let from = new Date("2013-10-20"); // Date | Start date for stats retrieval.
let to = new Date("2013-10-20"); // Date | Date to which stats should be retrieved ( Note than from date should be earlier than to date. Also the difference between from and to date shouldn't ne more than 60 days ) 
let subaccountId = 11; // Number | The ID of the subaccount to retrieve
apiInstance.accountSubaccountStatSubaccountIdGet(from, to, subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| Start date for stats retrieval. | 
 **to** | **Date**| Date to which stats should be retrieved ( Note than from date should be earlier than to date. Also the difference between from and to date shouldn&#39;t ne more than 60 days )  | 
 **subaccountId** | **Number**| The ID of the subaccount to retrieve | 

### Return type

[**[Stat]**](Stat.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAggregateStatsByGroup

> AggregateStat getAggregateStatsByGroup(group, from, to, subaccountId)

Get Group Aggregate Stats

Retrieves aggregated email stats for a specific group in a sub-account for the specified daterange. The maximum daterange for which these stats can be retrieved is 366 days. Ensure that the difference between the &#x60;from&#x60; and &#x60;to&#x60; dates does not exceed 366 days. 

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsApi();
let group = "group_example"; // String | Group whose aggregated stats need to be retrieved
let from = new Date("2013-10-20"); // Date | The starting date for the aggregated stats
let to = new Date("2013-10-20"); // Date | The ending date for the aggregated stats (Note: `from` should be earlier than `to` and the date range should not exceed 366 days) 
let subaccountId = 11; // Number | The ID of the subaccount to retrieve
apiInstance.getAggregateStatsByGroup(group, from, to, subaccountId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| Group whose aggregated stats need to be retrieved | 
 **from** | **Date**| The starting date for the aggregated stats | 
 **to** | **Date**| The ending date for the aggregated stats (Note: &#x60;from&#x60; should be earlier than &#x60;to&#x60; and the date range should not exceed 366 days)  | 
 **subaccountId** | **Number**| The ID of the subaccount to retrieve | 

### Return type

[**AggregateStat**](AggregateStat.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

