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
- `subtractTime({ user, sub, seconds })` - Subtract time from subscription
- `deleteSubscription({ user, sub })` - Delete user's subscription

### Blacklist Management
- `addToBlacklist(params)` - Add items to blacklist
  - Can blacklist IP, HWID, region, country, or ASN
  - All parameters are optional but at least one should be provided
- `removeFromBlacklist({ data, blacktype })` - Remove items from blacklist
  - Removes IP or HWID from blacklist

## Examples

### License Management
```typescript
const keyAuth = new KeyAuthSeller('your-seller-key');

// Add a new license
await keyAuth.addLicense({
    expiry: '30',
    mask: 'XXXXX-XXXXX-XXXXX',
    level: '1',
    amount: '1'
});

// Ban and unban a key
await keyAuth.banKey({
    key: 'license-key',
    reason: 'Violation of terms',
    userToo: true
});
await keyAuth.unbanKey('license-key');
```

### User Management
```typescript
// Get user information
const userData = await keyAuth.getUserData('username');
console.log(userData.ip, userData.hwid, userData.subscriptions);

// Ban/Unban user
await keyAuth.banUser('username', 'Violation of terms');
await keyAuth.unbanUser('username');

// Pause/Unpause user
await keyAuth.pauseUser('username');
await keyAuth.unpauseUser('username');
```

### Subscription Management
```typescript
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

// Subtract time from subscription
await keyAuth.subtractTime({
    user: 'username',
    sub: 'subscription-name',
    seconds: '3600' // 1 hour
});

// Delete subscription
await keyAuth.deleteSubscription({
    user: 'username',
    sub: 'subscription-name'
});
```

### Blacklist Management
```typescript
// Add to blacklist
await keyAuth.addToBlacklist({
    ip: '1.2.3.4',
    reason: 'Suspicious activity'
});

await keyAuth.addToBlacklist({
    hwid: 'hardware-id-here',
    reason: 'Multiple violations'
});

await keyAuth.addToBlacklist({
    region: 'region-name',
    country: 'US',
    reason: 'High fraud rate'
});

await keyAuth.addToBlacklist({
    asn: '12345',
    reason: 'VPN/Proxy detected'
});

// Remove from blacklist
await keyAuth.removeFromBlacklist({
    data: '1.2.3.4',
    blacktype: 'IP'
});

await keyAuth.removeFromBlacklist({
    data: 'hardware-id-here',
    blacktype: 'HWID'
});
```

## Types

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

### BlacklistParams
```typescript
interface BlacklistParams {
    ip?: string;
    hwid?: string;
    region?: string;
    country?: string;
    asn?: string;
    reason?: string;
}
```

### RemoveFromBlacklistParams
```typescript
interface RemoveFromBlacklistParams {
    data: string;
    blacktype: 'IP' | 'HWID';
}
```

## Error Handling

All methods throw errors if the API request fails. It's recommended to wrap calls in try-catch blocks as shown in the examples above.

## Contributing

Feel free to submit issues and pull requests.

## License

ISC 
