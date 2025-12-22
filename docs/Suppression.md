# sendpost.Suppression

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | The ID of the suppression | [optional] 
**reason** | **Number** | The reason for the suppression (0 &#x3D; manual, 1 &#x3D; unsubscribe, 2 &#x3D; hard bounce, 3 &#x3D; spam complaint) | [optional] 
**smtpError** | **String** | SMTP error code in case of hard bounce suppression | [optional] 
**email** | **String** | The email address for the suppression | [optional] 
**created** | **Number** | UNIX epoch nano timestamp when the suppression was created | [optional] 


