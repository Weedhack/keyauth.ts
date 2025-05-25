# KeyAuth Seller API TypeScript Library

A TypeScript library for interacting with the KeyAuth seller API.

## Installation

```bash
# From GitHub
npm install github:weedhack/keyauth.ts
```

## Usage

```typescript
import { KeyAuthSeller } from 'keyauth-seller';

// Initialize with your seller key
const keyAuth = new KeyAuthSeller('your-seller-key');

// Examples of usage:

// License Management
async function manageLicenses() {
  try {
    // Add a new license
    const license = await keyAuth.addLicense({
      expiry: '30',
      mask: 'XXXXX-XXXXX-XXXXX',
      level: '1',
      amount: '1'
    });

    // Ban a license
    await keyAuth.banKey({
      key: 'license-key',
      reason: 'Violation of terms',
      userToo: true
    });

    // Unban a license
    await keyAuth.unbanKey('license-key');

    // Get license info
    const keyInfo = await keyAuth.getKeyInfo('license-key');
  } catch (error) {
    console.error(error);
  }
}

// User Management
async function manageUsers() {
  try {
    // Get user data
    const userData = await keyAuth.getUserData('username');
    console.log(userData.ip, userData.hwid, userData.subscriptions);

    // Ban/Unban user
    await keyAuth.banUser('username', 'Violation of terms');
    await keyAuth.unbanUser('username');

    // Pause/Unpause user
    await keyAuth.pauseUser('username');
    await keyAuth.unpauseUser('username');

    // Reset user
    await keyAuth.resetUser('username');
  } catch (error) {
    console.error(error);
  }
}

// Subscription Management
async function manageSubscriptions() {
  try {
    // Extend subscription
    await keyAuth.extendUser({
      user: 'username',
      sub: 'subscription-name',
      expiry: '30',
      activeOnly: true
    });

    // Pause/Unpause subscription
    await keyAuth.pauseSubscription('subscription-name');
    await keyAuth.unpauseSubscription('subscription-name');
  } catch (error) {
    console.error(error);
  }
}
```

## Available Methods

### License Management
- `addLicense(params)` - Add new license(s)
- `addTime(time: string)` - Add time to unused keys
- `assignKey(user: string, key: string)` - Assign key to user
- `banKey({ key, reason, userToo })` - Ban a license key
- `unbanKey(key: string)` - Unban a license key
- `verifyKey(key: string)` - Verify a key
- `getKeyInfo(key: string)` - Get detailed key information
- `setKeyNote(key: string, note: string)` - Set note for a key
- `deleteAllLicenses()` - Delete all licenses
- `deleteLicense({ key, userToo })` - Delete a single license
- `deleteMultipleLicenses({ key, userToo })` - Delete multiple licenses
- `deleteUsedLicenses()` - Delete used licenses
- `deleteUnusedLicenses()` - Delete unused licenses
- `fetchAllKeys(format?)` - Fetch all keys

### User Management
- `getUserData(user: string)` - Get detailed user information
- `banUser(user: string, reason: string)` - Ban a user
- `unbanUser(user: string)` - Unban a user
- `pauseUser(username: string)` - Pause a user
- `unpauseUser(username: string)` - Unpause a user
- `resetUser(user: string)` - Reset a user
- `activateKey(user: string, key: string, pass: string)` - Activate a key for a user
- `getUserKey(user: string)` - Get user's key

### Subscription Management
- `extendUser({ user, sub, expiry, activeOnly })` - Extend user subscription
- `pauseSubscription(subscription: string)` - Pause a subscription
- `unpauseSubscription(subscription: string)` - Unpause a subscription

## Response Types

### KeyAuthResponse
```typescript
interface KeyAuthResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}
```

### KeyInfoResponse
```typescript
interface KeyInfoResponse {
  success: boolean;
  duration: string;
  note: string;
  status: string;
  level: string;
  createdby: string;
  usedby: string;
  usedon: string;
  creationdate: string;
}
```

### UserDataResponse
```typescript
interface UserDataResponse {
  success: boolean;
  username: string;
  subscriptions: any[];
  uservars: any[];
  ip: string;
  hwid: string;
  createdate: string;
  lastlogin: string;
  cooldown: string;
  password: string;
  token: string;
  banned: string;
}
```

## Error Handling

All methods throw errors if the API request fails. It's recommended to wrap calls in try-catch blocks as shown in the examples above.

## Contributing

Feel free to submit issues and pull requests.

## License

ISC 
