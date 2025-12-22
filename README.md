# sendpost-javascript-sdk

sendpost - JavaScript client for sendpost-javascript-sdk
# Introduction

SendPost provides email API and SMTP relay which can be used not just to send & measure but also alert & optimised email sending.

You can use SendPost to:

* Send personalised emails to multiple recipients using email API 

* Track opens and clicks

* Analyse statistics around open, clicks, bounce, unsubscribe and spam 


At and advanced level you can use it to:

* Manage multiple sub-accounts which may map to your promotional or transactional sending, multiple product lines or multiple customers 

* Classify your emails using groups for better analysis

* Analyse and fix email sending at sub-account level, IP Pool level or group level

* Have automated alerts to notify disruptions regarding email sending

* Manage different dedicated IP Pools so to better control your email sending

* Automatically know when IP or domain is blacklisted or sender score is down

* Leverage pro deliverability tools to get significantly better email deliverability & inboxing


[<img src=\"https://run.pstmn.io/button.svg\" alt=\"Run In Postman\" style=\"width: 128px; height: 32px;\">](https://god.gw.postman.com/run-collection/33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b%26entityType%3Dcollection%26workspaceId%3D6b1e4f65-96a9-4136-9512-6266c852517e) 

# Overview

## REST API

SendPost API is built on REST API principles. Authenticated users can interact with any of the API endpoints to perform:

* **GET**- to get a resource

* **POST** - to create a resource

* **PUT** - to update an existing resource

* **DELETE** - to delete a resource


The API endpoint for all API calls is:
<code>https://api.sendpost.io/api/v1</code>


Some conventions that have been followed in the API design overall are following:


* All resources have either <code>/api/v1/subaccount</code> or <code>/api/v1/account</code> in their API call resource path based on who is authorised for the resource. All API calls with path <code>/api/v1/subaccount</code> use <code>X-SubAccount-ApiKey</code> in their request header. Likewise all API calls with path <code>/api/v1/account</code> use <code>X-Account-ApiKey</code> in their request header.

* All resource endpoints end with singular name and not plural. So we have <code>domain</code> instead of domains for domain resource endpoint. Likewise we have <code>sender</code> instead of senders for sender resource endpoint.

* Body submitted for POST / PUT API calls as well as JSON response from SendPost API follow camelcase convention

* All timestamps returned in response (created or submittedAt response fields) are UNIX nano epoch timestamp.


<aside class=\"success\">
All resources have either <code>/api/v1/subaccount</code> or <code>/api/v1/account</code> in their API call resource path based on who is authorised for the resource. All API calls with path <code>/api/v1/subaccount</code> use <code>X-SubAccount-ApiKey</code> in their request header. Likewise all API calls with path <code>/api/v1/account</code> use <code>X-Account-ApiKey</code> in their request header.
</aside>


SendPost uses conventional HTTP response codes to indicate the success or failure of an API request. 


* Codes in the <code>2xx</code> range indicate success. 

* Codes in the <code>4xx</code> range indicate an error owing due to unauthorize access, incorrect request parameters or body etc.

* Code in the <code>5xx</code> range indicate an eror with SendPost's servers ( internal service issue or maintenance )


<aside class=\"info\">
SendPost all responses return <code>created</code> in UNIX nano epoch timestamp. 
</aside>


## Authentication

SendPost uses API keys for authentication. You can register a new SendPost API key at our [developer portal](https://app.sendpost.io/register).


SendPost expects the API key to be included in all API requests to the server in a header that looks like the following:


`X-SubAccount-ApiKey: AHEZEP8192SEGH`


This API key is used for all Sub-Account level operations such as:

* Sending emails

* Retrieving stats regarding open, click, bounce, unsubscribe and spam

* Uploading suppressions list

* Verifying sending domains
and more

In addition to <code>X-SubAccount-ApiKey</code> you also have another API Key <code>X-Account-APIKey</code> which is used for Account level operations such as :

* Creating and managing sub-accounts

* Allocating IPs for your account

* Getting overall billing and usage information

* Email List validation

* Creating and managing alerts
and more


<aside class=\"notice\">
You must look at individual API reference page to look at whether <code>X-SubAccount-ApiKey</code> is required or <code>X-Account-ApiKey</code>
</aside>


In case an incorrect API Key header is specified or if it is missed you will get HTTP Response 401 ( Unauthorized ) response from SendPost.


## HTTP Response Headers


Code           | Reason                 | Details
---------------| -----------------------| -----------
200            | Success                | Everything went well
401            | Unauthorized           | Incorrect or missing API header either <code>X-SubAccount-ApiKey</code> or <code>X-Account-ApiKey</code>
403            | Forbidden              | Typically sent when resource with same name or details already exist
406            | Missing resource id    | Resource id specified is either missing or doesn't exist
422            | Unprocessable entity   | Request body is not in proper format
500            | Internal server error  | Some error happened at SendPost while processing API request
503            | Service Unavailable    | SendPost is offline for maintenance. Please try again later

# API SDKs

We have native SendPost SDKs in the following programming languages. You can integrate with them or create your own SDK with our API specification. In case you need any assistance with respect to API then do reachout to our team from website chat or email us at **hello@sendpost.io**


* [PHP](https://github.com/sendpost/sendpost_php_sdk)

* [Javascript](https://github.com/sendpost/sendpost_javascript_sdk)

* [Ruby](https://github.com/sendpost/sendpost_ruby_sdk)

* [Python](https://github.com/sendpost/sendpost_python_sdk)

* [Golang](https://github.com/sendpost/sendpost_go_sdk)


# API Reference

SendX REST API can be broken down into two major sub-sections:


* Sub-Account

* Account 


Sub-Account API operations enable common email sending API use-cases like sending bulk email, adding new domains or senders for email sending programmatically, retrieving stats, adding suppressions etc. All Sub-Account API operations need to pass <code>X-SubAccount-ApiKey</code> header with every API call.


The Account API operations allow users to manage multiple sub-accounts and manage IPs. A single parent SendPost account can have 100's of sub-accounts. You may want to create sub-accounts for different products your company is running or to segregate types of emails or for managing email sending across multiple customers of yours.


# SMTP Reference

Simple Mail Transfer Protocol (SMTP) is a quick and easy way to send email from one server to another. SendPost provides an SMTP service that allows you to deliver your email via our servers instead of your own client or server. 
This means you can count on SendPost's delivery at scale for your SMTP needs. 


## Integrating SMTP 


1. Get the SMTP `username` and `password` from your SendPost account.

2. Set the server host in your email client or application to `smtp.sendpost.io`. This setting is sometimes referred to as the external SMTP server or the SMTP relay.

3. Set the `username` and `password`.

4. Set the port to `587` (or as specified below).

## SMTP Ports


- For an unencrypted or a TLS connection, use port `25`, `2525` or `587`.

- For a SSL connection, use port `465`

- Check your firewall and network to ensure they're not blocking any of our SMTP Endpoints.


SendPost supports STARTTLS for establishing a TLS-encrypted connection. STARTTLS is a means of upgrading an unencrypted connection to an encrypted connection. There are versions of STARTTLS for a variety of protocols; the SMTP version is defined in [RFC 3207](https://www.ietf.org/rfc/rfc3207.txt).


To set up a STARTTLS connection, the SMTP client connects to the SendPost SMTP endpoint `smtp.sendpost.io` on port 25, 587, or 2525, issues an EHLO command, and waits for the server to announce that it supports the STARTTLS SMTP extension. The client then issues the STARTTLS command, initiating TLS negotiation. When negotiation is complete, the client issues an EHLO command over the new encrypted connection, and the SMTP session proceeds normally.


<aside class=\"success\">
If you are unsure which port to use, a TLS connection on port 587 is typically recommended.
</aside>


## Sending email from your application


```javascript
\"use strict\";

const nodemailer = require(\"nodemailer\");

async function main() {
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
host: \"smtp.sendpost.io\",
port: 587,
secure: false, // true for 465, false for other ports
auth: {
user:  \"<username>\" , // generated ethereal user
pass: \"<password>\", // generated ethereal password
},
requireTLS: true,
debug: true,
logger: true,
});

// send mail with defined transport object
try {
let info = await transporter.sendMail({
from: 'erlich@piedpiper.com',
to: 'gilfoyle@piedpiper.com',
subject: 'Test Email Subject',
html: '<h1>Hello Geeks!!!</h1>',
});
console.log(\"Message sent: %s\", info.messageId);
} catch (e) {
console.log(e)
}
}

main().catch(console.error);
```

For PHP


```php
<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\\PHPMailer\\PHPMailer;
use PHPMailer\\PHPMailer\\SMTP;
use PHPMailer\\PHPMailer\\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

// Settings
try {
$mail->SMTPDebug = SMTP::DEBUG_CONNECTION;                  // Enable verbose debug output
$mail->isSMTP();                                            // Send using SMTP
$mail->Host       = 'smtp.sendpost.io';                     // Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
$mail->Username   = '<username>';                           // SMTP username
$mail->Password   = '<password>';                           // SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable implicit TLS encryption
$mail->Port       = 587;                                    // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

//Recipients
$mail->setFrom('erlich@piedpiper.com', 'Erlich');
$mail->addAddress('gilfoyle@piedpiper.com', 'Gilfoyle');

//Content
$mail->isHTML(true);                                  //Set email format to HTML
$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->send();
echo 'Message has been sent';

} catch (Exception $e) {
echo \"Message could not be sent. Mailer Error: {$mail->ErrorInfo}\";
}
```
For Python
```python
#!/usr/bin/python3

import sys
import os
import re

from smtplib import SMTP
import ssl

from email.mime.text import MIMEText

SMTPserver = 'smtp.sendpost.io'
PORT = 587
sender =     'erlich@piedpiper.com'
destination = ['gilfoyle@piedpiper.com']

USERNAME = \"<username>\"
PASSWORD = \"<password>\"

# typical values for text_subtype are plain, html, xml
text_subtype = 'plain'

content=\"\"\"\\
Test message
\"\"\"

subject=\"Sent from Python\"

try:
msg = MIMEText(content, text_subtype)
msg['Subject']= subject
msg['From']   = sender

conn = SMTP(SMTPserver, PORT)
conn.ehlo()
context = ssl.create_default_context()
conn.starttls(context=context)  # upgrade to tls
conn.ehlo()
conn.set_debuglevel(True)
conn.login(USERNAME, PASSWORD)

try:
resp = conn.sendmail(sender, destination, msg.as_string())
print(\"Send Mail Response: \", resp)
except Exception as e:
print(\"Send Email Error: \", e)
finally:
conn.quit()

except Exception as e:
print(\"Error:\", e)
```
For Golang
```go
package main

import (
\"fmt\"
\"net/smtp\"
\"os\"
)

// Sending Email Using Smtp in Golang

func main() {

username := \"<username>\"
password := \"<password>\"

from := \"erlich@piedpiper.com\"
toList := []string{\"gilfoyle@piedpiper.com\"}
host := \"smtp.sendpost.io\"
port := \"587\" // recommended

// This is the message to send in the mail
msg := \"Hello geeks!!!\"

// We can't send strings directly in mail,
// strings need to be converted into slice bytes
body := []byte(msg)

// PlainAuth uses the given username and password to
// authenticate to host and act as identity.
// Usually identity should be the empty string,
// to act as username.
auth := smtp.PlainAuth(\"\", username, password, host)

// SendMail uses TLS connection to send the mail
// The email is sent to all address in the toList,
// the body should be of type bytes, not strings
// This returns error if any occured.
err := smtp.SendMail(host+\":\"+port, auth, from, toList, body)

// handling the errors
if err != nil {
fmt.Println(err)
os.Exit(1)
}

fmt.Println(\"Successfully sent mail to all user in toList\")
}

```
For Java
```java
// implementation 'com.sun.mail:javax.mail:1.6.2'

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SMTPConnect {

// This address must be verified.
static final String FROM = \"erlich@piedpiper.com\";
static final String FROMNAME = \"Erlich Bachman\";

// Replace recipient@example.com with a \"To\" address. If your account
// is still in the sandbox, this address must be verified.
static final String TO = \"gilfoyle@piedpiper.com\";

// Replace smtp_username with your SendPost SMTP user name.
static final String SMTP_USERNAME = \"<username>\";

// Replace smtp_password with your SendPost SMTP password.
static final String SMTP_PASSWORD = \"<password>\";

// SMTP Host Name
static final String HOST = \"smtp.sendpost.io\";

// The port you will connect to on SendPost SMTP Endpoint.
static final int PORT = 587;

static final String SUBJECT = \"SendPost SMTP Test (SMTP interface accessed using Java)\";

static final String BODY = String.join(
System.getProperty(\"line.separator\"),
\"<h1>SendPost SMTP Test</h1>\",
\"<p>This email was sent with SendPost using the \",
\"<a href='https://github.com/eclipse-ee4j/mail'>Javamail Package</a>\",
\" for <a href='https://www.java.com'>Java</a>.\"
);

public static void main(String[] args) throws Exception {

// Create a Properties object to contain connection configuration information.
Properties props = System.getProperties();
props.put(\"mail.transport.protocol\", \"smtp\");
props.put(\"mail.smtp.port\", PORT);
props.put(\"mail.smtp.starttls.enable\", \"true\");
props.put(\"mail.smtp.debug\", \"true\");
props.put(\"mail.smtp.auth\", \"true\");

// Create a Session object to represent a mail session with the specified properties.
Session session = Session.getDefaultInstance(props);

// Create a message with the specified information.
MimeMessage msg = new MimeMessage(session);
msg.setFrom(new InternetAddress(FROM,FROMNAME));
msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO));
msg.setSubject(SUBJECT);
msg.setContent(BODY,\"text/html\");

// Create a transport.
Transport transport = session.getTransport();

// Send the message.
try {
System.out.println(\"Sending...\");

// Connect to SendPost SMTP using the SMTP username and password you specified above.
transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);

// Send the email.
transport.sendMessage(msg, msg.getAllRecipients());
System.out.println(\"Email sent!\");

} catch (Exception ex) {

System.out.println(\"The email was not sent.\");
System.out.println(\"Error message: \" + ex.getMessage());
System.out.println(ex);
}
// Close and terminate the connection.
}
}
```

Many programming languages support sending email using SMTP. This capability might be built into the programming language itself, or it might be available as an add-on, plug-in, or library. You can take advantage of this capability by sending email through SendPost from within application programs that you write.

We have provided examples in Python3, Golang, Java, PHP, JS.

This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.0.0
- Package version: 1.0.0
- Generator version: 7.13.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install sendpost-javascript-sdk --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your sendpost-javascript-sdk from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/sendpost/sendpost-javascript-sdk
then install it via:

```shell
    npm install sendpost/sendpost-javascript-sdk --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var sendpost = require('sendpost-javascript-sdk');

var defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
var subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = "YOUR API KEY"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix['X-SubAccount-ApiKey'] = "Token"

var api = new sendpost.DomainApi()
var opts = {
  'limit': 56, // {Number} Number of records to return per request
  'offset': 56, // {Number} Number of initial records to skip
  'search': "search_example" // {String} Case insensitive search against domain names
};
api.getAllDomains(opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});


```

## Documentation for API Endpoints

All URIs are relative to *https://api.sendpost.io/api/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*sendpost.DomainApi* | [**getAllDomains**](docs/DomainApi.md#getAllDomains) | **GET** /subaccount/domain | List Domains
*sendpost.DomainApi* | [**subaccountDomainDomainIdDelete**](docs/DomainApi.md#subaccountDomainDomainIdDelete) | **DELETE** /subaccount/domain/{domain_id} | Delete Domain
*sendpost.DomainApi* | [**subaccountDomainDomainIdGet**](docs/DomainApi.md#subaccountDomainDomainIdGet) | **GET** /subaccount/domain/{domain_id} | Get Domain
*sendpost.DomainApi* | [**subaccountDomainPost**](docs/DomainApi.md#subaccountDomainPost) | **POST** /subaccount/domain | Create Domain
*sendpost.EmailApi* | [**sendEmail**](docs/EmailApi.md#sendEmail) | **POST** /subaccount/email/ | Send Email
*sendpost.EmailApi* | [**sendEmailWithTemplate**](docs/EmailApi.md#sendEmailWithTemplate) | **POST** /subaccount/email/template | Send Email With Template
*sendpost.IPApi* | [**allocateNewIp**](docs/IPApi.md#allocateNewIp) | **PUT** /account/ip/allocate | Allocate IP
*sendpost.IPApi* | [**deleteIp**](docs/IPApi.md#deleteIp) | **DELETE** /account/ip/{ip_id} | Delete IP
*sendpost.IPApi* | [**getAllIps**](docs/IPApi.md#getAllIps) | **GET** /account/ip/ | List IPs
*sendpost.IPApi* | [**getSpecificIp**](docs/IPApi.md#getSpecificIp) | **GET** /account/ip/{ip_id} | Get IP
*sendpost.IPApi* | [**updateIp**](docs/IPApi.md#updateIp) | **PUT** /account/ip/{ip_id} | Update IP
*sendpost.IPPoolsApi* | [**createIPPool**](docs/IPPoolsApi.md#createIPPool) | **POST** /account/ippool | Create IPPool
*sendpost.IPPoolsApi* | [**deleteIPPool**](docs/IPPoolsApi.md#deleteIPPool) | **DELETE** /account/ippool/{ippool_id} | Delete IPPool
*sendpost.IPPoolsApi* | [**getAllIPPools**](docs/IPPoolsApi.md#getAllIPPools) | **GET** /account/ippool | List IPPools
*sendpost.IPPoolsApi* | [**getIPPoolById**](docs/IPPoolsApi.md#getIPPoolById) | **GET** /account/ippool/{ippool_id} | Get IPPool
*sendpost.IPPoolsApi* | [**updateIPPool**](docs/IPPoolsApi.md#updateIPPool) | **PUT** /account/ippool/{ippool_id} | Update IPPool
*sendpost.MessageApi* | [**getMessageById**](docs/MessageApi.md#getMessageById) | **GET** /account/message/{message_id} | Get Message
*sendpost.StatsApi* | [**accountSubaccountStatSubaccountIdAggregateGet**](docs/StatsApi.md#accountSubaccountStatSubaccountIdAggregateGet) | **GET** /account/subaccount/stat/{subaccount_id}/aggregate | Get Aggregate Stats
*sendpost.StatsApi* | [**accountSubaccountStatSubaccountIdGet**](docs/StatsApi.md#accountSubaccountStatSubaccountIdGet) | **GET** /account/subaccount/stat/{subaccount_id} | List Stats
*sendpost.StatsApi* | [**getAggregateStatsByGroup**](docs/StatsApi.md#getAggregateStatsByGroup) | **GET** /account/subaccount/stat/{subaccount_id}/group | Get Group Aggregate Stats
*sendpost.StatsAApi* | [**getAccountAggregateStats**](docs/StatsAApi.md#getAccountAggregateStats) | **GET** /account/stat/aggregate | Get Account Aggregate Stats
*sendpost.StatsAApi* | [**getAccountAggregateStatsByGroup**](docs/StatsAApi.md#getAccountAggregateStatsByGroup) | **GET** /account/stat/aggregate/group | Get Account Group Aggregate Stats
*sendpost.StatsAApi* | [**getAccountStatsByGroup**](docs/StatsAApi.md#getAccountStatsByGroup) | **GET** /account/stat/group | List Account Group Stats
*sendpost.StatsAApi* | [**getAllAccountStats**](docs/StatsAApi.md#getAllAccountStats) | **GET** /account/stat | List Account Stats
*sendpost.SubAccountApi* | [**createSubAccount**](docs/SubAccountApi.md#createSubAccount) | **POST** /account/subaccount/ | Create Sub-Account
*sendpost.SubAccountApi* | [**deleteSubAccount**](docs/SubAccountApi.md#deleteSubAccount) | **DELETE** /account/subaccount/{subaccount_id} | Delete Sub-Account
*sendpost.SubAccountApi* | [**getAllSubAccounts**](docs/SubAccountApi.md#getAllSubAccounts) | **GET** /account/subaccount/ | List Sub-Accounts
*sendpost.SubAccountApi* | [**getSubAccount**](docs/SubAccountApi.md#getSubAccount) | **GET** /account/subaccount/{subaccount_id} | Get Sub-Account
*sendpost.SubAccountApi* | [**updateSubAccount**](docs/SubAccountApi.md#updateSubAccount) | **PUT** /account/subaccount/{subaccount_id} | Update Sub-Account
*sendpost.SuppressionApi* | [**createSuppression**](docs/SuppressionApi.md#createSuppression) | **POST** /subaccount/suppression | Create Suppressions
*sendpost.SuppressionApi* | [**deleteSuppression**](docs/SuppressionApi.md#deleteSuppression) | **DELETE** /subaccount/suppression | Delete Suppressions
*sendpost.SuppressionApi* | [**getSuppressionList**](docs/SuppressionApi.md#getSuppressionList) | **GET** /subaccount/suppression | List Suppressions
*sendpost.WebhookApi* | [**createWebhook**](docs/WebhookApi.md#createWebhook) | **POST** /account/webhook | Create Webhook
*sendpost.WebhookApi* | [**deleteWebhook**](docs/WebhookApi.md#deleteWebhook) | **DELETE** /account/webhook/{webhook_id} | Delete Webhook
*sendpost.WebhookApi* | [**getAllWebhooks**](docs/WebhookApi.md#getAllWebhooks) | **GET** /account/webhook | List Webhooks
*sendpost.WebhookApi* | [**getWebhook**](docs/WebhookApi.md#getWebhook) | **GET** /account/webhook/{webhook_id} | Get Webhook
*sendpost.WebhookApi* | [**updateWebhook**](docs/WebhookApi.md#updateWebhook) | **PUT** /account/webhook/{webhook_id} | Update Webhook


## Documentation for Models

 - [sendpost.AccountStats](docs/AccountStats.md)
 - [sendpost.AccountStatsStat](docs/AccountStatsStat.md)
 - [sendpost.AggregateStat](docs/AggregateStat.md)
 - [sendpost.AggregateStats](docs/AggregateStats.md)
 - [sendpost.AggregatedEmailStats](docs/AggregatedEmailStats.md)
 - [sendpost.Attachment](docs/Attachment.md)
 - [sendpost.CopyTo](docs/CopyTo.md)
 - [sendpost.CreateDomainRequest](docs/CreateDomainRequest.md)
 - [sendpost.CreateSuppressionRequest](docs/CreateSuppressionRequest.md)
 - [sendpost.CreateSuppressionRequestHardBounceInner](docs/CreateSuppressionRequestHardBounceInner.md)
 - [sendpost.CreateSuppressionRequestManualInner](docs/CreateSuppressionRequestManualInner.md)
 - [sendpost.CreateSuppressionRequestSpamComplaintInner](docs/CreateSuppressionRequestSpamComplaintInner.md)
 - [sendpost.CreateSuppressionRequestUnsubscribeInner](docs/CreateSuppressionRequestUnsubscribeInner.md)
 - [sendpost.DeleteResponse](docs/DeleteResponse.md)
 - [sendpost.DeleteSubAccountResponse](docs/DeleteSubAccountResponse.md)
 - [sendpost.DeleteSuppression200ResponseInner](docs/DeleteSuppression200ResponseInner.md)
 - [sendpost.DeleteSuppressionRequest](docs/DeleteSuppressionRequest.md)
 - [sendpost.DeleteWebhookResponse](docs/DeleteWebhookResponse.md)
 - [sendpost.Device](docs/Device.md)
 - [sendpost.Domain](docs/Domain.md)
 - [sendpost.DomainDkim](docs/DomainDkim.md)
 - [sendpost.DomainDmarc](docs/DomainDmarc.md)
 - [sendpost.DomainGpt](docs/DomainGpt.md)
 - [sendpost.DomainReturnPath](docs/DomainReturnPath.md)
 - [sendpost.DomainTrack](docs/DomainTrack.md)
 - [sendpost.EIP](docs/EIP.md)
 - [sendpost.EmailAddress](docs/EmailAddress.md)
 - [sendpost.EmailMessage](docs/EmailMessage.md)
 - [sendpost.EmailMessageFrom](docs/EmailMessageFrom.md)
 - [sendpost.EmailMessageObject](docs/EmailMessageObject.md)
 - [sendpost.EmailMessageReplyTo](docs/EmailMessageReplyTo.md)
 - [sendpost.EmailMessageToInner](docs/EmailMessageToInner.md)
 - [sendpost.EmailMessageToInnerBccInner](docs/EmailMessageToInnerBccInner.md)
 - [sendpost.EmailMessageToInnerCcInner](docs/EmailMessageToInnerCcInner.md)
 - [sendpost.EmailMessageWithTemplate](docs/EmailMessageWithTemplate.md)
 - [sendpost.EmailResponse](docs/EmailResponse.md)
 - [sendpost.EmailStats](docs/EmailStats.md)
 - [sendpost.EmailStatsStats](docs/EmailStatsStats.md)
 - [sendpost.Event](docs/Event.md)
 - [sendpost.EventMetadata](docs/EventMetadata.md)
 - [sendpost.GeoLocation](docs/GeoLocation.md)
 - [sendpost.IP](docs/IP.md)
 - [sendpost.IPAllocationRequest](docs/IPAllocationRequest.md)
 - [sendpost.IPDeletionResponse](docs/IPDeletionResponse.md)
 - [sendpost.IPPool](docs/IPPool.md)
 - [sendpost.IPPoolCreateRequest](docs/IPPoolCreateRequest.md)
 - [sendpost.IPPoolDeleteResponse](docs/IPPoolDeleteResponse.md)
 - [sendpost.IPPoolUpdateRequest](docs/IPPoolUpdateRequest.md)
 - [sendpost.IPUpdateRequest](docs/IPUpdateRequest.md)
 - [sendpost.Member](docs/Member.md)
 - [sendpost.Message](docs/Message.md)
 - [sendpost.MessageHeaderTo](docs/MessageHeaderTo.md)
 - [sendpost.MessageTo](docs/MessageTo.md)
 - [sendpost.NewSubAccount](docs/NewSubAccount.md)
 - [sendpost.NewWebhook](docs/NewWebhook.md)
 - [sendpost.OperatingSystem](docs/OperatingSystem.md)
 - [sendpost.Person](docs/Person.md)
 - [sendpost.Recipient](docs/Recipient.md)
 - [sendpost.SMTPAuth](docs/SMTPAuth.md)
 - [sendpost.Stat](docs/Stat.md)
 - [sendpost.StatStats](docs/StatStats.md)
 - [sendpost.SubAccount](docs/SubAccount.md)
 - [sendpost.Suppression](docs/Suppression.md)
 - [sendpost.ThirdPartySendingProvider](docs/ThirdPartySendingProvider.md)
 - [sendpost.UpdateSubAccount](docs/UpdateSubAccount.md)
 - [sendpost.UpdateWebhook](docs/UpdateWebhook.md)
 - [sendpost.UserAgent](docs/UserAgent.md)
 - [sendpost.Webhook](docs/Webhook.md)
 - [sendpost.WebhookObject](docs/WebhookObject.md)


## Documentation for Authorization


Authentication schemes defined for the API:
### accountAuth


- **Type**: API key
- **API key parameter name**: X-Account-ApiKey
- **Location**: HTTP header

### subAccountAuth


- **Type**: API key
- **API key parameter name**: X-SubAccount-ApiKey
- **Location**: HTTP header

