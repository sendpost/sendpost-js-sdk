# sendpost.StatsAApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAccountAggregateStats**](StatsAApi.md#getAccountAggregateStats) | **GET** /account/stat/aggregate | Get Account Aggregate Stats
[**getAccountAggregateStatsByGroup**](StatsAApi.md#getAccountAggregateStatsByGroup) | **GET** /account/stat/aggregate/group | Get Account Group Aggregate Stats
[**getAccountStatsByGroup**](StatsAApi.md#getAccountStatsByGroup) | **GET** /account/stat/group | List Account Group Stats
[**getAllAccountStats**](StatsAApi.md#getAllAccountStats) | **GET** /account/stat | List Account Stats



## getAccountAggregateStats

> AggregateStats getAccountAggregateStats(from, to)

Get Account Aggregate Stats

Retrieve aggregated email statistics for all sub-accounts of a specific account for a given date range.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let from = new Date("2019-01-01"); // Date | The start date for retrieving aggregated stats (inclusive)
let to = new Date("2019-12-31"); // Date | The end date for retrieving aggregated stats (inclusive). The difference between `from` and `to` should not exceed 366 days.
apiInstance.getAccountAggregateStats(from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| The start date for retrieving aggregated stats (inclusive) | 
 **to** | **Date**| The end date for retrieving aggregated stats (inclusive). The difference between &#x60;from&#x60; and &#x60;to&#x60; should not exceed 366 days. | 

### Return type

[**AggregateStats**](AggregateStats.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountAggregateStatsByGroup

> AggregateStat getAccountAggregateStatsByGroup(group, from, to)

Get Account Group Aggregate Stats

Gets aggregated email stats for a specific group in all sub-accounts of a specific account for the given daterange. The maximum daterange for which these stats can be retrieved is 366 days.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let group = "shopify"; // String | Group whose aggregate stats need to be retrieved.
let from = new Date("2019-01-01"); // Date | Date from which stats should be retrieved (should be in the format `YYYY-MM-DD`).
let to = new Date("2019-12-31"); // Date | Date to which stats should be retrieved (should be in the format `YYYY-MM-DD`). Note that the difference between `from` and `to` should not be more than 366 days.
apiInstance.getAccountAggregateStatsByGroup(group, from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| Group whose aggregate stats need to be retrieved. | 
 **from** | **Date**| Date from which stats should be retrieved (should be in the format &#x60;YYYY-MM-DD&#x60;). | 
 **to** | **Date**| Date to which stats should be retrieved (should be in the format &#x60;YYYY-MM-DD&#x60;). Note that the difference between &#x60;from&#x60; and &#x60;to&#x60; should not be more than 366 days. | 

### Return type

[**AggregateStat**](AggregateStat.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountStatsByGroup

> [Stat] getAccountStatsByGroup(group, from, to)

List Account Group Stats

Gets a list of all email stats for all sub-accounts of a specific account by group for a given daterange. The maximum daterange for which these stats can be retrieved is 31 days.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let group = "shopify"; // String | Group whose stats need to be retrieved
let from = new Date("2020-03-12"); // Date | Date from which stats should be retrieved (should be in the format `YYYY-MM-DD`)
let to = new Date("2020-04-14"); // Date | Date to which stats should be retrieved (should be in the format `YYYY-MM-DD`). Note that the difference between `from` and `to` should not be more than 31 days.
apiInstance.getAccountStatsByGroup(group, from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| Group whose stats need to be retrieved | 
 **from** | **Date**| Date from which stats should be retrieved (should be in the format &#x60;YYYY-MM-DD&#x60;) | 
 **to** | **Date**| Date to which stats should be retrieved (should be in the format &#x60;YYYY-MM-DD&#x60;). Note that the difference between &#x60;from&#x60; and &#x60;to&#x60; should not be more than 31 days. | 

### Return type

[**[Stat]**](Stat.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllAccountStats

> [AccountStats] getAllAccountStats(from, to)

List Account Stats

Retrieve email statistics for all sub-accounts of a specific account for a given date range.

### Example

```javascript
import sendpost from 'sendpost-javascript-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let from = new Date("2020-03-12"); // Date | The start date for retrieving stats (inclusive)
let to = new Date("2020-04-14"); // Date | The end date for retrieving stats (inclusive). The difference between `from` and `to` should not exceed 31 days.
apiInstance.getAllAccountStats(from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| The start date for retrieving stats (inclusive) | 
 **to** | **Date**| The end date for retrieving stats (inclusive). The difference between &#x60;from&#x60; and &#x60;to&#x60; should not exceed 31 days. | 

### Return type

[**[AccountStats]**](AccountStats.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

