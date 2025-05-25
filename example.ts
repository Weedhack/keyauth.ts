import { KeyAuthSeller } from './library';

// Initialize the KeyAuth seller API with your seller key
const keyAuth = new KeyAuthSeller('your-seller-key-here');

// Example 1: Create a new license
async function createLicense() {
    try {
        const response = await keyAuth.addLicense({
            expiry: '30',  // 30 days
            mask: 'XXXXX-XXXXX-XXXXX',
            amount: '1',
            level: '1'
        });
        console.log('License created:', response);
    } catch (error) {
        console.error('Error creating license:', error);
    }
}

// Example 2: Get information about a key
async function checkKeyInfo() {
    try {
        const keyInfo = await keyAuth.getKeyInfo('your-key-here');
        console.log('Key duration:', keyInfo.duration);
        console.log('Key status:', keyInfo.status);
        console.log('Created by:', keyInfo.createdby);
        console.log('Used by:', keyInfo.usedby);
    } catch (error) {
        console.error('Error checking key:', error);
    }
}

// Example 3: Ban a key
async function banUserKey() {
    try {
        const response = await keyAuth.banKey({
            key: 'key-to-ban',
            reason: 'Violation of terms',
            userToo: true  // Also ban the user associated with the key
        });
        console.log('Ban result:', response);
    } catch (error) {
        console.error('Error banning key:', error);
    }
}

// Run the examples
async function runExamples() {
    console.log('Creating license...');
    await createLicense();

    console.log('\nChecking key info...');
    await checkKeyInfo();

    console.log('\nBanning key...');
    await banUserKey();
}

// Execute the examples
runExamples().catch(console.error); 