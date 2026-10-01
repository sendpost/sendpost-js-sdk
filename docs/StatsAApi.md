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

Retrieve summarized email statistics across all sub-accounts for a date range. Returns a single aggregated record—perfect for high-level reporting and dashboards.  **Use Cases:** - Annual email program review - Quarterly business reports - Month-over-month comparison - Board-level metrics - ROI calculations for email program  **Example:** Get full year stats for 2024: &#x60;&#x60;&#x60; GET /account/stat/aggregate?from&#x3D;2024-01-01&amp;to&#x3D;2024-12-31 &#x60;&#x60;&#x60;  **Note:** Maximum date range is 366 days (1 year). 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let from = new Date("2024-01-01"); // Date | Start date for aggregation (inclusive). Format YYYY-MM-DD.
let to = new Date("2024-12-31"); // Date | End date for aggregation (inclusive). Max 366 days from `from` date.
apiInstance.getAccountAggregateStats(from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| Start date for aggregation (inclusive). Format YYYY-MM-DD. | 
 **to** | **Date**| End date for aggregation (inclusive). Max 366 days from &#x60;from&#x60; date. | 

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

Retrieve summarized email statistics for a specific group across all sub-accounts. Returns a single aggregated record for the group—ideal for campaign reporting.  **Use Cases:** - Annual performance report for a specific product integration - Compare total metrics for different campaigns - Summarize email performance for a specific customer segment - Calculate ROI for a marketing campaign by group  **Example:** Get yearly stats for Shopify integration: &#x60;&#x60;&#x60; GET /account/stat/aggregate/group?group&#x3D;shopify&amp;from&#x3D;2024-01-01&amp;to&#x3D;2024-12-31 &#x60;&#x60;&#x60;  **Note:** Maximum date range is 366 days (1 year). 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let group = "shopify"; // String | The group/tag name to filter and aggregate statistics by.
let from = new Date("2024-01-01"); // Date | Start date for aggregation (inclusive). Format YYYY-MM-DD.
let to = new Date("2024-12-31"); // Date | End date for aggregation (inclusive). Max 366 days from `from` date.
apiInstance.getAccountAggregateStatsByGroup(group, from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| The group/tag name to filter and aggregate statistics by. | 
 **from** | **Date**| Start date for aggregation (inclusive). Format YYYY-MM-DD. | 
 **to** | **Date**| End date for aggregation (inclusive). Max 366 days from &#x60;from&#x60; date. | 

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

Retrieve daily email statistics for a specific group across all sub-accounts. Returns one record per day, filtered by the group/tag you specify.  **What are Groups?** Groups (tags) are labels attached to emails when sending. They enable segmented analytics across your entire account.  **Common Group Strategies:** | Strategy | Example Groups | |----------|----------------| | By Product | &#x60;shopify&#x60;, &#x60;wordpress&#x60;, &#x60;api-direct&#x60; | | By Type | &#x60;transactional&#x60;, &#x60;marketing&#x60;, &#x60;alerts&#x60; | | By Team | &#x60;sales-team&#x60;, &#x60;support&#x60;, &#x60;engineering&#x60; | | By Campaign | &#x60;black-friday-2024&#x60;, &#x60;summer-sale&#x60; |  **Use Cases:** - Compare performance across products/integrations - Track specific campaign performance account-wide - Analyze transactional vs marketing metrics - Benchmark different teams&#39; email performance  **Note:** Maximum date range is 31 days. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let group = "shopify"; // String | The group/tag name to filter statistics by.
let from = new Date("2024-01-01"); // Date | Start date for stats retrieval (inclusive). Format YYYY-MM-DD.
let to = new Date("2024-01-31"); // Date | End date for stats retrieval (inclusive). Max 31 days from `from` date.
apiInstance.getAccountStatsByGroup(group, from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| The group/tag name to filter statistics by. | 
 **from** | **Date**| Start date for stats retrieval (inclusive). Format YYYY-MM-DD. | 
 **to** | **Date**| End date for stats retrieval (inclusive). Max 31 days from &#x60;from&#x60; date. | 

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

Retrieve daily email statistics aggregated across all sub-accounts. Returns one record per day within the date range—ideal for organization-wide reporting.  **Metrics Per Day:** | Metric | Description | |--------|-------------| | &#x60;processed&#x60; | Total emails submitted across all sub-accounts | | &#x60;delivered&#x60; | Successfully delivered to recipients | | &#x60;dropped&#x60; | Blocked before sending | | &#x60;hardBounced&#x60; | Permanent delivery failures | | &#x60;softBounced&#x60; | Temporary delivery failures | | &#x60;opens&#x60; | Total email opens | | &#x60;clicks&#x60; | Total link clicks | | &#x60;unsubscribed&#x60; | Recipients who unsubscribed | | &#x60;spams&#x60; | Spam complaints received |  **Use Cases:** - Organization-wide email performance dashboard - Billing and usage tracking across all sub-accounts - Executive reporting for email program health - Trend analysis across your entire email operation  **Note:** Maximum date range is 31 days. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: accountAuth
let accountAuth = defaultClient.authentications['accountAuth'];
accountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//accountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.StatsAApi();
let from = new Date("2024-01-01"); // Date | Start date for stats retrieval (inclusive). Format YYYY-MM-DD.
let to = new Date("2024-01-31"); // Date | End date for stats retrieval (inclusive). Max 31 days from `from` date.
apiInstance.getAllAccountStats(from, to).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **Date**| Start date for stats retrieval (inclusive). Format YYYY-MM-DD. | 
 **to** | **Date**| End date for stats retrieval (inclusive). Max 31 days from &#x60;from&#x60; date. | 

### Return type

[**[AccountStats]**](AccountStats.md)

### Authorization

[accountAuth](../README.md#accountAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

