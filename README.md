# KeyAuth Seller API TypeScript Library

A TypeScript library for interacting with the KeyAuth seller API by WeedHack

## Installation

```bash
npm install keyauth-seller
```

## Usage

```typescript
import { KeyAuthSeller } from 'keyauth-seller';

// Initialize with your seller key
const keyAuth = new KeyAuthSeller('your-seller-key');

// Examples of usage:

// Add a new license
async function addLicense() {
  try {
    const response = await keyAuth.addLicense({
      expiry: '1',
      mask: 'XXXXX-XXXXX-XXXXX',
      level: '1',
      amount: '1'
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Ban a key
async function banKey() {
  try {
    const response = await keyAuth.banKey({
      key: 'license-key',
      reason: 'Violation of terms',
      userToo: true
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Verify a key
async function verifyKey() {
  try {
    const response = await keyAuth.verifyKey('license-key');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

## Available Methods

- `addTime(time: string)` - Add time to unused keys
- `assignKey(user: string, key: string)` - Assign key to user
- `banKey({ key, reason, userToo })` - Ban a license key
- `addLicense(params)` - Add new license(s)
- `activateKey(user, key, pass)` - Activate a key for a user
- `deleteAllLicenses()` - Delete all licenses
- `deleteLicense({ key, userToo })` - Delete a single license
- `deleteMultipleLicenses({ key, userToo })` - Delete multiple licenses
- `deleteUsedLicenses()` - Delete used licenses
- `deleteUnusedLicenses()` - Delete unused licenses
- `fetchAllKeys(format?)` - Fetch all keys
- `getKeyInfo(key)` - Get key info
- `setKeyNote(key, note)` - Set note for a key
- `verifyKey(key)` - Verify a key

## Response Type

All methods return a Promise that resolves to a `KeyAuthResponse` type:

```typescript
interface KeyAuthResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}
```

## Error Handling

All methods throw errors if the API request fails. It's recommended to wrap calls in try-catch blocks as shown in the examples above. 