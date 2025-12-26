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
import AutoWarmupPlan from './AutoWarmupPlan';
import Domain from './Domain';
import Label from './Label';

/**
 * The IP model module.
 * @module sendpost/model/IP
 * @version 2.0.1
 */
class IP {
    /**
     * Constructs a new <code>IP</code>.
     * @alias module:sendpost/model/IP
     * @param id {Number} Unique ID for the IP
     * @param publicIP {String} The public IP address associated with the resource
     * @param created {Number} The timestamp (UNIX epoch) when the IP was created
     */
    constructor(id, publicIP, created) { 
        
        IP.initialize(this, id, publicIP, created);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, publicIP, created) { 
        obj['id'] = id;
        obj['publicIP'] = publicIP;
        obj['created'] = created;
    }

    /**
     * Constructs a <code>IP</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/IP} obj Optional instance to populate.
     * @return {module:sendpost/model/IP} The populated <code>IP</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IP();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('publicIP')) {
                obj['publicIP'] = ApiClient.convertToType(data['publicIP'], 'String');
            }
            if (data.hasOwnProperty('systemDomain')) {
                obj['systemDomain'] = Domain.constructFromObject(data['systemDomain']);
            }
            if (data.hasOwnProperty('reverseDNSHostname')) {
                obj['reverseDNSHostname'] = ApiClient.convertToType(data['reverseDNSHostname'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'Number');
            }
            if (data.hasOwnProperty('gmailSettings')) {
                obj['gmailSettings'] = ApiClient.convertToType(data['gmailSettings'], 'String');
            }
            if (data.hasOwnProperty('yahooSettings')) {
                obj['yahooSettings'] = ApiClient.convertToType(data['yahooSettings'], 'String');
            }
            if (data.hasOwnProperty('aolSettings')) {
                obj['aolSettings'] = ApiClient.convertToType(data['aolSettings'], 'String');
            }
            if (data.hasOwnProperty('microsoftSettings')) {
                obj['microsoftSettings'] = ApiClient.convertToType(data['microsoftSettings'], 'String');
            }
            if (data.hasOwnProperty('comcastSettings')) {
                obj['comcastSettings'] = ApiClient.convertToType(data['comcastSettings'], 'String');
            }
            if (data.hasOwnProperty('yandexSettings')) {
                obj['yandexSettings'] = ApiClient.convertToType(data['yandexSettings'], 'String');
            }
            if (data.hasOwnProperty('gmxSettings')) {
                obj['gmxSettings'] = ApiClient.convertToType(data['gmxSettings'], 'String');
            }
            if (data.hasOwnProperty('mailruSettings')) {
                obj['mailruSettings'] = ApiClient.convertToType(data['mailruSettings'], 'String');
            }
            if (data.hasOwnProperty('icloudSettings')) {
                obj['icloudSettings'] = ApiClient.convertToType(data['icloudSettings'], 'String');
            }
            if (data.hasOwnProperty('zohoSettings')) {
                obj['zohoSettings'] = ApiClient.convertToType(data['zohoSettings'], 'String');
            }
            if (data.hasOwnProperty('qqSettings')) {
                obj['qqSettings'] = ApiClient.convertToType(data['qqSettings'], 'String');
            }
            if (data.hasOwnProperty('defaultSettings')) {
                obj['defaultSettings'] = ApiClient.convertToType(data['defaultSettings'], 'String');
            }
            if (data.hasOwnProperty('attSettings')) {
                obj['attSettings'] = ApiClient.convertToType(data['attSettings'], 'String');
            }
            if (data.hasOwnProperty('office365Settings')) {
                obj['office365Settings'] = ApiClient.convertToType(data['office365Settings'], 'String');
            }
            if (data.hasOwnProperty('googleworkspaceSettings')) {
                obj['googleworkspaceSettings'] = ApiClient.convertToType(data['googleworkspaceSettings'], 'String');
            }
            if (data.hasOwnProperty('proofpointSettings')) {
                obj['proofpointSettings'] = ApiClient.convertToType(data['proofpointSettings'], 'String');
            }
            if (data.hasOwnProperty('mimecastSettings')) {
                obj['mimecastSettings'] = ApiClient.convertToType(data['mimecastSettings'], 'String');
            }
            if (data.hasOwnProperty('barracudaSettings')) {
                obj['barracudaSettings'] = ApiClient.convertToType(data['barracudaSettings'], 'String');
            }
            if (data.hasOwnProperty('ciscoironportSettings')) {
                obj['ciscoironportSettings'] = ApiClient.convertToType(data['ciscoironportSettings'], 'String');
            }
            if (data.hasOwnProperty('rackspaceSettings')) {
                obj['rackspaceSettings'] = ApiClient.convertToType(data['rackspaceSettings'], 'String');
            }
            if (data.hasOwnProperty('zohobusinessSettings')) {
                obj['zohobusinessSettings'] = ApiClient.convertToType(data['zohobusinessSettings'], 'String');
            }
            if (data.hasOwnProperty('amazonworkmailSettings')) {
                obj['amazonworkmailSettings'] = ApiClient.convertToType(data['amazonworkmailSettings'], 'String');
            }
            if (data.hasOwnProperty('symantecSettings')) {
                obj['symantecSettings'] = ApiClient.convertToType(data['symantecSettings'], 'String');
            }
            if (data.hasOwnProperty('fortinetSettings')) {
                obj['fortinetSettings'] = ApiClient.convertToType(data['fortinetSettings'], 'String');
            }
            if (data.hasOwnProperty('sophosSettings')) {
                obj['sophosSettings'] = ApiClient.convertToType(data['sophosSettings'], 'String');
            }
            if (data.hasOwnProperty('trendmicroSettings')) {
                obj['trendmicroSettings'] = ApiClient.convertToType(data['trendmicroSettings'], 'String');
            }
            if (data.hasOwnProperty('checkpointSettings')) {
                obj['checkpointSettings'] = ApiClient.convertToType(data['checkpointSettings'], 'String');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Number');
            }
            if (data.hasOwnProperty('infraClassification')) {
                obj['infraClassification'] = ApiClient.convertToType(data['infraClassification'], 'String');
            }
            if (data.hasOwnProperty('infraMonitor')) {
                obj['infraMonitor'] = ApiClient.convertToType(data['infraMonitor'], 'Boolean');
            }
            if (data.hasOwnProperty('state')) {
                obj['state'] = ApiClient.convertToType(data['state'], 'Number');
            }
            if (data.hasOwnProperty('autoWarmupPlan')) {
                obj['autoWarmupPlan'] = AutoWarmupPlan.constructFromObject(data['autoWarmupPlan']);
            }
            if (data.hasOwnProperty('labels')) {
                obj['labels'] = ApiClient.convertToType(data['labels'], [Label]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>IP</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>IP</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of IP.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['publicIP'] && !(typeof data['publicIP'] === 'string' || data['publicIP'] instanceof String)) {
            throw new Error("Expected the field `publicIP` to be a primitive type in the JSON string but got " + data['publicIP']);
        }
        // validate the optional field `systemDomain`
        if (data['systemDomain']) { // data not null
          Domain.validateJSON(data['systemDomain']);
        }
        // ensure the json data is a string
        if (data['reverseDNSHostname'] && !(typeof data['reverseDNSHostname'] === 'string' || data['reverseDNSHostname'] instanceof String)) {
            throw new Error("Expected the field `reverseDNSHostname` to be a primitive type in the JSON string but got " + data['reverseDNSHostname']);
        }
        // ensure the json data is a string
        if (data['gmailSettings'] && !(typeof data['gmailSettings'] === 'string' || data['gmailSettings'] instanceof String)) {
            throw new Error("Expected the field `gmailSettings` to be a primitive type in the JSON string but got " + data['gmailSettings']);
        }
        // ensure the json data is a string
        if (data['yahooSettings'] && !(typeof data['yahooSettings'] === 'string' || data['yahooSettings'] instanceof String)) {
            throw new Error("Expected the field `yahooSettings` to be a primitive type in the JSON string but got " + data['yahooSettings']);
        }
        // ensure the json data is a string
        if (data['aolSettings'] && !(typeof data['aolSettings'] === 'string' || data['aolSettings'] instanceof String)) {
            throw new Error("Expected the field `aolSettings` to be a primitive type in the JSON string but got " + data['aolSettings']);
        }
        // ensure the json data is a string
        if (data['microsoftSettings'] && !(typeof data['microsoftSettings'] === 'string' || data['microsoftSettings'] instanceof String)) {
            throw new Error("Expected the field `microsoftSettings` to be a primitive type in the JSON string but got " + data['microsoftSettings']);
        }
        // ensure the json data is a string
        if (data['comcastSettings'] && !(typeof data['comcastSettings'] === 'string' || data['comcastSettings'] instanceof String)) {
            throw new Error("Expected the field `comcastSettings` to be a primitive type in the JSON string but got " + data['comcastSettings']);
        }
        // ensure the json data is a string
        if (data['yandexSettings'] && !(typeof data['yandexSettings'] === 'string' || data['yandexSettings'] instanceof String)) {
            throw new Error("Expected the field `yandexSettings` to be a primitive type in the JSON string but got " + data['yandexSettings']);
        }
        // ensure the json data is a string
        if (data['gmxSettings'] && !(typeof data['gmxSettings'] === 'string' || data['gmxSettings'] instanceof String)) {
            throw new Error("Expected the field `gmxSettings` to be a primitive type in the JSON string but got " + data['gmxSettings']);
        }
        // ensure the json data is a string
        if (data['mailruSettings'] && !(typeof data['mailruSettings'] === 'string' || data['mailruSettings'] instanceof String)) {
            throw new Error("Expected the field `mailruSettings` to be a primitive type in the JSON string but got " + data['mailruSettings']);
        }
        // ensure the json data is a string
        if (data['icloudSettings'] && !(typeof data['icloudSettings'] === 'string' || data['icloudSettings'] instanceof String)) {
            throw new Error("Expected the field `icloudSettings` to be a primitive type in the JSON string but got " + data['icloudSettings']);
        }
        // ensure the json data is a string
        if (data['zohoSettings'] && !(typeof data['zohoSettings'] === 'string' || data['zohoSettings'] instanceof String)) {
            throw new Error("Expected the field `zohoSettings` to be a primitive type in the JSON string but got " + data['zohoSettings']);
        }
        // ensure the json data is a string
        if (data['qqSettings'] && !(typeof data['qqSettings'] === 'string' || data['qqSettings'] instanceof String)) {
            throw new Error("Expected the field `qqSettings` to be a primitive type in the JSON string but got " + data['qqSettings']);
        }
        // ensure the json data is a string
        if (data['defaultSettings'] && !(typeof data['defaultSettings'] === 'string' || data['defaultSettings'] instanceof String)) {
            throw new Error("Expected the field `defaultSettings` to be a primitive type in the JSON string but got " + data['defaultSettings']);
        }
        // ensure the json data is a string
        if (data['attSettings'] && !(typeof data['attSettings'] === 'string' || data['attSettings'] instanceof String)) {
            throw new Error("Expected the field `attSettings` to be a primitive type in the JSON string but got " + data['attSettings']);
        }
        // ensure the json data is a string
        if (data['office365Settings'] && !(typeof data['office365Settings'] === 'string' || data['office365Settings'] instanceof String)) {
            throw new Error("Expected the field `office365Settings` to be a primitive type in the JSON string but got " + data['office365Settings']);
        }
        // ensure the json data is a string
        if (data['googleworkspaceSettings'] && !(typeof data['googleworkspaceSettings'] === 'string' || data['googleworkspaceSettings'] instanceof String)) {
            throw new Error("Expected the field `googleworkspaceSettings` to be a primitive type in the JSON string but got " + data['googleworkspaceSettings']);
        }
        // ensure the json data is a string
        if (data['proofpointSettings'] && !(typeof data['proofpointSettings'] === 'string' || data['proofpointSettings'] instanceof String)) {
            throw new Error("Expected the field `proofpointSettings` to be a primitive type in the JSON string but got " + data['proofpointSettings']);
        }
        // ensure the json data is a string
        if (data['mimecastSettings'] && !(typeof data['mimecastSettings'] === 'string' || data['mimecastSettings'] instanceof String)) {
            throw new Error("Expected the field `mimecastSettings` to be a primitive type in the JSON string but got " + data['mimecastSettings']);
        }
        // ensure the json data is a string
        if (data['barracudaSettings'] && !(typeof data['barracudaSettings'] === 'string' || data['barracudaSettings'] instanceof String)) {
            throw new Error("Expected the field `barracudaSettings` to be a primitive type in the JSON string but got " + data['barracudaSettings']);
        }
        // ensure the json data is a string
        if (data['ciscoironportSettings'] && !(typeof data['ciscoironportSettings'] === 'string' || data['ciscoironportSettings'] instanceof String)) {
            throw new Error("Expected the field `ciscoironportSettings` to be a primitive type in the JSON string but got " + data['ciscoironportSettings']);
        }
        // ensure the json data is a string
        if (data['rackspaceSettings'] && !(typeof data['rackspaceSettings'] === 'string' || data['rackspaceSettings'] instanceof String)) {
            throw new Error("Expected the field `rackspaceSettings` to be a primitive type in the JSON string but got " + data['rackspaceSettings']);
        }
        // ensure the json data is a string
        if (data['zohobusinessSettings'] && !(typeof data['zohobusinessSettings'] === 'string' || data['zohobusinessSettings'] instanceof String)) {
            throw new Error("Expected the field `zohobusinessSettings` to be a primitive type in the JSON string but got " + data['zohobusinessSettings']);
        }
        // ensure the json data is a string
        if (data['amazonworkmailSettings'] && !(typeof data['amazonworkmailSettings'] === 'string' || data['amazonworkmailSettings'] instanceof String)) {
            throw new Error("Expected the field `amazonworkmailSettings` to be a primitive type in the JSON string but got " + data['amazonworkmailSettings']);
        }
        // ensure the json data is a string
        if (data['symantecSettings'] && !(typeof data['symantecSettings'] === 'string' || data['symantecSettings'] instanceof String)) {
            throw new Error("Expected the field `symantecSettings` to be a primitive type in the JSON string but got " + data['symantecSettings']);
        }
        // ensure the json data is a string
        if (data['fortinetSettings'] && !(typeof data['fortinetSettings'] === 'string' || data['fortinetSettings'] instanceof String)) {
            throw new Error("Expected the field `fortinetSettings` to be a primitive type in the JSON string but got " + data['fortinetSettings']);
        }
        // ensure the json data is a string
        if (data['sophosSettings'] && !(typeof data['sophosSettings'] === 'string' || data['sophosSettings'] instanceof String)) {
            throw new Error("Expected the field `sophosSettings` to be a primitive type in the JSON string but got " + data['sophosSettings']);
        }
        // ensure the json data is a string
        if (data['trendmicroSettings'] && !(typeof data['trendmicroSettings'] === 'string' || data['trendmicroSettings'] instanceof String)) {
            throw new Error("Expected the field `trendmicroSettings` to be a primitive type in the JSON string but got " + data['trendmicroSettings']);
        }
        // ensure the json data is a string
        if (data['checkpointSettings'] && !(typeof data['checkpointSettings'] === 'string' || data['checkpointSettings'] instanceof String)) {
            throw new Error("Expected the field `checkpointSettings` to be a primitive type in the JSON string but got " + data['checkpointSettings']);
        }
        // ensure the json data is a string
        if (data['infraClassification'] && !(typeof data['infraClassification'] === 'string' || data['infraClassification'] instanceof String)) {
            throw new Error("Expected the field `infraClassification` to be a primitive type in the JSON string but got " + data['infraClassification']);
        }
        // validate the optional field `autoWarmupPlan`
        if (data['autoWarmupPlan']) { // data not null
          AutoWarmupPlan.validateJSON(data['autoWarmupPlan']);
        }
        if (data['labels']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['labels'])) {
                throw new Error("Expected the field `labels` to be an array in the JSON data but got " + data['labels']);
            }
            // validate the optional field `labels` (array)
            for (const item of data['labels']) {
                Label.validateJSON(item);
            };
        }

        return true;
    }

/**
     * Returns Unique ID for the IP
     * @return {Number}
     */
    getId() {
        return this.id;
    }

    /**
     * Sets Unique ID for the IP
     * @param {Number} id Unique ID for the IP
     */
    setId(id) {
        this['id'] = id;
    }
/**
     * Returns The public IP address associated with the resource
     * @return {String}
     */
    getPublicIP() {
        return this.publicIP;
    }

    /**
     * Sets The public IP address associated with the resource
     * @param {String} publicIP The public IP address associated with the resource
     */
    setPublicIP(publicIP) {
        this['publicIP'] = publicIP;
    }
/**
     * @return {module:sendpost/model/Domain}
     */
    getSystemDomain() {
        return this.systemDomain;
    }

    /**
     * @param {module:sendpost/model/Domain} systemDomain
     */
    setSystemDomain(systemDomain) {
        this['systemDomain'] = systemDomain;
    }
/**
     * Returns The reverse DNS hostname for the IP
     * @return {String}
     */
    getReverseDNSHostname() {
        return this.reverseDNSHostname;
    }

    /**
     * Sets The reverse DNS hostname for the IP
     * @param {String} reverseDNSHostname The reverse DNS hostname for the IP
     */
    setReverseDNSHostname(reverseDNSHostname) {
        this['reverseDNSHostname'] = reverseDNSHostname;
    }
/**
     * Returns Type of the IP
     * @return {Number}
     */
    getType() {
        return this.type;
    }

    /**
     * Sets Type of the IP
     * @param {Number} type Type of the IP
     */
    setType(type) {
        this['type'] = type;
    }
/**
     * Returns Configuration for Gmail delivery settings in JSON format
     * @return {String}
     */
    getGmailSettings() {
        return this.gmailSettings;
    }

    /**
     * Sets Configuration for Gmail delivery settings in JSON format
     * @param {String} gmailSettings Configuration for Gmail delivery settings in JSON format
     */
    setGmailSettings(gmailSettings) {
        this['gmailSettings'] = gmailSettings;
    }
/**
     * Returns Configuration for Yahoo delivery settings in JSON format
     * @return {String}
     */
    getYahooSettings() {
        return this.yahooSettings;
    }

    /**
     * Sets Configuration for Yahoo delivery settings in JSON format
     * @param {String} yahooSettings Configuration for Yahoo delivery settings in JSON format
     */
    setYahooSettings(yahooSettings) {
        this['yahooSettings'] = yahooSettings;
    }
/**
     * Returns Configuration for AOL delivery settings in JSON format
     * @return {String}
     */
    getAolSettings() {
        return this.aolSettings;
    }

    /**
     * Sets Configuration for AOL delivery settings in JSON format
     * @param {String} aolSettings Configuration for AOL delivery settings in JSON format
     */
    setAolSettings(aolSettings) {
        this['aolSettings'] = aolSettings;
    }
/**
     * Returns Configuration for Microsoft delivery settings in JSON format
     * @return {String}
     */
    getMicrosoftSettings() {
        return this.microsoftSettings;
    }

    /**
     * Sets Configuration for Microsoft delivery settings in JSON format
     * @param {String} microsoftSettings Configuration for Microsoft delivery settings in JSON format
     */
    setMicrosoftSettings(microsoftSettings) {
        this['microsoftSettings'] = microsoftSettings;
    }
/**
     * Returns Configuration for Comcast delivery settings in JSON format
     * @return {String}
     */
    getComcastSettings() {
        return this.comcastSettings;
    }

    /**
     * Sets Configuration for Comcast delivery settings in JSON format
     * @param {String} comcastSettings Configuration for Comcast delivery settings in JSON format
     */
    setComcastSettings(comcastSettings) {
        this['comcastSettings'] = comcastSettings;
    }
/**
     * Returns Configuration for Yandex delivery settings in JSON format
     * @return {String}
     */
    getYandexSettings() {
        return this.yandexSettings;
    }

    /**
     * Sets Configuration for Yandex delivery settings in JSON format
     * @param {String} yandexSettings Configuration for Yandex delivery settings in JSON format
     */
    setYandexSettings(yandexSettings) {
        this['yandexSettings'] = yandexSettings;
    }
/**
     * Returns Configuration for GMX delivery settings in JSON format
     * @return {String}
     */
    getGmxSettings() {
        return this.gmxSettings;
    }

    /**
     * Sets Configuration for GMX delivery settings in JSON format
     * @param {String} gmxSettings Configuration for GMX delivery settings in JSON format
     */
    setGmxSettings(gmxSettings) {
        this['gmxSettings'] = gmxSettings;
    }
/**
     * Returns Configuration for Mail.ru delivery settings in JSON format
     * @return {String}
     */
    getMailruSettings() {
        return this.mailruSettings;
    }

    /**
     * Sets Configuration for Mail.ru delivery settings in JSON format
     * @param {String} mailruSettings Configuration for Mail.ru delivery settings in JSON format
     */
    setMailruSettings(mailruSettings) {
        this['mailruSettings'] = mailruSettings;
    }
/**
     * Returns Configuration for iCloud delivery settings in JSON format
     * @return {String}
     */
    getIcloudSettings() {
        return this.icloudSettings;
    }

    /**
     * Sets Configuration for iCloud delivery settings in JSON format
     * @param {String} icloudSettings Configuration for iCloud delivery settings in JSON format
     */
    setIcloudSettings(icloudSettings) {
        this['icloudSettings'] = icloudSettings;
    }
/**
     * Returns Configuration for Zoho delivery settings in JSON format
     * @return {String}
     */
    getZohoSettings() {
        return this.zohoSettings;
    }

    /**
     * Sets Configuration for Zoho delivery settings in JSON format
     * @param {String} zohoSettings Configuration for Zoho delivery settings in JSON format
     */
    setZohoSettings(zohoSettings) {
        this['zohoSettings'] = zohoSettings;
    }
/**
     * Returns Configuration for QQ delivery settings in JSON format
     * @return {String}
     */
    getQqSettings() {
        return this.qqSettings;
    }

    /**
     * Sets Configuration for QQ delivery settings in JSON format
     * @param {String} qqSettings Configuration for QQ delivery settings in JSON format
     */
    setQqSettings(qqSettings) {
        this['qqSettings'] = qqSettings;
    }
/**
     * Returns Default delivery settings in JSON format
     * @return {String}
     */
    getDefaultSettings() {
        return this.defaultSettings;
    }

    /**
     * Sets Default delivery settings in JSON format
     * @param {String} defaultSettings Default delivery settings in JSON format
     */
    setDefaultSettings(defaultSettings) {
        this['defaultSettings'] = defaultSettings;
    }
/**
     * Returns Configuration for AT&T delivery settings in JSON format
     * @return {String}
     */
    getAttSettings() {
        return this.attSettings;
    }

    /**
     * Sets Configuration for AT&T delivery settings in JSON format
     * @param {String} attSettings Configuration for AT&T delivery settings in JSON format
     */
    setAttSettings(attSettings) {
        this['attSettings'] = attSettings;
    }
/**
     * Returns Configuration for Office365 delivery settings in JSON format
     * @return {String}
     */
    getOffice365Settings() {
        return this.office365Settings;
    }

    /**
     * Sets Configuration for Office365 delivery settings in JSON format
     * @param {String} office365Settings Configuration for Office365 delivery settings in JSON format
     */
    setOffice365Settings(office365Settings) {
        this['office365Settings'] = office365Settings;
    }
/**
     * Returns Configuration for Google Workspace delivery settings in JSON format
     * @return {String}
     */
    getGoogleworkspaceSettings() {
        return this.googleworkspaceSettings;
    }

    /**
     * Sets Configuration for Google Workspace delivery settings in JSON format
     * @param {String} googleworkspaceSettings Configuration for Google Workspace delivery settings in JSON format
     */
    setGoogleworkspaceSettings(googleworkspaceSettings) {
        this['googleworkspaceSettings'] = googleworkspaceSettings;
    }
/**
     * Returns Configuration for Proofpoint delivery settings in JSON format
     * @return {String}
     */
    getProofpointSettings() {
        return this.proofpointSettings;
    }

    /**
     * Sets Configuration for Proofpoint delivery settings in JSON format
     * @param {String} proofpointSettings Configuration for Proofpoint delivery settings in JSON format
     */
    setProofpointSettings(proofpointSettings) {
        this['proofpointSettings'] = proofpointSettings;
    }
/**
     * Returns Configuration for Mimecast delivery settings in JSON format
     * @return {String}
     */
    getMimecastSettings() {
        return this.mimecastSettings;
    }

    /**
     * Sets Configuration for Mimecast delivery settings in JSON format
     * @param {String} mimecastSettings Configuration for Mimecast delivery settings in JSON format
     */
    setMimecastSettings(mimecastSettings) {
        this['mimecastSettings'] = mimecastSettings;
    }
/**
     * Returns Configuration for Barracuda delivery settings in JSON format
     * @return {String}
     */
    getBarracudaSettings() {
        return this.barracudaSettings;
    }

    /**
     * Sets Configuration for Barracuda delivery settings in JSON format
     * @param {String} barracudaSettings Configuration for Barracuda delivery settings in JSON format
     */
    setBarracudaSettings(barracudaSettings) {
        this['barracudaSettings'] = barracudaSettings;
    }
/**
     * Returns Configuration for Cisco IronPort delivery settings in JSON format
     * @return {String}
     */
    getCiscoironportSettings() {
        return this.ciscoironportSettings;
    }

    /**
     * Sets Configuration for Cisco IronPort delivery settings in JSON format
     * @param {String} ciscoironportSettings Configuration for Cisco IronPort delivery settings in JSON format
     */
    setCiscoironportSettings(ciscoironportSettings) {
        this['ciscoironportSettings'] = ciscoironportSettings;
    }
/**
     * Returns Configuration for Rackspace delivery settings in JSON format
     * @return {String}
     */
    getRackspaceSettings() {
        return this.rackspaceSettings;
    }

    /**
     * Sets Configuration for Rackspace delivery settings in JSON format
     * @param {String} rackspaceSettings Configuration for Rackspace delivery settings in JSON format
     */
    setRackspaceSettings(rackspaceSettings) {
        this['rackspaceSettings'] = rackspaceSettings;
    }
/**
     * Returns Configuration for Zoho Business delivery settings in JSON format
     * @return {String}
     */
    getZohobusinessSettings() {
        return this.zohobusinessSettings;
    }

    /**
     * Sets Configuration for Zoho Business delivery settings in JSON format
     * @param {String} zohobusinessSettings Configuration for Zoho Business delivery settings in JSON format
     */
    setZohobusinessSettings(zohobusinessSettings) {
        this['zohobusinessSettings'] = zohobusinessSettings;
    }
/**
     * Returns Configuration for Amazon WorkMail delivery settings in JSON format
     * @return {String}
     */
    getAmazonworkmailSettings() {
        return this.amazonworkmailSettings;
    }

    /**
     * Sets Configuration for Amazon WorkMail delivery settings in JSON format
     * @param {String} amazonworkmailSettings Configuration for Amazon WorkMail delivery settings in JSON format
     */
    setAmazonworkmailSettings(amazonworkmailSettings) {
        this['amazonworkmailSettings'] = amazonworkmailSettings;
    }
/**
     * Returns Configuration for Symantec delivery settings in JSON format
     * @return {String}
     */
    getSymantecSettings() {
        return this.symantecSettings;
    }

    /**
     * Sets Configuration for Symantec delivery settings in JSON format
     * @param {String} symantecSettings Configuration for Symantec delivery settings in JSON format
     */
    setSymantecSettings(symantecSettings) {
        this['symantecSettings'] = symantecSettings;
    }
/**
     * Returns Configuration for Fortinet delivery settings in JSON format
     * @return {String}
     */
    getFortinetSettings() {
        return this.fortinetSettings;
    }

    /**
     * Sets Configuration for Fortinet delivery settings in JSON format
     * @param {String} fortinetSettings Configuration for Fortinet delivery settings in JSON format
     */
    setFortinetSettings(fortinetSettings) {
        this['fortinetSettings'] = fortinetSettings;
    }
/**
     * Returns Configuration for Sophos delivery settings in JSON format
     * @return {String}
     */
    getSophosSettings() {
        return this.sophosSettings;
    }

    /**
     * Sets Configuration for Sophos delivery settings in JSON format
     * @param {String} sophosSettings Configuration for Sophos delivery settings in JSON format
     */
    setSophosSettings(sophosSettings) {
        this['sophosSettings'] = sophosSettings;
    }
/**
     * Returns Configuration for TrendMicro delivery settings in JSON format
     * @return {String}
     */
    getTrendmicroSettings() {
        return this.trendmicroSettings;
    }

    /**
     * Sets Configuration for TrendMicro delivery settings in JSON format
     * @param {String} trendmicroSettings Configuration for TrendMicro delivery settings in JSON format
     */
    setTrendmicroSettings(trendmicroSettings) {
        this['trendmicroSettings'] = trendmicroSettings;
    }
/**
     * Returns Configuration for CheckPoint delivery settings in JSON format
     * @return {String}
     */
    getCheckpointSettings() {
        return this.checkpointSettings;
    }

    /**
     * Sets Configuration for CheckPoint delivery settings in JSON format
     * @param {String} checkpointSettings Configuration for CheckPoint delivery settings in JSON format
     */
    setCheckpointSettings(checkpointSettings) {
        this['checkpointSettings'] = checkpointSettings;
    }
/**
     * Returns The timestamp (UNIX epoch) when the IP was created
     * @return {Number}
     */
    getCreated() {
        return this.created;
    }

    /**
     * Sets The timestamp (UNIX epoch) when the IP was created
     * @param {Number} created The timestamp (UNIX epoch) when the IP was created
     */
    setCreated(created) {
        this['created'] = created;
    }
/**
     * Returns Classification of the infrastructure
     * @return {String}
     */
    getInfraClassification() {
        return this.infraClassification;
    }

    /**
     * Sets Classification of the infrastructure
     * @param {String} infraClassification Classification of the infrastructure
     */
    setInfraClassification(infraClassification) {
        this['infraClassification'] = infraClassification;
    }
/**
     * Returns Indicates whether infrastructure monitoring is enabled
     * @return {Boolean}
     */
    getInfraMonitor() {
        return this.infraMonitor;
    }

    /**
     * Sets Indicates whether infrastructure monitoring is enabled
     * @param {Boolean} infraMonitor Indicates whether infrastructure monitoring is enabled
     */
    setInfraMonitor(infraMonitor) {
        this['infraMonitor'] = infraMonitor;
    }
/**
     * Returns The state of the IP
     * @return {Number}
     */
    getState() {
        return this.state;
    }

    /**
     * Sets The state of the IP
     * @param {Number} state The state of the IP
     */
    setState(state) {
        this['state'] = state;
    }
/**
     * Returns The auto-warmup plan associated with the IP. Can be null if no warmup plan is assigned.
     * @return {module:sendpost/model/AutoWarmupPlan}
     */
    getAutoWarmupPlan() {
        return this.autoWarmupPlan;
    }

    /**
     * Sets The auto-warmup plan associated with the IP. Can be null if no warmup plan is assigned.
     * @param {module:sendpost/model/AutoWarmupPlan} autoWarmupPlan The auto-warmup plan associated with the IP. Can be null if no warmup plan is assigned.
     */
    setAutoWarmupPlan(autoWarmupPlan) {
        this['autoWarmupPlan'] = autoWarmupPlan;
    }
/**
     * Returns Labels associated with the IP
     * @return {Array.<module:sendpost/model/Label>}
     */
    getLabels() {
        return this.labels;
    }

    /**
     * Sets Labels associated with the IP
     * @param {Array.<module:sendpost/model/Label>} labels Labels associated with the IP
     */
    setLabels(labels) {
        this['labels'] = labels;
    }

}

IP.RequiredProperties = ["id", "publicIP", "created"];

/**
 * Unique ID for the IP
 * @member {Number} id
 */
IP.prototype['id'] = undefined;

/**
 * The public IP address associated with the resource
 * @member {String} publicIP
 */
IP.prototype['publicIP'] = undefined;

/**
 * @member {module:sendpost/model/Domain} systemDomain
 */
IP.prototype['systemDomain'] = undefined;

/**
 * The reverse DNS hostname for the IP
 * @member {String} reverseDNSHostname
 */
IP.prototype['reverseDNSHostname'] = undefined;

/**
 * Type of the IP
 * @member {Number} type
 */
IP.prototype['type'] = undefined;

/**
 * Configuration for Gmail delivery settings in JSON format
 * @member {String} gmailSettings
 */
IP.prototype['gmailSettings'] = undefined;

/**
 * Configuration for Yahoo delivery settings in JSON format
 * @member {String} yahooSettings
 */
IP.prototype['yahooSettings'] = undefined;

/**
 * Configuration for AOL delivery settings in JSON format
 * @member {String} aolSettings
 */
IP.prototype['aolSettings'] = undefined;

/**
 * Configuration for Microsoft delivery settings in JSON format
 * @member {String} microsoftSettings
 */
IP.prototype['microsoftSettings'] = undefined;

/**
 * Configuration for Comcast delivery settings in JSON format
 * @member {String} comcastSettings
 */
IP.prototype['comcastSettings'] = undefined;

/**
 * Configuration for Yandex delivery settings in JSON format
 * @member {String} yandexSettings
 */
IP.prototype['yandexSettings'] = undefined;

/**
 * Configuration for GMX delivery settings in JSON format
 * @member {String} gmxSettings
 */
IP.prototype['gmxSettings'] = undefined;

/**
 * Configuration for Mail.ru delivery settings in JSON format
 * @member {String} mailruSettings
 */
IP.prototype['mailruSettings'] = undefined;

/**
 * Configuration for iCloud delivery settings in JSON format
 * @member {String} icloudSettings
 */
IP.prototype['icloudSettings'] = undefined;

/**
 * Configuration for Zoho delivery settings in JSON format
 * @member {String} zohoSettings
 */
IP.prototype['zohoSettings'] = undefined;

/**
 * Configuration for QQ delivery settings in JSON format
 * @member {String} qqSettings
 */
IP.prototype['qqSettings'] = undefined;

/**
 * Default delivery settings in JSON format
 * @member {String} defaultSettings
 */
IP.prototype['defaultSettings'] = undefined;

/**
 * Configuration for AT&T delivery settings in JSON format
 * @member {String} attSettings
 */
IP.prototype['attSettings'] = undefined;

/**
 * Configuration for Office365 delivery settings in JSON format
 * @member {String} office365Settings
 */
IP.prototype['office365Settings'] = undefined;

/**
 * Configuration for Google Workspace delivery settings in JSON format
 * @member {String} googleworkspaceSettings
 */
IP.prototype['googleworkspaceSettings'] = undefined;

/**
 * Configuration for Proofpoint delivery settings in JSON format
 * @member {String} proofpointSettings
 */
IP.prototype['proofpointSettings'] = undefined;

/**
 * Configuration for Mimecast delivery settings in JSON format
 * @member {String} mimecastSettings
 */
IP.prototype['mimecastSettings'] = undefined;

/**
 * Configuration for Barracuda delivery settings in JSON format
 * @member {String} barracudaSettings
 */
IP.prototype['barracudaSettings'] = undefined;

/**
 * Configuration for Cisco IronPort delivery settings in JSON format
 * @member {String} ciscoironportSettings
 */
IP.prototype['ciscoironportSettings'] = undefined;

/**
 * Configuration for Rackspace delivery settings in JSON format
 * @member {String} rackspaceSettings
 */
IP.prototype['rackspaceSettings'] = undefined;

/**
 * Configuration for Zoho Business delivery settings in JSON format
 * @member {String} zohobusinessSettings
 */
IP.prototype['zohobusinessSettings'] = undefined;

/**
 * Configuration for Amazon WorkMail delivery settings in JSON format
 * @member {String} amazonworkmailSettings
 */
IP.prototype['amazonworkmailSettings'] = undefined;

/**
 * Configuration for Symantec delivery settings in JSON format
 * @member {String} symantecSettings
 */
IP.prototype['symantecSettings'] = undefined;

/**
 * Configuration for Fortinet delivery settings in JSON format
 * @member {String} fortinetSettings
 */
IP.prototype['fortinetSettings'] = undefined;

/**
 * Configuration for Sophos delivery settings in JSON format
 * @member {String} sophosSettings
 */
IP.prototype['sophosSettings'] = undefined;

/**
 * Configuration for TrendMicro delivery settings in JSON format
 * @member {String} trendmicroSettings
 */
IP.prototype['trendmicroSettings'] = undefined;

/**
 * Configuration for CheckPoint delivery settings in JSON format
 * @member {String} checkpointSettings
 */
IP.prototype['checkpointSettings'] = undefined;

/**
 * The timestamp (UNIX epoch) when the IP was created
 * @member {Number} created
 */
IP.prototype['created'] = undefined;

/**
 * Classification of the infrastructure
 * @member {String} infraClassification
 */
IP.prototype['infraClassification'] = undefined;

/**
 * Indicates whether infrastructure monitoring is enabled
 * @member {Boolean} infraMonitor
 */
IP.prototype['infraMonitor'] = undefined;

/**
 * The state of the IP
 * @member {Number} state
 */
IP.prototype['state'] = undefined;

/**
 * The auto-warmup plan associated with the IP. Can be null if no warmup plan is assigned.
 * @member {module:sendpost/model/AutoWarmupPlan} autoWarmupPlan
 */
IP.prototype['autoWarmupPlan'] = undefined;

/**
 * Labels associated with the IP
 * @member {Array.<module:sendpost/model/Label>} labels
 */
IP.prototype['labels'] = undefined;






export default IP;

