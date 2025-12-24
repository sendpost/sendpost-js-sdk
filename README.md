# SendPost JavaScript SDK

Official JavaScript client library for the SendPost API - Send transactional and marketing emails with tracking and analytics.

[![npm version](https://badge.fury.io/js/sendpost-js-sdk.svg)](https://www.npmjs.com/package/sendpost-js-sdk)

**Package:** [https://www.npmjs.com/package/sendpost-js-sdk](https://www.npmjs.com/package/sendpost-js-sdk)

## What is SendPost?

SendPost is an email API service that helps you:

- Send personalized emails to multiple recipients
- Track email opens and clicks
- View statistics on opens, clicks, bounces, unsubscribes, and spam complaints
- Manage multiple sub-accounts for different products or customers
- Monitor email deliverability and sender reputation
- Set up automated alerts for email sending issues

## Prerequisites

Before you start, make sure you have:

1. **Node.js** installed (version 14 or higher)
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Check your version: `node --version`
   - We recommend Node.js 16.x or 18.x LTS

2. **npm** (comes with Node.js)
   - Check your version: `npm --version`

3. **A SendPost account**
   - Sign up at [https://app.sendpost.io/register](https://app.sendpost.io/register)
   - Get your API keys from the dashboard

## Installation

### Quick Install

Install the SDK in your project:

```bash
npm install sendpost-js-sdk
```

That's it! The package is pre-built and ready to use.

### Verify Installation

Create a test file to verify everything works:

```javascript
const sendpost = require('sendpost-js-sdk');
console.log('SDK loaded successfully!', !!sendpost.ApiClient);
```

If you see "SDK loaded successfully! true", you're all set!

## Getting Started

### Step 1: Get Your API Keys

1. Log in to [SendPost Dashboard](https://app.sendpost.io)
2. Go to Settings → API Keys
3. Copy your **Sub-Account API Key** (for sending emails, managing domains)
4. Copy your **Account API Key** (for managing sub-accounts, IPs)

### Step 2: Set Up Your Project

#### Option A: Using CommonJS (require)

Create a file `send-email.js`:

```javascript
const sendpost = require('sendpost-js-sdk');

// Set up the API client
const apiClient = sendpost.ApiClient.instance;
apiClient.basePath = 'https://api.sendpost.io/api/v1';

// Add your Sub-Account API Key
apiClient.authentications['subAccountAuth'].apiKey = 'YOUR_SUB_ACCOUNT_API_KEY';

// Add your Account API Key (if needed for account operations)
apiClient.authentications['accountAuth'].apiKey = 'YOUR_ACCOUNT_API_KEY';
```

#### Option B: Using ES Modules (import)

If your `package.json` has `"type": "module"`, use:

```javascript
import {
    ApiClient,
    EmailApi,
    EmailMessageObject,
    EmailAddress,
    Recipient
} from 'sendpost-js-sdk';

// Set up the API client
const apiClient = new ApiClient('https://api.sendpost.io/api/v1');
apiClient.authentications['subAccountAuth'].apiKey = 'YOUR_SUB_ACCOUNT_API_KEY';
apiClient.authentications['accountAuth'].apiKey = 'YOUR_ACCOUNT_API_KEY';
```

### Step 3: Send Your First Email

Here's a complete example to send an email:

```javascript
const sendpost = require('sendpost-js-sdk');

// Configure API client
const apiClient = sendpost.ApiClient.instance;
apiClient.basePath = 'https://api.sendpost.io/api/v1';
apiClient.authentications['subAccountAuth'].apiKey = 'YOUR_SUB_ACCOUNT_API_KEY';

// Create email API instance
const emailApi = new sendpost.EmailApi(apiClient);

// Build the email message
const emailMessage = new sendpost.EmailMessageObject();

// Set sender
emailMessage.from = new sendpost.EmailAddress();
emailMessage.from.email = 'sender@yourdomain.com';
emailMessage.from.name = 'Your Name';

// Set recipient
emailMessage.to = [new sendpost.Recipient()];
emailMessage.to[0].email = 'recipient@example.com';
emailMessage.to[0].name = 'Recipient Name';

// Set email content
emailMessage.subject = 'Hello from SendPost!';
emailMessage.htmlBody = '<h1>Welcome!</h1><p>This is your first email sent with SendPost.</p>';
emailMessage.textBody = 'Welcome! This is your first email sent with SendPost.';

// Send the email
emailApi.sendEmail(emailMessage)
  .then((response) => {
    console.log('Email sent successfully!', response);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
```

### Step 4: Using Environment Variables (Recommended)

For security, store your API keys in environment variables:

1. Create a `.env` file in your project root:
   ```
   SENDPOST_SUB_ACCOUNT_API_KEY=your_sub_account_api_key_here
   SENDPOST_ACCOUNT_API_KEY=your_account_api_key_here
   ```

2. Install dotenv:
   ```bash
   npm install dotenv
   ```

3. Load environment variables in your code:
   ```javascript
   require('dotenv').config();
   
   const apiClient = sendpost.ApiClient.instance;
   apiClient.basePath = 'https://api.sendpost.io/api/v1';
   apiClient.authentications['subAccountAuth'].apiKey = process.env.SENDPOST_SUB_ACCOUNT_API_KEY;
   apiClient.authentications['accountAuth'].apiKey = process.env.SENDPOST_ACCOUNT_API_KEY;
   ```

**Important:** Add `.env` to your `.gitignore` file to keep your keys safe!

## Common Examples

### List All Domains

```javascript
const sendpost = require('sendpost-js-sdk');

const apiClient = sendpost.ApiClient.instance;
apiClient.basePath = 'https://api.sendpost.io/api/v1';
apiClient.authentications['subAccountAuth'].apiKey = 'YOUR_SUB_ACCOUNT_API_KEY';

const domainApi = new sendpost.DomainApi(apiClient);

domainApi.getAllDomains({ limit: 10, offset: 0 })
  .then((domains) => {
    console.log('Your domains:', domains);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Send Email with Multiple Recipients

```javascript
const emailMessage = new sendpost.EmailMessageObject();
emailMessage.from = new sendpost.EmailAddress();
emailMessage.from.email = 'sender@yourdomain.com';
emailMessage.from.name = 'Your Name';

// Add multiple recipients
emailMessage.to = [
  new sendpost.Recipient('recipient1@example.com', 'Recipient 1'),
  new sendpost.Recipient('recipient2@example.com', 'Recipient 2')
];

emailMessage.subject = 'Newsletter';
emailMessage.htmlBody = '<h1>Monthly Newsletter</h1><p>Check out our latest updates!</p>';

emailApi.sendEmail(emailMessage)
  .then((response) => {
    console.log('Email sent to multiple recipients!', response);
  });
```

### Send Email with CC and BCC

```javascript
const emailMessage = new sendpost.EmailMessageObject();
emailMessage.from = new sendpost.EmailAddress();
emailMessage.from.email = 'sender@yourdomain.com';

// To recipients
emailMessage.to = [new sendpost.Recipient('to@example.com', 'Main Recipient')];

// CC recipients
emailMessage.to[0].cc = [new sendpost.EmailAddress('cc@example.com', 'CC Recipient')];

// BCC recipients
emailMessage.to[0].bcc = [new sendpost.EmailAddress('bcc@example.com', 'BCC Recipient')];

emailMessage.subject = 'Email with CC and BCC';
emailMessage.htmlBody = '<p>This email has CC and BCC recipients.</p>';

emailApi.sendEmail(emailMessage);
```

### Get Email Statistics

```javascript
const statsApi = new sendpost.StatsApi(apiClient);

// Get stats for a specific sub-account
statsApi.accountSubaccountStatSubaccountIdGet('your-subaccount-id', {
  from: '2024-01-01',
  to: '2024-01-31'
})
  .then((stats) => {
    console.log('Email statistics:', stats);
  });
```

## API Keys Explained

SendPost uses two types of API keys:

1. **Sub-Account API Key** (`X-SubAccount-ApiKey`)
   - Use for: Sending emails, managing domains, viewing stats, managing suppressions
   - Most common operations use this key

2. **Account API Key** (`X-Account-ApiKey`)
   - Use for: Creating sub-accounts, managing IPs, account-level operations
   - Needed for administrative tasks

**Which key do I use?**
- If you're sending emails or managing domains → Use Sub-Account API Key
- If you're creating sub-accounts or managing IPs → Use Account API Key

## Browser Usage

### Using Browserify

1. Install browserify:
   ```bash
   npm install -g browserify
   ```

2. Create your JavaScript file (`main.js`):
   ```javascript
   const sendpost = require('sendpost-js-sdk');
   // Your code here
   ```

3. Bundle it:
   ```bash
   browserify main.js -o bundle.js
   ```

4. Include in HTML:
   ```html
   <script src="bundle.js"></script>
   ```

### Using Webpack

If you're using Webpack, add this to your `webpack.config.js`:

```javascript
module.exports = {
  module: {
    rules: [
      {
        parser: {
          amd: false
        }
      }
    ]
  }
};
```

Then import normally:
```javascript
import { ApiClient, EmailApi } from 'sendpost-js-sdk';
```

## API Reference

### Email Operations

| Method | Description |
|--------|-------------|
| `sendEmail()` | Send a single email |
| `sendEmailWithTemplate()` | Send email using a template |

### Domain Operations

| Method | Description |
|--------|-------------|
| `getAllDomains()` | List all domains |
| `subaccountDomainPost()` | Add a new domain |
| `subaccountDomainDomainIdGet()` | Get domain details |
| `subaccountDomainDomainIdDelete()` | Delete a domain |

### Sub-Account Operations

| Method | Description |
|--------|-------------|
| `getAllSubAccounts()` | List all sub-accounts |
| `createSubAccount()` | Create a new sub-account |
| `getSubAccount()` | Get sub-account details |
| `updateSubAccount()` | Update a sub-account |
| `deleteSubAccount()` | Delete a sub-account |

### Statistics

| Method | Description |
|--------|-------------|
| `getAllAccountStats()` | Get account-level statistics |
| `accountSubaccountStatSubaccountIdGet()` | Get sub-account statistics |
| `getAggregateStatsByGroup()` | Get statistics by group |

For complete API documentation, see the [API Reference](#documentation-for-api-endpoints) section below.

## Error Handling

Always wrap API calls in try-catch or use `.catch()`:

```javascript
emailApi.sendEmail(emailMessage)
  .then((response) => {
    console.log('Success:', response);
  })
  .catch((error) => {
    if (error.status === 401) {
      console.error('Invalid API key');
    } else if (error.status === 422) {
      console.error('Invalid email format:', error.body);
    } else {
      console.error('Error:', error.message);
    }
  });
```

Common error codes:
- **401**: Invalid or missing API key
- **403**: Resource already exists or permission denied
- **422**: Invalid request data
- **500**: Server error

## Support

- **Documentation**: Check the API reference below
- **Email**: hello@sendpost.io
- **Website Chat**: Available on [sendpost.io](https://sendpost.io)

## Other SDKs

SendPost SDKs are available for other languages:

- [PHP SDK](https://github.com/sendpost/sendpost_php_sdk)
- [Python SDK](https://github.com/sendpost/sendpost_python_sdk)
- [Ruby SDK](https://github.com/sendpost/sendpost_ruby_sdk)
- [Go SDK](https://github.com/sendpost/sendpost_go_sdk)

---

## Complete API Reference

### API Endpoints

All API endpoints are relative to: `https://api.sendpost.io/api/v1`

| Class | Method | HTTP Request | Description |
|-------|--------|--------------|-------------|
| `DomainApi` | `getAllDomains()` | GET /subaccount/domain | List Domains |
| `DomainApi` | `subaccountDomainDomainIdDelete()` | DELETE /subaccount/domain/{domain_id} | Delete Domain |
| `DomainApi` | `subaccountDomainDomainIdGet()` | GET /subaccount/domain/{domain_id} | Get Domain |
| `DomainApi` | `subaccountDomainPost()` | POST /subaccount/domain | Create Domain |
| `EmailApi` | `sendEmail()` | POST /subaccount/email/ | Send Email |
| `EmailApi` | `sendEmailWithTemplate()` | POST /subaccount/email/template | Send Email With Template |
| `IPApi` | `allocateNewIp()` | PUT /account/ip/allocate | Allocate IP |
| `IPApi` | `deleteIp()` | DELETE /account/ip/{ip_id} | Delete IP |
| `IPApi` | `getAllIps()` | GET /account/ip/ | List IPs |
| `IPApi` | `getSpecificIp()` | GET /account/ip/{ip_id} | Get IP |
| `IPApi` | `updateIp()` | PUT /account/ip/{ip_id} | Update IP |
| `IPPoolsApi` | `createIPPool()` | POST /account/ippool | Create IPPool |
| `IPPoolsApi` | `deleteIPPool()` | DELETE /account/ippool/{ippool_id} | Delete IPPool |
| `IPPoolsApi` | `getAllIPPools()` | GET /account/ippool | List IPPools |
| `IPPoolsApi` | `getIPPoolById()` | GET /account/ippool/{ippool_id} | Get IPPool |
| `IPPoolsApi` | `updateIPPool()` | PUT /account/ippool/{ippool_id} | Update IPPool |
| `MessageApi` | `getMessageById()` | GET /account/message/{message_id} | Get Message |
| `StatsApi` | `accountSubaccountStatSubaccountIdAggregateGet()` | GET /account/subaccount/stat/{subaccount_id}/aggregate | Get Aggregate Stats |
| `StatsApi` | `accountSubaccountStatSubaccountIdGet()` | GET /account/subaccount/stat/{subaccount_id} | List Stats |
| `StatsApi` | `getAggregateStatsByGroup()` | GET /account/subaccount/stat/{subaccount_id}/group | Get Group Aggregate Stats |
| `StatsAApi` | `getAccountAggregateStats()` | GET /account/stat/aggregate | Get Account Aggregate Stats |
| `StatsAApi` | `getAccountAggregateStatsByGroup()` | GET /account/stat/aggregate/group | Get Account Group Aggregate Stats |
| `StatsAApi` | `getAccountStatsByGroup()` | GET /account/stat/group | List Account Group Stats |
| `StatsAApi` | `getAllAccountStats()` | GET /account/stat | List Account Stats |
| `SubAccountApi` | `createSubAccount()` | POST /account/subaccount/ | Create Sub-Account |
| `SubAccountApi` | `deleteSubAccount()` | DELETE /account/subaccount/{subaccount_id} | Delete Sub-Account |
| `SubAccountApi` | `getAllSubAccounts()` | GET /account/subaccount/ | List Sub-Accounts |
| `SubAccountApi` | `getSubAccount()` | GET /account/subaccount/{subaccount_id} | Get Sub-Account |
| `SubAccountApi` | `updateSubAccount()` | PUT /account/subaccount/{subaccount_id} | Update Sub-Account |
| `SuppressionApi` | `createSuppression()` | POST /subaccount/suppression | Create Suppressions |
| `SuppressionApi` | `deleteSuppression()` | DELETE /subaccount/suppression | Delete Suppressions |
| `SuppressionApi` | `getSuppressionList()` | GET /subaccount/suppression | List Suppressions |
| `WebhookApi` | `createWebhook()` | POST /account/webhook | Create Webhook |
| `WebhookApi` | `deleteWebhook()` | DELETE /account/webhook/{webhook_id} | Delete Webhook |
| `WebhookApi` | `getAllWebhooks()` | GET /account/webhook | List Webhooks |
| `WebhookApi` | `getWebhook()` | GET /account/webhook/{webhook_id} | Get Webhook |
| `WebhookApi` | `updateWebhook()` | PUT /account/webhook/{webhook_id} | Update Webhook |

### Data Models

All data models are documented in the `docs/` folder. Key models include:

- `EmailMessageObject` - Email message structure
- `EmailAddress` - Email address with name
- `Recipient` - Email recipient
- `Domain` - Domain information
- `SubAccount` - Sub-account details
- `Stat` - Statistics data

See the [Documentation for Models](#documentation-for-models) section for the complete list.

## Documentation for Models

- [AccountStats](docs/AccountStats.md)
- [AccountStatsStat](docs/AccountStatsStat.md)
- [AggregateStat](docs/AggregateStat.md)
- [AggregateStats](docs/AggregateStats.md)
- [AggregatedEmailStats](docs/AggregatedEmailStats.md)
- [Attachment](docs/Attachment.md)
- [CopyTo](docs/CopyTo.md)
- [CreateDomainRequest](docs/CreateDomainRequest.md)
- [CreateSubAccountRequest](docs/CreateSubAccountRequest.md)
- [CreateSuppressionRequest](docs/CreateSuppressionRequest.md)
- [CreateWebhookRequest](docs/CreateWebhookRequest.md)
- [DeleteResponse](docs/DeleteResponse.md)
- [DeleteSubAccountResponse](docs/DeleteSubAccountResponse.md)
- [Domain](docs/Domain.md)
- [EmailAddress](docs/EmailAddress.md)
- [EmailMessage](docs/EmailMessage.md)
- [EmailMessageObject](docs/EmailMessageObject.md)
- [EmailResponse](docs/EmailResponse.md)
- [IP](docs/IP.md)
- [IPPool](docs/IPPool.md)
- [Message](docs/Message.md)
- [Recipient](docs/Recipient.md)
- [Stat](docs/Stat.md)
- [SubAccount](docs/SubAccount.md)
- [Suppression](docs/Suppression.md)
- [Webhook](docs/Webhook.md)

For detailed information about each model, see the documentation files in the `docs/` directory.

## Authentication

The SDK uses API key authentication. Set your API keys as shown in the examples above:

- **Sub-Account API Key**: Used for sub-account operations (sending emails, managing domains)
- **Account API Key**: Used for account-level operations (managing sub-accounts, IPs)

Both keys are set via the `authentications` object on the API client.

---

**Note:** This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project.
