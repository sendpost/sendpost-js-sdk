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

import ApiClient from '../ApiClient';
import Attachment from './Attachment';
import EmailAddress from './EmailAddress';
import EmailMessageObject from './EmailMessageObject';
import Recipient from './Recipient';

/**
 * The EmailMessageWithTemplate model module.
 * @module sendpost/model/EmailMessageWithTemplate
 * @version 3.0.0
 */
class EmailMessageWithTemplate {
    /**
     * Constructs a new <code>EmailMessageWithTemplate</code>.
     * @alias module:sendpost/model/EmailMessageWithTemplate
     * @implements module:sendpost/model/EmailMessageObject
     * @param from {module:sendpost/model/EmailAddress} The sender's email address and optional display name
     * @param to {Array.<module:sendpost/model/Recipient>} List of recipients. Each recipient can have their own CC, BCC, and custom fields for personalization. Maximum 1000 recipients per API call. 
     */
    constructor(from, to) { 
        EmailMessageObject.initialize(this, from, to);
        EmailMessageWithTemplate.initialize(this, from, to);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, from, to) { 
        obj['from'] = from;
        obj['to'] = to;
        obj['trackOpens'] = true;
        obj['trackClicks'] = true;
    }

    /**
     * Constructs a <code>EmailMessageWithTemplate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/EmailMessageWithTemplate} obj Optional instance to populate.
     * @return {module:sendpost/model/EmailMessageWithTemplate} The populated <code>EmailMessageWithTemplate</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new EmailMessageWithTemplate();
            EmailMessageObject.constructFromObject(data, obj);

            if (data.hasOwnProperty('from')) {
                obj['from'] = EmailAddress.constructFromObject(data['from']);
            }
            if (data.hasOwnProperty('replyTo')) {
                obj['replyTo'] = EmailAddress.constructFromObject(data['replyTo']);
            }
            if (data.hasOwnProperty('to')) {
                obj['to'] = ApiClient.convertToType(data['to'], [Recipient]);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
            }
            if (data.hasOwnProperty('preText')) {
                obj['preText'] = ApiClient.convertToType(data['preText'], 'String');
            }
            if (data.hasOwnProperty('htmlBody')) {
                obj['htmlBody'] = ApiClient.convertToType(data['htmlBody'], 'String');
            }
            if (data.hasOwnProperty('textBody')) {
                obj['textBody'] = ApiClient.convertToType(data['textBody'], 'String');
            }
            if (data.hasOwnProperty('ampBody')) {
                obj['ampBody'] = ApiClient.convertToType(data['ampBody'], 'String');
            }
            if (data.hasOwnProperty('template')) {
                obj['template'] = ApiClient.convertToType(data['template'], 'String');
            }
            if (data.hasOwnProperty('ippool')) {
                obj['ippool'] = ApiClient.convertToType(data['ippool'], 'String');
            }
            if (data.hasOwnProperty('headers')) {
                obj['headers'] = ApiClient.convertToType(data['headers'], {'String': 'String'});
            }
            if (data.hasOwnProperty('trackOpens')) {
                obj['trackOpens'] = ApiClient.convertToType(data['trackOpens'], 'Boolean');
            }
            if (data.hasOwnProperty('trackClicks')) {
                obj['trackClicks'] = ApiClient.convertToType(data['trackClicks'], 'Boolean');
            }
            if (data.hasOwnProperty('groups')) {
                obj['groups'] = ApiClient.convertToType(data['groups'], ['String']);
            }
            if (data.hasOwnProperty('attachments')) {
                obj['attachments'] = ApiClient.convertToType(data['attachments'], [Attachment]);
            }
            if (data.hasOwnProperty('webhookEndpoint')) {
                obj['webhookEndpoint'] = ApiClient.convertToType(data['webhookEndpoint'], 'String');
            }
            if (data.hasOwnProperty('templateId')) {
                obj['templateId'] = ApiClient.convertToType(data['templateId'], 'String');
            }
            if (data.hasOwnProperty('templateVariables')) {
                obj['templateVariables'] = ApiClient.convertToType(data['templateVariables'], {'String': 'String'});
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailMessageWithTemplate</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailMessageWithTemplate</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of EmailMessageWithTemplate.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // validate the optional field `from`
        if (data['from']) { // data not null
          EmailAddress.validateJSON(data['from']);
        }
        // validate the optional field `replyTo`
        if (data['replyTo']) { // data not null
          EmailAddress.validateJSON(data['replyTo']);
        }
        if (data['to']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['to'])) {
                throw new Error("Expected the field `to` to be an array in the JSON data but got " + data['to']);
            }
            // validate the optional field `to` (array)
            for (const item of data['to']) {
                Recipient.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['subject'] && !(typeof data['subject'] === 'string' || data['subject'] instanceof String)) {
            throw new Error("Expected the field `subject` to be a primitive type in the JSON string but got " + data['subject']);
        }
        // ensure the json data is a string
        if (data['preText'] && !(typeof data['preText'] === 'string' || data['preText'] instanceof String)) {
            throw new Error("Expected the field `preText` to be a primitive type in the JSON string but got " + data['preText']);
        }
        // ensure the json data is a string
        if (data['htmlBody'] && !(typeof data['htmlBody'] === 'string' || data['htmlBody'] instanceof String)) {
            throw new Error("Expected the field `htmlBody` to be a primitive type in the JSON string but got " + data['htmlBody']);
        }
        // ensure the json data is a string
        if (data['textBody'] && !(typeof data['textBody'] === 'string' || data['textBody'] instanceof String)) {
            throw new Error("Expected the field `textBody` to be a primitive type in the JSON string but got " + data['textBody']);
        }
        // ensure the json data is a string
        if (data['ampBody'] && !(typeof data['ampBody'] === 'string' || data['ampBody'] instanceof String)) {
            throw new Error("Expected the field `ampBody` to be a primitive type in the JSON string but got " + data['ampBody']);
        }
        // ensure the json data is a string
        if (data['template'] && !(typeof data['template'] === 'string' || data['template'] instanceof String)) {
            throw new Error("Expected the field `template` to be a primitive type in the JSON string but got " + data['template']);
        }
        // ensure the json data is a string
        if (data['ippool'] && !(typeof data['ippool'] === 'string' || data['ippool'] instanceof String)) {
            throw new Error("Expected the field `ippool` to be a primitive type in the JSON string but got " + data['ippool']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['groups'])) {
            throw new Error("Expected the field `groups` to be an array in the JSON data but got " + data['groups']);
        }
        if (data['attachments']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['attachments'])) {
                throw new Error("Expected the field `attachments` to be an array in the JSON data but got " + data['attachments']);
            }
            // validate the optional field `attachments` (array)
            for (const item of data['attachments']) {
                Attachment.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['webhookEndpoint'] && !(typeof data['webhookEndpoint'] === 'string' || data['webhookEndpoint'] instanceof String)) {
            throw new Error("Expected the field `webhookEndpoint` to be a primitive type in the JSON string but got " + data['webhookEndpoint']);
        }
        // ensure the json data is a string
        if (data['templateId'] && !(typeof data['templateId'] === 'string' || data['templateId'] instanceof String)) {
            throw new Error("Expected the field `templateId` to be a primitive type in the JSON string but got " + data['templateId']);
        }

        return true;
    }

/**
     * Returns The sender's email address and optional display name
     * @return {module:sendpost/model/EmailAddress}
     */
    getFrom() {
        return this.from;
    }

    /**
     * Sets The sender's email address and optional display name
     * @param {module:sendpost/model/EmailAddress} from The sender's email address and optional display name
     */
    setFrom(from) {
        this['from'] = from;
    }
/**
     * Returns The reply-to email address. If not specified, replies will go to the `from` address
     * @return {module:sendpost/model/EmailAddress}
     */
    getReplyTo() {
        return this.replyTo;
    }

    /**
     * Sets The reply-to email address. If not specified, replies will go to the `from` address
     * @param {module:sendpost/model/EmailAddress} replyTo The reply-to email address. If not specified, replies will go to the `from` address
     */
    setReplyTo(replyTo) {
        this['replyTo'] = replyTo;
    }
/**
     * Returns List of recipients. Each recipient can have their own CC, BCC, and custom fields for personalization. Maximum 1000 recipients per API call. 
     * @return {Array.<module:sendpost/model/Recipient>}
     */
    getTo() {
        return this.to;
    }

    /**
     * Sets List of recipients. Each recipient can have their own CC, BCC, and custom fields for personalization. Maximum 1000 recipients per API call. 
     * @param {Array.<module:sendpost/model/Recipient>} to List of recipients. Each recipient can have their own CC, BCC, and custom fields for personalization. Maximum 1000 recipients per API call. 
     */
    setTo(to) {
        this['to'] = to;
    }
/**
     * Returns Email subject line. Supports Handlebars templating for personalization. Example: \"Hello, {{firstName}}! Your order is ready\" 
     * @return {String}
     */
    getSubject() {
        return this.subject;
    }

    /**
     * Sets Email subject line. Supports Handlebars templating for personalization. Example: \"Hello, {{firstName}}! Your order is ready\" 
     * @param {String} subject Email subject line. Supports Handlebars templating for personalization. Example: \"Hello, {{firstName}}! Your order is ready\" 
     */
    setSubject(subject) {
        this['subject'] = subject;
    }
/**
     * Returns Preview text (preheader) shown in email clients before opening the email. This text appears after the subject line in most email clients' inbox view. 
     * @return {String}
     */
    getPreText() {
        return this.preText;
    }

    /**
     * Sets Preview text (preheader) shown in email clients before opening the email. This text appears after the subject line in most email clients' inbox view. 
     * @param {String} preText Preview text (preheader) shown in email clients before opening the email. This text appears after the subject line in most email clients' inbox view. 
     */
    setPreText(preText) {
        this['preText'] = preText;
    }
/**
     * Returns HTML content of the email. Supports Handlebars templating for personalization. Use {{customFieldName}} to insert recipient-specific values. 
     * @return {String}
     */
    getHtmlBody() {
        return this.htmlBody;
    }

    /**
     * Sets HTML content of the email. Supports Handlebars templating for personalization. Use {{customFieldName}} to insert recipient-specific values. 
     * @param {String} htmlBody HTML content of the email. Supports Handlebars templating for personalization. Use {{customFieldName}} to insert recipient-specific values. 
     */
    setHtmlBody(htmlBody) {
        this['htmlBody'] = htmlBody;
    }
/**
     * Returns Plain text content of the email. Used as fallback when HTML cannot be rendered. Also improves deliverability as some spam filters prefer multipart emails. 
     * @return {String}
     */
    getTextBody() {
        return this.textBody;
    }

    /**
     * Sets Plain text content of the email. Used as fallback when HTML cannot be rendered. Also improves deliverability as some spam filters prefer multipart emails. 
     * @param {String} textBody Plain text content of the email. Used as fallback when HTML cannot be rendered. Also improves deliverability as some spam filters prefer multipart emails. 
     */
    setTextBody(textBody) {
        this['textBody'] = textBody;
    }
/**
     * Returns AMP HTML content for supported email clients (Gmail, Yahoo). Enables interactive email experiences like carousels, forms, and real-time content. See https://amp.dev/about/email/ for more details. 
     * @return {String}
     */
    getAmpBody() {
        return this.ampBody;
    }

    /**
     * Sets AMP HTML content for supported email clients (Gmail, Yahoo). Enables interactive email experiences like carousels, forms, and real-time content. See https://amp.dev/about/email/ for more details. 
     * @param {String} ampBody AMP HTML content for supported email clients (Gmail, Yahoo). Enables interactive email experiences like carousels, forms, and real-time content. See https://amp.dev/about/email/ for more details. 
     */
    setAmpBody(ampBody) {
        this['ampBody'] = ampBody;
    }
/**
     * @return {String}
     */
    getTemplate() {
        return this.template;
    }

    /**
     * @param {String} template
     */
    setTemplate(template) {
        this['template'] = template;
    }
/**
     * Returns Name of the IP pool to use for sending this email. If not specified, the default IP pool for the sub-account will be used. 
     * @return {String}
     */
    getIppool() {
        return this.ippool;
    }

    /**
     * Sets Name of the IP pool to use for sending this email. If not specified, the default IP pool for the sub-account will be used. 
     * @param {String} ippool Name of the IP pool to use for sending this email. If not specified, the default IP pool for the sub-account will be used. 
     */
    setIppool(ippool) {
        this['ippool'] = ippool;
    }
/**
     * Returns Custom email headers to include in the message. Common uses: adding List-Unsubscribe headers, custom tracking IDs, or priority flags. Note: Some headers like From, To, Subject are set automatically and cannot be overridden. 
     * @return {Object.<String, String>}
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * Sets Custom email headers to include in the message. Common uses: adding List-Unsubscribe headers, custom tracking IDs, or priority flags. Note: Some headers like From, To, Subject are set automatically and cannot be overridden. 
     * @param {Object.<String, String>} headers Custom email headers to include in the message. Common uses: adding List-Unsubscribe headers, custom tracking IDs, or priority flags. Note: Some headers like From, To, Subject are set automatically and cannot be overridden. 
     */
    setHeaders(headers) {
        this['headers'] = headers;
    }
/**
     * Returns Whether to track email opens using a tracking pixel. When enabled, a 1x1 transparent image is inserted into the HTML body. Default: true (if not specified) 
     * @return {Boolean}
     */
    getTrackOpens() {
        return this.trackOpens;
    }

    /**
     * Sets Whether to track email opens using a tracking pixel. When enabled, a 1x1 transparent image is inserted into the HTML body. Default: true (if not specified) 
     * @param {Boolean} trackOpens Whether to track email opens using a tracking pixel. When enabled, a 1x1 transparent image is inserted into the HTML body. Default: true (if not specified) 
     */
    setTrackOpens(trackOpens) {
        this['trackOpens'] = trackOpens;
    }
/**
     * Returns Whether to track link clicks by rewriting URLs through SendPost's tracking domain. When enabled, all links in htmlBody are replaced with tracking URLs. Default: true (if not specified) 
     * @return {Boolean}
     */
    getTrackClicks() {
        return this.trackClicks;
    }

    /**
     * Sets Whether to track link clicks by rewriting URLs through SendPost's tracking domain. When enabled, all links in htmlBody are replaced with tracking URLs. Default: true (if not specified) 
     * @param {Boolean} trackClicks Whether to track link clicks by rewriting URLs through SendPost's tracking domain. When enabled, all links in htmlBody are replaced with tracking URLs. Default: true (if not specified) 
     */
    setTrackClicks(trackClicks) {
        this['trackClicks'] = trackClicks;
    }
/**
     * Returns Tags/groups to categorize this email for analytics and reporting. Use groups to segment your email statistics (e.g., by campaign, email type, or customer segment). 
     * @return {Array.<String>}
     */
    getGroups() {
        return this.groups;
    }

    /**
     * Sets Tags/groups to categorize this email for analytics and reporting. Use groups to segment your email statistics (e.g., by campaign, email type, or customer segment). 
     * @param {Array.<String>} groups Tags/groups to categorize this email for analytics and reporting. Use groups to segment your email statistics (e.g., by campaign, email type, or customer segment). 
     */
    setGroups(groups) {
        this['groups'] = groups;
    }
/**
     * Returns File attachments to include with the email. Maximum total attachment size: 25MB. Supported formats: PDF, images, documents, etc. 
     * @return {Array.<module:sendpost/model/Attachment>}
     */
    getAttachments() {
        return this.attachments;
    }

    /**
     * Sets File attachments to include with the email. Maximum total attachment size: 25MB. Supported formats: PDF, images, documents, etc. 
     * @param {Array.<module:sendpost/model/Attachment>} attachments File attachments to include with the email. Maximum total attachment size: 25MB. Supported formats: PDF, images, documents, etc. 
     */
    setAttachments(attachments) {
        this['attachments'] = attachments;
    }
/**
     * Returns Custom webhook URL to receive events for this specific email. Overrides the default webhook configured at the account level. Useful for per-email or per-customer webhook routing. 
     * @return {String}
     */
    getWebhookEndpoint() {
        return this.webhookEndpoint;
    }

    /**
     * Sets Custom webhook URL to receive events for this specific email. Overrides the default webhook configured at the account level. Useful for per-email or per-customer webhook routing. 
     * @param {String} webhookEndpoint Custom webhook URL to receive events for this specific email. Overrides the default webhook configured at the account level. Useful for per-email or per-customer webhook routing. 
     */
    setWebhookEndpoint(webhookEndpoint) {
        this['webhookEndpoint'] = webhookEndpoint;
    }
/**
     * Returns Template ID for the email template
     * @return {String}
     */
    getTemplateId() {
        return this.templateId;
    }

    /**
     * Sets Template ID for the email template
     * @param {String} templateId Template ID for the email template
     */
    setTemplateId(templateId) {
        this['templateId'] = templateId;
    }
/**
     * Returns Key-Value pair of template variables
     * @return {Object.<String, String>}
     */
    getTemplateVariables() {
        return this.templateVariables;
    }

    /**
     * Sets Key-Value pair of template variables
     * @param {Object.<String, String>} templateVariables Key-Value pair of template variables
     */
    setTemplateVariables(templateVariables) {
        this['templateVariables'] = templateVariables;
    }

}

EmailMessageWithTemplate.RequiredProperties = ["from", "to"];

/**
 * The sender's email address and optional display name
 * @member {module:sendpost/model/EmailAddress} from
 */
EmailMessageWithTemplate.prototype['from'] = undefined;

/**
 * The reply-to email address. If not specified, replies will go to the `from` address
 * @member {module:sendpost/model/EmailAddress} replyTo
 */
EmailMessageWithTemplate.prototype['replyTo'] = undefined;

/**
 * List of recipients. Each recipient can have their own CC, BCC, and custom fields for personalization. Maximum 1000 recipients per API call. 
 * @member {Array.<module:sendpost/model/Recipient>} to
 */
EmailMessageWithTemplate.prototype['to'] = undefined;

/**
 * Email subject line. Supports Handlebars templating for personalization. Example: \"Hello, {{firstName}}! Your order is ready\" 
 * @member {String} subject
 */
EmailMessageWithTemplate.prototype['subject'] = undefined;

/**
 * Preview text (preheader) shown in email clients before opening the email. This text appears after the subject line in most email clients' inbox view. 
 * @member {String} preText
 */
EmailMessageWithTemplate.prototype['preText'] = undefined;

/**
 * HTML content of the email. Supports Handlebars templating for personalization. Use {{customFieldName}} to insert recipient-specific values. 
 * @member {String} htmlBody
 */
EmailMessageWithTemplate.prototype['htmlBody'] = undefined;

/**
 * Plain text content of the email. Used as fallback when HTML cannot be rendered. Also improves deliverability as some spam filters prefer multipart emails. 
 * @member {String} textBody
 */
EmailMessageWithTemplate.prototype['textBody'] = undefined;

/**
 * AMP HTML content for supported email clients (Gmail, Yahoo). Enables interactive email experiences like carousels, forms, and real-time content. See https://amp.dev/about/email/ for more details. 
 * @member {String} ampBody
 */
EmailMessageWithTemplate.prototype['ampBody'] = undefined;

/**
 * @member {String} template
 */
EmailMessageWithTemplate.prototype['template'] = undefined;

/**
 * Name of the IP pool to use for sending this email. If not specified, the default IP pool for the sub-account will be used. 
 * @member {String} ippool
 */
EmailMessageWithTemplate.prototype['ippool'] = undefined;

/**
 * Custom email headers to include in the message. Common uses: adding List-Unsubscribe headers, custom tracking IDs, or priority flags. Note: Some headers like From, To, Subject are set automatically and cannot be overridden. 
 * @member {Object.<String, String>} headers
 */
EmailMessageWithTemplate.prototype['headers'] = undefined;

/**
 * Whether to track email opens using a tracking pixel. When enabled, a 1x1 transparent image is inserted into the HTML body. Default: true (if not specified) 
 * @member {Boolean} trackOpens
 * @default true
 */
EmailMessageWithTemplate.prototype['trackOpens'] = true;

/**
 * Whether to track link clicks by rewriting URLs through SendPost's tracking domain. When enabled, all links in htmlBody are replaced with tracking URLs. Default: true (if not specified) 
 * @member {Boolean} trackClicks
 * @default true
 */
EmailMessageWithTemplate.prototype['trackClicks'] = true;

/**
 * Tags/groups to categorize this email for analytics and reporting. Use groups to segment your email statistics (e.g., by campaign, email type, or customer segment). 
 * @member {Array.<String>} groups
 */
EmailMessageWithTemplate.prototype['groups'] = undefined;

/**
 * File attachments to include with the email. Maximum total attachment size: 25MB. Supported formats: PDF, images, documents, etc. 
 * @member {Array.<module:sendpost/model/Attachment>} attachments
 */
EmailMessageWithTemplate.prototype['attachments'] = undefined;

/**
 * Custom webhook URL to receive events for this specific email. Overrides the default webhook configured at the account level. Useful for per-email or per-customer webhook routing. 
 * @member {String} webhookEndpoint
 */
EmailMessageWithTemplate.prototype['webhookEndpoint'] = undefined;

/**
 * Template ID for the email template
 * @member {String} templateId
 */
EmailMessageWithTemplate.prototype['templateId'] = undefined;

/**
 * Key-Value pair of template variables
 * @member {Object.<String, String>} templateVariables
 */
EmailMessageWithTemplate.prototype['templateVariables'] = undefined;


// Implement EmailMessageObject interface:
/**
 * The sender's email address and optional display name
 * @member {module:sendpost/model/EmailAddress} from
 */
EmailMessageObject.prototype['from'] = undefined;
/**
 * The reply-to email address. If not specified, replies will go to the `from` address
 * @member {module:sendpost/model/EmailAddress} replyTo
 */
EmailMessageObject.prototype['replyTo'] = undefined;
/**
 * List of recipients. Each recipient can have their own CC, BCC, and custom fields for personalization. Maximum 1000 recipients per API call. 
 * @member {Array.<module:sendpost/model/Recipient>} to
 */
EmailMessageObject.prototype['to'] = undefined;
/**
 * Email subject line. Supports Handlebars templating for personalization. Example: \"Hello, {{firstName}}! Your order is ready\" 
 * @member {String} subject
 */
EmailMessageObject.prototype['subject'] = undefined;
/**
 * Preview text (preheader) shown in email clients before opening the email. This text appears after the subject line in most email clients' inbox view. 
 * @member {String} preText
 */
EmailMessageObject.prototype['preText'] = undefined;
/**
 * HTML content of the email. Supports Handlebars templating for personalization. Use {{customFieldName}} to insert recipient-specific values. 
 * @member {String} htmlBody
 */
EmailMessageObject.prototype['htmlBody'] = undefined;
/**
 * Plain text content of the email. Used as fallback when HTML cannot be rendered. Also improves deliverability as some spam filters prefer multipart emails. 
 * @member {String} textBody
 */
EmailMessageObject.prototype['textBody'] = undefined;
/**
 * AMP HTML content for supported email clients (Gmail, Yahoo). Enables interactive email experiences like carousels, forms, and real-time content. See https://amp.dev/about/email/ for more details. 
 * @member {String} ampBody
 */
EmailMessageObject.prototype['ampBody'] = undefined;
/**
 * Name of a pre-defined template to use for this email. When specified, the template's subject, htmlBody, and textBody will be used unless explicitly overridden in this request. 
 * @member {String} template
 */
EmailMessageObject.prototype['template'] = undefined;
/**
 * Name of the IP pool to use for sending this email. If not specified, the default IP pool for the sub-account will be used. 
 * @member {String} ippool
 */
EmailMessageObject.prototype['ippool'] = undefined;
/**
 * Custom email headers to include in the message. Common uses: adding List-Unsubscribe headers, custom tracking IDs, or priority flags. Note: Some headers like From, To, Subject are set automatically and cannot be overridden. 
 * @member {Object.<String, String>} headers
 */
EmailMessageObject.prototype['headers'] = undefined;
/**
 * Whether to track email opens using a tracking pixel. When enabled, a 1x1 transparent image is inserted into the HTML body. Default: true (if not specified) 
 * @member {Boolean} trackOpens
 * @default true
 */
EmailMessageObject.prototype['trackOpens'] = true;
/**
 * Whether to track link clicks by rewriting URLs through SendPost's tracking domain. When enabled, all links in htmlBody are replaced with tracking URLs. Default: true (if not specified) 
 * @member {Boolean} trackClicks
 * @default true
 */
EmailMessageObject.prototype['trackClicks'] = true;
/**
 * Tags/groups to categorize this email for analytics and reporting. Use groups to segment your email statistics (e.g., by campaign, email type, or customer segment). 
 * @member {Array.<String>} groups
 */
EmailMessageObject.prototype['groups'] = undefined;
/**
 * File attachments to include with the email. Maximum total attachment size: 25MB. Supported formats: PDF, images, documents, etc. 
 * @member {Array.<module:sendpost/model/Attachment>} attachments
 */
EmailMessageObject.prototype['attachments'] = undefined;
/**
 * Custom webhook URL to receive events for this specific email. Overrides the default webhook configured at the account level. Useful for per-email or per-customer webhook routing. 
 * @member {String} webhookEndpoint
 */
EmailMessageObject.prototype['webhookEndpoint'] = undefined;




export default EmailMessageWithTemplate;

