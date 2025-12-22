# sendpost.IPPool

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** |  | [optional] 
**name** | **String** |  | [optional] 
**created** | **Number** |  | [optional] 
**ips** | [**[IP]**](IP.md) |  | [optional] 
**thirdPartySendingProviders** | [**[ThirdPartySendingProvider]**](ThirdPartySendingProvider.md) |  | [optional] 
**routingStrategy** | **Number** |  | [optional] 
**routingMetaData** | **String** |  | [optional] 
**autoWarmupEnabled** | **Boolean** |  | [optional] 
**infraMonitor** | **Boolean** |  | [optional] 
**ipDomainWarmupStatus** | **String** |  | [optional] 
**shouldOverflow** | **Boolean** | Indicates whether the IP should overflow, once email capacity of the IP Pool has been reached, should we send remaining emails over shared IP or not | [optional] 
**overflowPoolName** | **String** | The name of the overflow pool | [optional] 
**warmupInterval** | **Number** | The interval for the warmup | [optional] 


