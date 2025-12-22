# sendpost.Domain

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique ID for the domain. | [optional] 
**name** | **String** | Name of the domain. | [optional] 
**dkim** | [**DomainDkim**](DomainDkim.md) |  | [optional] 
**returnPath** | [**DomainReturnPath**](DomainReturnPath.md) |  | [optional] 
**track** | [**DomainTrack**](DomainTrack.md) |  | [optional] 
**dmarc** | [**DomainDmarc**](DomainDmarc.md) |  | [optional] 
**dkimConfig** | **String** | DKIM configuration | [optional] 
**dkimVerified** | **Boolean** | Status of DKIM verification ( true or false ) | [optional] 
**dmarcVerified** | **Boolean** | Status of DMARC verification ( true or false) | [optional] 
**returnPathVerified** | **Boolean** | Status of ReturnPath verification ( true or false ) | [optional] 
**trackVerified** | **Boolean** | Status of Track verification ( true or false ) | [optional] 
**verified** | **Boolean** | Overall verification status of the domain | [optional] 
**domainRegisteredDate** | **String** | Date when the domain was registered | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds. | [optional] 
**gptVerified** | **Boolean** | Status of GPT verification ( true or false ) | [optional] 
**gpt** | [**DomainGpt**](DomainGpt.md) |  | [optional] 
**dmarcFailureReason** | **String** | Reason for DMARC verification failure | [optional] 
**dkimFailureReason** | **String** | Reason for DKIM verification failure | [optional] 
**trackFailureReason** | **String** | Reason for Track verification failure | [optional] 
**returnPathFailureReason** | **String** | Reason for ReturnPath verification failure | [optional] 


