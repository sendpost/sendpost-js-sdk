# sendpost.EmailApi

All URIs are relative to *https://api.sendpost.io/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**sendEmail**](EmailApi.md#sendEmail) | **POST** /subaccount/email/ | Send Email
[**sendEmailWithTemplate**](EmailApi.md#sendEmailWithTemplate) | **POST** /subaccount/email/template | Send Email With Template



## sendEmail

> [EmailResponse] sendEmail(emailMessageObject)

Send Email

Send transactional or marketing emails to one or multiple recipients. This is the primary endpoint for all email sending through SendPost.  **Capabilities:** - **Single Email**: Send to one recipient with full personalization - **Batch Sending**: Send to up to 500 recipients in a single API call - **Personalization**: Use Handlebars templating (&#x60;{{variableName}}&#x60;) in subject, HTML body, and text body - **Attachments**: Include base64-encoded files (max 25MB total per request) - **Tracking**: Enable/disable open and click tracking per email - **IP Pool Routing**: Route emails through specific IP pools  **Common Use Cases:**  | Use Case | Example | |----------|---------| | Order Confirmation | Send receipt with order details after purchase | | Password Reset | Time-sensitive security email with reset link | | Welcome Email | Onboard new users with personalized greeting | | Shipping Notification | Update customers when orders ship | | Invoice/Receipt | Attach PDF invoices to billing emails |  **Personalization Example:** &#x60;&#x60;&#x60;json {   \&quot;to\&quot;: [{     \&quot;email\&quot;: \&quot;john@example.com\&quot;,     \&quot;customFields\&quot;: {       \&quot;firstName\&quot;: \&quot;John\&quot;,       \&quot;orderTotal\&quot;: \&quot;$99.99\&quot;     }   }],   \&quot;subject\&quot;: \&quot;Hi {{firstName}}, your order is confirmed!\&quot;,   \&quot;htmlBody\&quot;: \&quot;&lt;p&gt;Thanks {{firstName}}! Your total: {{orderTotal}}&lt;/p&gt;\&quot; } &#x60;&#x60;&#x60;  **Test Email Addresses:**  SendPost provides special test email addresses for testing webhooks and events without sending real emails:  | Test Email | Behavior | |------------|----------| | &#x60;test@playwithsendpost.io&#x60; | Generates delivered event, then simulates opens and clicks after a few seconds | | &#x60;deliver@playwithsendpost.io&#x60; | Generates delivered event only (no opens/clicks) | | &#x60;hardbounce@playwithsendpost.io&#x60; | Always generates a hard bounce event | | &#x60;softbounce@playwithsendpost.io&#x60; | Always generates a soft bounce event | | &#x60;dropped@playwithsendpost.io&#x60; | Always generates a dropped event (SMTPDropped) |  **Self-Test Email (Send to Yourself):**  Use &#x60;hello@playwithsendpost.io&#x60; as the **from** address to send emails to yourself for testing:  - **Sender**: Must be &#x60;hello@playwithsendpost.io&#x60; - **Recipient**: Must be your account owner email (the email you used to sign up) - **Behavior**: Real email delivery to your inbox (no domain verification required, no mock mode) - **Use Case**: Test your API integration by sending real emails to yourself without domain setup  **Example:** &#x60;&#x60;&#x60;json {   \&quot;from\&quot;: {\&quot;email\&quot;: \&quot;hello@playwithsendpost.io\&quot;},   \&quot;to\&quot;: [{\&quot;email\&quot;: \&quot;your-account-email@example.com\&quot;}],   \&quot;subject\&quot;: \&quot;Test Email to Myself\&quot;,   \&quot;htmlBody\&quot;: \&quot;&lt;p&gt;This is a test email to myself&lt;/p&gt;\&quot; } &#x60;&#x60;&#x60; This will send a real email to your inbox that you can actually receive and open.  **Note**: If you send to any email other than your account email, the request will be rejected with an error.  **Using Test Emails:** - Simply send to any test email address like a normal recipient - Mock mode is automatically enabled for test emails - All events trigger webhooks normally - Events are marked as mock messages but follow the same structure as real events - Perfect for testing webhook integrations without using real email addresses  **Example:** &#x60;&#x60;&#x60;json {   \&quot;to\&quot;: [{\&quot;email\&quot;: \&quot;test@playwithsendpost.io\&quot;}],   \&quot;from\&quot;: {\&quot;email\&quot;: \&quot;sender@example.com\&quot;},   \&quot;subject\&quot;: \&quot;Test Email\&quot;,   \&quot;htmlBody\&quot;: \&quot;&lt;p&gt;This is a test&lt;/p&gt;\&quot; } &#x60;&#x60;&#x60; This will generate: Sent → Delivered → Opened (after 2-5s) → Clicked (after 1-3s more)  **Response:** Returns an array of responses, one per recipient, each containing: - &#x60;messageId&#x60; - Unique ID for tracking - &#x60;submittedAt&#x60; - Timestamp of acceptance - &#x60;errorCode&#x60; and &#x60;message&#x60; - Status information 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.EmailApi();
let emailMessageObject = new sendpost.EmailMessageObject(); // EmailMessageObject | Email message details
apiInstance.sendEmail(emailMessageObject).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailMessageObject** | [**EmailMessageObject**](EmailMessageObject.md)| Email message details | 

### Return type

[**[EmailResponse]**](EmailResponse.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sendEmailWithTemplate

> [EmailResponse] sendEmailWithTemplate(emailMessageWithTemplate)

Send Email With Template

Send emails using pre-configured templates stored in SendPost. Templates separate email content from code, enabling:  **Benefits:** - Update email content without code deployments - Marketing teams can manage templates independently - Consistent branding across all applications - A/B test different template versions  **How It Works:** 1. Create templates in the SendPost dashboard with Handlebars variables 2. Reference the template by name or ID in this API call 3. Pass dynamic data through recipient &#x60;customFields&#x60; 4. SendPost merges data with template and sends  **Common Use Cases:**  | Template Type | Dynamic Data | |---------------|--------------| | Welcome Email | &#x60;firstName&#x60;, &#x60;accountType&#x60;, &#x60;loginUrl&#x60; | | Order Receipt | &#x60;orderNumber&#x60;, &#x60;items&#x60;, &#x60;total&#x60;, &#x60;shippingAddress&#x60; | | Password Reset | &#x60;resetLink&#x60;, &#x60;expiryTime&#x60;, &#x60;userName&#x60; | | Weekly Digest | &#x60;articleList&#x60;, &#x60;unreadCount&#x60;, &#x60;userName&#x60; |  **Example Request:** &#x60;&#x60;&#x60;json {   \&quot;from\&quot;: { \&quot;email\&quot;: \&quot;orders@yourstore.com\&quot; },   \&quot;to\&quot;: [{     \&quot;email\&quot;: \&quot;customer@example.com\&quot;,     \&quot;customFields\&quot;: {       \&quot;firstName\&quot;: \&quot;Sarah\&quot;,       \&quot;orderNumber\&quot;: \&quot;ORD-2024-001\&quot;,       \&quot;totalAmount\&quot;: \&quot;$149.99\&quot;     }   }],   \&quot;template\&quot;: \&quot;order-confirmation-v2\&quot; } &#x60;&#x60;&#x60;  **Note:** Template variables not provided in &#x60;customFields&#x60; will render as empty strings. 

### Example

```javascript
import sendpost from 'sendpost-js-sdk';
let defaultClient = sendpost.ApiClient.instance;
// Configure API key authorization: subAccountAuth
let subAccountAuth = defaultClient.authentications['subAccountAuth'];
subAccountAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//subAccountAuth.apiKeyPrefix = 'Token';

let apiInstance = new sendpost.EmailApi();
let emailMessageWithTemplate = new sendpost.EmailMessageWithTemplate(); // EmailMessageWithTemplate | Email message details with template information
apiInstance.sendEmailWithTemplate(emailMessageWithTemplate).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailMessageWithTemplate** | [**EmailMessageWithTemplate**](EmailMessageWithTemplate.md)| Email message details with template information | 

### Return type

[**[EmailResponse]**](EmailResponse.md)

### Authorization

[subAccountAuth](../README.md#subAccountAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

