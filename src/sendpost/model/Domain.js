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
import DomainDkim from './DomainDkim';
import DomainDmarc from './DomainDmarc';
import DomainGpt from './DomainGpt';
import DomainReturnPath from './DomainReturnPath';
import DomainSpf from './DomainSpf';
import DomainTrack from './DomainTrack';

/**
 * The Domain model module.
 * @module sendpost/model/Domain
 * @version 2.0.1
 */
class Domain {
    /**
     * Constructs a new <code>Domain</code>.
     * @alias module:sendpost/model/Domain
     */
    constructor() { 
        
        Domain.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Domain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/Domain} obj Optional instance to populate.
     * @return {module:sendpost/model/Domain} The populated <code>Domain</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Domain();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('dkim')) {
                obj['dkim'] = DomainDkim.constructFromObject(data['dkim']);
            }
            if (data.hasOwnProperty('spf')) {
                obj['spf'] = DomainSpf.constructFromObject(data['spf']);
            }
            if (data.hasOwnProperty('returnPath')) {
                obj['returnPath'] = DomainReturnPath.constructFromObject(data['returnPath']);
            }
            if (data.hasOwnProperty('track')) {
                obj['track'] = DomainTrack.constructFromObject(data['track']);
            }
            if (data.hasOwnProperty('dmarc')) {
                obj['dmarc'] = DomainDmarc.constructFromObject(data['dmarc']);
            }
            if (data.hasOwnProperty('dkimConfig')) {
                obj['dkimConfig'] = ApiClient.convertToType(data['dkimConfig'], 'String');
            }
            if (data.hasOwnProperty('dkimVerified')) {
                obj['dkimVerified'] = ApiClient.convertToType(data['dkimVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('spfVerified')) {
                obj['spfVerified'] = ApiClient.convertToType(data['spfVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('mailboxVerified')) {
                obj['mailboxVerified'] = ApiClient.convertToType(data['mailboxVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('dmarcVerified')) {
                obj['dmarcVerified'] = ApiClient.convertToType(data['dmarcVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('returnPathVerified')) {
                obj['returnPathVerified'] = ApiClient.convertToType(data['returnPathVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('trackVerified')) {
                obj['trackVerified'] = ApiClient.convertToType(data['trackVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('verified')) {
                obj['verified'] = ApiClient.convertToType(data['verified'], 'Boolean');
            }
            if (data.hasOwnProperty('domainRegisteredDate')) {
                obj['domainRegisteredDate'] = ApiClient.convertToType(data['domainRegisteredDate'], 'String');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Number');
            }
            if (data.hasOwnProperty('gptVerified')) {
                obj['gptVerified'] = ApiClient.convertToType(data['gptVerified'], 'Boolean');
            }
            if (data.hasOwnProperty('gpt')) {
                obj['gpt'] = DomainGpt.constructFromObject(data['gpt']);
            }
            if (data.hasOwnProperty('dmarcFailureReason')) {
                obj['dmarcFailureReason'] = ApiClient.convertToType(data['dmarcFailureReason'], 'String');
            }
            if (data.hasOwnProperty('dkimFailureReason')) {
                obj['dkimFailureReason'] = ApiClient.convertToType(data['dkimFailureReason'], 'String');
            }
            if (data.hasOwnProperty('trackFailureReason')) {
                obj['trackFailureReason'] = ApiClient.convertToType(data['trackFailureReason'], 'String');
            }
            if (data.hasOwnProperty('returnPathFailureReason')) {
                obj['returnPathFailureReason'] = ApiClient.convertToType(data['returnPathFailureReason'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Domain</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Domain</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // validate the optional field `dkim`
        if (data['dkim']) { // data not null
          DomainDkim.validateJSON(data['dkim']);
        }
        // validate the optional field `spf`
        if (data['spf']) { // data not null
          DomainSpf.validateJSON(data['spf']);
        }
        // validate the optional field `returnPath`
        if (data['returnPath']) { // data not null
          DomainReturnPath.validateJSON(data['returnPath']);
        }
        // validate the optional field `track`
        if (data['track']) { // data not null
          DomainTrack.validateJSON(data['track']);
        }
        // validate the optional field `dmarc`
        if (data['dmarc']) { // data not null
          DomainDmarc.validateJSON(data['dmarc']);
        }
        // ensure the json data is a string
        if (data['dkimConfig'] && !(typeof data['dkimConfig'] === 'string' || data['dkimConfig'] instanceof String)) {
            throw new Error("Expected the field `dkimConfig` to be a primitive type in the JSON string but got " + data['dkimConfig']);
        }
        // ensure the json data is a string
        if (data['domainRegisteredDate'] && !(typeof data['domainRegisteredDate'] === 'string' || data['domainRegisteredDate'] instanceof String)) {
            throw new Error("Expected the field `domainRegisteredDate` to be a primitive type in the JSON string but got " + data['domainRegisteredDate']);
        }
        // validate the optional field `gpt`
        if (data['gpt']) { // data not null
          DomainGpt.validateJSON(data['gpt']);
        }
        // ensure the json data is a string
        if (data['dmarcFailureReason'] && !(typeof data['dmarcFailureReason'] === 'string' || data['dmarcFailureReason'] instanceof String)) {
            throw new Error("Expected the field `dmarcFailureReason` to be a primitive type in the JSON string but got " + data['dmarcFailureReason']);
        }
        // ensure the json data is a string
        if (data['dkimFailureReason'] && !(typeof data['dkimFailureReason'] === 'string' || data['dkimFailureReason'] instanceof String)) {
            throw new Error("Expected the field `dkimFailureReason` to be a primitive type in the JSON string but got " + data['dkimFailureReason']);
        }
        // ensure the json data is a string
        if (data['trackFailureReason'] && !(typeof data['trackFailureReason'] === 'string' || data['trackFailureReason'] instanceof String)) {
            throw new Error("Expected the field `trackFailureReason` to be a primitive type in the JSON string but got " + data['trackFailureReason']);
        }
        // ensure the json data is a string
        if (data['returnPathFailureReason'] && !(typeof data['returnPathFailureReason'] === 'string' || data['returnPathFailureReason'] instanceof String)) {
            throw new Error("Expected the field `returnPathFailureReason` to be a primitive type in the JSON string but got " + data['returnPathFailureReason']);
        }

        return true;
    }

/**
     * Returns Unique ID for the domain.
     * @return {Number}
     */
    getId() {
        return this.id;
    }

    /**
     * Sets Unique ID for the domain.
     * @param {Number} id Unique ID for the domain.
     */
    setId(id) {
        this['id'] = id;
    }
/**
     * Returns Name of the domain.
     * @return {String}
     */
    getName() {
        return this.name;
    }

    /**
     * Sets Name of the domain.
     * @param {String} name Name of the domain.
     */
    setName(name) {
        this['name'] = name;
    }
/**
     * @return {module:sendpost/model/DomainDkim}
     */
    getDkim() {
        return this.dkim;
    }

    /**
     * @param {module:sendpost/model/DomainDkim} dkim
     */
    setDkim(dkim) {
        this['dkim'] = dkim;
    }
/**
     * @return {module:sendpost/model/DomainSpf}
     */
    getSpf() {
        return this.spf;
    }

    /**
     * @param {module:sendpost/model/DomainSpf} spf
     */
    setSpf(spf) {
        this['spf'] = spf;
    }
/**
     * @return {module:sendpost/model/DomainReturnPath}
     */
    getReturnPath() {
        return this.returnPath;
    }

    /**
     * @param {module:sendpost/model/DomainReturnPath} returnPath
     */
    setReturnPath(returnPath) {
        this['returnPath'] = returnPath;
    }
/**
     * @return {module:sendpost/model/DomainTrack}
     */
    getTrack() {
        return this.track;
    }

    /**
     * @param {module:sendpost/model/DomainTrack} track
     */
    setTrack(track) {
        this['track'] = track;
    }
/**
     * @return {module:sendpost/model/DomainDmarc}
     */
    getDmarc() {
        return this.dmarc;
    }

    /**
     * @param {module:sendpost/model/DomainDmarc} dmarc
     */
    setDmarc(dmarc) {
        this['dmarc'] = dmarc;
    }
/**
     * Returns DKIM configuration
     * @return {String}
     */
    getDkimConfig() {
        return this.dkimConfig;
    }

    /**
     * Sets DKIM configuration
     * @param {String} dkimConfig DKIM configuration
     */
    setDkimConfig(dkimConfig) {
        this['dkimConfig'] = dkimConfig;
    }
/**
     * Returns Status of DKIM verification ( true or false )
     * @return {Boolean}
     */
    getDkimVerified() {
        return this.dkimVerified;
    }

    /**
     * Sets Status of DKIM verification ( true or false )
     * @param {Boolean} dkimVerified Status of DKIM verification ( true or false )
     */
    setDkimVerified(dkimVerified) {
        this['dkimVerified'] = dkimVerified;
    }
/**
     * Returns Status of SPF verification ( true or false )
     * @return {Boolean}
     */
    getSpfVerified() {
        return this.spfVerified;
    }

    /**
     * Sets Status of SPF verification ( true or false )
     * @param {Boolean} spfVerified Status of SPF verification ( true or false )
     */
    setSpfVerified(spfVerified) {
        this['spfVerified'] = spfVerified;
    }
/**
     * Returns Status of Mailbox verification ( true or false )
     * @return {Boolean}
     */
    getMailboxVerified() {
        return this.mailboxVerified;
    }

    /**
     * Sets Status of Mailbox verification ( true or false )
     * @param {Boolean} mailboxVerified Status of Mailbox verification ( true or false )
     */
    setMailboxVerified(mailboxVerified) {
        this['mailboxVerified'] = mailboxVerified;
    }
/**
     * Returns Status of DMARC verification ( true or false)
     * @return {Boolean}
     */
    getDmarcVerified() {
        return this.dmarcVerified;
    }

    /**
     * Sets Status of DMARC verification ( true or false)
     * @param {Boolean} dmarcVerified Status of DMARC verification ( true or false)
     */
    setDmarcVerified(dmarcVerified) {
        this['dmarcVerified'] = dmarcVerified;
    }
/**
     * Returns Status of ReturnPath verification ( true or false )
     * @return {Boolean}
     */
    getReturnPathVerified() {
        return this.returnPathVerified;
    }

    /**
     * Sets Status of ReturnPath verification ( true or false )
     * @param {Boolean} returnPathVerified Status of ReturnPath verification ( true or false )
     */
    setReturnPathVerified(returnPathVerified) {
        this['returnPathVerified'] = returnPathVerified;
    }
/**
     * Returns Status of Track verification ( true or false )
     * @return {Boolean}
     */
    getTrackVerified() {
        return this.trackVerified;
    }

    /**
     * Sets Status of Track verification ( true or false )
     * @param {Boolean} trackVerified Status of Track verification ( true or false )
     */
    setTrackVerified(trackVerified) {
        this['trackVerified'] = trackVerified;
    }
/**
     * Returns Overall verification status of the domain
     * @return {Boolean}
     */
    getVerified() {
        return this.verified;
    }

    /**
     * Sets Overall verification status of the domain
     * @param {Boolean} verified Overall verification status of the domain
     */
    setVerified(verified) {
        this['verified'] = verified;
    }
/**
     * Returns Date when the domain was registered
     * @return {String}
     */
    getDomainRegisteredDate() {
        return this.domainRegisteredDate;
    }

    /**
     * Sets Date when the domain was registered
     * @param {String} domainRegisteredDate Date when the domain was registered
     */
    setDomainRegisteredDate(domainRegisteredDate) {
        this['domainRegisteredDate'] = domainRegisteredDate;
    }
/**
     * Returns UNIX epoch timestamp in nanoseconds.
     * @return {Number}
     */
    getCreated() {
        return this.created;
    }

    /**
     * Sets UNIX epoch timestamp in nanoseconds.
     * @param {Number} created UNIX epoch timestamp in nanoseconds.
     */
    setCreated(created) {
        this['created'] = created;
    }
/**
     * Returns Status of GPT verification ( true or false )
     * @return {Boolean}
     */
    getGptVerified() {
        return this.gptVerified;
    }

    /**
     * Sets Status of GPT verification ( true or false )
     * @param {Boolean} gptVerified Status of GPT verification ( true or false )
     */
    setGptVerified(gptVerified) {
        this['gptVerified'] = gptVerified;
    }
/**
     * @return {module:sendpost/model/DomainGpt}
     */
    getGpt() {
        return this.gpt;
    }

    /**
     * @param {module:sendpost/model/DomainGpt} gpt
     */
    setGpt(gpt) {
        this['gpt'] = gpt;
    }
/**
     * Returns Reason for DMARC verification failure
     * @return {String}
     */
    getDmarcFailureReason() {
        return this.dmarcFailureReason;
    }

    /**
     * Sets Reason for DMARC verification failure
     * @param {String} dmarcFailureReason Reason for DMARC verification failure
     */
    setDmarcFailureReason(dmarcFailureReason) {
        this['dmarcFailureReason'] = dmarcFailureReason;
    }
/**
     * Returns Reason for DKIM verification failure
     * @return {String}
     */
    getDkimFailureReason() {
        return this.dkimFailureReason;
    }

    /**
     * Sets Reason for DKIM verification failure
     * @param {String} dkimFailureReason Reason for DKIM verification failure
     */
    setDkimFailureReason(dkimFailureReason) {
        this['dkimFailureReason'] = dkimFailureReason;
    }
/**
     * Returns Reason for Track verification failure
     * @return {String}
     */
    getTrackFailureReason() {
        return this.trackFailureReason;
    }

    /**
     * Sets Reason for Track verification failure
     * @param {String} trackFailureReason Reason for Track verification failure
     */
    setTrackFailureReason(trackFailureReason) {
        this['trackFailureReason'] = trackFailureReason;
    }
/**
     * Returns Reason for ReturnPath verification failure
     * @return {String}
     */
    getReturnPathFailureReason() {
        return this.returnPathFailureReason;
    }

    /**
     * Sets Reason for ReturnPath verification failure
     * @param {String} returnPathFailureReason Reason for ReturnPath verification failure
     */
    setReturnPathFailureReason(returnPathFailureReason) {
        this['returnPathFailureReason'] = returnPathFailureReason;
    }

}



/**
 * Unique ID for the domain.
 * @member {Number} id
 */
Domain.prototype['id'] = undefined;

/**
 * Name of the domain.
 * @member {String} name
 */
Domain.prototype['name'] = undefined;

/**
 * @member {module:sendpost/model/DomainDkim} dkim
 */
Domain.prototype['dkim'] = undefined;

/**
 * @member {module:sendpost/model/DomainSpf} spf
 */
Domain.prototype['spf'] = undefined;

/**
 * @member {module:sendpost/model/DomainReturnPath} returnPath
 */
Domain.prototype['returnPath'] = undefined;

/**
 * @member {module:sendpost/model/DomainTrack} track
 */
Domain.prototype['track'] = undefined;

/**
 * @member {module:sendpost/model/DomainDmarc} dmarc
 */
Domain.prototype['dmarc'] = undefined;

/**
 * DKIM configuration
 * @member {String} dkimConfig
 */
Domain.prototype['dkimConfig'] = undefined;

/**
 * Status of DKIM verification ( true or false )
 * @member {Boolean} dkimVerified
 */
Domain.prototype['dkimVerified'] = undefined;

/**
 * Status of SPF verification ( true or false )
 * @member {Boolean} spfVerified
 */
Domain.prototype['spfVerified'] = undefined;

/**
 * Status of Mailbox verification ( true or false )
 * @member {Boolean} mailboxVerified
 */
Domain.prototype['mailboxVerified'] = undefined;

/**
 * Status of DMARC verification ( true or false)
 * @member {Boolean} dmarcVerified
 */
Domain.prototype['dmarcVerified'] = undefined;

/**
 * Status of ReturnPath verification ( true or false )
 * @member {Boolean} returnPathVerified
 */
Domain.prototype['returnPathVerified'] = undefined;

/**
 * Status of Track verification ( true or false )
 * @member {Boolean} trackVerified
 */
Domain.prototype['trackVerified'] = undefined;

/**
 * Overall verification status of the domain
 * @member {Boolean} verified
 */
Domain.prototype['verified'] = undefined;

/**
 * Date when the domain was registered
 * @member {String} domainRegisteredDate
 */
Domain.prototype['domainRegisteredDate'] = undefined;

/**
 * UNIX epoch timestamp in nanoseconds.
 * @member {Number} created
 */
Domain.prototype['created'] = undefined;

/**
 * Status of GPT verification ( true or false )
 * @member {Boolean} gptVerified
 */
Domain.prototype['gptVerified'] = undefined;

/**
 * @member {module:sendpost/model/DomainGpt} gpt
 */
Domain.prototype['gpt'] = undefined;

/**
 * Reason for DMARC verification failure
 * @member {String} dmarcFailureReason
 */
Domain.prototype['dmarcFailureReason'] = undefined;

/**
 * Reason for DKIM verification failure
 * @member {String} dkimFailureReason
 */
Domain.prototype['dkimFailureReason'] = undefined;

/**
 * Reason for Track verification failure
 * @member {String} trackFailureReason
 */
Domain.prototype['trackFailureReason'] = undefined;

/**
 * Reason for ReturnPath verification failure
 * @member {String} returnPathFailureReason
 */
Domain.prototype['returnPathFailureReason'] = undefined;






export default Domain;

