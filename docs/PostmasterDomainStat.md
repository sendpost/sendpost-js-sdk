# sendpost.PostmasterDomainStat

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The domain these Postmaster statistics belong to. | [optional] 
**date** | **String** | The date these statistics apply to (YYYY-MM-DD, UTC). | [optional] 
**domainReputation** | **String** | Google&#39;s reputation rating for the domain (e.g. &#x60;HIGH&#x60;, &#x60;MEDIUM&#x60;, &#x60;LOW&#x60;, &#x60;BAD&#x60;).  | [optional] 
**spam** | **String** | User-reported spam rate for the domain (fraction, string-encoded). | [optional] 
**dkimSuccess** | **String** | Fraction of mail that passed DKIM authentication (string-encoded). | [optional] 
**spfSuccess** | **String** | Fraction of mail that passed SPF authentication (string-encoded). | [optional] 
**dmarcSuccess** | **String** | Fraction of mail that passed DMARC authentication (string-encoded). | [optional] 


