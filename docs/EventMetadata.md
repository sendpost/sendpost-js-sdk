# sendpost.EventMetadata

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**smtpCode** | **Number** | SMTP response code from the receiving mail server. - 250: Success - 4xx: Temporary failure (soft bounce) - 5xx: Permanent failure (hard bounce)  | [optional] 
**smtpDescription** | **String** | Full SMTP response message from the receiving server. Useful for diagnosing delivery issues.  | [optional] 
**userAgent** | [**UserAgent**](UserAgent.md) | Parsed browser/email client information (for open/click events) | [optional] 
**os** | [**Os**](Os.md) | Parsed operating system information (for open/click events) | [optional] 
**device** | [**Device**](Device.md) | Device type information (for open/click events) | [optional] 
**geo** | [**GeoLocation**](GeoLocation.md) | Geographic location based on IP address (for open/click events) | [optional] 
**clickedUrl** | **String** | The original URL that was clicked (only for click events) | [optional] 
**trackedIp** | **String** | IP address of the user who triggered the event (open/click) | [optional] 
**rawUserAgent** | **String** | Raw User-Agent header string from the HTTP request | [optional] 


