/**
 * SendPost API
 * # Introduction  > ### 📌 API versioning & the v1 response contract > > This reference documents the **v1 response contract** — the stable, camelCase > response shape that SendPost commits to. This is the shape you should build against. > > **During the current deprecation window**, requests authenticated with an account > or sub-account API key receive the **legacy** response shape by default, so existing > integrations keep working unchanged. To receive the documented v1 shape today, send: > > ``` > X-SendPost-Public-Contract: v1 > ``` > > **How to tell which shape you got.** Every public response echoes the applied > contract in the `X-SendPost-Public-Contract` response header. While the legacy > shape is being served, responses also carry standard deprecation signals: > `Deprecation: true`, a `Sunset` header with the exact cut-over date, and a > `Link: <...>; rel=\"deprecation\"` header pointing at the migration guide. **Read the > `Sunset` header for the authoritative end date** rather than hardcoding one. > > **After the sunset date**, v1 becomes the default and the legacy shape is no longer > served. New integrations should send `X-SendPost-Public-Contract: v1` now and rely on > the shapes in this reference.  SendPost provides email API and SMTP relay which can be used not just to send & measure but also alert & optimised email sending.  You can use SendPost to:  * Send personalised emails to multiple recipients using email API   * Track opens and clicks  * Analyse statistics around open, clicks, bounce, unsubscribe and spam    At and advanced level you can use it to:  * Manage multiple sub-accounts which may map to your promotional or transactional sending, multiple product lines or multiple customers   * Classify your emails using groups for better analysis  * Analyse and fix email sending at sub-account level, IP Pool level or group level  * Have automated alerts to notify disruptions regarding email sending  * Manage different dedicated IP Pools so to better control your email sending  * Automatically know when IP or domain is blacklisted or sender score is down  * Leverage pro deliverability tools to get significantly better email deliverability & inboxing   [<img src=\"https://run.pstmn.io/button.svg\" alt=\"Run In Postman\" style=\"width: 128px; height: 32px;\">](https://god.gw.postman.com/run-collection/33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b%26entityType%3Dcollection%26workspaceId%3D6b1e4f65-96a9-4136-9512-6266c852517e)   # Overview  ## REST API  SendPost API is built on REST API principles. Authenticated users can interact with any of the API endpoints to perform:  * **GET**- to get a resource  * **POST** - to create a resource  * **PUT** - to update an existing resource  * **DELETE** - to delete a resource   The API endpoint for all API calls is: <code>https://api.sendpost.io/api/v1</code>   Some conventions that have been followed in the API design overall are following:   * All resources have either <code>/api/v1/subaccount</code> or <code>/api/v1/account</code> in their API call resource path based on who is authorised for the resource. All API calls with path <code>/api/v1/subaccount</code> use <code>X-SubAccount-ApiKey</code> in their request header. Likewise all API calls with path <code>/api/v1/account</code> use <code>X-Account-ApiKey</code> in their request header.  * All resource endpoints end with singular name and not plural. So we have <code>domain</code> instead of domains for domain resource endpoint. Likewise we have <code>sender</code> instead of senders for sender resource endpoint.  * Body submitted for POST / PUT API calls as well as JSON response from SendPost API follow camelcase convention  * All timestamps returned in response (created or submittedAt response fields) are UNIX nano epoch timestamp.   <aside class=\"success\"> All resources have either <code>/api/v1/subaccount</code> or <code>/api/v1/account</code> in their API call resource path based on who is authorised for the resource. All API calls with path <code>/api/v1/subaccount</code> use <code>X-SubAccount-ApiKey</code> in their request header. Likewise all API calls with path <code>/api/v1/account</code> use <code>X-Account-ApiKey</code> in their request header. </aside>   SendPost uses conventional HTTP response codes to indicate the success or failure of an API request.    * Codes in the <code>2xx</code> range indicate success.   * Codes in the <code>4xx</code> range indicate an error owing due to unauthorize access, incorrect request parameters or body etc.  * Code in the <code>5xx</code> range indicate an eror with SendPost's servers ( internal service issue or maintenance )   <aside class=\"info\"> SendPost all responses return <code>created</code> in UNIX nano epoch timestamp.  </aside>   ## Authentication  SendPost uses API keys for authentication. You can register a new SendPost API key at our [developer portal](https://app.sendpost.io/register).   SendPost expects the API key to be included in all API requests to the server in a header that looks like the following:   `X-SubAccount-ApiKey: AHEZEP8192SEGH`   This API key is used for all Sub-Account level operations such as:  * Sending emails  * Retrieving stats regarding open, click, bounce, unsubscribe and spam  * Uploading suppressions list  * Verifying sending domains and more  In addition to <code>X-SubAccount-ApiKey</code> you also have another API Key <code>X-Account-APIKey</code> which is used for Account level operations such as :  * Creating and managing sub-accounts  * Allocating IPs for your account  * Getting overall billing and usage information  * Email List validation  * Creating and managing alerts and more   <aside class=\"notice\"> You must look at individual API reference page to look at whether <code>X-SubAccount-ApiKey</code> is required or <code>X-Account-ApiKey</code> </aside>   In case an incorrect API Key header is specified or if it is missed you will get HTTP Response 401 ( Unauthorized ) response from SendPost.   ## HTTP Response Headers   Code           | Reason                 | Details ---------------| -----------------------| ----------- 200            | Success                | Everything went well 401            | Unauthorized           | Incorrect or missing API header either <code>X-SubAccount-ApiKey</code> or <code>X-Account-ApiKey</code> 403            | Forbidden              | Typically sent when resource with same name or details already exist 406            | Missing resource id    | Resource id specified is either missing or doesn't exist 422            | Unprocessable entity   | Request body is not in proper format 500            | Internal server error  | Some error happened at SendPost while processing API request 503            | Service Unavailable    | SendPost is offline for maintenance. Please try again later  # API SDKs  We have native SendPost SDKs in the following programming languages. You can integrate with them or create your own SDK with our API specification. In case you need any assistance with respect to API then do reachout to our team from website chat or email us at **hello@sendpost.io**   * [PHP](https://github.com/sendpost/sendpost_php_sdk)  * [Javascript](https://github.com/sendpost/sendpost_javascript_sdk)  * [Ruby](https://github.com/sendpost/sendpost_ruby_sdk)  * [Python](https://github.com/sendpost/sendpost_python_sdk)  * [Golang](https://github.com/sendpost/sendpost_go_sdk)   # API Reference  SendX REST API can be broken down into two major sub-sections:   * Sub-Account  * Account    Sub-Account API operations enable common email sending API use-cases like sending bulk email, adding new domains or senders for email sending programmatically, retrieving stats, adding suppressions etc. All Sub-Account API operations need to pass <code>X-SubAccount-ApiKey</code> header with every API call.   The Account API operations allow users to manage multiple sub-accounts and manage IPs. A single parent SendPost account can have 100's of sub-accounts. You may want to create sub-accounts for different products your company is running or to segregate types of emails or for managing email sending across multiple customers of yours.   # SMTP Reference  Simple Mail Transfer Protocol (SMTP) is a quick and easy way to send email from one server to another. SendPost provides an SMTP service that allows you to deliver your email via our servers instead of your own client or server.  This means you can count on SendPost's delivery at scale for your SMTP needs.    ## Integrating SMTP    1. Get the SMTP `username` and `password` from your SendPost account.  2. Set the server host in your email client or application to `smtp.sendpost.io`. This setting is sometimes referred to as the external SMTP server or the SMTP relay.  3. Set the `username` and `password`.  4. Set the port to `587` (or as specified below).  ## SMTP Ports   - For an unencrypted or a TLS connection, use port `25`, `2525` or `587`.  - For a SSL connection, use port `465`  - Check your firewall and network to ensure they're not blocking any of our SMTP Endpoints.   SendPost supports STARTTLS for establishing a TLS-encrypted connection. STARTTLS is a means of upgrading an unencrypted connection to an encrypted connection. There are versions of STARTTLS for a variety of protocols; the SMTP version is defined in [RFC 3207](https://www.ietf.org/rfc/rfc3207.txt).   To set up a STARTTLS connection, the SMTP client connects to the SendPost SMTP endpoint `smtp.sendpost.io` on port 25, 587, or 2525, issues an EHLO command, and waits for the server to announce that it supports the STARTTLS SMTP extension. The client then issues the STARTTLS command, initiating TLS negotiation. When negotiation is complete, the client issues an EHLO command over the new encrypted connection, and the SMTP session proceeds normally.   <aside class=\"success\"> If you are unsure which port to use, a TLS connection on port 587 is typically recommended. </aside>   ## Sending email from your application   ```javascript \"use strict\";  const nodemailer = require(\"nodemailer\");  async function main() { // create reusable transporter object using the default SMTP transport let transporter = nodemailer.createTransport({ host: \"smtp.sendpost.io\", port: 587, secure: false, // true for 465, false for other ports auth: { user:  \"<username>\" , // generated ethereal user pass: \"<password>\", // generated ethereal password }, requireTLS: true, debug: true, logger: true, });  // send mail with defined transport object try { let info = await transporter.sendMail({ from: 'erlich@piedpiper.com', to: 'gilfoyle@piedpiper.com', subject: 'Test Email Subject', html: '<h1>Hello Geeks!!!</h1>', }); console.log(\"Message sent: %s\", info.messageId); } catch (e) { console.log(e) } }  main().catch(console.error); ```  For PHP   ```php <?php // Import PHPMailer classes into the global namespace use PHPMailer\\PHPMailer\\PHPMailer; use PHPMailer\\PHPMailer\\SMTP; use PHPMailer\\PHPMailer\\Exception;  // Load Composer's autoloader require 'vendor/autoload.php';  $mail = new PHPMailer(true);  // Settings try { $mail->SMTPDebug = SMTP::DEBUG_CONNECTION;                  // Enable verbose debug output $mail->isSMTP();                                            // Send using SMTP $mail->Host       = 'smtp.sendpost.io';                     // Set the SMTP server to send through $mail->SMTPAuth   = true;                                   // Enable SMTP authentication $mail->Username   = '<username>';                           // SMTP username $mail->Password   = '<password>';                           // SMTP password $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable implicit TLS encryption $mail->Port       = 587;                                    // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`  //Recipients $mail->setFrom('erlich@piedpiper.com', 'Erlich'); $mail->addAddress('gilfoyle@piedpiper.com', 'Gilfoyle');  //Content $mail->isHTML(true);                                  //Set email format to HTML $mail->Subject = 'Here is the subject'; $mail->Body    = 'This is the HTML message body <b>in bold!</b>'; $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';  $mail->send(); echo 'Message has been sent';  } catch (Exception $e) { echo \"Message could not be sent. Mailer Error: {$mail->ErrorInfo}\"; } ``` For Python ```python #!/usr/bin/python3  import sys import os import re  from smtplib import SMTP import ssl  from email.mime.text import MIMEText  SMTPserver = 'smtp.sendpost.io' PORT = 587 sender =     'erlich@piedpiper.com' destination = ['gilfoyle@piedpiper.com']  USERNAME = \"<username>\" PASSWORD = \"<password>\"  # typical values for text_subtype are plain, html, xml text_subtype = 'plain'  content=\"\"\"\\ Test message \"\"\"  subject=\"Sent from Python\"  try: msg = MIMEText(content, text_subtype) msg['Subject']= subject msg['From']   = sender  conn = SMTP(SMTPserver, PORT) conn.ehlo() context = ssl.create_default_context() conn.starttls(context=context)  # upgrade to tls conn.ehlo() conn.set_debuglevel(True) conn.login(USERNAME, PASSWORD)  try: resp = conn.sendmail(sender, destination, msg.as_string()) print(\"Send Mail Response: \", resp) except Exception as e: print(\"Send Email Error: \", e) finally: conn.quit()  except Exception as e: print(\"Error:\", e) ``` For Golang ```go package main  import ( \"fmt\" \"net/smtp\" \"os\" )  // Sending Email Using Smtp in Golang  func main() {  username := \"<username>\" password := \"<password>\"  from := \"erlich@piedpiper.com\" toList := []string{\"gilfoyle@piedpiper.com\"} host := \"smtp.sendpost.io\" port := \"587\" // recommended  // This is the message to send in the mail msg := \"Hello geeks!!!\"  // We can't send strings directly in mail, // strings need to be converted into slice bytes body := []byte(msg)  // PlainAuth uses the given username and password to // authenticate to host and act as identity. // Usually identity should be the empty string, // to act as username. auth := smtp.PlainAuth(\"\", username, password, host)  // SendMail uses TLS connection to send the mail // The email is sent to all address in the toList, // the body should be of type bytes, not strings // This returns error if any occured. err := smtp.SendMail(host+\":\"+port, auth, from, toList, body)  // handling the errors if err != nil { fmt.Println(err) os.Exit(1) }  fmt.Println(\"Successfully sent mail to all user in toList\") }  ``` For Java ```java // implementation 'com.sun.mail:javax.mail:1.6.2'  import java.util.Properties;  import javax.mail.Message; import javax.mail.Session; import javax.mail.Transport; import javax.mail.internet.InternetAddress; import javax.mail.internet.MimeMessage;  public class SMTPConnect {  // This address must be verified. static final String FROM = \"erlich@piedpiper.com\"; static final String FROMNAME = \"Erlich Bachman\";  // Replace recipient@example.com with a \"To\" address. If your account // is still in the sandbox, this address must be verified. static final String TO = \"gilfoyle@piedpiper.com\";  // Replace smtp_username with your SendPost SMTP user name. static final String SMTP_USERNAME = \"<username>\";  // Replace smtp_password with your SendPost SMTP password. static final String SMTP_PASSWORD = \"<password>\";  // SMTP Host Name static final String HOST = \"smtp.sendpost.io\";  // The port you will connect to on SendPost SMTP Endpoint. static final int PORT = 587;  static final String SUBJECT = \"SendPost SMTP Test (SMTP interface accessed using Java)\";  static final String BODY = String.join( System.getProperty(\"line.separator\"), \"<h1>SendPost SMTP Test</h1>\", \"<p>This email was sent with SendPost using the \", \"<a href='https://github.com/eclipse-ee4j/mail'>Javamail Package</a>\", \" for <a href='https://www.java.com'>Java</a>.\" );  public static void main(String[] args) throws Exception {  // Create a Properties object to contain connection configuration information. Properties props = System.getProperties(); props.put(\"mail.transport.protocol\", \"smtp\"); props.put(\"mail.smtp.port\", PORT); props.put(\"mail.smtp.starttls.enable\", \"true\"); props.put(\"mail.smtp.debug\", \"true\"); props.put(\"mail.smtp.auth\", \"true\");  // Create a Session object to represent a mail session with the specified properties. Session session = Session.getDefaultInstance(props);  // Create a message with the specified information. MimeMessage msg = new MimeMessage(session); msg.setFrom(new InternetAddress(FROM,FROMNAME)); msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO)); msg.setSubject(SUBJECT); msg.setContent(BODY,\"text/html\");  // Create a transport. Transport transport = session.getTransport();  // Send the message. try { System.out.println(\"Sending...\");  // Connect to SendPost SMTP using the SMTP username and password you specified above. transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);  // Send the email. transport.sendMessage(msg, msg.getAllRecipients()); System.out.println(\"Email sent!\");  } catch (Exception ex) {  System.out.println(\"The email was not sent.\"); System.out.println(\"Error message: \" + ex.getMessage()); System.out.println(ex); } // Close and terminate the connection. } } ```  Many programming languages support sending email using SMTP. This capability might be built into the programming language itself, or it might be available as an add-on, plug-in, or library. You can take advantage of this capability by sending email through SendPost from within application programs that you write.  We have provided examples in Python3, Golang, Java, PHP, JS.  # API Contract Versioning (Public REST)  The public REST API uses a versioned response contract so field changes stay non-breaking:  * Send `X-SendPost-Public-Contract: v1` to opt into the current v1 response shape, or `legacy` for the pre-v1 shape. If the header is omitted, the applied contract is policy-driven — `legacy` before the published sunset date, `v1` after it. * Every response echoes `X-SendPost-Public-Contract: <applied>`. When the `legacy` contract is served, responses also include `Deprecation: true`, `Sunset: <RFC1123 date>`, and `Link: <doc-url>; rel=\"deprecation\"`. * Migrate to `v1` before the sunset date. Notable legacy → v1 field changes: Suppression `smtp_error` → `smtpError`, Stat `email_type` → `emailType`.  > `X-SendPost-Private-Api: true` is an internal header used only by the SendPost dashboard to receive richer internal objects. It is not part of the public SDK contract and should not be set by API integrations. 
 *
 * The version of the OpenAPI document: 1.3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from './ApiClient';
import AccountCycleUsage from './model/AccountCycleUsage';
import AccountStats from './model/AccountStats';
import AccountWebhookWithStats from './model/AccountWebhookWithStats';
import AggregateStat from './model/AggregateStat';
import AggregateStats from './model/AggregateStats';
import Attachment from './model/Attachment';
import BlacklistLinks from './model/BlacklistLinks';
import BlacklistResource from './model/BlacklistResource';
import BlacklistedOn from './model/BlacklistedOn';
import CopyTo from './model/CopyTo';
import CreateDomainRequest from './model/CreateDomainRequest';
import CreateSuppressionRequest from './model/CreateSuppressionRequest';
import CreateSuppressionRequestHardBounceInner from './model/CreateSuppressionRequestHardBounceInner';
import CreateSuppressionRequestManualInner from './model/CreateSuppressionRequestManualInner';
import CreateSuppressionRequestSpamComplaintInner from './model/CreateSuppressionRequestSpamComplaintInner';
import CreateSuppressionRequestUnsubscribeInner from './model/CreateSuppressionRequestUnsubscribeInner';
import DailyStatistics from './model/DailyStatistics';
import DateStat from './model/DateStat';
import DeleteResponse from './model/DeleteResponse';
import DeleteSubAccountResponse from './model/DeleteSubAccountResponse';
import DeleteSuppression200Response from './model/DeleteSuppression200Response';
import DeleteSuppressionRequest from './model/DeleteSuppressionRequest';
import DeleteSuppressionRequestSuppressionsInner from './model/DeleteSuppressionRequestSuppressionsInner';
import DeleteWebhookResponse from './model/DeleteWebhookResponse';
import Device from './model/Device';
import DnsRecord from './model/DnsRecord';
import Domain from './model/Domain';
import DomainStat from './model/DomainStat';
import EIP from './model/EIP';
import EmailAddress from './model/EmailAddress';
import EmailMessage from './model/EmailMessage';
import EmailMessageObject from './model/EmailMessageObject';
import EmailMessageWithTemplate from './model/EmailMessageWithTemplate';
import EmailResponse from './model/EmailResponse';
import EmailTypeStat from './model/EmailTypeStat';
import ErrorResponse from './model/ErrorResponse';
import ErrorResponseError from './model/ErrorResponseError';
import ErrorResponseErrorDetailsInner from './model/ErrorResponseErrorDetailsInner';
import Event from './model/Event';
import EventMetadata from './model/EventMetadata';
import GeoLocation from './model/GeoLocation';
import GroupStat from './model/GroupStat';
import IP from './model/IP';
import IPAllocationRequest from './model/IPAllocationRequest';
import IPDeletionResponse from './model/IPDeletionResponse';
import IPPool from './model/IPPool';
import IPPoolCreateRequest from './model/IPPoolCreateRequest';
import IPPoolDeleteResponse from './model/IPPoolDeleteResponse';
import IPPoolStat from './model/IPPoolStat';
import IPPoolUpdateRequest from './model/IPPoolUpdateRequest';
import IPStat from './model/IPStat';
import IPUpdateRequest from './model/IPUpdateRequest';
import Label from './model/Label';
import Member from './model/Member';
import Message from './model/Message';
import NewSubAccount from './model/NewSubAccount';
import NewWebhook from './model/NewWebhook';
import Os from './model/Os';
import PostmasterDomainStat from './model/PostmasterDomainStat';
import ProviderStat from './model/ProviderStat';
import RAIPPoolStat from './model/RAIPPoolStat';
import RDStat from './model/RDStat';
import RIPStat from './model/RIPStat';
import RStat from './model/RStat';
import Recipient from './model/Recipient';
import SDStat from './model/SDStat';
import SMTPAuth from './model/SMTPAuth';
import SeedContactStats from './model/SeedContactStats';
import Stat from './model/Stat';
import SubAccount from './model/SubAccount';
import SubAccountStat from './model/SubAccountStat';
import SubAccountStatForPool from './model/SubAccountStatForPool';
import Suppression from './model/Suppression';
import TPSPStat from './model/TPSPStat';
import UpdateSubAccount from './model/UpdateSubAccount';
import UpdateWebhook from './model/UpdateWebhook';
import UserAgent from './model/UserAgent';
import ValidationStat from './model/ValidationStat';
import Webhook from './model/Webhook';
import WebhookObject from './model/WebhookObject';
import DomainApi from './api/DomainApi';
import EmailApi from './api/EmailApi';
import IPApi from './api/IPApi';
import IPPoolsApi from './api/IPPoolsApi';
import MessageApi from './api/MessageApi';
import StatsApi from './api/StatsApi';
import StatsAApi from './api/StatsAApi';
import SubAccountApi from './api/SubAccountApi';
import SuppressionApi from './api/SuppressionApi';
import WebhookApi from './api/WebhookApi';


/**
* # Introduction  &gt; ### 📌 API versioning &amp; the v1 response contract &gt; &gt; This reference documents the **v1 response contract** — the stable, camelCase &gt; response shape that SendPost commits to. This is the shape you should build against. &gt; &gt; **During the current deprecation window**, requests authenticated with an account &gt; or sub-account API key receive the **legacy** response shape by default, so existing &gt; integrations keep working unchanged. To receive the documented v1 shape today, send: &gt; &gt; &#x60;&#x60;&#x60; &gt; X-SendPost-Public-Contract: v1 &gt; &#x60;&#x60;&#x60; &gt; &gt; **How to tell which shape you got.** Every public response echoes the applied &gt; contract in the &#x60;X-SendPost-Public-Contract&#x60; response header. While the legacy &gt; shape is being served, responses also carry standard deprecation signals: &gt; &#x60;Deprecation: true&#x60;, a &#x60;Sunset&#x60; header with the exact cut-over date, and a &gt; &#x60;Link: &lt;...&gt;; rel&#x3D;\&quot;deprecation\&quot;&#x60; header pointing at the migration guide. **Read the &gt; &#x60;Sunset&#x60; header for the authoritative end date** rather than hardcoding one. &gt; &gt; **After the sunset date**, v1 becomes the default and the legacy shape is no longer &gt; served. New integrations should send &#x60;X-SendPost-Public-Contract: v1&#x60; now and rely on &gt; the shapes in this reference.  SendPost provides email API and SMTP relay which can be used not just to send &amp; measure but also alert &amp; optimised email sending.  You can use SendPost to:  * Send personalised emails to multiple recipients using email API   * Track opens and clicks  * Analyse statistics around open, clicks, bounce, unsubscribe and spam    At and advanced level you can use it to:  * Manage multiple sub-accounts which may map to your promotional or transactional sending, multiple product lines or multiple customers   * Classify your emails using groups for better analysis  * Analyse and fix email sending at sub-account level, IP Pool level or group level  * Have automated alerts to notify disruptions regarding email sending  * Manage different dedicated IP Pools so to better control your email sending  * Automatically know when IP or domain is blacklisted or sender score is down  * Leverage pro deliverability tools to get significantly better email deliverability &amp; inboxing   [&lt;img src&#x3D;\&quot;https://run.pstmn.io/button.svg\&quot; alt&#x3D;\&quot;Run In Postman\&quot; style&#x3D;\&quot;width: 128px; height: 32px;\&quot;&gt;](https://god.gw.postman.com/run-collection/33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b?action&#x3D;collection%2Ffork&amp;source&#x3D;rip_markdown&amp;collection-url&#x3D;entityId%3D33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b%26entityType%3Dcollection%26workspaceId%3D6b1e4f65-96a9-4136-9512-6266c852517e)   # Overview  ## REST API  SendPost API is built on REST API principles. Authenticated users can interact with any of the API endpoints to perform:  * **GET**- to get a resource  * **POST** - to create a resource  * **PUT** - to update an existing resource  * **DELETE** - to delete a resource   The API endpoint for all API calls is: &lt;code&gt;https://api.sendpost.io/api/v1&lt;/code&gt;   Some conventions that have been followed in the API design overall are following:   * All resources have either &lt;code&gt;/api/v1/subaccount&lt;/code&gt; or &lt;code&gt;/api/v1/account&lt;/code&gt; in their API call resource path based on who is authorised for the resource. All API calls with path &lt;code&gt;/api/v1/subaccount&lt;/code&gt; use &lt;code&gt;X-SubAccount-ApiKey&lt;/code&gt; in their request header. Likewise all API calls with path &lt;code&gt;/api/v1/account&lt;/code&gt; use &lt;code&gt;X-Account-ApiKey&lt;/code&gt; in their request header.  * All resource endpoints end with singular name and not plural. So we have &lt;code&gt;domain&lt;/code&gt; instead of domains for domain resource endpoint. Likewise we have &lt;code&gt;sender&lt;/code&gt; instead of senders for sender resource endpoint.  * Body submitted for POST / PUT API calls as well as JSON response from SendPost API follow camelcase convention  * All timestamps returned in response (created or submittedAt response fields) are UNIX nano epoch timestamp.   &lt;aside class&#x3D;\&quot;success\&quot;&gt; All resources have either &lt;code&gt;/api/v1/subaccount&lt;/code&gt; or &lt;code&gt;/api/v1/account&lt;/code&gt; in their API call resource path based on who is authorised for the resource. All API calls with path &lt;code&gt;/api/v1/subaccount&lt;/code&gt; use &lt;code&gt;X-SubAccount-ApiKey&lt;/code&gt; in their request header. Likewise all API calls with path &lt;code&gt;/api/v1/account&lt;/code&gt; use &lt;code&gt;X-Account-ApiKey&lt;/code&gt; in their request header. &lt;/aside&gt;   SendPost uses conventional HTTP response codes to indicate the success or failure of an API request.    * Codes in the &lt;code&gt;2xx&lt;/code&gt; range indicate success.   * Codes in the &lt;code&gt;4xx&lt;/code&gt; range indicate an error owing due to unauthorize access, incorrect request parameters or body etc.  * Code in the &lt;code&gt;5xx&lt;/code&gt; range indicate an eror with SendPost&#39;s servers ( internal service issue or maintenance )   &lt;aside class&#x3D;\&quot;info\&quot;&gt; SendPost all responses return &lt;code&gt;created&lt;/code&gt; in UNIX nano epoch timestamp.  &lt;/aside&gt;   ## Authentication  SendPost uses API keys for authentication. You can register a new SendPost API key at our [developer portal](https://app.sendpost.io/register).   SendPost expects the API key to be included in all API requests to the server in a header that looks like the following:   &#x60;X-SubAccount-ApiKey: AHEZEP8192SEGH&#x60;   This API key is used for all Sub-Account level operations such as:  * Sending emails  * Retrieving stats regarding open, click, bounce, unsubscribe and spam  * Uploading suppressions list  * Verifying sending domains and more  In addition to &lt;code&gt;X-SubAccount-ApiKey&lt;/code&gt; you also have another API Key &lt;code&gt;X-Account-APIKey&lt;/code&gt; which is used for Account level operations such as :  * Creating and managing sub-accounts  * Allocating IPs for your account  * Getting overall billing and usage information  * Email List validation  * Creating and managing alerts and more   &lt;aside class&#x3D;\&quot;notice\&quot;&gt; You must look at individual API reference page to look at whether &lt;code&gt;X-SubAccount-ApiKey&lt;/code&gt; is required or &lt;code&gt;X-Account-ApiKey&lt;/code&gt; &lt;/aside&gt;   In case an incorrect API Key header is specified or if it is missed you will get HTTP Response 401 ( Unauthorized ) response from SendPost.   ## HTTP Response Headers   Code           | Reason                 | Details ---------------| -----------------------| ----------- 200            | Success                | Everything went well 401            | Unauthorized           | Incorrect or missing API header either &lt;code&gt;X-SubAccount-ApiKey&lt;/code&gt; or &lt;code&gt;X-Account-ApiKey&lt;/code&gt; 403            | Forbidden              | Typically sent when resource with same name or details already exist 406            | Missing resource id    | Resource id specified is either missing or doesn&#39;t exist 422            | Unprocessable entity   | Request body is not in proper format 500            | Internal server error  | Some error happened at SendPost while processing API request 503            | Service Unavailable    | SendPost is offline for maintenance. Please try again later  # API SDKs  We have native SendPost SDKs in the following programming languages. You can integrate with them or create your own SDK with our API specification. In case you need any assistance with respect to API then do reachout to our team from website chat or email us at **hello@sendpost.io**   * [PHP](https://github.com/sendpost/sendpost_php_sdk)  * [Javascript](https://github.com/sendpost/sendpost_javascript_sdk)  * [Ruby](https://github.com/sendpost/sendpost_ruby_sdk)  * [Python](https://github.com/sendpost/sendpost_python_sdk)  * [Golang](https://github.com/sendpost/sendpost_go_sdk)   # API Reference  SendX REST API can be broken down into two major sub-sections:   * Sub-Account  * Account    Sub-Account API operations enable common email sending API use-cases like sending bulk email, adding new domains or senders for email sending programmatically, retrieving stats, adding suppressions etc. All Sub-Account API operations need to pass &lt;code&gt;X-SubAccount-ApiKey&lt;/code&gt; header with every API call.   The Account API operations allow users to manage multiple sub-accounts and manage IPs. A single parent SendPost account can have 100&#39;s of sub-accounts. You may want to create sub-accounts for different products your company is running or to segregate types of emails or for managing email sending across multiple customers of yours.   # SMTP Reference  Simple Mail Transfer Protocol (SMTP) is a quick and easy way to send email from one server to another. SendPost provides an SMTP service that allows you to deliver your email via our servers instead of your own client or server.  This means you can count on SendPost&#39;s delivery at scale for your SMTP needs.    ## Integrating SMTP    1. Get the SMTP &#x60;username&#x60; and &#x60;password&#x60; from your SendPost account.  2. Set the server host in your email client or application to &#x60;smtp.sendpost.io&#x60;. This setting is sometimes referred to as the external SMTP server or the SMTP relay.  3. Set the &#x60;username&#x60; and &#x60;password&#x60;.  4. Set the port to &#x60;587&#x60; (or as specified below).  ## SMTP Ports   - For an unencrypted or a TLS connection, use port &#x60;25&#x60;, &#x60;2525&#x60; or &#x60;587&#x60;.  - For a SSL connection, use port &#x60;465&#x60;  - Check your firewall and network to ensure they&#39;re not blocking any of our SMTP Endpoints.   SendPost supports STARTTLS for establishing a TLS-encrypted connection. STARTTLS is a means of upgrading an unencrypted connection to an encrypted connection. There are versions of STARTTLS for a variety of protocols; the SMTP version is defined in [RFC 3207](https://www.ietf.org/rfc/rfc3207.txt).   To set up a STARTTLS connection, the SMTP client connects to the SendPost SMTP endpoint &#x60;smtp.sendpost.io&#x60; on port 25, 587, or 2525, issues an EHLO command, and waits for the server to announce that it supports the STARTTLS SMTP extension. The client then issues the STARTTLS command, initiating TLS negotiation. When negotiation is complete, the client issues an EHLO command over the new encrypted connection, and the SMTP session proceeds normally.   &lt;aside class&#x3D;\&quot;success\&quot;&gt; If you are unsure which port to use, a TLS connection on port 587 is typically recommended. &lt;/aside&gt;   ## Sending email from your application   &#x60;&#x60;&#x60;javascript \&quot;use strict\&quot;;  const nodemailer &#x3D; require(\&quot;nodemailer\&quot;);  async function main() { // create reusable transporter object using the default SMTP transport let transporter &#x3D; nodemailer.createTransport({ host: \&quot;smtp.sendpost.io\&quot;, port: 587, secure: false, // true for 465, false for other ports auth: { user:  \&quot;&lt;username&gt;\&quot; , // generated ethereal user pass: \&quot;&lt;password&gt;\&quot;, // generated ethereal password }, requireTLS: true, debug: true, logger: true, });  // send mail with defined transport object try { let info &#x3D; await transporter.sendMail({ from: &#39;erlich@piedpiper.com&#39;, to: &#39;gilfoyle@piedpiper.com&#39;, subject: &#39;Test Email Subject&#39;, html: &#39;&lt;h1&gt;Hello Geeks!!!&lt;/h1&gt;&#39;, }); console.log(\&quot;Message sent: %s\&quot;, info.messageId); } catch (e) { console.log(e) } }  main().catch(console.error); &#x60;&#x60;&#x60;  For PHP   &#x60;&#x60;&#x60;php &lt;?php // Import PHPMailer classes into the global namespace use PHPMailer\\PHPMailer\\PHPMailer; use PHPMailer\\PHPMailer\\SMTP; use PHPMailer\\PHPMailer\\Exception;  // Load Composer&#39;s autoloader require &#39;vendor/autoload.php&#39;;  $mail &#x3D; new PHPMailer(true);  // Settings try { $mail-&gt;SMTPDebug &#x3D; SMTP::DEBUG_CONNECTION;                  // Enable verbose debug output $mail-&gt;isSMTP();                                            // Send using SMTP $mail-&gt;Host       &#x3D; &#39;smtp.sendpost.io&#39;;                     // Set the SMTP server to send through $mail-&gt;SMTPAuth   &#x3D; true;                                   // Enable SMTP authentication $mail-&gt;Username   &#x3D; &#39;&lt;username&gt;&#39;;                           // SMTP username $mail-&gt;Password   &#x3D; &#39;&lt;password&gt;&#39;;                           // SMTP password $mail-&gt;SMTPSecure &#x3D; PHPMailer::ENCRYPTION_STARTTLS;         // Enable implicit TLS encryption $mail-&gt;Port       &#x3D; 587;                                    // TCP port to connect to; use 587 if you have set &#x60;SMTPSecure &#x3D; PHPMailer::ENCRYPTION_STARTTLS&#x60;  //Recipients $mail-&gt;setFrom(&#39;erlich@piedpiper.com&#39;, &#39;Erlich&#39;); $mail-&gt;addAddress(&#39;gilfoyle@piedpiper.com&#39;, &#39;Gilfoyle&#39;);  //Content $mail-&gt;isHTML(true);                                  //Set email format to HTML $mail-&gt;Subject &#x3D; &#39;Here is the subject&#39;; $mail-&gt;Body    &#x3D; &#39;This is the HTML message body &lt;b&gt;in bold!&lt;/b&gt;&#39;; $mail-&gt;AltBody &#x3D; &#39;This is the body in plain text for non-HTML mail clients&#39;;  $mail-&gt;send(); echo &#39;Message has been sent&#39;;  } catch (Exception $e) { echo \&quot;Message could not be sent. Mailer Error: {$mail-&gt;ErrorInfo}\&quot;; } &#x60;&#x60;&#x60; For Python &#x60;&#x60;&#x60;python #!/usr/bin/python3  import sys import os import re  from smtplib import SMTP import ssl  from email.mime.text import MIMEText  SMTPserver &#x3D; &#39;smtp.sendpost.io&#39; PORT &#x3D; 587 sender &#x3D;     &#39;erlich@piedpiper.com&#39; destination &#x3D; [&#39;gilfoyle@piedpiper.com&#39;]  USERNAME &#x3D; \&quot;&lt;username&gt;\&quot; PASSWORD &#x3D; \&quot;&lt;password&gt;\&quot;  # typical values for text_subtype are plain, html, xml text_subtype &#x3D; &#39;plain&#39;  content&#x3D;\&quot;\&quot;\&quot;\\ Test message \&quot;\&quot;\&quot;  subject&#x3D;\&quot;Sent from Python\&quot;  try: msg &#x3D; MIMEText(content, text_subtype) msg[&#39;Subject&#39;]&#x3D; subject msg[&#39;From&#39;]   &#x3D; sender  conn &#x3D; SMTP(SMTPserver, PORT) conn.ehlo() context &#x3D; ssl.create_default_context() conn.starttls(context&#x3D;context)  # upgrade to tls conn.ehlo() conn.set_debuglevel(True) conn.login(USERNAME, PASSWORD)  try: resp &#x3D; conn.sendmail(sender, destination, msg.as_string()) print(\&quot;Send Mail Response: \&quot;, resp) except Exception as e: print(\&quot;Send Email Error: \&quot;, e) finally: conn.quit()  except Exception as e: print(\&quot;Error:\&quot;, e) &#x60;&#x60;&#x60; For Golang &#x60;&#x60;&#x60;go package main  import ( \&quot;fmt\&quot; \&quot;net/smtp\&quot; \&quot;os\&quot; )  // Sending Email Using Smtp in Golang  func main() {  username :&#x3D; \&quot;&lt;username&gt;\&quot; password :&#x3D; \&quot;&lt;password&gt;\&quot;  from :&#x3D; \&quot;erlich@piedpiper.com\&quot; toList :&#x3D; []string{\&quot;gilfoyle@piedpiper.com\&quot;} host :&#x3D; \&quot;smtp.sendpost.io\&quot; port :&#x3D; \&quot;587\&quot; // recommended  // This is the message to send in the mail msg :&#x3D; \&quot;Hello geeks!!!\&quot;  // We can&#39;t send strings directly in mail, // strings need to be converted into slice bytes body :&#x3D; []byte(msg)  // PlainAuth uses the given username and password to // authenticate to host and act as identity. // Usually identity should be the empty string, // to act as username. auth :&#x3D; smtp.PlainAuth(\&quot;\&quot;, username, password, host)  // SendMail uses TLS connection to send the mail // The email is sent to all address in the toList, // the body should be of type bytes, not strings // This returns error if any occured. err :&#x3D; smtp.SendMail(host+\&quot;:\&quot;+port, auth, from, toList, body)  // handling the errors if err !&#x3D; nil { fmt.Println(err) os.Exit(1) }  fmt.Println(\&quot;Successfully sent mail to all user in toList\&quot;) }  &#x60;&#x60;&#x60; For Java &#x60;&#x60;&#x60;java // implementation &#39;com.sun.mail:javax.mail:1.6.2&#39;  import java.util.Properties;  import javax.mail.Message; import javax.mail.Session; import javax.mail.Transport; import javax.mail.internet.InternetAddress; import javax.mail.internet.MimeMessage;  public class SMTPConnect {  // This address must be verified. static final String FROM &#x3D; \&quot;erlich@piedpiper.com\&quot;; static final String FROMNAME &#x3D; \&quot;Erlich Bachman\&quot;;  // Replace recipient@example.com with a \&quot;To\&quot; address. If your account // is still in the sandbox, this address must be verified. static final String TO &#x3D; \&quot;gilfoyle@piedpiper.com\&quot;;  // Replace smtp_username with your SendPost SMTP user name. static final String SMTP_USERNAME &#x3D; \&quot;&lt;username&gt;\&quot;;  // Replace smtp_password with your SendPost SMTP password. static final String SMTP_PASSWORD &#x3D; \&quot;&lt;password&gt;\&quot;;  // SMTP Host Name static final String HOST &#x3D; \&quot;smtp.sendpost.io\&quot;;  // The port you will connect to on SendPost SMTP Endpoint. static final int PORT &#x3D; 587;  static final String SUBJECT &#x3D; \&quot;SendPost SMTP Test (SMTP interface accessed using Java)\&quot;;  static final String BODY &#x3D; String.join( System.getProperty(\&quot;line.separator\&quot;), \&quot;&lt;h1&gt;SendPost SMTP Test&lt;/h1&gt;\&quot;, \&quot;&lt;p&gt;This email was sent with SendPost using the \&quot;, \&quot;&lt;a href&#x3D;&#39;https://github.com/eclipse-ee4j/mail&#39;&gt;Javamail Package&lt;/a&gt;\&quot;, \&quot; for &lt;a href&#x3D;&#39;https://www.java.com&#39;&gt;Java&lt;/a&gt;.\&quot; );  public static void main(String[] args) throws Exception {  // Create a Properties object to contain connection configuration information. Properties props &#x3D; System.getProperties(); props.put(\&quot;mail.transport.protocol\&quot;, \&quot;smtp\&quot;); props.put(\&quot;mail.smtp.port\&quot;, PORT); props.put(\&quot;mail.smtp.starttls.enable\&quot;, \&quot;true\&quot;); props.put(\&quot;mail.smtp.debug\&quot;, \&quot;true\&quot;); props.put(\&quot;mail.smtp.auth\&quot;, \&quot;true\&quot;);  // Create a Session object to represent a mail session with the specified properties. Session session &#x3D; Session.getDefaultInstance(props);  // Create a message with the specified information. MimeMessage msg &#x3D; new MimeMessage(session); msg.setFrom(new InternetAddress(FROM,FROMNAME)); msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO)); msg.setSubject(SUBJECT); msg.setContent(BODY,\&quot;text/html\&quot;);  // Create a transport. Transport transport &#x3D; session.getTransport();  // Send the message. try { System.out.println(\&quot;Sending...\&quot;);  // Connect to SendPost SMTP using the SMTP username and password you specified above. transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);  // Send the email. transport.sendMessage(msg, msg.getAllRecipients()); System.out.println(\&quot;Email sent!\&quot;);  } catch (Exception ex) {  System.out.println(\&quot;The email was not sent.\&quot;); System.out.println(\&quot;Error message: \&quot; + ex.getMessage()); System.out.println(ex); } // Close and terminate the connection. } } &#x60;&#x60;&#x60;  Many programming languages support sending email using SMTP. This capability might be built into the programming language itself, or it might be available as an add-on, plug-in, or library. You can take advantage of this capability by sending email through SendPost from within application programs that you write.  We have provided examples in Python3, Golang, Java, PHP, JS.  # API Contract Versioning (Public REST)  The public REST API uses a versioned response contract so field changes stay non-breaking:  * Send &#x60;X-SendPost-Public-Contract: v1&#x60; to opt into the current v1 response shape, or &#x60;legacy&#x60; for the pre-v1 shape. If the header is omitted, the applied contract is policy-driven — &#x60;legacy&#x60; before the published sunset date, &#x60;v1&#x60; after it. * Every response echoes &#x60;X-SendPost-Public-Contract: &lt;applied&gt;&#x60;. When the &#x60;legacy&#x60; contract is served, responses also include &#x60;Deprecation: true&#x60;, &#x60;Sunset: &lt;RFC1123 date&gt;&#x60;, and &#x60;Link: &lt;doc-url&gt;; rel&#x3D;\&quot;deprecation\&quot;&#x60;. * Migrate to &#x60;v1&#x60; before the sunset date. Notable legacy → v1 field changes: Suppression &#x60;smtp_error&#x60; → &#x60;smtpError&#x60;, Stat &#x60;email_type&#x60; → &#x60;emailType&#x60;.  &gt; &#x60;X-SendPost-Private-Api: true&#x60; is an internal header used only by the SendPost dashboard to receive richer internal objects. It is not part of the public SDK contract and should not be set by API integrations. .<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var sendpost = require('sendpost/index'); // See note below*.
* var xxxSvc = new sendpost.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new sendpost.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['sendpost/index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new sendpost.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new sendpost.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module sendpost/index
* @version 3.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:sendpost/ApiClient}
     */
    ApiClient,

    /**
     * The AccountCycleUsage model constructor.
     * @property {module:sendpost/model/AccountCycleUsage}
     */
    AccountCycleUsage,

    /**
     * The AccountStats model constructor.
     * @property {module:sendpost/model/AccountStats}
     */
    AccountStats,

    /**
     * The AccountWebhookWithStats model constructor.
     * @property {module:sendpost/model/AccountWebhookWithStats}
     */
    AccountWebhookWithStats,

    /**
     * The AggregateStat model constructor.
     * @property {module:sendpost/model/AggregateStat}
     */
    AggregateStat,

    /**
     * The AggregateStats model constructor.
     * @property {module:sendpost/model/AggregateStats}
     */
    AggregateStats,

    /**
     * The Attachment model constructor.
     * @property {module:sendpost/model/Attachment}
     */
    Attachment,

    /**
     * The BlacklistLinks model constructor.
     * @property {module:sendpost/model/BlacklistLinks}
     */
    BlacklistLinks,

    /**
     * The BlacklistResource model constructor.
     * @property {module:sendpost/model/BlacklistResource}
     */
    BlacklistResource,

    /**
     * The BlacklistedOn model constructor.
     * @property {module:sendpost/model/BlacklistedOn}
     */
    BlacklistedOn,

    /**
     * The CopyTo model constructor.
     * @property {module:sendpost/model/CopyTo}
     */
    CopyTo,

    /**
     * The CreateDomainRequest model constructor.
     * @property {module:sendpost/model/CreateDomainRequest}
     */
    CreateDomainRequest,

    /**
     * The CreateSuppressionRequest model constructor.
     * @property {module:sendpost/model/CreateSuppressionRequest}
     */
    CreateSuppressionRequest,

    /**
     * The CreateSuppressionRequestHardBounceInner model constructor.
     * @property {module:sendpost/model/CreateSuppressionRequestHardBounceInner}
     */
    CreateSuppressionRequestHardBounceInner,

    /**
     * The CreateSuppressionRequestManualInner model constructor.
     * @property {module:sendpost/model/CreateSuppressionRequestManualInner}
     */
    CreateSuppressionRequestManualInner,

    /**
     * The CreateSuppressionRequestSpamComplaintInner model constructor.
     * @property {module:sendpost/model/CreateSuppressionRequestSpamComplaintInner}
     */
    CreateSuppressionRequestSpamComplaintInner,

    /**
     * The CreateSuppressionRequestUnsubscribeInner model constructor.
     * @property {module:sendpost/model/CreateSuppressionRequestUnsubscribeInner}
     */
    CreateSuppressionRequestUnsubscribeInner,

    /**
     * The DailyStatistics model constructor.
     * @property {module:sendpost/model/DailyStatistics}
     */
    DailyStatistics,

    /**
     * The DateStat model constructor.
     * @property {module:sendpost/model/DateStat}
     */
    DateStat,

    /**
     * The DeleteResponse model constructor.
     * @property {module:sendpost/model/DeleteResponse}
     */
    DeleteResponse,

    /**
     * The DeleteSubAccountResponse model constructor.
     * @property {module:sendpost/model/DeleteSubAccountResponse}
     */
    DeleteSubAccountResponse,

    /**
     * The DeleteSuppression200Response model constructor.
     * @property {module:sendpost/model/DeleteSuppression200Response}
     */
    DeleteSuppression200Response,

    /**
     * The DeleteSuppressionRequest model constructor.
     * @property {module:sendpost/model/DeleteSuppressionRequest}
     */
    DeleteSuppressionRequest,

    /**
     * The DeleteSuppressionRequestSuppressionsInner model constructor.
     * @property {module:sendpost/model/DeleteSuppressionRequestSuppressionsInner}
     */
    DeleteSuppressionRequestSuppressionsInner,

    /**
     * The DeleteWebhookResponse model constructor.
     * @property {module:sendpost/model/DeleteWebhookResponse}
     */
    DeleteWebhookResponse,

    /**
     * The Device model constructor.
     * @property {module:sendpost/model/Device}
     */
    Device,

    /**
     * The DnsRecord model constructor.
     * @property {module:sendpost/model/DnsRecord}
     */
    DnsRecord,

    /**
     * The Domain model constructor.
     * @property {module:sendpost/model/Domain}
     */
    Domain,

    /**
     * The DomainStat model constructor.
     * @property {module:sendpost/model/DomainStat}
     */
    DomainStat,

    /**
     * The EIP model constructor.
     * @property {module:sendpost/model/EIP}
     */
    EIP,

    /**
     * The EmailAddress model constructor.
     * @property {module:sendpost/model/EmailAddress}
     */
    EmailAddress,

    /**
     * The EmailMessage model constructor.
     * @property {module:sendpost/model/EmailMessage}
     */
    EmailMessage,

    /**
     * The EmailMessageObject model constructor.
     * @property {module:sendpost/model/EmailMessageObject}
     */
    EmailMessageObject,

    /**
     * The EmailMessageWithTemplate model constructor.
     * @property {module:sendpost/model/EmailMessageWithTemplate}
     */
    EmailMessageWithTemplate,

    /**
     * The EmailResponse model constructor.
     * @property {module:sendpost/model/EmailResponse}
     */
    EmailResponse,

    /**
     * The EmailTypeStat model constructor.
     * @property {module:sendpost/model/EmailTypeStat}
     */
    EmailTypeStat,

    /**
     * The ErrorResponse model constructor.
     * @property {module:sendpost/model/ErrorResponse}
     */
    ErrorResponse,

    /**
     * The ErrorResponseError model constructor.
     * @property {module:sendpost/model/ErrorResponseError}
     */
    ErrorResponseError,

    /**
     * The ErrorResponseErrorDetailsInner model constructor.
     * @property {module:sendpost/model/ErrorResponseErrorDetailsInner}
     */
    ErrorResponseErrorDetailsInner,

    /**
     * The Event model constructor.
     * @property {module:sendpost/model/Event}
     */
    Event,

    /**
     * The EventMetadata model constructor.
     * @property {module:sendpost/model/EventMetadata}
     */
    EventMetadata,

    /**
     * The GeoLocation model constructor.
     * @property {module:sendpost/model/GeoLocation}
     */
    GeoLocation,

    /**
     * The GroupStat model constructor.
     * @property {module:sendpost/model/GroupStat}
     */
    GroupStat,

    /**
     * The IP model constructor.
     * @property {module:sendpost/model/IP}
     */
    IP,

    /**
     * The IPAllocationRequest model constructor.
     * @property {module:sendpost/model/IPAllocationRequest}
     */
    IPAllocationRequest,

    /**
     * The IPDeletionResponse model constructor.
     * @property {module:sendpost/model/IPDeletionResponse}
     */
    IPDeletionResponse,

    /**
     * The IPPool model constructor.
     * @property {module:sendpost/model/IPPool}
     */
    IPPool,

    /**
     * The IPPoolCreateRequest model constructor.
     * @property {module:sendpost/model/IPPoolCreateRequest}
     */
    IPPoolCreateRequest,

    /**
     * The IPPoolDeleteResponse model constructor.
     * @property {module:sendpost/model/IPPoolDeleteResponse}
     */
    IPPoolDeleteResponse,

    /**
     * The IPPoolStat model constructor.
     * @property {module:sendpost/model/IPPoolStat}
     */
    IPPoolStat,

    /**
     * The IPPoolUpdateRequest model constructor.
     * @property {module:sendpost/model/IPPoolUpdateRequest}
     */
    IPPoolUpdateRequest,

    /**
     * The IPStat model constructor.
     * @property {module:sendpost/model/IPStat}
     */
    IPStat,

    /**
     * The IPUpdateRequest model constructor.
     * @property {module:sendpost/model/IPUpdateRequest}
     */
    IPUpdateRequest,

    /**
     * The Label model constructor.
     * @property {module:sendpost/model/Label}
     */
    Label,

    /**
     * The Member model constructor.
     * @property {module:sendpost/model/Member}
     */
    Member,

    /**
     * The Message model constructor.
     * @property {module:sendpost/model/Message}
     */
    Message,

    /**
     * The NewSubAccount model constructor.
     * @property {module:sendpost/model/NewSubAccount}
     */
    NewSubAccount,

    /**
     * The NewWebhook model constructor.
     * @property {module:sendpost/model/NewWebhook}
     */
    NewWebhook,

    /**
     * The Os model constructor.
     * @property {module:sendpost/model/Os}
     */
    Os,

    /**
     * The PostmasterDomainStat model constructor.
     * @property {module:sendpost/model/PostmasterDomainStat}
     */
    PostmasterDomainStat,

    /**
     * The ProviderStat model constructor.
     * @property {module:sendpost/model/ProviderStat}
     */
    ProviderStat,

    /**
     * The RAIPPoolStat model constructor.
     * @property {module:sendpost/model/RAIPPoolStat}
     */
    RAIPPoolStat,

    /**
     * The RDStat model constructor.
     * @property {module:sendpost/model/RDStat}
     */
    RDStat,

    /**
     * The RIPStat model constructor.
     * @property {module:sendpost/model/RIPStat}
     */
    RIPStat,

    /**
     * The RStat model constructor.
     * @property {module:sendpost/model/RStat}
     */
    RStat,

    /**
     * The Recipient model constructor.
     * @property {module:sendpost/model/Recipient}
     */
    Recipient,

    /**
     * The SDStat model constructor.
     * @property {module:sendpost/model/SDStat}
     */
    SDStat,

    /**
     * The SMTPAuth model constructor.
     * @property {module:sendpost/model/SMTPAuth}
     */
    SMTPAuth,

    /**
     * The SeedContactStats model constructor.
     * @property {module:sendpost/model/SeedContactStats}
     */
    SeedContactStats,

    /**
     * The Stat model constructor.
     * @property {module:sendpost/model/Stat}
     */
    Stat,

    /**
     * The SubAccount model constructor.
     * @property {module:sendpost/model/SubAccount}
     */
    SubAccount,

    /**
     * The SubAccountStat model constructor.
     * @property {module:sendpost/model/SubAccountStat}
     */
    SubAccountStat,

    /**
     * The SubAccountStatForPool model constructor.
     * @property {module:sendpost/model/SubAccountStatForPool}
     */
    SubAccountStatForPool,

    /**
     * The Suppression model constructor.
     * @property {module:sendpost/model/Suppression}
     */
    Suppression,

    /**
     * The TPSPStat model constructor.
     * @property {module:sendpost/model/TPSPStat}
     */
    TPSPStat,

    /**
     * The UpdateSubAccount model constructor.
     * @property {module:sendpost/model/UpdateSubAccount}
     */
    UpdateSubAccount,

    /**
     * The UpdateWebhook model constructor.
     * @property {module:sendpost/model/UpdateWebhook}
     */
    UpdateWebhook,

    /**
     * The UserAgent model constructor.
     * @property {module:sendpost/model/UserAgent}
     */
    UserAgent,

    /**
     * The ValidationStat model constructor.
     * @property {module:sendpost/model/ValidationStat}
     */
    ValidationStat,

    /**
     * The Webhook model constructor.
     * @property {module:sendpost/model/Webhook}
     */
    Webhook,

    /**
     * The WebhookObject model constructor.
     * @property {module:sendpost/model/WebhookObject}
     */
    WebhookObject,

    /**
    * The DomainApi service constructor.
    * @property {module:sendpost/api/DomainApi}
    */
    DomainApi,

    /**
    * The EmailApi service constructor.
    * @property {module:sendpost/api/EmailApi}
    */
    EmailApi,

    /**
    * The IPApi service constructor.
    * @property {module:sendpost/api/IPApi}
    */
    IPApi,

    /**
    * The IPPoolsApi service constructor.
    * @property {module:sendpost/api/IPPoolsApi}
    */
    IPPoolsApi,

    /**
    * The MessageApi service constructor.
    * @property {module:sendpost/api/MessageApi}
    */
    MessageApi,

    /**
    * The StatsApi service constructor.
    * @property {module:sendpost/api/StatsApi}
    */
    StatsApi,

    /**
    * The StatsAApi service constructor.
    * @property {module:sendpost/api/StatsAApi}
    */
    StatsAApi,

    /**
    * The SubAccountApi service constructor.
    * @property {module:sendpost/api/SubAccountApi}
    */
    SubAccountApi,

    /**
    * The SuppressionApi service constructor.
    * @property {module:sendpost/api/SuppressionApi}
    */
    SuppressionApi,

    /**
    * The WebhookApi service constructor.
    * @property {module:sendpost/api/WebhookApi}
    */
    WebhookApi
};
