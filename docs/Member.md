# sendpost.Member

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Unique identifier for the team member | [optional] 
**email** | **String** | Email address of the team member (used for login) | [optional] 
**name** | **String** | Display name of the team member | [optional] 
**isVerified** | **Boolean** | Whether the member has verified their email address. Unverified members have limited access until verification is complete.  | [optional] 
**logoUrl** | **String** | URL of the member&#39;s profile picture/avatar | [optional] 
**companyName** | **String** | Company or organization name | [optional] 
**onboardQAnswered** | **Boolean** | Whether the member has completed the onboarding questionnaire | [optional] 
**phoneNumber** | **String** | Contact phone number in E.164 format. Used for account recovery and important notifications.  | [optional] 
**created** | **Number** | UNIX epoch timestamp in nanoseconds when the member was added | [optional] 


