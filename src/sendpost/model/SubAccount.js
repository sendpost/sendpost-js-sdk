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
import Label from './Label';
import SMTPAuth from './SMTPAuth';

/**
 * The SubAccount model module.
 * @module sendpost/model/SubAccount
 * @version 2.0.1
 */
class SubAccount {
    /**
     * Constructs a new <code>SubAccount</code>.
     * @alias module:sendpost/model/SubAccount
     */
    constructor() { 
        
        SubAccount.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SubAccount</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:sendpost/model/SubAccount} obj Optional instance to populate.
     * @return {module:sendpost/model/SubAccount} The populated <code>SubAccount</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubAccount();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('apiKey')) {
                obj['apiKey'] = ApiClient.convertToType(data['apiKey'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('labels')) {
                obj['labels'] = ApiClient.convertToType(data['labels'], [Label]);
            }
            if (data.hasOwnProperty('smtpAuths')) {
                obj['smtpAuths'] = ApiClient.convertToType(data['smtpAuths'], [SMTPAuth]);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'Number');
            }
            if (data.hasOwnProperty('isPlus')) {
                obj['isPlus'] = ApiClient.convertToType(data['isPlus'], 'Boolean');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Number');
            }
            if (data.hasOwnProperty('created_by')) {
                obj['created_by'] = ApiClient.convertToType(data['created_by'], {'String': Object});
            }
            if (data.hasOwnProperty('updated_by')) {
                obj['updated_by'] = ApiClient.convertToType(data['updated_by'], {'String': Object});
            }
            if (data.hasOwnProperty('blocked')) {
                obj['blocked'] = ApiClient.convertToType(data['blocked'], 'Boolean');
            }
            if (data.hasOwnProperty('blocked_at')) {
                obj['blocked_at'] = ApiClient.convertToType(data['blocked_at'], 'Number');
            }
            if (data.hasOwnProperty('block_reason')) {
                obj['block_reason'] = ApiClient.convertToType(data['block_reason'], 'String');
            }
            if (data.hasOwnProperty('hb_exempt')) {
                obj['hb_exempt'] = ApiClient.convertToType(data['hb_exempt'], 'Boolean');
            }
            if (data.hasOwnProperty('generate_weekly_report')) {
                obj['generate_weekly_report'] = ApiClient.convertToType(data['generate_weekly_report'], 'Boolean');
            }
            if (data.hasOwnProperty('handlers')) {
                obj['handlers'] = ApiClient.convertToType(data['handlers'], ['String']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubAccount</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubAccount</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['apiKey'] && !(typeof data['apiKey'] === 'string' || data['apiKey'] instanceof String)) {
            throw new Error("Expected the field `apiKey` to be a primitive type in the JSON string but got " + data['apiKey']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
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
        if (data['smtpAuths']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['smtpAuths'])) {
                throw new Error("Expected the field `smtpAuths` to be an array in the JSON data but got " + data['smtpAuths']);
            }
            // validate the optional field `smtpAuths` (array)
            for (const item of data['smtpAuths']) {
                SMTPAuth.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['block_reason'] && !(typeof data['block_reason'] === 'string' || data['block_reason'] instanceof String)) {
            throw new Error("Expected the field `block_reason` to be a primitive type in the JSON string but got " + data['block_reason']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['handlers'])) {
            throw new Error("Expected the field `handlers` to be an array in the JSON data but got " + data['handlers']);
        }

        return true;
    }

/**
     * Returns Unique ID for the sub-account.
     * @return {Number}
     */
    getId() {
        return this.id;
    }

    /**
     * Sets Unique ID for the sub-account.
     * @param {Number} id Unique ID for the sub-account.
     */
    setId(id) {
        this['id'] = id;
    }
/**
     * Returns API key for the sub-account.
     * @return {String}
     */
    getApiKey() {
        return this.apiKey;
    }

    /**
     * Sets API key for the sub-account.
     * @param {String} apiKey API key for the sub-account.
     */
    setApiKey(apiKey) {
        this['apiKey'] = apiKey;
    }
/**
     * Returns Name of the sub-account.
     * @return {String}
     */
    getName() {
        return this.name;
    }

    /**
     * Sets Name of the sub-account.
     * @param {String} name Name of the sub-account.
     */
    setName(name) {
        this['name'] = name;
    }
/**
     * Returns Labels associated with the sub-account
     * @return {Array.<module:sendpost/model/Label>}
     */
    getLabels() {
        return this.labels;
    }

    /**
     * Sets Labels associated with the sub-account
     * @param {Array.<module:sendpost/model/Label>} labels Labels associated with the sub-account
     */
    setLabels(labels) {
        this['labels'] = labels;
    }
/**
     * Returns SMTP Auths associated with the sub-account
     * @return {Array.<module:sendpost/model/SMTPAuth>}
     */
    getSmtpAuths() {
        return this.smtpAuths;
    }

    /**
     * Sets SMTP Auths associated with the sub-account
     * @param {Array.<module:sendpost/model/SMTPAuth>} smtpAuths SMTP Auths associated with the sub-account
     */
    setSmtpAuths(smtpAuths) {
        this['smtpAuths'] = smtpAuths;
    }
/**
     * Returns Type of the sub-account
     * @return {module:sendpost/model/SubAccount.TypeEnum}
     */
    getType() {
        return this.type;
    }

    /**
     * Sets Type of the sub-account
     * @param {module:sendpost/model/SubAccount.TypeEnum} type Type of the sub-account
     */
    setType(type) {
        this['type'] = type;
    }
/**
     * Returns Indicates whether the sub-account is a Plus sub-account
     * @return {Boolean}
     */
    getIsPlus() {
        return this.isPlus;
    }

    /**
     * Sets Indicates whether the sub-account is a Plus sub-account
     * @param {Boolean} isPlus Indicates whether the sub-account is a Plus sub-account
     */
    setIsPlus(isPlus) {
        this['isPlus'] = isPlus;
    }
/**
     * Returns UNIX epoch nano timestamp when the sub-account was created.
     * @return {Number}
     */
    getCreated() {
        return this.created;
    }

    /**
     * Sets UNIX epoch nano timestamp when the sub-account was created.
     * @param {Number} created UNIX epoch nano timestamp when the sub-account was created.
     */
    setCreated(created) {
        this['created'] = created;
    }
/**
     * Returns Member who created the sub-account
     * @return {Object.<String, Object>}
     */
    getCreatedBy() {
        return this.created_by;
    }

    /**
     * Sets Member who created the sub-account
     * @param {Object.<String, Object>} createdBy Member who created the sub-account
     */
    setCreatedBy(createdBy) {
        this['created_by'] = createdBy;
    }
/**
     * Returns Member who updated the sub-account
     * @return {Object.<String, Object>}
     */
    getUpdatedBy() {
        return this.updated_by;
    }

    /**
     * Sets Member who updated the sub-account
     * @param {Object.<String, Object>} updatedBy Member who updated the sub-account
     */
    setUpdatedBy(updatedBy) {
        this['updated_by'] = updatedBy;
    }
/**
     * Returns Indicates whether the sub-account is blocked
     * @return {Boolean}
     */
    getBlocked() {
        return this.blocked;
    }

    /**
     * Sets Indicates whether the sub-account is blocked
     * @param {Boolean} blocked Indicates whether the sub-account is blocked
     */
    setBlocked(blocked) {
        this['blocked'] = blocked;
    }
/**
     * Returns UNIX epoch nano timestamp when the sub-account was blocked (0 if not blocked)
     * @return {Number}
     */
    getBlockedAt() {
        return this.blocked_at;
    }

    /**
     * Sets UNIX epoch nano timestamp when the sub-account was blocked (0 if not blocked)
     * @param {Number} blockedAt UNIX epoch nano timestamp when the sub-account was blocked (0 if not blocked)
     */
    setBlockedAt(blockedAt) {
        this['blocked_at'] = blockedAt;
    }
/**
     * Returns Reason for blocking the sub-account
     * @return {String}
     */
    getBlockReason() {
        return this.block_reason;
    }

    /**
     * Sets Reason for blocking the sub-account
     * @param {String} blockReason Reason for blocking the sub-account
     */
    setBlockReason(blockReason) {
        this['block_reason'] = blockReason;
    }
/**
     * Returns Indicates whether the sub-account is exempt from hard bounce tracking
     * @return {Boolean}
     */
    getHbExempt() {
        return this.hb_exempt;
    }

    /**
     * Sets Indicates whether the sub-account is exempt from hard bounce tracking
     * @param {Boolean} hbExempt Indicates whether the sub-account is exempt from hard bounce tracking
     */
    setHbExempt(hbExempt) {
        this['hb_exempt'] = hbExempt;
    }
/**
     * Returns Indicates whether weekly reports are generated for this sub-account
     * @return {Boolean}
     */
    getGenerateWeeklyReport() {
        return this.generate_weekly_report;
    }

    /**
     * Sets Indicates whether weekly reports are generated for this sub-account
     * @param {Boolean} generateWeeklyReport Indicates whether weekly reports are generated for this sub-account
     */
    setGenerateWeeklyReport(generateWeeklyReport) {
        this['generate_weekly_report'] = generateWeeklyReport;
    }
/**
     * Returns Handlers associated with the sub-account
     * @return {Array.<String>}
     */
    getHandlers() {
        return this.handlers;
    }

    /**
     * Sets Handlers associated with the sub-account
     * @param {Array.<String>} handlers Handlers associated with the sub-account
     */
    setHandlers(handlers) {
        this['handlers'] = handlers;
    }

}



/**
 * Unique ID for the sub-account.
 * @member {Number} id
 */
SubAccount.prototype['id'] = undefined;

/**
 * API key for the sub-account.
 * @member {String} apiKey
 */
SubAccount.prototype['apiKey'] = undefined;

/**
 * Name of the sub-account.
 * @member {String} name
 */
SubAccount.prototype['name'] = undefined;

/**
 * Labels associated with the sub-account
 * @member {Array.<module:sendpost/model/Label>} labels
 */
SubAccount.prototype['labels'] = undefined;

/**
 * SMTP Auths associated with the sub-account
 * @member {Array.<module:sendpost/model/SMTPAuth>} smtpAuths
 */
SubAccount.prototype['smtpAuths'] = undefined;

/**
 * Type of the sub-account
 * @member {module:sendpost/model/SubAccount.TypeEnum} type
 */
SubAccount.prototype['type'] = undefined;

/**
 * Indicates whether the sub-account is a Plus sub-account
 * @member {Boolean} isPlus
 */
SubAccount.prototype['isPlus'] = undefined;

/**
 * UNIX epoch nano timestamp when the sub-account was created.
 * @member {Number} created
 */
SubAccount.prototype['created'] = undefined;

/**
 * Member who created the sub-account
 * @member {Object.<String, Object>} created_by
 */
SubAccount.prototype['created_by'] = undefined;

/**
 * Member who updated the sub-account
 * @member {Object.<String, Object>} updated_by
 */
SubAccount.prototype['updated_by'] = undefined;

/**
 * Indicates whether the sub-account is blocked
 * @member {Boolean} blocked
 */
SubAccount.prototype['blocked'] = undefined;

/**
 * UNIX epoch nano timestamp when the sub-account was blocked (0 if not blocked)
 * @member {Number} blocked_at
 */
SubAccount.prototype['blocked_at'] = undefined;

/**
 * Reason for blocking the sub-account
 * @member {String} block_reason
 */
SubAccount.prototype['block_reason'] = undefined;

/**
 * Indicates whether the sub-account is exempt from hard bounce tracking
 * @member {Boolean} hb_exempt
 */
SubAccount.prototype['hb_exempt'] = undefined;

/**
 * Indicates whether weekly reports are generated for this sub-account
 * @member {Boolean} generate_weekly_report
 */
SubAccount.prototype['generate_weekly_report'] = undefined;

/**
 * Handlers associated with the sub-account
 * @member {Array.<String>} handlers
 */
SubAccount.prototype['handlers'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {Number}
 * @readonly
 */
SubAccount['TypeEnum'] = {

    /**
     * value: 0
     * @const
     */
    "0": 0,

    /**
     * value: 1
     * @const
     */
    "1": 1
};



export default SubAccount;

