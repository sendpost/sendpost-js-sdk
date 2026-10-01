# sendpost.BlacklistResource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Unique identifier of the blacklist resource entry. | [optional] 
**type** | **String** | The kind of target being monitored (e.g. &#x60;domain&#x60; or &#x60;ip&#x60;). | [optional] 
**target** | **String** | The domain or IP address being monitored for blacklisting. | [optional] 
**addDate** | **Number** | UNIX epoch timestamp when the resource was added to monitoring. | [optional] 
**lastCheck** | **Number** | UNIX epoch timestamp of the most recent blacklist check. | [optional] 
**status** | **String** | Current blacklist status of the target (e.g. &#x60;clean&#x60;, &#x60;listed&#x60;). | [optional] 
**label** | **String** | User-assigned label for the monitored resource. | [optional] 
**contactListId** | **String** | Identifier of the contact list associated with this resource, if any. | [optional] 
**blacklistedCount** | **String** | Number of RBLs the target is currently listed on (string-encoded). | [optional] 
**blacklistedOn** | [**[BlacklistedOn]**](BlacklistedOn.md) | The specific RBLs this target is currently listed on. | [optional] 
**links** | [**BlacklistLinks**](BlacklistLinks.md) |  | [optional] 


