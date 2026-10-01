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
import NewWebhook from './NewWebhook';

/**
 * The UpdateWebhook model module.
 * @module sendpost/model/UpdateWebhook
 * @version 3.0.0
 */
class UpdateWebhook {
    /**
     * Constructs a new <code>UpdateWebhook</code>.
     * Request body for updating an existing webhook. All fields are optional - only include fields you want to change. 
     * @alias module:sendpost/model/UpdateWebhook
     * @implements module:sendpost/model/NewWebhook
     * @param url {String} HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency) 
     */
    constructor(url) { 
        NewWebhook.initialize(this, url);
        UpdateWebhook.initialize(this, url);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, url) { 
        obj['enabled'] = true;
        obj['url'] = url;
        obj['processed'] = false;
        obj['sent'] = false;
        obj['delivered'] = true;
        obj['dropped'] = true;
        obj['smtpDropped'] = false;
        obj['softBounced'] = true;
        obj['hardBounced'] = true;
        obj['opened'] = true;
        obj['clicked'] = true;
        obj['unsubscribed'] = true;
        obj['spam'] = true;
        obj['uniqueOpen'] = false;
        obj['uniqueClick'] = false;
    }

    /**
     * Constructs a <code>UpdateWebhook</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/UpdateWebhook} obj Optional instance to populate.
     * @return {module:sendpost/model/UpdateWebhook} The populated <code>UpdateWebhook</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UpdateWebhook();
            NewWebhook.constructFromObject(data, obj);

            if (data.hasOwnProperty('enabled')) {
                obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('url')) {
                obj['url'] = ApiClient.convertToType(data['url'], 'String');
            }
            if (data.hasOwnProperty('processed')) {
                obj['processed'] = ApiClient.convertToType(data['processed'], 'Boolean');
            }
            if (data.hasOwnProperty('sent')) {
                obj['sent'] = ApiClient.convertToType(data['sent'], 'Boolean');
            }
            if (data.hasOwnProperty('delivered')) {
                obj['delivered'] = ApiClient.convertToType(data['delivered'], 'Boolean');
            }
            if (data.hasOwnProperty('dropped')) {
                obj['dropped'] = ApiClient.convertToType(data['dropped'], 'Boolean');
            }
            if (data.hasOwnProperty('smtpDropped')) {
                obj['smtpDropped'] = ApiClient.convertToType(data['smtpDropped'], 'Boolean');
            }
            if (data.hasOwnProperty('softBounced')) {
                obj['softBounced'] = ApiClient.convertToType(data['softBounced'], 'Boolean');
            }
            if (data.hasOwnProperty('hardBounced')) {
                obj['hardBounced'] = ApiClient.convertToType(data['hardBounced'], 'Boolean');
            }
            if (data.hasOwnProperty('opened')) {
                obj['opened'] = ApiClient.convertToType(data['opened'], 'Boolean');
            }
            if (data.hasOwnProperty('clicked')) {
                obj['clicked'] = ApiClient.convertToType(data['clicked'], 'Boolean');
            }
            if (data.hasOwnProperty('unsubscribed')) {
                obj['unsubscribed'] = ApiClient.convertToType(data['unsubscribed'], 'Boolean');
            }
            if (data.hasOwnProperty('spam')) {
                obj['spam'] = ApiClient.convertToType(data['spam'], 'Boolean');
            }
            if (data.hasOwnProperty('uniqueOpen')) {
                obj['uniqueOpen'] = ApiClient.convertToType(data['uniqueOpen'], 'Boolean');
            }
            if (data.hasOwnProperty('uniqueClick')) {
                obj['uniqueClick'] = ApiClient.convertToType(data['uniqueClick'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UpdateWebhook</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UpdateWebhook</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of UpdateWebhook.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['url'] && !(typeof data['url'] === 'string' || data['url'] instanceof String)) {
            throw new Error("Expected the field `url` to be a primitive type in the JSON string but got " + data['url']);
        }

        return true;
    }

/**
     * Returns Whether the webhook is active immediately after creation. Set to false to configure and test before activating. 
     * @return {Boolean}
     */
    getEnabled() {
        return this.enabled;
    }

    /**
     * Sets Whether the webhook is active immediately after creation. Set to false to configure and test before activating. 
     * @param {Boolean} enabled Whether the webhook is active immediately after creation. Set to false to configure and test before activating. 
     */
    setEnabled(enabled) {
        this['enabled'] = enabled;
    }
/**
     * Returns HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency) 
     * @return {String}
     */
    getUrl() {
        return this.url;
    }

    /**
     * Sets HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency) 
     * @param {String} url HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency) 
     */
    setUrl(url) {
        this['url'] = url;
    }
/**
     * Returns Fire when email is accepted by SendPost API
     * @return {Boolean}
     */
    getProcessed() {
        return this.processed;
    }

    /**
     * Sets Fire when email is accepted by SendPost API
     * @param {Boolean} processed Fire when email is accepted by SendPost API
     */
    setProcessed(processed) {
        this['processed'] = processed;
    }
/**
     * Returns Fire when email is sent to recipient's mail server
     * @return {Boolean}
     */
    getSent() {
        return this.sent;
    }

    /**
     * Sets Fire when email is sent to recipient's mail server
     * @param {Boolean} sent Fire when email is sent to recipient's mail server
     */
    setSent(sent) {
        this['sent'] = sent;
    }
/**
     * Returns Fire when email is accepted by recipient's mail server
     * @return {Boolean}
     */
    getDelivered() {
        return this.delivered;
    }

    /**
     * Sets Fire when email is accepted by recipient's mail server
     * @param {Boolean} delivered Fire when email is accepted by recipient's mail server
     */
    setDelivered(delivered) {
        this['delivered'] = delivered;
    }
/**
     * Returns Fire when email is not sent (suppression, invalid, etc.)
     * @return {Boolean}
     */
    getDropped() {
        return this.dropped;
    }

    /**
     * Sets Fire when email is not sent (suppression, invalid, etc.)
     * @param {Boolean} dropped Fire when email is not sent (suppression, invalid, etc.)
     */
    setDropped(dropped) {
        this['dropped'] = dropped;
    }
/**
     * Returns Fire when email is rejected at SMTP level
     * @return {Boolean}
     */
    getSmtpDropped() {
        return this.smtpDropped;
    }

    /**
     * Sets Fire when email is rejected at SMTP level
     * @param {Boolean} smtpDropped Fire when email is rejected at SMTP level
     */
    setSmtpDropped(smtpDropped) {
        this['smtpDropped'] = smtpDropped;
    }
/**
     * Returns Fire on temporary delivery failure (will retry)
     * @return {Boolean}
     */
    getSoftBounced() {
        return this.softBounced;
    }

    /**
     * Sets Fire on temporary delivery failure (will retry)
     * @param {Boolean} softBounced Fire on temporary delivery failure (will retry)
     */
    setSoftBounced(softBounced) {
        this['softBounced'] = softBounced;
    }
/**
     * Returns Fire on permanent delivery failure
     * @return {Boolean}
     */
    getHardBounced() {
        return this.hardBounced;
    }

    /**
     * Sets Fire on permanent delivery failure
     * @param {Boolean} hardBounced Fire on permanent delivery failure
     */
    setHardBounced(hardBounced) {
        this['hardBounced'] = hardBounced;
    }
/**
     * Returns Fire when email is opened. Fires on EVERY open. Consider using `uniqueOpen` instead to reduce volume. 
     * @return {Boolean}
     */
    getOpened() {
        return this.opened;
    }

    /**
     * Sets Fire when email is opened. Fires on EVERY open. Consider using `uniqueOpen` instead to reduce volume. 
     * @param {Boolean} opened Fire when email is opened. Fires on EVERY open. Consider using `uniqueOpen` instead to reduce volume. 
     */
    setOpened(opened) {
        this['opened'] = opened;
    }
/**
     * Returns Fire when a link is clicked. Fires on EVERY click. Consider using `uniqueClick` instead to reduce volume. 
     * @return {Boolean}
     */
    getClicked() {
        return this.clicked;
    }

    /**
     * Sets Fire when a link is clicked. Fires on EVERY click. Consider using `uniqueClick` instead to reduce volume. 
     * @param {Boolean} clicked Fire when a link is clicked. Fires on EVERY click. Consider using `uniqueClick` instead to reduce volume. 
     */
    setClicked(clicked) {
        this['clicked'] = clicked;
    }
/**
     * Returns Fire when recipient clicks unsubscribe link
     * @return {Boolean}
     */
    getUnsubscribed() {
        return this.unsubscribed;
    }

    /**
     * Sets Fire when recipient clicks unsubscribe link
     * @param {Boolean} unsubscribed Fire when recipient clicks unsubscribe link
     */
    setUnsubscribed(unsubscribed) {
        this['unsubscribed'] = unsubscribed;
    }
/**
     * Returns Fire when recipient marks email as spam
     * @return {Boolean}
     */
    getSpam() {
        return this.spam;
    }

    /**
     * Sets Fire when recipient marks email as spam
     * @param {Boolean} spam Fire when recipient marks email as spam
     */
    setSpam(spam) {
        this['spam'] = spam;
    }
/**
     * Returns Fire only on FIRST open of each email (unique opens). More efficient than `opened` if you only need engagement metrics. 
     * @return {Boolean}
     */
    getUniqueOpen() {
        return this.uniqueOpen;
    }

    /**
     * Sets Fire only on FIRST open of each email (unique opens). More efficient than `opened` if you only need engagement metrics. 
     * @param {Boolean} uniqueOpen Fire only on FIRST open of each email (unique opens). More efficient than `opened` if you only need engagement metrics. 
     */
    setUniqueOpen(uniqueOpen) {
        this['uniqueOpen'] = uniqueOpen;
    }
/**
     * Returns Fire only on FIRST click of each email (unique clicks). More efficient than `clicked` if you only need engagement metrics. 
     * @return {Boolean}
     */
    getUniqueClick() {
        return this.uniqueClick;
    }

    /**
     * Sets Fire only on FIRST click of each email (unique clicks). More efficient than `clicked` if you only need engagement metrics. 
     * @param {Boolean} uniqueClick Fire only on FIRST click of each email (unique clicks). More efficient than `clicked` if you only need engagement metrics. 
     */
    setUniqueClick(uniqueClick) {
        this['uniqueClick'] = uniqueClick;
    }

}

UpdateWebhook.RequiredProperties = ["url"];

/**
 * Whether the webhook is active immediately after creation. Set to false to configure and test before activating. 
 * @member {Boolean} enabled
 * @default true
 */
UpdateWebhook.prototype['enabled'] = true;

/**
 * HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency) 
 * @member {String} url
 */
UpdateWebhook.prototype['url'] = undefined;

/**
 * Fire when email is accepted by SendPost API
 * @member {Boolean} processed
 * @default false
 */
UpdateWebhook.prototype['processed'] = false;

/**
 * Fire when email is sent to recipient's mail server
 * @member {Boolean} sent
 * @default false
 */
UpdateWebhook.prototype['sent'] = false;

/**
 * Fire when email is accepted by recipient's mail server
 * @member {Boolean} delivered
 * @default true
 */
UpdateWebhook.prototype['delivered'] = true;

/**
 * Fire when email is not sent (suppression, invalid, etc.)
 * @member {Boolean} dropped
 * @default true
 */
UpdateWebhook.prototype['dropped'] = true;

/**
 * Fire when email is rejected at SMTP level
 * @member {Boolean} smtpDropped
 * @default false
 */
UpdateWebhook.prototype['smtpDropped'] = false;

/**
 * Fire on temporary delivery failure (will retry)
 * @member {Boolean} softBounced
 * @default true
 */
UpdateWebhook.prototype['softBounced'] = true;

/**
 * Fire on permanent delivery failure
 * @member {Boolean} hardBounced
 * @default true
 */
UpdateWebhook.prototype['hardBounced'] = true;

/**
 * Fire when email is opened. Fires on EVERY open. Consider using `uniqueOpen` instead to reduce volume. 
 * @member {Boolean} opened
 * @default true
 */
UpdateWebhook.prototype['opened'] = true;

/**
 * Fire when a link is clicked. Fires on EVERY click. Consider using `uniqueClick` instead to reduce volume. 
 * @member {Boolean} clicked
 * @default true
 */
UpdateWebhook.prototype['clicked'] = true;

/**
 * Fire when recipient clicks unsubscribe link
 * @member {Boolean} unsubscribed
 * @default true
 */
UpdateWebhook.prototype['unsubscribed'] = true;

/**
 * Fire when recipient marks email as spam
 * @member {Boolean} spam
 * @default true
 */
UpdateWebhook.prototype['spam'] = true;

/**
 * Fire only on FIRST open of each email (unique opens). More efficient than `opened` if you only need engagement metrics. 
 * @member {Boolean} uniqueOpen
 * @default false
 */
UpdateWebhook.prototype['uniqueOpen'] = false;

/**
 * Fire only on FIRST click of each email (unique clicks). More efficient than `clicked` if you only need engagement metrics. 
 * @member {Boolean} uniqueClick
 * @default false
 */
UpdateWebhook.prototype['uniqueClick'] = false;


// Implement NewWebhook interface:
/**
 * Whether the webhook is active immediately after creation. Set to false to configure and test before activating. 
 * @member {Boolean} enabled
 * @default true
 */
NewWebhook.prototype['enabled'] = true;
/**
 * HTTPS URL endpoint to receive webhook POST requests. Must: - Use HTTPS (HTTP not allowed for security) - Be publicly accessible - Return 2xx status within 10 seconds - Handle duplicate deliveries (use eventId for idempotency) 
 * @member {String} url
 */
NewWebhook.prototype['url'] = undefined;
/**
 * Fire when email is accepted by SendPost API
 * @member {Boolean} processed
 * @default false
 */
NewWebhook.prototype['processed'] = false;
/**
 * Fire when email is sent to recipient's mail server
 * @member {Boolean} sent
 * @default false
 */
NewWebhook.prototype['sent'] = false;
/**
 * Fire when email is accepted by recipient's mail server
 * @member {Boolean} delivered
 * @default true
 */
NewWebhook.prototype['delivered'] = true;
/**
 * Fire when email is not sent (suppression, invalid, etc.)
 * @member {Boolean} dropped
 * @default true
 */
NewWebhook.prototype['dropped'] = true;
/**
 * Fire when email is rejected at SMTP level
 * @member {Boolean} smtpDropped
 * @default false
 */
NewWebhook.prototype['smtpDropped'] = false;
/**
 * Fire on temporary delivery failure (will retry)
 * @member {Boolean} softBounced
 * @default true
 */
NewWebhook.prototype['softBounced'] = true;
/**
 * Fire on permanent delivery failure
 * @member {Boolean} hardBounced
 * @default true
 */
NewWebhook.prototype['hardBounced'] = true;
/**
 * Fire when email is opened. Fires on EVERY open. Consider using `uniqueOpen` instead to reduce volume. 
 * @member {Boolean} opened
 * @default true
 */
NewWebhook.prototype['opened'] = true;
/**
 * Fire when a link is clicked. Fires on EVERY click. Consider using `uniqueClick` instead to reduce volume. 
 * @member {Boolean} clicked
 * @default true
 */
NewWebhook.prototype['clicked'] = true;
/**
 * Fire when recipient clicks unsubscribe link
 * @member {Boolean} unsubscribed
 * @default true
 */
NewWebhook.prototype['unsubscribed'] = true;
/**
 * Fire when recipient marks email as spam
 * @member {Boolean} spam
 * @default true
 */
NewWebhook.prototype['spam'] = true;
/**
 * Fire only on FIRST open of each email (unique opens). More efficient than `opened` if you only need engagement metrics. 
 * @member {Boolean} uniqueOpen
 * @default false
 */
NewWebhook.prototype['uniqueOpen'] = false;
/**
 * Fire only on FIRST click of each email (unique clicks). More efficient than `clicked` if you only need engagement metrics. 
 * @member {Boolean} uniqueClick
 * @default false
 */
NewWebhook.prototype['uniqueClick'] = false;




export default UpdateWebhook;

