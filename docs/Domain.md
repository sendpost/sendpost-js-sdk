# sendpost.Domain

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique identifier for the domain | [optional] 
**name** | **String** | The domain name (e.g., \&quot;example.com\&quot;). This is the domain portion of your sending email addresses.  | [optional] 
**dnsProvider** | **String** | Auto-detected DNS provider for this domain (e.g. \&quot;cloudflare\&quot;, \&quot;other\&quot;), used to tailor DNS-setup instructions. Read-only.  | [optional] 
**dkim** | [**DnsRecord**](DnsRecord.md) | DKIM (DomainKeys Identified Mail) DNS record configuration. DKIM cryptographically signs your emails to verify they haven&#39;t been tampered with. This is REQUIRED for sending emails.  | [optional] 
**returnPath** | [**DnsRecord**](DnsRecord.md) | Return-Path (bounce handling) DNS record configuration. Configuring this allows bounce notifications to be properly routed through SendPost. RECOMMENDED for better deliverability.  | [optional] 
**track** | [**DnsRecord**](DnsRecord.md) | Tracking domain DNS record configuration. When configured, click tracking links use your domain instead of SendPost&#39;s domain. RECOMMENDED for brand consistency and improved click-through rates.  | [optional] 
**dmarc** | [**DnsRecord**](DnsRecord.md) | DMARC (Domain-based Message Authentication, Reporting &amp; Conformance) DNS record. DMARC builds on DKIM and SPF to provide email authentication and reporting. RECOMMENDED for enterprise senders.  | [optional] 
**dkimVerified** | **Boolean** | Whether the DKIM DNS record has been verified successfully | [optional] 
**dmarcVerified** | **Boolean** | Whether the DMARC DNS record has been verified successfully | [optional] 
**returnPathVerified** | **Boolean** | Whether the Return-Path DNS record has been verified successfully | [optional] 
**trackVerified** | **Boolean** | Whether the tracking domain DNS record has been verified successfully | [optional] 
**verified** | **Boolean** | Overall verification status. True only if DKIM is verified (minimum requirement). For full verification, configure all DNS records.  | [optional] 
**domainRegisteredDate** | **Date** | Date when this domain was originally registered (from WHOIS). Newer domains may have lower sender reputation initially.  | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds when the domain was added to SendPost | [optional] 
**dkimFailureReason** | **String** | Detailed reason if DKIM verification failed (empty if verified or not attempted) | [optional] 
**dmarcFailureReason** | **String** | Detailed reason if DMARC verification failed | [optional] 
**trackFailureReason** | **String** | Detailed reason if tracking domain verification failed | [optional] 
**returnPathFailureReason** | **String** | Detailed reason if Return-Path verification failed | [optional] 


