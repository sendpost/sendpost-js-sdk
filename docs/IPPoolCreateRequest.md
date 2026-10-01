# sendpost.IPPoolCreateRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Display name for the IP pool. Must be unique within your account. Use descriptive names like \&quot;transactional\&quot;, \&quot;marketing-bulk\&quot;, \&quot;high-priority\&quot;  | 
**ips** | [**[EIP]**](EIP.md) | List of dedicated IP addresses to include in this pool. IPs must already be allocated to your account.  | [optional] 
**tpsps** | **[Number]** | List of third-party sending provider IDs to include in this pool. TPSPs must be pre-configured in your account.  | [optional] 
**routingStrategy** | **Number** | Email routing strategy: - &#x60;0&#x60; &#x3D; Round Robin (equal distribution) - &#x60;1&#x60; &#x3D; Email Provider Strategy (route by recipient domain) - &#x60;2&#x60; &#x3D; Volume Percentage Strategy (weighted distribution) - &#x60;3&#x60; &#x3D; Sending Domain Strategy (route by sender domain)  | [optional] [default to RoutingStrategyEnum.0]
**routingMetaData** | **String** | JSON-encoded routing configuration. See IPPools documentation for format. Use &#x60;{}&#x60; for round-robin strategy.  | [optional] [default to &#39;{}&#39;]
**shouldOverflow** | **Boolean** | Whether to overflow to shared pool when this pool is unavailable | [optional] [default to false]
**overflowPoolName** | **String** | Name of the IP pool to overflow to (if shouldOverflow is true) | [optional] 



## Enum: RoutingStrategyEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `2` (value: `2`)

* `3` (value: `3`)




