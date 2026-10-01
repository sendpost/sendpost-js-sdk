# sendpost.Label

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique identifier for the label | [optional] 
**name** | **String** | Display name for the label (max 50 characters) | [optional] 
**color** | **String** | Hex color code for visual identification in the dashboard. Format: 6-character hex without # prefix.  | [optional] 
**type** | **Number** | Resource type this label applies to: - &#x60;0&#x60; &#x3D; IP label - &#x60;1&#x60; &#x3D; Sub-account label - &#x60;2&#x60; &#x3D; IP Pool label  | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds when the label was created | [optional] 



## Enum: TypeEnum


* `0` (value: `0`)

* `1` (value: `1`)

* `2` (value: `2`)




