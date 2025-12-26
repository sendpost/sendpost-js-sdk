/**
 * SendPost API
 * # Introduction  SendPost provides email API and SMTP relay which can be used not just to send & measure but also alert & optimised email sending.  You can use SendPost to:  * Send personalised emails to multiple recipients using email API   * Track opens and clicks  * Analyse statistics around open, clicks, bounce, unsubscribe and spam    At and advanced level you can use it to:  * Manage multiple sub-accounts which may map to your promotional or transactional sending, multiple product lines or multiple customers   * Classify your emails using groups for better analysis  * Analyse and fix email sending at sub-account level, IP Pool level or group level  * Have automated alerts to notify disruptions regarding email sending  * Manage different dedicated IP Pools so to better control your email sending  * Automatically know when IP or domain is blacklisted or sender score is down  * Leverage pro deliverability tools to get significantly better email deliverability & inboxing   [<img src=\"https://run.pstmn.io/button.svg\" alt=\"Run In Postman\" style=\"width: 128px; height: 32px;\">](https://god.gw.postman.com/run-collection/33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33476323-e6dbd27f-c4a7-4d49-bcac-94b0611b938b%26entityType%3Dcollection%26workspaceId%3D6b1e4f65-96a9-4136-9512-6266c852517e)   # Overview  ## REST API  SendPost API is built on REST API principles. Authenticated users can interact with any of the API endpoints to perform:  * **GET**- to get a resource  * **POST** - to create a resource  * **PUT** - to update an existing resource  * **DELETE** - to delete a resource   The API endpoint for all API calls is: <code>https://api.sendpost.io/api/v1</code>   Some conventions that have been followed in the API design overall are following:   * All resources have either <code>/api/v1/subaccount</code> or <code>/api/v1/account</code> in their API call resource path based on who is authorised for the resource. All API calls with path <code>/api/v1/subaccount</code> use <code>X-SubAccount-ApiKey</code> in their request header. Likewise all API calls with path <code>/api/v1/account</code> use <code>X-Account-ApiKey</code> in their request header.  * All resource endpoints end with singular name and not plural. So we have <code>domain</code> instead of domains for domain resource endpoint. Likewise we have <code>sender</code> instead of senders for sender resource endpoint.  * Body submitted for POST / PUT API calls as well as JSON response from SendPost API follow camelcase convention  * All timestamps returned in response (created or submittedAt response fields) are UNIX nano epoch timestamp.   <aside class=\"success\"> All resources have either <code>/api/v1/subaccount</code> or <code>/api/v1/account</code> in their API call resource path based on who is authorised for the resource. All API calls with path <code>/api/v1/subaccount</code> use <code>X-SubAccount-ApiKey</code> in their request header. Likewise all API calls with path <code>/api/v1/account</code> use <code>X-Account-ApiKey</code> in their request header. </aside>   SendPost uses conventional HTTP response codes to indicate the success or failure of an API request.    * Codes in the <code>2xx</code> range indicate success.   * Codes in the <code>4xx</code> range indicate an error owing due to unauthorize access, incorrect request parameters or body etc.  * Code in the <code>5xx</code> range indicate an eror with SendPost's servers ( internal service issue or maintenance )   <aside class=\"info\"> SendPost all responses return <code>created</code> in UNIX nano epoch timestamp.  </aside>   ## Authentication  SendPost uses API keys for authentication. You can register a new SendPost API key at our [developer portal](https://app.sendpost.io/register).   SendPost expects the API key to be included in all API requests to the server in a header that looks like the following:   `X-SubAccount-ApiKey: AHEZEP8192SEGH`   This API key is used for all Sub-Account level operations such as:  * Sending emails  * Retrieving stats regarding open, click, bounce, unsubscribe and spam  * Uploading suppressions list  * Verifying sending domains and more  In addition to <code>X-SubAccount-ApiKey</code> you also have another API Key <code>X-Account-APIKey</code> which is used for Account level operations such as :  * Creating and managing sub-accounts  * Allocating IPs for your account  * Getting overall billing and usage information  * Email List validation  * Creating and managing alerts and more   <aside class=\"notice\"> You must look at individual API reference page to look at whether <code>X-SubAccount-ApiKey</code> is required or <code>X-Account-ApiKey</code> </aside>   In case an incorrect API Key header is specified or if it is missed you will get HTTP Response 401 ( Unauthorized ) response from SendPost.   ## HTTP Response Headers   Code           | Reason                 | Details ---------------| -----------------------| ----------- 200            | Success                | Everything went well 401            | Unauthorized           | Incorrect or missing API header either <code>X-SubAccount-ApiKey</code> or <code>X-Account-ApiKey</code> 403            | Forbidden              | Typically sent when resource with same name or details already exist 406            | Missing resource id    | Resource id specified is either missing or doesn't exist 422            | Unprocessable entity   | Request body is not in proper format 500            | Internal server error  | Some error happened at SendPost while processing API request 503            | Service Unavailable    | SendPost is offline for maintenance. Please try again later  # API SDKs  We have native SendPost SDKs in the following programming languages. You can integrate with them or create your own SDK with our API specification. In case you need any assistance with respect to API then do reachout to our team from website chat or email us at **hello@sendpost.io**   * [PHP](https://github.com/sendpost/sendpost_php_sdk)  * [Javascript](https://github.com/sendpost/sendpost_javascript_sdk)  * [Ruby](https://github.com/sendpost/sendpost_ruby_sdk)  * [Python](https://github.com/sendpost/sendpost_python_sdk)  * [Golang](https://github.com/sendpost/sendpost_go_sdk)   # API Reference  SendX REST API can be broken down into two major sub-sections:   * Sub-Account  * Account    Sub-Account API operations enable common email sending API use-cases like sending bulk email, adding new domains or senders for email sending programmatically, retrieving stats, adding suppressions etc. All Sub-Account API operations need to pass <code>X-SubAccount-ApiKey</code> header with every API call.   The Account API operations allow users to manage multiple sub-accounts and manage IPs. A single parent SendPost account can have 100's of sub-accounts. You may want to create sub-accounts for different products your company is running or to segregate types of emails or for managing email sending across multiple customers of yours.   # SMTP Reference  Simple Mail Transfer Protocol (SMTP) is a quick and easy way to send email from one server to another. SendPost provides an SMTP service that allows you to deliver your email via our servers instead of your own client or server.  This means you can count on SendPost's delivery at scale for your SMTP needs.    ## Integrating SMTP    1. Get the SMTP `username` and `password` from your SendPost account.  2. Set the server host in your email client or application to `smtp.sendpost.io`. This setting is sometimes referred to as the external SMTP server or the SMTP relay.  3. Set the `username` and `password`.  4. Set the port to `587` (or as specified below).  ## SMTP Ports   - For an unencrypted or a TLS connection, use port `25`, `2525` or `587`.  - For a SSL connection, use port `465`  - Check your firewall and network to ensure they're not blocking any of our SMTP Endpoints.   SendPost supports STARTTLS for establishing a TLS-encrypted connection. STARTTLS is a means of upgrading an unencrypted connection to an encrypted connection. There are versions of STARTTLS for a variety of protocols; the SMTP version is defined in [RFC 3207](https://www.ietf.org/rfc/rfc3207.txt).   To set up a STARTTLS connection, the SMTP client connects to the SendPost SMTP endpoint `smtp.sendpost.io` on port 25, 587, or 2525, issues an EHLO command, and waits for the server to announce that it supports the STARTTLS SMTP extension. The client then issues the STARTTLS command, initiating TLS negotiation. When negotiation is complete, the client issues an EHLO command over the new encrypted connection, and the SMTP session proceeds normally.   <aside class=\"success\"> If you are unsure which port to use, a TLS connection on port 587 is typically recommended. </aside>   ## Sending email from your application   ```javascript \"use strict\";  const nodemailer = require(\"nodemailer\");  async function main() { // create reusable transporter object using the default SMTP transport let transporter = nodemailer.createTransport({ host: \"smtp.sendpost.io\", port: 587, secure: false, // true for 465, false for other ports auth: { user:  \"<username>\" , // generated ethereal user pass: \"<password>\", // generated ethereal password }, requireTLS: true, debug: true, logger: true, });  // send mail with defined transport object try { let info = await transporter.sendMail({ from: 'erlich@piedpiper.com', to: 'gilfoyle@piedpiper.com', subject: 'Test Email Subject', html: '<h1>Hello Geeks!!!</h1>', }); console.log(\"Message sent: %s\", info.messageId); } catch (e) { console.log(e) } }  main().catch(console.error); ```  For PHP   ```php <?php // Import PHPMailer classes into the global namespace use PHPMailer\\PHPMailer\\PHPMailer; use PHPMailer\\PHPMailer\\SMTP; use PHPMailer\\PHPMailer\\Exception;  // Load Composer's autoloader require 'vendor/autoload.php';  $mail = new PHPMailer(true);  // Settings try { $mail->SMTPDebug = SMTP::DEBUG_CONNECTION;                  // Enable verbose debug output $mail->isSMTP();                                            // Send using SMTP $mail->Host       = 'smtp.sendpost.io';                     // Set the SMTP server to send through $mail->SMTPAuth   = true;                                   // Enable SMTP authentication $mail->Username   = '<username>';                           // SMTP username $mail->Password   = '<password>';                           // SMTP password $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable implicit TLS encryption $mail->Port       = 587;                                    // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`  //Recipients $mail->setFrom('erlich@piedpiper.com', 'Erlich'); $mail->addAddress('gilfoyle@piedpiper.com', 'Gilfoyle');  //Content $mail->isHTML(true);                                  //Set email format to HTML $mail->Subject = 'Here is the subject'; $mail->Body    = 'This is the HTML message body <b>in bold!</b>'; $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';  $mail->send(); echo 'Message has been sent';  } catch (Exception $e) { echo \"Message could not be sent. Mailer Error: {$mail->ErrorInfo}\"; } ``` For Python ```python #!/usr/bin/python3  import sys import os import re  from smtplib import SMTP import ssl  from email.mime.text import MIMEText  SMTPserver = 'smtp.sendpost.io' PORT = 587 sender =     'erlich@piedpiper.com' destination = ['gilfoyle@piedpiper.com']  USERNAME = \"<username>\" PASSWORD = \"<password>\"  # typical values for text_subtype are plain, html, xml text_subtype = 'plain'  content=\"\"\"\\ Test message \"\"\"  subject=\"Sent from Python\"  try: msg = MIMEText(content, text_subtype) msg['Subject']= subject msg['From']   = sender  conn = SMTP(SMTPserver, PORT) conn.ehlo() context = ssl.create_default_context() conn.starttls(context=context)  # upgrade to tls conn.ehlo() conn.set_debuglevel(True) conn.login(USERNAME, PASSWORD)  try: resp = conn.sendmail(sender, destination, msg.as_string()) print(\"Send Mail Response: \", resp) except Exception as e: print(\"Send Email Error: \", e) finally: conn.quit()  except Exception as e: print(\"Error:\", e) ``` For Golang ```go package main  import ( \"fmt\" \"net/smtp\" \"os\" )  // Sending Email Using Smtp in Golang  func main() {  username := \"<username>\" password := \"<password>\"  from := \"erlich@piedpiper.com\" toList := []string{\"gilfoyle@piedpiper.com\"} host := \"smtp.sendpost.io\" port := \"587\" // recommended  // This is the message to send in the mail msg := \"Hello geeks!!!\"  // We can't send strings directly in mail, // strings need to be converted into slice bytes body := []byte(msg)  // PlainAuth uses the given username and password to // authenticate to host and act as identity. // Usually identity should be the empty string, // to act as username. auth := smtp.PlainAuth(\"\", username, password, host)  // SendMail uses TLS connection to send the mail // The email is sent to all address in the toList, // the body should be of type bytes, not strings // This returns error if any occured. err := smtp.SendMail(host+\":\"+port, auth, from, toList, body)  // handling the errors if err != nil { fmt.Println(err) os.Exit(1) }  fmt.Println(\"Successfully sent mail to all user in toList\") }  ``` For Java ```java // implementation 'com.sun.mail:javax.mail:1.6.2'  import java.util.Properties;  import javax.mail.Message; import javax.mail.Session; import javax.mail.Transport; import javax.mail.internet.InternetAddress; import javax.mail.internet.MimeMessage;  public class SMTPConnect {  // This address must be verified. static final String FROM = \"erlich@piedpiper.com\"; static final String FROMNAME = \"Erlich Bachman\";  // Replace recipient@example.com with a \"To\" address. If your account // is still in the sandbox, this address must be verified. static final String TO = \"gilfoyle@piedpiper.com\";  // Replace smtp_username with your SendPost SMTP user name. static final String SMTP_USERNAME = \"<username>\";  // Replace smtp_password with your SendPost SMTP password. static final String SMTP_PASSWORD = \"<password>\";  // SMTP Host Name static final String HOST = \"smtp.sendpost.io\";  // The port you will connect to on SendPost SMTP Endpoint. static final int PORT = 587;  static final String SUBJECT = \"SendPost SMTP Test (SMTP interface accessed using Java)\";  static final String BODY = String.join( System.getProperty(\"line.separator\"), \"<h1>SendPost SMTP Test</h1>\", \"<p>This email was sent with SendPost using the \", \"<a href='https://github.com/eclipse-ee4j/mail'>Javamail Package</a>\", \" for <a href='https://www.java.com'>Java</a>.\" );  public static void main(String[] args) throws Exception {  // Create a Properties object to contain connection configuration information. Properties props = System.getProperties(); props.put(\"mail.transport.protocol\", \"smtp\"); props.put(\"mail.smtp.port\", PORT); props.put(\"mail.smtp.starttls.enable\", \"true\"); props.put(\"mail.smtp.debug\", \"true\"); props.put(\"mail.smtp.auth\", \"true\");  // Create a Session object to represent a mail session with the specified properties. Session session = Session.getDefaultInstance(props);  // Create a message with the specified information. MimeMessage msg = new MimeMessage(session); msg.setFrom(new InternetAddress(FROM,FROMNAME)); msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO)); msg.setSubject(SUBJECT); msg.setContent(BODY,\"text/html\");  // Create a transport. Transport transport = session.getTransport();  // Send the message. try { System.out.println(\"Sending...\");  // Connect to SendPost SMTP using the SMTP username and password you specified above. transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);  // Send the email. transport.sendMessage(msg, msg.getAllRecipients()); System.out.println(\"Email sent!\");  } catch (Exception ex) {  System.out.println(\"The email was not sent.\"); System.out.println(\"Error message: \" + ex.getMessage()); System.out.println(ex); } // Close and terminate the connection. } } ```  Many programming languages support sending email using SMTP. This capability might be built into the programming language itself, or it might be available as an add-on, plug-in, or library. You can take advantage of this capability by sending email through SendPost from within application programs that you write.  We have provided examples in Python3, Golang, Java, PHP, JS. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import MessageHeaderTo from './MessageHeaderTo';
import MessageTo from './MessageTo';
import Person from './Person';

/**
 * The Message model module.
 * @module sendpost/model/Message
 * @version 2.0.1
 */
class Message {
    /**
     * Constructs a new <code>Message</code>.
     * @alias module:sendpost/model/Message
     */
    constructor() { 
        
        Message.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Message</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/Message} obj Optional instance to populate.
     * @return {module:sendpost/model/Message} The populated <code>Message</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Message();

            if (data.hasOwnProperty('messageID')) {
                obj['messageID'] = ApiClient.convertToType(data['messageID'], 'String');
            }
            if (data.hasOwnProperty('accountID')) {
                obj['accountID'] = ApiClient.convertToType(data['accountID'], 'Number');
            }
            if (data.hasOwnProperty('subAccountID')) {
                obj['subAccountID'] = ApiClient.convertToType(data['subAccountID'], 'Number');
            }
            if (data.hasOwnProperty('ipID')) {
                obj['ipID'] = ApiClient.convertToType(data['ipID'], 'Number');
            }
            if (data.hasOwnProperty('accountIPPoolID')) {
                obj['accountIPPoolID'] = ApiClient.convertToType(data['accountIPPoolID'], 'Number');
            }
            if (data.hasOwnProperty('publicIP')) {
                obj['publicIP'] = ApiClient.convertToType(data['publicIP'], 'String');
            }
            if (data.hasOwnProperty('localIP')) {
                obj['localIP'] = ApiClient.convertToType(data['localIP'], 'String');
            }
            if (data.hasOwnProperty('emailType')) {
                obj['emailType'] = ApiClient.convertToType(data['emailType'], 'String');
            }
            if (data.hasOwnProperty('submittedAt')) {
                obj['submittedAt'] = ApiClient.convertToType(data['submittedAt'], 'Number');
            }
            if (data.hasOwnProperty('from')) {
                obj['from'] = Person.constructFromObject(data['from']);
            }
            if (data.hasOwnProperty('replyTo')) {
                obj['replyTo'] = Person.constructFromObject(data['replyTo']);
            }
            if (data.hasOwnProperty('to')) {
                obj['to'] = MessageTo.constructFromObject(data['to']);
            }
            if (data.hasOwnProperty('headerTo')) {
                obj['headerTo'] = MessageHeaderTo.constructFromObject(data['headerTo']);
            }
            if (data.hasOwnProperty('headerCc')) {
                obj['headerCc'] = ApiClient.convertToType(data['headerCc'], ['String']);
            }
            if (data.hasOwnProperty('headerBcc')) {
                obj['headerBcc'] = ApiClient.convertToType(data['headerBcc'], ['String']);
            }
            if (data.hasOwnProperty('attachments')) {
                obj['attachments'] = ApiClient.convertToType(data['attachments'], ['String']);
            }
            if (data.hasOwnProperty('groups')) {
                obj['groups'] = ApiClient.convertToType(data['groups'], ['String']);
            }
            if (data.hasOwnProperty('ipPool')) {
                obj['ipPool'] = ApiClient.convertToType(data['ipPool'], 'String');
            }
            if (data.hasOwnProperty('headers')) {
                obj['headers'] = ApiClient.convertToType(data['headers'], {'String': 'String'});
            }
            if (data.hasOwnProperty('customFields')) {
                obj['customFields'] = ApiClient.convertToType(data['customFields'], {'String': 'String'});
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
            if (data.hasOwnProperty('trackOpens')) {
                obj['trackOpens'] = ApiClient.convertToType(data['trackOpens'], 'Boolean');
            }
            if (data.hasOwnProperty('trackClicks')) {
                obj['trackClicks'] = ApiClient.convertToType(data['trackClicks'], 'Boolean');
            }
            if (data.hasOwnProperty('attempt')) {
                obj['attempt'] = ApiClient.convertToType(data['attempt'], 'Number');
            }
            if (data.hasOwnProperty('webhookEndpoint')) {
                obj['webhookEndpoint'] = ApiClient.convertToType(data['webhookEndpoint'], 'String');
            }
            if (data.hasOwnProperty('mxRecords')) {
                obj['mxRecords'] = ApiClient.convertToType(data['mxRecords'], ['String']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Message</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Message</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['messageID'] && !(typeof data['messageID'] === 'string' || data['messageID'] instanceof String)) {
            throw new Error("Expected the field `messageID` to be a primitive type in the JSON string but got " + data['messageID']);
        }
        // ensure the json data is a string
        if (data['publicIP'] && !(typeof data['publicIP'] === 'string' || data['publicIP'] instanceof String)) {
            throw new Error("Expected the field `publicIP` to be a primitive type in the JSON string but got " + data['publicIP']);
        }
        // ensure the json data is a string
        if (data['localIP'] && !(typeof data['localIP'] === 'string' || data['localIP'] instanceof String)) {
            throw new Error("Expected the field `localIP` to be a primitive type in the JSON string but got " + data['localIP']);
        }
        // ensure the json data is a string
        if (data['emailType'] && !(typeof data['emailType'] === 'string' || data['emailType'] instanceof String)) {
            throw new Error("Expected the field `emailType` to be a primitive type in the JSON string but got " + data['emailType']);
        }
        // validate the optional field `from`
        if (data['from']) { // data not null
          Person.validateJSON(data['from']);
        }
        // validate the optional field `replyTo`
        if (data['replyTo']) { // data not null
          Person.validateJSON(data['replyTo']);
        }
        // validate the optional field `to`
        if (data['to']) { // data not null
          MessageTo.validateJSON(data['to']);
        }
        // validate the optional field `headerTo`
        if (data['headerTo']) { // data not null
          MessageHeaderTo.validateJSON(data['headerTo']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['headerCc'])) {
            throw new Error("Expected the field `headerCc` to be an array in the JSON data but got " + data['headerCc']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['headerBcc'])) {
            throw new Error("Expected the field `headerBcc` to be an array in the JSON data but got " + data['headerBcc']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['attachments'])) {
            throw new Error("Expected the field `attachments` to be an array in the JSON data but got " + data['attachments']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['groups'])) {
            throw new Error("Expected the field `groups` to be an array in the JSON data but got " + data['groups']);
        }
        // ensure the json data is a string
        if (data['ipPool'] && !(typeof data['ipPool'] === 'string' || data['ipPool'] instanceof String)) {
            throw new Error("Expected the field `ipPool` to be a primitive type in the JSON string but got " + data['ipPool']);
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
        if (data['webhookEndpoint'] && !(typeof data['webhookEndpoint'] === 'string' || data['webhookEndpoint'] instanceof String)) {
            throw new Error("Expected the field `webhookEndpoint` to be a primitive type in the JSON string but got " + data['webhookEndpoint']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mxRecords'])) {
            throw new Error("Expected the field `mxRecords` to be an array in the JSON data but got " + data['mxRecords']);
        }

        return true;
    }

/**
     * Returns Unique ID for the message.
     * @return {String}
     */
    getMessageID() {
        return this.messageID;
    }

    /**
     * Sets Unique ID for the message.
     * @param {String} messageID Unique ID for the message.
     */
    setMessageID(messageID) {
        this['messageID'] = messageID;
    }
/**
     * Returns Account ID associated with the message.
     * @return {Number}
     */
    getAccountID() {
        return this.accountID;
    }

    /**
     * Sets Account ID associated with the message.
     * @param {Number} accountID Account ID associated with the message.
     */
    setAccountID(accountID) {
        this['accountID'] = accountID;
    }
/**
     * Returns Sub-account ID associated with the message.
     * @return {Number}
     */
    getSubAccountID() {
        return this.subAccountID;
    }

    /**
     * Sets Sub-account ID associated with the message.
     * @param {Number} subAccountID Sub-account ID associated with the message.
     */
    setSubAccountID(subAccountID) {
        this['subAccountID'] = subAccountID;
    }
/**
     * Returns IP ID used for sending the message.
     * @return {Number}
     */
    getIpID() {
        return this.ipID;
    }

    /**
     * Sets IP ID used for sending the message.
     * @param {Number} ipID IP ID used for sending the message.
     */
    setIpID(ipID) {
        this['ipID'] = ipID;
    }
/**
     * Returns Account IP Pool ID associated with the message.
     * @return {Number}
     */
    getAccountIPPoolID() {
        return this.accountIPPoolID;
    }

    /**
     * Sets Account IP Pool ID associated with the message.
     * @param {Number} accountIPPoolID Account IP Pool ID associated with the message.
     */
    setAccountIPPoolID(accountIPPoolID) {
        this['accountIPPoolID'] = accountIPPoolID;
    }
/**
     * Returns Public IP address used for sending the message.
     * @return {String}
     */
    getPublicIP() {
        return this.publicIP;
    }

    /**
     * Sets Public IP address used for sending the message.
     * @param {String} publicIP Public IP address used for sending the message.
     */
    setPublicIP(publicIP) {
        this['publicIP'] = publicIP;
    }
/**
     * Returns Local IP address used for sending the message.
     * @return {String}
     */
    getLocalIP() {
        return this.localIP;
    }

    /**
     * Sets Local IP address used for sending the message.
     * @param {String} localIP Local IP address used for sending the message.
     */
    setLocalIP(localIP) {
        this['localIP'] = localIP;
    }
/**
     * Returns Type of email service used.
     * @return {String}
     */
    getEmailType() {
        return this.emailType;
    }

    /**
     * Sets Type of email service used.
     * @param {String} emailType Type of email service used.
     */
    setEmailType(emailType) {
        this['emailType'] = emailType;
    }
/**
     * Returns UNIX epoch nano timestamp when message was submitted.
     * @return {Number}
     */
    getSubmittedAt() {
        return this.submittedAt;
    }

    /**
     * Sets UNIX epoch nano timestamp when message was submitted.
     * @param {Number} submittedAt UNIX epoch nano timestamp when message was submitted.
     */
    setSubmittedAt(submittedAt) {
        this['submittedAt'] = submittedAt;
    }
/**
     * Returns Object comprising name and email address of the sender
     * @return {module:sendpost/model/Person}
     */
    getFrom() {
        return this.from;
    }

    /**
     * Sets Object comprising name and email address of the sender
     * @param {module:sendpost/model/Person} from Object comprising name and email address of the sender
     */
    setFrom(from) {
        this['from'] = from;
    }
/**
     * Returns Object comprising name and email addresses to which email replies will go to
     * @return {module:sendpost/model/Person}
     */
    getReplyTo() {
        return this.replyTo;
    }

    /**
     * Sets Object comprising name and email addresses to which email replies will go to
     * @param {module:sendpost/model/Person} replyTo Object comprising name and email addresses to which email replies will go to
     */
    setReplyTo(replyTo) {
        this['replyTo'] = replyTo;
    }
/**
     * @return {module:sendpost/model/MessageTo}
     */
    getTo() {
        return this.to;
    }

    /**
     * @param {module:sendpost/model/MessageTo} to
     */
    setTo(to) {
        this['to'] = to;
    }
/**
     * @return {module:sendpost/model/MessageHeaderTo}
     */
    getHeaderTo() {
        return this.headerTo;
    }

    /**
     * @param {module:sendpost/model/MessageHeaderTo} headerTo
     */
    setHeaderTo(headerTo) {
        this['headerTo'] = headerTo;
    }
/**
     * Returns List of CC recipients from email headers
     * @return {Array.<String>}
     */
    getHeaderCc() {
        return this.headerCc;
    }

    /**
     * Sets List of CC recipients from email headers
     * @param {Array.<String>} headerCc List of CC recipients from email headers
     */
    setHeaderCc(headerCc) {
        this['headerCc'] = headerCc;
    }
/**
     * Returns List of BCC recipients from email headers
     * @return {Array.<String>}
     */
    getHeaderBcc() {
        return this.headerBcc;
    }

    /**
     * Sets List of BCC recipients from email headers
     * @param {Array.<String>} headerBcc List of BCC recipients from email headers
     */
    setHeaderBcc(headerBcc) {
        this['headerBcc'] = headerBcc;
    }
/**
     * Returns List of attachments
     * @return {Array.<String>}
     */
    getAttachments() {
        return this.attachments;
    }

    /**
     * Sets List of attachments
     * @param {Array.<String>} attachments List of attachments
     */
    setAttachments(attachments) {
        this['attachments'] = attachments;
    }
/**
     * Returns List of groups associated with the message
     * @return {Array.<String>}
     */
    getGroups() {
        return this.groups;
    }

    /**
     * Sets List of groups associated with the message
     * @param {Array.<String>} groups List of groups associated with the message
     */
    setGroups(groups) {
        this['groups'] = groups;
    }
/**
     * Returns IP Pool from which emails will go out. Relevant only for customers on dedicated IP plans.
     * @return {String}
     */
    getIpPool() {
        return this.ipPool;
    }

    /**
     * Sets IP Pool from which emails will go out. Relevant only for customers on dedicated IP plans.
     * @param {String} ipPool IP Pool from which emails will go out. Relevant only for customers on dedicated IP plans.
     */
    setIpPool(ipPool) {
        this['ipPool'] = ipPool;
    }
/**
     * Returns Key-Value pair which are added to every email message being sent and also with webhooks triggered on events such as email delivered, open, click etc. They are useful to identify email, recipient etc. in your internal system
     * @return {Object.<String, String>}
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * Sets Key-Value pair which are added to every email message being sent and also with webhooks triggered on events such as email delivered, open, click etc. They are useful to identify email, recipient etc. in your internal system
     * @param {Object.<String, String>} headers Key-Value pair which are added to every email message being sent and also with webhooks triggered on events such as email delivered, open, click etc. They are useful to identify email, recipient etc. in your internal system
     */
    setHeaders(headers) {
        this['headers'] = headers;
    }
/**
     * Returns Key-Value pair of custom fields at message level
     * @return {Object.<String, String>}
     */
    getCustomFields() {
        return this.customFields;
    }

    /**
     * Sets Key-Value pair of custom fields at message level
     * @param {Object.<String, String>} customFields Key-Value pair of custom fields at message level
     */
    setCustomFields(customFields) {
        this['customFields'] = customFields;
    }
/**
     * Returns Email subject line.
     * @return {String}
     */
    getSubject() {
        return this.subject;
    }

    /**
     * Sets Email subject line.
     * @param {String} subject Email subject line.
     */
    setSubject(subject) {
        this['subject'] = subject;
    }
/**
     * Returns Text which appears on mobile right after email subject line.
     * @return {String}
     */
    getPreText() {
        return this.preText;
    }

    /**
     * Sets Text which appears on mobile right after email subject line.
     * @param {String} preText Text which appears on mobile right after email subject line.
     */
    setPreText(preText) {
        this['preText'] = preText;
    }
/**
     * Returns HTML email content.
     * @return {String}
     */
    getHtmlBody() {
        return this.htmlBody;
    }

    /**
     * Sets HTML email content.
     * @param {String} htmlBody HTML email content.
     */
    setHtmlBody(htmlBody) {
        this['htmlBody'] = htmlBody;
    }
/**
     * Returns Text email content.
     * @return {String}
     */
    getTextBody() {
        return this.textBody;
    }

    /**
     * Sets Text email content.
     * @param {String} textBody Text email content.
     */
    setTextBody(textBody) {
        this['textBody'] = textBody;
    }
/**
     * Returns AMP email content.
     * @return {String}
     */
    getAmpBody() {
        return this.ampBody;
    }

    /**
     * Sets AMP email content.
     * @param {String} ampBody AMP email content.
     */
    setAmpBody(ampBody) {
        this['ampBody'] = ampBody;
    }
/**
     * Returns Indicates if email opens need to be tracked.
     * @return {Boolean}
     */
    getTrackOpens() {
        return this.trackOpens;
    }

    /**
     * Sets Indicates if email opens need to be tracked.
     * @param {Boolean} trackOpens Indicates if email opens need to be tracked.
     */
    setTrackOpens(trackOpens) {
        this['trackOpens'] = trackOpens;
    }
/**
     * Returns Indicates if email clicks need to be tracked.
     * @return {Boolean}
     */
    getTrackClicks() {
        return this.trackClicks;
    }

    /**
     * Sets Indicates if email clicks need to be tracked.
     * @param {Boolean} trackClicks Indicates if email clicks need to be tracked.
     */
    setTrackClicks(trackClicks) {
        this['trackClicks'] = trackClicks;
    }
/**
     * Returns Number of delivery attempts made for the message.
     * @return {Number}
     */
    getAttempt() {
        return this.attempt;
    }

    /**
     * Sets Number of delivery attempts made for the message.
     * @param {Number} attempt Number of delivery attempts made for the message.
     */
    setAttempt(attempt) {
        this['attempt'] = attempt;
    }
/**
     * Returns Webhook endpoint URL for the message.
     * @return {String}
     */
    getWebhookEndpoint() {
        return this.webhookEndpoint;
    }

    /**
     * Sets Webhook endpoint URL for the message.
     * @param {String} webhookEndpoint Webhook endpoint URL for the message.
     */
    setWebhookEndpoint(webhookEndpoint) {
        this['webhookEndpoint'] = webhookEndpoint;
    }
/**
     * Returns List of MX records for the recipient domain
     * @return {Array.<String>}
     */
    getMxRecords() {
        return this.mxRecords;
    }

    /**
     * Sets List of MX records for the recipient domain
     * @param {Array.<String>} mxRecords List of MX records for the recipient domain
     */
    setMxRecords(mxRecords) {
        this['mxRecords'] = mxRecords;
    }

}



/**
 * Unique ID for the message.
 * @member {String} messageID
 */
Message.prototype['messageID'] = undefined;

/**
 * Account ID associated with the message.
 * @member {Number} accountID
 */
Message.prototype['accountID'] = undefined;

/**
 * Sub-account ID associated with the message.
 * @member {Number} subAccountID
 */
Message.prototype['subAccountID'] = undefined;

/**
 * IP ID used for sending the message.
 * @member {Number} ipID
 */
Message.prototype['ipID'] = undefined;

/**
 * Account IP Pool ID associated with the message.
 * @member {Number} accountIPPoolID
 */
Message.prototype['accountIPPoolID'] = undefined;

/**
 * Public IP address used for sending the message.
 * @member {String} publicIP
 */
Message.prototype['publicIP'] = undefined;

/**
 * Local IP address used for sending the message.
 * @member {String} localIP
 */
Message.prototype['localIP'] = undefined;

/**
 * Type of email service used.
 * @member {String} emailType
 */
Message.prototype['emailType'] = undefined;

/**
 * UNIX epoch nano timestamp when message was submitted.
 * @member {Number} submittedAt
 */
Message.prototype['submittedAt'] = undefined;

/**
 * Object comprising name and email address of the sender
 * @member {module:sendpost/model/Person} from
 */
Message.prototype['from'] = undefined;

/**
 * Object comprising name and email addresses to which email replies will go to
 * @member {module:sendpost/model/Person} replyTo
 */
Message.prototype['replyTo'] = undefined;

/**
 * @member {module:sendpost/model/MessageTo} to
 */
Message.prototype['to'] = undefined;

/**
 * @member {module:sendpost/model/MessageHeaderTo} headerTo
 */
Message.prototype['headerTo'] = undefined;

/**
 * List of CC recipients from email headers
 * @member {Array.<String>} headerCc
 */
Message.prototype['headerCc'] = undefined;

/**
 * List of BCC recipients from email headers
 * @member {Array.<String>} headerBcc
 */
Message.prototype['headerBcc'] = undefined;

/**
 * List of attachments
 * @member {Array.<String>} attachments
 */
Message.prototype['attachments'] = undefined;

/**
 * List of groups associated with the message
 * @member {Array.<String>} groups
 */
Message.prototype['groups'] = undefined;

/**
 * IP Pool from which emails will go out. Relevant only for customers on dedicated IP plans.
 * @member {String} ipPool
 */
Message.prototype['ipPool'] = undefined;

/**
 * Key-Value pair which are added to every email message being sent and also with webhooks triggered on events such as email delivered, open, click etc. They are useful to identify email, recipient etc. in your internal system
 * @member {Object.<String, String>} headers
 */
Message.prototype['headers'] = undefined;

/**
 * Key-Value pair of custom fields at message level
 * @member {Object.<String, String>} customFields
 */
Message.prototype['customFields'] = undefined;

/**
 * Email subject line.
 * @member {String} subject
 */
Message.prototype['subject'] = undefined;

/**
 * Text which appears on mobile right after email subject line.
 * @member {String} preText
 */
Message.prototype['preText'] = undefined;

/**
 * HTML email content.
 * @member {String} htmlBody
 */
Message.prototype['htmlBody'] = undefined;

/**
 * Text email content.
 * @member {String} textBody
 */
Message.prototype['textBody'] = undefined;

/**
 * AMP email content.
 * @member {String} ampBody
 */
Message.prototype['ampBody'] = undefined;

/**
 * Indicates if email opens need to be tracked.
 * @member {Boolean} trackOpens
 */
Message.prototype['trackOpens'] = undefined;

/**
 * Indicates if email clicks need to be tracked.
 * @member {Boolean} trackClicks
 */
Message.prototype['trackClicks'] = undefined;

/**
 * Number of delivery attempts made for the message.
 * @member {Number} attempt
 */
Message.prototype['attempt'] = undefined;

/**
 * Webhook endpoint URL for the message.
 * @member {String} webhookEndpoint
 */
Message.prototype['webhookEndpoint'] = undefined;

/**
 * List of MX records for the recipient domain
 * @member {Array.<String>} mxRecords
 */
Message.prototype['mxRecords'] = undefined;






export default Message;

