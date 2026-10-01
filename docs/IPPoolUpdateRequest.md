# sendpost.IPPoolUpdateRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | New display name for the IP pool | [optional] 
**ips** | [**[EIP]**](EIP.md) | Updated list of IP addresses for this pool. This replaces the current IP list - include all IPs you want in the pool.  | [optional] 
**tpsps** | **[Number]** | Updated list of third-party sending provider IDs | [optional] 
**routingStrategy** | **Number** | Updated routing strategy (see IPPoolCreateRequest for values) | [optional] 
**routingMetaData** | **String** | Updated routing configuration (JSON) | [optional] 
**shouldOverflow** | **Boolean** | Whether to enable overflow to backup pool | [optional] 
**overflowPoolName** | **String** | Name of the overflow pool | [optional] 



## Enum: RoutingStrategyEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `2` (value: `2`)

* `3` (value: `3`)




