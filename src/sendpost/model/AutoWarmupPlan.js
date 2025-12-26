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

/**
 * The AutoWarmupPlan model module.
 * @module sendpost/model/AutoWarmupPlan
 * @version 2.0.1
 */
class AutoWarmupPlan {
    /**
     * Constructs a new <code>AutoWarmupPlan</code>.
     * @alias module:sendpost/model/AutoWarmupPlan
     */
    constructor() { 
        
        AutoWarmupPlan.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AutoWarmupPlan</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/AutoWarmupPlan} obj Optional instance to populate.
     * @return {module:sendpost/model/AutoWarmupPlan} The populated <code>AutoWarmupPlan</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AutoWarmupPlan();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('gmailWarmupPlan')) {
                obj['gmailWarmupPlan'] = ApiClient.convertToType(data['gmailWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('yahooWarmupPlan')) {
                obj['yahooWarmupPlan'] = ApiClient.convertToType(data['yahooWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('aolWarmupPlan')) {
                obj['aolWarmupPlan'] = ApiClient.convertToType(data['aolWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('microsoftWarmupPlan')) {
                obj['microsoftWarmupPlan'] = ApiClient.convertToType(data['microsoftWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('comcastWarmupPlan')) {
                obj['comcastWarmupPlan'] = ApiClient.convertToType(data['comcastWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('yandexWarmupPlan')) {
                obj['yandexWarmupPlan'] = ApiClient.convertToType(data['yandexWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('gmxWarmupPlan')) {
                obj['gmxWarmupPlan'] = ApiClient.convertToType(data['gmxWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('mailruWarmupPlan')) {
                obj['mailruWarmupPlan'] = ApiClient.convertToType(data['mailruWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('icloudWarmupPlan')) {
                obj['icloudWarmupPlan'] = ApiClient.convertToType(data['icloudWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('zohoWarmupPlan')) {
                obj['zohoWarmupPlan'] = ApiClient.convertToType(data['zohoWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('qqWarmupPlan')) {
                obj['qqWarmupPlan'] = ApiClient.convertToType(data['qqWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('defaultWarmupPlan')) {
                obj['defaultWarmupPlan'] = ApiClient.convertToType(data['defaultWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('attWarmupPlan')) {
                obj['attWarmupPlan'] = ApiClient.convertToType(data['attWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('office365WarmupPlan')) {
                obj['office365WarmupPlan'] = ApiClient.convertToType(data['office365WarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('googleworkspaceWarmupPlan')) {
                obj['googleworkspaceWarmupPlan'] = ApiClient.convertToType(data['googleworkspaceWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('proofpointWarmupPlan')) {
                obj['proofpointWarmupPlan'] = ApiClient.convertToType(data['proofpointWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('mimecastWarmupPlan')) {
                obj['mimecastWarmupPlan'] = ApiClient.convertToType(data['mimecastWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('barracudaWarmupPlan')) {
                obj['barracudaWarmupPlan'] = ApiClient.convertToType(data['barracudaWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('ciscoironportWarmupPlan')) {
                obj['ciscoironportWarmupPlan'] = ApiClient.convertToType(data['ciscoironportWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('rackspaceWarmupPlan')) {
                obj['rackspaceWarmupPlan'] = ApiClient.convertToType(data['rackspaceWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('zohobusinessWarmupPlan')) {
                obj['zohobusinessWarmupPlan'] = ApiClient.convertToType(data['zohobusinessWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('amazonworkmailWarmupPlan')) {
                obj['amazonworkmailWarmupPlan'] = ApiClient.convertToType(data['amazonworkmailWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('symantecWarmupPlan')) {
                obj['symantecWarmupPlan'] = ApiClient.convertToType(data['symantecWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('fortinetWarmupPlan')) {
                obj['fortinetWarmupPlan'] = ApiClient.convertToType(data['fortinetWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('sophosWarmupPlan')) {
                obj['sophosWarmupPlan'] = ApiClient.convertToType(data['sophosWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('trendmicroWarmupPlan')) {
                obj['trendmicroWarmupPlan'] = ApiClient.convertToType(data['trendmicroWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('checkpointWarmupPlan')) {
                obj['checkpointWarmupPlan'] = ApiClient.convertToType(data['checkpointWarmupPlan'], 'String');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Number');
            }
            if (data.hasOwnProperty('updated')) {
                obj['updated'] = ApiClient.convertToType(data['updated'], 'Number');
            }
            if (data.hasOwnProperty('warmupInterval')) {
                obj['warmupInterval'] = ApiClient.convertToType(data['warmupInterval'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AutoWarmupPlan</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AutoWarmupPlan</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['gmailWarmupPlan'] && !(typeof data['gmailWarmupPlan'] === 'string' || data['gmailWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `gmailWarmupPlan` to be a primitive type in the JSON string but got " + data['gmailWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['yahooWarmupPlan'] && !(typeof data['yahooWarmupPlan'] === 'string' || data['yahooWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `yahooWarmupPlan` to be a primitive type in the JSON string but got " + data['yahooWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['aolWarmupPlan'] && !(typeof data['aolWarmupPlan'] === 'string' || data['aolWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `aolWarmupPlan` to be a primitive type in the JSON string but got " + data['aolWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['microsoftWarmupPlan'] && !(typeof data['microsoftWarmupPlan'] === 'string' || data['microsoftWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `microsoftWarmupPlan` to be a primitive type in the JSON string but got " + data['microsoftWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['comcastWarmupPlan'] && !(typeof data['comcastWarmupPlan'] === 'string' || data['comcastWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `comcastWarmupPlan` to be a primitive type in the JSON string but got " + data['comcastWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['yandexWarmupPlan'] && !(typeof data['yandexWarmupPlan'] === 'string' || data['yandexWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `yandexWarmupPlan` to be a primitive type in the JSON string but got " + data['yandexWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['gmxWarmupPlan'] && !(typeof data['gmxWarmupPlan'] === 'string' || data['gmxWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `gmxWarmupPlan` to be a primitive type in the JSON string but got " + data['gmxWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['mailruWarmupPlan'] && !(typeof data['mailruWarmupPlan'] === 'string' || data['mailruWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `mailruWarmupPlan` to be a primitive type in the JSON string but got " + data['mailruWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['icloudWarmupPlan'] && !(typeof data['icloudWarmupPlan'] === 'string' || data['icloudWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `icloudWarmupPlan` to be a primitive type in the JSON string but got " + data['icloudWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['zohoWarmupPlan'] && !(typeof data['zohoWarmupPlan'] === 'string' || data['zohoWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `zohoWarmupPlan` to be a primitive type in the JSON string but got " + data['zohoWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['qqWarmupPlan'] && !(typeof data['qqWarmupPlan'] === 'string' || data['qqWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `qqWarmupPlan` to be a primitive type in the JSON string but got " + data['qqWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['defaultWarmupPlan'] && !(typeof data['defaultWarmupPlan'] === 'string' || data['defaultWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `defaultWarmupPlan` to be a primitive type in the JSON string but got " + data['defaultWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['attWarmupPlan'] && !(typeof data['attWarmupPlan'] === 'string' || data['attWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `attWarmupPlan` to be a primitive type in the JSON string but got " + data['attWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['office365WarmupPlan'] && !(typeof data['office365WarmupPlan'] === 'string' || data['office365WarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `office365WarmupPlan` to be a primitive type in the JSON string but got " + data['office365WarmupPlan']);
        }
        // ensure the json data is a string
        if (data['googleworkspaceWarmupPlan'] && !(typeof data['googleworkspaceWarmupPlan'] === 'string' || data['googleworkspaceWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `googleworkspaceWarmupPlan` to be a primitive type in the JSON string but got " + data['googleworkspaceWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['proofpointWarmupPlan'] && !(typeof data['proofpointWarmupPlan'] === 'string' || data['proofpointWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `proofpointWarmupPlan` to be a primitive type in the JSON string but got " + data['proofpointWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['mimecastWarmupPlan'] && !(typeof data['mimecastWarmupPlan'] === 'string' || data['mimecastWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `mimecastWarmupPlan` to be a primitive type in the JSON string but got " + data['mimecastWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['barracudaWarmupPlan'] && !(typeof data['barracudaWarmupPlan'] === 'string' || data['barracudaWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `barracudaWarmupPlan` to be a primitive type in the JSON string but got " + data['barracudaWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['ciscoironportWarmupPlan'] && !(typeof data['ciscoironportWarmupPlan'] === 'string' || data['ciscoironportWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `ciscoironportWarmupPlan` to be a primitive type in the JSON string but got " + data['ciscoironportWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['rackspaceWarmupPlan'] && !(typeof data['rackspaceWarmupPlan'] === 'string' || data['rackspaceWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `rackspaceWarmupPlan` to be a primitive type in the JSON string but got " + data['rackspaceWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['zohobusinessWarmupPlan'] && !(typeof data['zohobusinessWarmupPlan'] === 'string' || data['zohobusinessWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `zohobusinessWarmupPlan` to be a primitive type in the JSON string but got " + data['zohobusinessWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['amazonworkmailWarmupPlan'] && !(typeof data['amazonworkmailWarmupPlan'] === 'string' || data['amazonworkmailWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `amazonworkmailWarmupPlan` to be a primitive type in the JSON string but got " + data['amazonworkmailWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['symantecWarmupPlan'] && !(typeof data['symantecWarmupPlan'] === 'string' || data['symantecWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `symantecWarmupPlan` to be a primitive type in the JSON string but got " + data['symantecWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['fortinetWarmupPlan'] && !(typeof data['fortinetWarmupPlan'] === 'string' || data['fortinetWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `fortinetWarmupPlan` to be a primitive type in the JSON string but got " + data['fortinetWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['sophosWarmupPlan'] && !(typeof data['sophosWarmupPlan'] === 'string' || data['sophosWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `sophosWarmupPlan` to be a primitive type in the JSON string but got " + data['sophosWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['trendmicroWarmupPlan'] && !(typeof data['trendmicroWarmupPlan'] === 'string' || data['trendmicroWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `trendmicroWarmupPlan` to be a primitive type in the JSON string but got " + data['trendmicroWarmupPlan']);
        }
        // ensure the json data is a string
        if (data['checkpointWarmupPlan'] && !(typeof data['checkpointWarmupPlan'] === 'string' || data['checkpointWarmupPlan'] instanceof String)) {
            throw new Error("Expected the field `checkpointWarmupPlan` to be a primitive type in the JSON string but got " + data['checkpointWarmupPlan']);
        }

        return true;
    }

/**
     * Returns Unique ID for the auto-warmup plan
     * @return {Number}
     */
    getId() {
        return this.id;
    }

    /**
     * Sets Unique ID for the auto-warmup plan
     * @param {Number} id Unique ID for the auto-warmup plan
     */
    setId(id) {
        this['id'] = id;
    }
/**
     * Returns Name of the auto-warmup plan
     * @return {String}
     */
    getName() {
        return this.name;
    }

    /**
     * Sets Name of the auto-warmup plan
     * @param {String} name Name of the auto-warmup plan
     */
    setName(name) {
        this['name'] = name;
    }
/**
     * Returns Gmail warmup plan configuration in JSON format
     * @return {String}
     */
    getGmailWarmupPlan() {
        return this.gmailWarmupPlan;
    }

    /**
     * Sets Gmail warmup plan configuration in JSON format
     * @param {String} gmailWarmupPlan Gmail warmup plan configuration in JSON format
     */
    setGmailWarmupPlan(gmailWarmupPlan) {
        this['gmailWarmupPlan'] = gmailWarmupPlan;
    }
/**
     * Returns Yahoo warmup plan configuration in JSON format
     * @return {String}
     */
    getYahooWarmupPlan() {
        return this.yahooWarmupPlan;
    }

    /**
     * Sets Yahoo warmup plan configuration in JSON format
     * @param {String} yahooWarmupPlan Yahoo warmup plan configuration in JSON format
     */
    setYahooWarmupPlan(yahooWarmupPlan) {
        this['yahooWarmupPlan'] = yahooWarmupPlan;
    }
/**
     * Returns AOL warmup plan configuration in JSON format
     * @return {String}
     */
    getAolWarmupPlan() {
        return this.aolWarmupPlan;
    }

    /**
     * Sets AOL warmup plan configuration in JSON format
     * @param {String} aolWarmupPlan AOL warmup plan configuration in JSON format
     */
    setAolWarmupPlan(aolWarmupPlan) {
        this['aolWarmupPlan'] = aolWarmupPlan;
    }
/**
     * Returns Microsoft warmup plan configuration in JSON format
     * @return {String}
     */
    getMicrosoftWarmupPlan() {
        return this.microsoftWarmupPlan;
    }

    /**
     * Sets Microsoft warmup plan configuration in JSON format
     * @param {String} microsoftWarmupPlan Microsoft warmup plan configuration in JSON format
     */
    setMicrosoftWarmupPlan(microsoftWarmupPlan) {
        this['microsoftWarmupPlan'] = microsoftWarmupPlan;
    }
/**
     * Returns Comcast warmup plan configuration in JSON format
     * @return {String}
     */
    getComcastWarmupPlan() {
        return this.comcastWarmupPlan;
    }

    /**
     * Sets Comcast warmup plan configuration in JSON format
     * @param {String} comcastWarmupPlan Comcast warmup plan configuration in JSON format
     */
    setComcastWarmupPlan(comcastWarmupPlan) {
        this['comcastWarmupPlan'] = comcastWarmupPlan;
    }
/**
     * Returns Yandex warmup plan configuration in JSON format
     * @return {String}
     */
    getYandexWarmupPlan() {
        return this.yandexWarmupPlan;
    }

    /**
     * Sets Yandex warmup plan configuration in JSON format
     * @param {String} yandexWarmupPlan Yandex warmup plan configuration in JSON format
     */
    setYandexWarmupPlan(yandexWarmupPlan) {
        this['yandexWarmupPlan'] = yandexWarmupPlan;
    }
/**
     * Returns GMX warmup plan configuration in JSON format
     * @return {String}
     */
    getGmxWarmupPlan() {
        return this.gmxWarmupPlan;
    }

    /**
     * Sets GMX warmup plan configuration in JSON format
     * @param {String} gmxWarmupPlan GMX warmup plan configuration in JSON format
     */
    setGmxWarmupPlan(gmxWarmupPlan) {
        this['gmxWarmupPlan'] = gmxWarmupPlan;
    }
/**
     * Returns Mail.ru warmup plan configuration in JSON format
     * @return {String}
     */
    getMailruWarmupPlan() {
        return this.mailruWarmupPlan;
    }

    /**
     * Sets Mail.ru warmup plan configuration in JSON format
     * @param {String} mailruWarmupPlan Mail.ru warmup plan configuration in JSON format
     */
    setMailruWarmupPlan(mailruWarmupPlan) {
        this['mailruWarmupPlan'] = mailruWarmupPlan;
    }
/**
     * Returns iCloud warmup plan configuration in JSON format
     * @return {String}
     */
    getIcloudWarmupPlan() {
        return this.icloudWarmupPlan;
    }

    /**
     * Sets iCloud warmup plan configuration in JSON format
     * @param {String} icloudWarmupPlan iCloud warmup plan configuration in JSON format
     */
    setIcloudWarmupPlan(icloudWarmupPlan) {
        this['icloudWarmupPlan'] = icloudWarmupPlan;
    }
/**
     * Returns Zoho warmup plan configuration in JSON format
     * @return {String}
     */
    getZohoWarmupPlan() {
        return this.zohoWarmupPlan;
    }

    /**
     * Sets Zoho warmup plan configuration in JSON format
     * @param {String} zohoWarmupPlan Zoho warmup plan configuration in JSON format
     */
    setZohoWarmupPlan(zohoWarmupPlan) {
        this['zohoWarmupPlan'] = zohoWarmupPlan;
    }
/**
     * Returns QQ warmup plan configuration in JSON format
     * @return {String}
     */
    getQqWarmupPlan() {
        return this.qqWarmupPlan;
    }

    /**
     * Sets QQ warmup plan configuration in JSON format
     * @param {String} qqWarmupPlan QQ warmup plan configuration in JSON format
     */
    setQqWarmupPlan(qqWarmupPlan) {
        this['qqWarmupPlan'] = qqWarmupPlan;
    }
/**
     * Returns Default warmup plan configuration in JSON format
     * @return {String}
     */
    getDefaultWarmupPlan() {
        return this.defaultWarmupPlan;
    }

    /**
     * Sets Default warmup plan configuration in JSON format
     * @param {String} defaultWarmupPlan Default warmup plan configuration in JSON format
     */
    setDefaultWarmupPlan(defaultWarmupPlan) {
        this['defaultWarmupPlan'] = defaultWarmupPlan;
    }
/**
     * Returns AT&T warmup plan configuration in JSON format
     * @return {String}
     */
    getAttWarmupPlan() {
        return this.attWarmupPlan;
    }

    /**
     * Sets AT&T warmup plan configuration in JSON format
     * @param {String} attWarmupPlan AT&T warmup plan configuration in JSON format
     */
    setAttWarmupPlan(attWarmupPlan) {
        this['attWarmupPlan'] = attWarmupPlan;
    }
/**
     * Returns Office365 warmup plan configuration in JSON format
     * @return {String}
     */
    getOffice365WarmupPlan() {
        return this.office365WarmupPlan;
    }

    /**
     * Sets Office365 warmup plan configuration in JSON format
     * @param {String} office365WarmupPlan Office365 warmup plan configuration in JSON format
     */
    setOffice365WarmupPlan(office365WarmupPlan) {
        this['office365WarmupPlan'] = office365WarmupPlan;
    }
/**
     * Returns Google Workspace warmup plan configuration in JSON format
     * @return {String}
     */
    getGoogleworkspaceWarmupPlan() {
        return this.googleworkspaceWarmupPlan;
    }

    /**
     * Sets Google Workspace warmup plan configuration in JSON format
     * @param {String} googleworkspaceWarmupPlan Google Workspace warmup plan configuration in JSON format
     */
    setGoogleworkspaceWarmupPlan(googleworkspaceWarmupPlan) {
        this['googleworkspaceWarmupPlan'] = googleworkspaceWarmupPlan;
    }
/**
     * Returns Proofpoint warmup plan configuration in JSON format
     * @return {String}
     */
    getProofpointWarmupPlan() {
        return this.proofpointWarmupPlan;
    }

    /**
     * Sets Proofpoint warmup plan configuration in JSON format
     * @param {String} proofpointWarmupPlan Proofpoint warmup plan configuration in JSON format
     */
    setProofpointWarmupPlan(proofpointWarmupPlan) {
        this['proofpointWarmupPlan'] = proofpointWarmupPlan;
    }
/**
     * Returns Mimecast warmup plan configuration in JSON format
     * @return {String}
     */
    getMimecastWarmupPlan() {
        return this.mimecastWarmupPlan;
    }

    /**
     * Sets Mimecast warmup plan configuration in JSON format
     * @param {String} mimecastWarmupPlan Mimecast warmup plan configuration in JSON format
     */
    setMimecastWarmupPlan(mimecastWarmupPlan) {
        this['mimecastWarmupPlan'] = mimecastWarmupPlan;
    }
/**
     * Returns Barracuda warmup plan configuration in JSON format
     * @return {String}
     */
    getBarracudaWarmupPlan() {
        return this.barracudaWarmupPlan;
    }

    /**
     * Sets Barracuda warmup plan configuration in JSON format
     * @param {String} barracudaWarmupPlan Barracuda warmup plan configuration in JSON format
     */
    setBarracudaWarmupPlan(barracudaWarmupPlan) {
        this['barracudaWarmupPlan'] = barracudaWarmupPlan;
    }
/**
     * Returns Cisco IronPort warmup plan configuration in JSON format
     * @return {String}
     */
    getCiscoironportWarmupPlan() {
        return this.ciscoironportWarmupPlan;
    }

    /**
     * Sets Cisco IronPort warmup plan configuration in JSON format
     * @param {String} ciscoironportWarmupPlan Cisco IronPort warmup plan configuration in JSON format
     */
    setCiscoironportWarmupPlan(ciscoironportWarmupPlan) {
        this['ciscoironportWarmupPlan'] = ciscoironportWarmupPlan;
    }
/**
     * Returns Rackspace warmup plan configuration in JSON format
     * @return {String}
     */
    getRackspaceWarmupPlan() {
        return this.rackspaceWarmupPlan;
    }

    /**
     * Sets Rackspace warmup plan configuration in JSON format
     * @param {String} rackspaceWarmupPlan Rackspace warmup plan configuration in JSON format
     */
    setRackspaceWarmupPlan(rackspaceWarmupPlan) {
        this['rackspaceWarmupPlan'] = rackspaceWarmupPlan;
    }
/**
     * Returns Zoho Business warmup plan configuration in JSON format
     * @return {String}
     */
    getZohobusinessWarmupPlan() {
        return this.zohobusinessWarmupPlan;
    }

    /**
     * Sets Zoho Business warmup plan configuration in JSON format
     * @param {String} zohobusinessWarmupPlan Zoho Business warmup plan configuration in JSON format
     */
    setZohobusinessWarmupPlan(zohobusinessWarmupPlan) {
        this['zohobusinessWarmupPlan'] = zohobusinessWarmupPlan;
    }
/**
     * Returns Amazon WorkMail warmup plan configuration in JSON format
     * @return {String}
     */
    getAmazonworkmailWarmupPlan() {
        return this.amazonworkmailWarmupPlan;
    }

    /**
     * Sets Amazon WorkMail warmup plan configuration in JSON format
     * @param {String} amazonworkmailWarmupPlan Amazon WorkMail warmup plan configuration in JSON format
     */
    setAmazonworkmailWarmupPlan(amazonworkmailWarmupPlan) {
        this['amazonworkmailWarmupPlan'] = amazonworkmailWarmupPlan;
    }
/**
     * Returns Symantec warmup plan configuration in JSON format
     * @return {String}
     */
    getSymantecWarmupPlan() {
        return this.symantecWarmupPlan;
    }

    /**
     * Sets Symantec warmup plan configuration in JSON format
     * @param {String} symantecWarmupPlan Symantec warmup plan configuration in JSON format
     */
    setSymantecWarmupPlan(symantecWarmupPlan) {
        this['symantecWarmupPlan'] = symantecWarmupPlan;
    }
/**
     * Returns Fortinet warmup plan configuration in JSON format
     * @return {String}
     */
    getFortinetWarmupPlan() {
        return this.fortinetWarmupPlan;
    }

    /**
     * Sets Fortinet warmup plan configuration in JSON format
     * @param {String} fortinetWarmupPlan Fortinet warmup plan configuration in JSON format
     */
    setFortinetWarmupPlan(fortinetWarmupPlan) {
        this['fortinetWarmupPlan'] = fortinetWarmupPlan;
    }
/**
     * Returns Sophos warmup plan configuration in JSON format
     * @return {String}
     */
    getSophosWarmupPlan() {
        return this.sophosWarmupPlan;
    }

    /**
     * Sets Sophos warmup plan configuration in JSON format
     * @param {String} sophosWarmupPlan Sophos warmup plan configuration in JSON format
     */
    setSophosWarmupPlan(sophosWarmupPlan) {
        this['sophosWarmupPlan'] = sophosWarmupPlan;
    }
/**
     * Returns Trend Micro warmup plan configuration in JSON format
     * @return {String}
     */
    getTrendmicroWarmupPlan() {
        return this.trendmicroWarmupPlan;
    }

    /**
     * Sets Trend Micro warmup plan configuration in JSON format
     * @param {String} trendmicroWarmupPlan Trend Micro warmup plan configuration in JSON format
     */
    setTrendmicroWarmupPlan(trendmicroWarmupPlan) {
        this['trendmicroWarmupPlan'] = trendmicroWarmupPlan;
    }
/**
     * Returns Checkpoint warmup plan configuration in JSON format
     * @return {String}
     */
    getCheckpointWarmupPlan() {
        return this.checkpointWarmupPlan;
    }

    /**
     * Sets Checkpoint warmup plan configuration in JSON format
     * @param {String} checkpointWarmupPlan Checkpoint warmup plan configuration in JSON format
     */
    setCheckpointWarmupPlan(checkpointWarmupPlan) {
        this['checkpointWarmupPlan'] = checkpointWarmupPlan;
    }
/**
     * Returns UNIX epoch nano timestamp when the warmup plan was created
     * @return {Number}
     */
    getCreated() {
        return this.created;
    }

    /**
     * Sets UNIX epoch nano timestamp when the warmup plan was created
     * @param {Number} created UNIX epoch nano timestamp when the warmup plan was created
     */
    setCreated(created) {
        this['created'] = created;
    }
/**
     * Returns UNIX epoch nano timestamp when the warmup plan was last updated
     * @return {Number}
     */
    getUpdated() {
        return this.updated;
    }

    /**
     * Sets UNIX epoch nano timestamp when the warmup plan was last updated
     * @param {Number} updated UNIX epoch nano timestamp when the warmup plan was last updated
     */
    setUpdated(updated) {
        this['updated'] = updated;
    }
/**
     * Returns Warmup interval in hours
     * @return {Number}
     */
    getWarmupInterval() {
        return this.warmupInterval;
    }

    /**
     * Sets Warmup interval in hours
     * @param {Number} warmupInterval Warmup interval in hours
     */
    setWarmupInterval(warmupInterval) {
        this['warmupInterval'] = warmupInterval;
    }

}



/**
 * Unique ID for the auto-warmup plan
 * @member {Number} id
 */
AutoWarmupPlan.prototype['id'] = undefined;

/**
 * Name of the auto-warmup plan
 * @member {String} name
 */
AutoWarmupPlan.prototype['name'] = undefined;

/**
 * Gmail warmup plan configuration in JSON format
 * @member {String} gmailWarmupPlan
 */
AutoWarmupPlan.prototype['gmailWarmupPlan'] = undefined;

/**
 * Yahoo warmup plan configuration in JSON format
 * @member {String} yahooWarmupPlan
 */
AutoWarmupPlan.prototype['yahooWarmupPlan'] = undefined;

/**
 * AOL warmup plan configuration in JSON format
 * @member {String} aolWarmupPlan
 */
AutoWarmupPlan.prototype['aolWarmupPlan'] = undefined;

/**
 * Microsoft warmup plan configuration in JSON format
 * @member {String} microsoftWarmupPlan
 */
AutoWarmupPlan.prototype['microsoftWarmupPlan'] = undefined;

/**
 * Comcast warmup plan configuration in JSON format
 * @member {String} comcastWarmupPlan
 */
AutoWarmupPlan.prototype['comcastWarmupPlan'] = undefined;

/**
 * Yandex warmup plan configuration in JSON format
 * @member {String} yandexWarmupPlan
 */
AutoWarmupPlan.prototype['yandexWarmupPlan'] = undefined;

/**
 * GMX warmup plan configuration in JSON format
 * @member {String} gmxWarmupPlan
 */
AutoWarmupPlan.prototype['gmxWarmupPlan'] = undefined;

/**
 * Mail.ru warmup plan configuration in JSON format
 * @member {String} mailruWarmupPlan
 */
AutoWarmupPlan.prototype['mailruWarmupPlan'] = undefined;

/**
 * iCloud warmup plan configuration in JSON format
 * @member {String} icloudWarmupPlan
 */
AutoWarmupPlan.prototype['icloudWarmupPlan'] = undefined;

/**
 * Zoho warmup plan configuration in JSON format
 * @member {String} zohoWarmupPlan
 */
AutoWarmupPlan.prototype['zohoWarmupPlan'] = undefined;

/**
 * QQ warmup plan configuration in JSON format
 * @member {String} qqWarmupPlan
 */
AutoWarmupPlan.prototype['qqWarmupPlan'] = undefined;

/**
 * Default warmup plan configuration in JSON format
 * @member {String} defaultWarmupPlan
 */
AutoWarmupPlan.prototype['defaultWarmupPlan'] = undefined;

/**
 * AT&T warmup plan configuration in JSON format
 * @member {String} attWarmupPlan
 */
AutoWarmupPlan.prototype['attWarmupPlan'] = undefined;

/**
 * Office365 warmup plan configuration in JSON format
 * @member {String} office365WarmupPlan
 */
AutoWarmupPlan.prototype['office365WarmupPlan'] = undefined;

/**
 * Google Workspace warmup plan configuration in JSON format
 * @member {String} googleworkspaceWarmupPlan
 */
AutoWarmupPlan.prototype['googleworkspaceWarmupPlan'] = undefined;

/**
 * Proofpoint warmup plan configuration in JSON format
 * @member {String} proofpointWarmupPlan
 */
AutoWarmupPlan.prototype['proofpointWarmupPlan'] = undefined;

/**
 * Mimecast warmup plan configuration in JSON format
 * @member {String} mimecastWarmupPlan
 */
AutoWarmupPlan.prototype['mimecastWarmupPlan'] = undefined;

/**
 * Barracuda warmup plan configuration in JSON format
 * @member {String} barracudaWarmupPlan
 */
AutoWarmupPlan.prototype['barracudaWarmupPlan'] = undefined;

/**
 * Cisco IronPort warmup plan configuration in JSON format
 * @member {String} ciscoironportWarmupPlan
 */
AutoWarmupPlan.prototype['ciscoironportWarmupPlan'] = undefined;

/**
 * Rackspace warmup plan configuration in JSON format
 * @member {String} rackspaceWarmupPlan
 */
AutoWarmupPlan.prototype['rackspaceWarmupPlan'] = undefined;

/**
 * Zoho Business warmup plan configuration in JSON format
 * @member {String} zohobusinessWarmupPlan
 */
AutoWarmupPlan.prototype['zohobusinessWarmupPlan'] = undefined;

/**
 * Amazon WorkMail warmup plan configuration in JSON format
 * @member {String} amazonworkmailWarmupPlan
 */
AutoWarmupPlan.prototype['amazonworkmailWarmupPlan'] = undefined;

/**
 * Symantec warmup plan configuration in JSON format
 * @member {String} symantecWarmupPlan
 */
AutoWarmupPlan.prototype['symantecWarmupPlan'] = undefined;

/**
 * Fortinet warmup plan configuration in JSON format
 * @member {String} fortinetWarmupPlan
 */
AutoWarmupPlan.prototype['fortinetWarmupPlan'] = undefined;

/**
 * Sophos warmup plan configuration in JSON format
 * @member {String} sophosWarmupPlan
 */
AutoWarmupPlan.prototype['sophosWarmupPlan'] = undefined;

/**
 * Trend Micro warmup plan configuration in JSON format
 * @member {String} trendmicroWarmupPlan
 */
AutoWarmupPlan.prototype['trendmicroWarmupPlan'] = undefined;

/**
 * Checkpoint warmup plan configuration in JSON format
 * @member {String} checkpointWarmupPlan
 */
AutoWarmupPlan.prototype['checkpointWarmupPlan'] = undefined;

/**
 * UNIX epoch nano timestamp when the warmup plan was created
 * @member {Number} created
 */
AutoWarmupPlan.prototype['created'] = undefined;

/**
 * UNIX epoch nano timestamp when the warmup plan was last updated
 * @member {Number} updated
 */
AutoWarmupPlan.prototype['updated'] = undefined;

/**
 * Warmup interval in hours
 * @member {Number} warmupInterval
 */
AutoWarmupPlan.prototype['warmupInterval'] = undefined;






export default AutoWarmupPlan;

