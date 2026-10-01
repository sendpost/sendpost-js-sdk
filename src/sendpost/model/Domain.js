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
import DnsRecord from './DnsRecord';

/**
 * The Domain model module.
 * @module sendpost/model/Domain
 * @version 3.0.0
 */
class Domain {
    /**
     * Constructs a new <code>Domain</code>.
     * A sending domain configured for email delivery. Domains must be verified via DNS records before they can be used for sending. SendPost requires DKIM authentication and recommends configuring Return-Path, DMARC, and tracking records for optimal deliverability. 
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
            if (data.hasOwnProperty('dnsProvider')) {
                obj['dnsProvider'] = ApiClient.convertToType(data['dnsProvider'], 'String');
            }
            if (data.hasOwnProperty('dkim')) {
                obj['dkim'] = DnsRecord.constructFromObject(data['dkim']);
            }
            if (data.hasOwnProperty('returnPath')) {
                obj['returnPath'] = DnsRecord.constructFromObject(data['returnPath']);
            }
            if (data.hasOwnProperty('track')) {
                obj['track'] = DnsRecord.constructFromObject(data['track']);
            }
            if (data.hasOwnProperty('dmarc')) {
                obj['dmarc'] = DnsRecord.constructFromObject(data['dmarc']);
            }
            if (data.hasOwnProperty('dkimVerified')) {
                obj['dkimVerified'] = ApiClient.convertToType(data['dkimVerified'], 'Boolean');
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
                obj['domainRegisteredDate'] = ApiClient.convertToType(data['domainRegisteredDate'], 'Date');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Number');
            }
            if (data.hasOwnProperty('dkimFailureReason')) {
                obj['dkimFailureReason'] = ApiClient.convertToType(data['dkimFailureReason'], 'String');
            }
            if (data.hasOwnProperty('dmarcFailureReason')) {
                obj['dmarcFailureReason'] = ApiClient.convertToType(data['dmarcFailureReason'], 'String');
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
        // ensure the json data is a string
        if (data['dnsProvider'] && !(typeof data['dnsProvider'] === 'string' || data['dnsProvider'] instanceof String)) {
            throw new Error("Expected the field `dnsProvider` to be a primitive type in the JSON string but got " + data['dnsProvider']);
        }
        // validate the optional field `dkim`
        if (data['dkim']) { // data not null
          DnsRecord.validateJSON(data['dkim']);
        }
        // validate the optional field `returnPath`
        if (data['returnPath']) { // data not null
          DnsRecord.validateJSON(data['returnPath']);
        }
        // validate the optional field `track`
        if (data['track']) { // data not null
          DnsRecord.validateJSON(data['track']);
        }
        // validate the optional field `dmarc`
        if (data['dmarc']) { // data not null
          DnsRecord.validateJSON(data['dmarc']);
        }
        // ensure the json data is a string
        if (data['dkimFailureReason'] && !(typeof data['dkimFailureReason'] === 'string' || data['dkimFailureReason'] instanceof String)) {
            throw new Error("Expected the field `dkimFailureReason` to be a primitive type in the JSON string but got " + data['dkimFailureReason']);
        }
        // ensure the json data is a string
        if (data['dmarcFailureReason'] && !(typeof data['dmarcFailureReason'] === 'string' || data['dmarcFailureReason'] instanceof String)) {
            throw new Error("Expected the field `dmarcFailureReason` to be a primitive type in the JSON string but got " + data['dmarcFailureReason']);
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
     * Returns Unique identifier for the domain
     * @return {Number}
     */
    getId() {
        return this.id;
    }

    /**
     * Sets Unique identifier for the domain
     * @param {Number} id Unique identifier for the domain
     */
    setId(id) {
        this['id'] = id;
    }
/**
     * Returns The domain name (e.g., \"example.com\"). This is the domain portion of your sending email addresses. 
     * @return {String}
     */
    getName() {
        return this.name;
    }

    /**
     * Sets The domain name (e.g., \"example.com\"). This is the domain portion of your sending email addresses. 
     * @param {String} name The domain name (e.g., \"example.com\"). This is the domain portion of your sending email addresses. 
     */
    setName(name) {
        this['name'] = name;
    }
/**
     * Returns Auto-detected DNS provider for this domain (e.g. \"cloudflare\", \"other\"), used to tailor DNS-setup instructions. Read-only. 
     * @return {String}
     */
    getDnsProvider() {
        return this.dnsProvider;
    }

    /**
     * Sets Auto-detected DNS provider for this domain (e.g. \"cloudflare\", \"other\"), used to tailor DNS-setup instructions. Read-only. 
     * @param {String} dnsProvider Auto-detected DNS provider for this domain (e.g. \"cloudflare\", \"other\"), used to tailor DNS-setup instructions. Read-only. 
     */
    setDnsProvider(dnsProvider) {
        this['dnsProvider'] = dnsProvider;
    }
/**
     * Returns DKIM (DomainKeys Identified Mail) DNS record configuration. DKIM cryptographically signs your emails to verify they haven't been tampered with. This is REQUIRED for sending emails. 
     * @return {module:sendpost/model/DnsRecord}
     */
    getDkim() {
        return this.dkim;
    }

    /**
     * Sets DKIM (DomainKeys Identified Mail) DNS record configuration. DKIM cryptographically signs your emails to verify they haven't been tampered with. This is REQUIRED for sending emails. 
     * @param {module:sendpost/model/DnsRecord} dkim DKIM (DomainKeys Identified Mail) DNS record configuration. DKIM cryptographically signs your emails to verify they haven't been tampered with. This is REQUIRED for sending emails. 
     */
    setDkim(dkim) {
        this['dkim'] = dkim;
    }
/**
     * Returns Return-Path (bounce handling) DNS record configuration. Configuring this allows bounce notifications to be properly routed through SendPost. RECOMMENDED for better deliverability. 
     * @return {module:sendpost/model/DnsRecord}
     */
    getReturnPath() {
        return this.returnPath;
    }

    /**
     * Sets Return-Path (bounce handling) DNS record configuration. Configuring this allows bounce notifications to be properly routed through SendPost. RECOMMENDED for better deliverability. 
     * @param {module:sendpost/model/DnsRecord} returnPath Return-Path (bounce handling) DNS record configuration. Configuring this allows bounce notifications to be properly routed through SendPost. RECOMMENDED for better deliverability. 
     */
    setReturnPath(returnPath) {
        this['returnPath'] = returnPath;
    }
/**
     * Returns Tracking domain DNS record configuration. When configured, click tracking links use your domain instead of SendPost's domain. RECOMMENDED for brand consistency and improved click-through rates. 
     * @return {module:sendpost/model/DnsRecord}
     */
    getTrack() {
        return this.track;
    }

    /**
     * Sets Tracking domain DNS record configuration. When configured, click tracking links use your domain instead of SendPost's domain. RECOMMENDED for brand consistency and improved click-through rates. 
     * @param {module:sendpost/model/DnsRecord} track Tracking domain DNS record configuration. When configured, click tracking links use your domain instead of SendPost's domain. RECOMMENDED for brand consistency and improved click-through rates. 
     */
    setTrack(track) {
        this['track'] = track;
    }
/**
     * Returns DMARC (Domain-based Message Authentication, Reporting & Conformance) DNS record. DMARC builds on DKIM and SPF to provide email authentication and reporting. RECOMMENDED for enterprise senders. 
     * @return {module:sendpost/model/DnsRecord}
     */
    getDmarc() {
        return this.dmarc;
    }

    /**
     * Sets DMARC (Domain-based Message Authentication, Reporting & Conformance) DNS record. DMARC builds on DKIM and SPF to provide email authentication and reporting. RECOMMENDED for enterprise senders. 
     * @param {module:sendpost/model/DnsRecord} dmarc DMARC (Domain-based Message Authentication, Reporting & Conformance) DNS record. DMARC builds on DKIM and SPF to provide email authentication and reporting. RECOMMENDED for enterprise senders. 
     */
    setDmarc(dmarc) {
        this['dmarc'] = dmarc;
    }
/**
     * Returns Whether the DKIM DNS record has been verified successfully
     * @return {Boolean}
     */
    getDkimVerified() {
        return this.dkimVerified;
    }

    /**
     * Sets Whether the DKIM DNS record has been verified successfully
     * @param {Boolean} dkimVerified Whether the DKIM DNS record has been verified successfully
     */
    setDkimVerified(dkimVerified) {
        this['dkimVerified'] = dkimVerified;
    }
/**
     * Returns Whether the DMARC DNS record has been verified successfully
     * @return {Boolean}
     */
    getDmarcVerified() {
        return this.dmarcVerified;
    }

    /**
     * Sets Whether the DMARC DNS record has been verified successfully
     * @param {Boolean} dmarcVerified Whether the DMARC DNS record has been verified successfully
     */
    setDmarcVerified(dmarcVerified) {
        this['dmarcVerified'] = dmarcVerified;
    }
/**
     * Returns Whether the Return-Path DNS record has been verified successfully
     * @return {Boolean}
     */
    getReturnPathVerified() {
        return this.returnPathVerified;
    }

    /**
     * Sets Whether the Return-Path DNS record has been verified successfully
     * @param {Boolean} returnPathVerified Whether the Return-Path DNS record has been verified successfully
     */
    setReturnPathVerified(returnPathVerified) {
        this['returnPathVerified'] = returnPathVerified;
    }
/**
     * Returns Whether the tracking domain DNS record has been verified successfully
     * @return {Boolean}
     */
    getTrackVerified() {
        return this.trackVerified;
    }

    /**
     * Sets Whether the tracking domain DNS record has been verified successfully
     * @param {Boolean} trackVerified Whether the tracking domain DNS record has been verified successfully
     */
    setTrackVerified(trackVerified) {
        this['trackVerified'] = trackVerified;
    }
/**
     * Returns Overall verification status. True only if DKIM is verified (minimum requirement). For full verification, configure all DNS records. 
     * @return {Boolean}
     */
    getVerified() {
        return this.verified;
    }

    /**
     * Sets Overall verification status. True only if DKIM is verified (minimum requirement). For full verification, configure all DNS records. 
     * @param {Boolean} verified Overall verification status. True only if DKIM is verified (minimum requirement). For full verification, configure all DNS records. 
     */
    setVerified(verified) {
        this['verified'] = verified;
    }
/**
     * Returns Date when this domain was originally registered (from WHOIS). Newer domains may have lower sender reputation initially. 
     * @return {Date}
     */
    getDomainRegisteredDate() {
        return this.domainRegisteredDate;
    }

    /**
     * Sets Date when this domain was originally registered (from WHOIS). Newer domains may have lower sender reputation initially. 
     * @param {Date} domainRegisteredDate Date when this domain was originally registered (from WHOIS). Newer domains may have lower sender reputation initially. 
     */
    setDomainRegisteredDate(domainRegisteredDate) {
        this['domainRegisteredDate'] = domainRegisteredDate;
    }
/**
     * Returns UNIX epoch timestamp in nanoseconds when the domain was added to SendPost
     * @return {Number}
     */
    getCreated() {
        return this.created;
    }

    /**
     * Sets UNIX epoch timestamp in nanoseconds when the domain was added to SendPost
     * @param {Number} created UNIX epoch timestamp in nanoseconds when the domain was added to SendPost
     */
    setCreated(created) {
        this['created'] = created;
    }
/**
     * Returns Detailed reason if DKIM verification failed (empty if verified or not attempted)
     * @return {String}
     */
    getDkimFailureReason() {
        return this.dkimFailureReason;
    }

    /**
     * Sets Detailed reason if DKIM verification failed (empty if verified or not attempted)
     * @param {String} dkimFailureReason Detailed reason if DKIM verification failed (empty if verified or not attempted)
     */
    setDkimFailureReason(dkimFailureReason) {
        this['dkimFailureReason'] = dkimFailureReason;
    }
/**
     * Returns Detailed reason if DMARC verification failed
     * @return {String}
     */
    getDmarcFailureReason() {
        return this.dmarcFailureReason;
    }

    /**
     * Sets Detailed reason if DMARC verification failed
     * @param {String} dmarcFailureReason Detailed reason if DMARC verification failed
     */
    setDmarcFailureReason(dmarcFailureReason) {
        this['dmarcFailureReason'] = dmarcFailureReason;
    }
/**
     * Returns Detailed reason if tracking domain verification failed
     * @return {String}
     */
    getTrackFailureReason() {
        return this.trackFailureReason;
    }

    /**
     * Sets Detailed reason if tracking domain verification failed
     * @param {String} trackFailureReason Detailed reason if tracking domain verification failed
     */
    setTrackFailureReason(trackFailureReason) {
        this['trackFailureReason'] = trackFailureReason;
    }
/**
     * Returns Detailed reason if Return-Path verification failed
     * @return {String}
     */
    getReturnPathFailureReason() {
        return this.returnPathFailureReason;
    }

    /**
     * Sets Detailed reason if Return-Path verification failed
     * @param {String} returnPathFailureReason Detailed reason if Return-Path verification failed
     */
    setReturnPathFailureReason(returnPathFailureReason) {
        this['returnPathFailureReason'] = returnPathFailureReason;
    }

}



/**
 * Unique identifier for the domain
 * @member {Number} id
 */
Domain.prototype['id'] = undefined;

/**
 * The domain name (e.g., \"example.com\"). This is the domain portion of your sending email addresses. 
 * @member {String} name
 */
Domain.prototype['name'] = undefined;

/**
 * Auto-detected DNS provider for this domain (e.g. \"cloudflare\", \"other\"), used to tailor DNS-setup instructions. Read-only. 
 * @member {String} dnsProvider
 */
Domain.prototype['dnsProvider'] = undefined;

/**
 * DKIM (DomainKeys Identified Mail) DNS record configuration. DKIM cryptographically signs your emails to verify they haven't been tampered with. This is REQUIRED for sending emails. 
 * @member {module:sendpost/model/DnsRecord} dkim
 */
Domain.prototype['dkim'] = undefined;

/**
 * Return-Path (bounce handling) DNS record configuration. Configuring this allows bounce notifications to be properly routed through SendPost. RECOMMENDED for better deliverability. 
 * @member {module:sendpost/model/DnsRecord} returnPath
 */
Domain.prototype['returnPath'] = undefined;

/**
 * Tracking domain DNS record configuration. When configured, click tracking links use your domain instead of SendPost's domain. RECOMMENDED for brand consistency and improved click-through rates. 
 * @member {module:sendpost/model/DnsRecord} track
 */
Domain.prototype['track'] = undefined;

/**
 * DMARC (Domain-based Message Authentication, Reporting & Conformance) DNS record. DMARC builds on DKIM and SPF to provide email authentication and reporting. RECOMMENDED for enterprise senders. 
 * @member {module:sendpost/model/DnsRecord} dmarc
 */
Domain.prototype['dmarc'] = undefined;

/**
 * Whether the DKIM DNS record has been verified successfully
 * @member {Boolean} dkimVerified
 */
Domain.prototype['dkimVerified'] = undefined;

/**
 * Whether the DMARC DNS record has been verified successfully
 * @member {Boolean} dmarcVerified
 */
Domain.prototype['dmarcVerified'] = undefined;

/**
 * Whether the Return-Path DNS record has been verified successfully
 * @member {Boolean} returnPathVerified
 */
Domain.prototype['returnPathVerified'] = undefined;

/**
 * Whether the tracking domain DNS record has been verified successfully
 * @member {Boolean} trackVerified
 */
Domain.prototype['trackVerified'] = undefined;

/**
 * Overall verification status. True only if DKIM is verified (minimum requirement). For full verification, configure all DNS records. 
 * @member {Boolean} verified
 */
Domain.prototype['verified'] = undefined;

/**
 * Date when this domain was originally registered (from WHOIS). Newer domains may have lower sender reputation initially. 
 * @member {Date} domainRegisteredDate
 */
Domain.prototype['domainRegisteredDate'] = undefined;

/**
 * UNIX epoch timestamp in nanoseconds when the domain was added to SendPost
 * @member {Number} created
 */
Domain.prototype['created'] = undefined;

/**
 * Detailed reason if DKIM verification failed (empty if verified or not attempted)
 * @member {String} dkimFailureReason
 */
Domain.prototype['dkimFailureReason'] = undefined;

/**
 * Detailed reason if DMARC verification failed
 * @member {String} dmarcFailureReason
 */
Domain.prototype['dmarcFailureReason'] = undefined;

/**
 * Detailed reason if tracking domain verification failed
 * @member {String} trackFailureReason
 */
Domain.prototype['trackFailureReason'] = undefined;

/**
 * Detailed reason if Return-Path verification failed
 * @member {String} returnPathFailureReason
 */
Domain.prototype['returnPathFailureReason'] = undefined;






export default Domain;

