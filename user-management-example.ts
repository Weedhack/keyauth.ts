import { KeyAuthSeller } from './library';

// Initialize the KeyAuth seller API with your seller key
const keyAuth = new KeyAuthSeller('your-seller-key-here');

// Example 1: Get user data
async function getUserInformation() {
    try {
        const userData = await keyAuth.getUserData('username');
        console.log('User IP:', userData.ip);
        console.log('User HWID:', userData.hwid);
        console.log('Last Login:', userData.lastlogin);
        console.log('Banned Status:', userData.banned);
        console.log('Subscriptions:', userData.subscriptions);
    } catch (error) {
        console.error('Error getting user data:', error);
    }
}

// Example 2: Ban and manage user
async function manageUser() {
    try {
        // Ban a user
        await keyAuth.banUser('username', 'Violation of terms of service');
        
        // Pause a user
        await keyAuth.pauseUser('username');
        
        // Unpause a user
        await keyAuth.unpauseUser('username');
        
        // Reset a user
        await keyAuth.resetUser('username');
    } catch (error) {
        console.error('Error managing user:', error);
    }
}

// Example 3: Extend user subscription
async function extendUserSubscription() {
    try {
        const response = await keyAuth.extendUser({
            user: 'username',
            sub: 'subscription-name',
            expiry: '30', // 30 days
            activeOnly: true
        });
        console.log('Subscription extended:', response);
    } catch (error) {
        console.error('Error extending subscription:', error);
    }
}

// Example 4: Get user's key
async function getUserKeyInfo() {
    try {
        const response = await keyAuth.getUserKey('username');
        console.log('User key information:', response);
    } catch (error) {
        console.error('Error getting user key:', error);
    }
}

// Example 5: Ban and Unban operations
async function banUnbanOperations() {
    try {
        // Ban a user
        console.log('Banning user...');
        await keyAuth.banUser('username', 'Violation of terms of service');
        
        // Unban the user
        console.log('Unbanning user...');
        await keyAuth.unbanUser('username');
        
        // Ban a license key
        console.log('Banning license key...');
        await keyAuth.banKey({
            key: 'license-key',
            reason: 'Terms violation',
            userToo: false
        });
        
        // Unban the license key
        console.log('Unbanning license key...');
        await keyAuth.unbanKey('license-key');
    } catch (error) {
        console.error('Error in ban/unban operations:', error);
    }
}

// Example 6: Subscription management
async function manageSubscription() {
    try {
        // Pause a subscription
        console.log('Pausing subscription...');
        let response = await keyAuth.pauseSubscription('subscription-name');
        console.log('Subscription pause result:', response);

        // Wait a moment before unpausing (in a real scenario)
        console.log('Waiting before unpausing...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Unpause the subscription
        console.log('Unpausing subscription...');
        response = await keyAuth.unpauseSubscription('subscription-name');
        console.log('Subscription unpause result:', response);
    } catch (error) {
        console.error('Error managing subscription:', error);
    }
}

// Example 7: Time management
async function manageSubscriptionTime() {
    try {
        // Subtract time from subscription
        console.log('Subtracting time from subscription...');
        const response = await keyAuth.subtractTime({
            user: 'username',
            sub: 'subscription-name',
            seconds: '3600' // Subtract 1 hour
        });
        console.log('Time subtraction result:', response);
    } catch (error) {
        console.error('Error managing subscription time:', error);
    }
}

// Example 8: Delete subscription
async function deleteUserSubscription() {
    try {
        // Delete a user's subscription
        console.log('Deleting user subscription...');
        const response = await keyAuth.deleteSubscription({
            user: 'username',
            sub: 'subscription-name'
        });
        console.log('Subscription deletion result:', response);
    } catch (error) {
        console.error('Error deleting subscription:', error);
    }
}

// Example 9: Blacklist Management
async function manageBlacklist() {
    try {
        // Blacklist an IP
        console.log('Blacklisting IP...');
        let response = await keyAuth.addToBlacklist({
            ip: '1.2.3.4',
            reason: 'Suspicious activity'
        });
        console.log('IP blacklist result:', response);

        // Remove IP from blacklist
        console.log('Removing IP from blacklist...');
        response = await keyAuth.removeFromBlacklist({
            data: '1.2.3.4',
            blacktype: 'IP'  // Must be 'IP' or 'HWID'
        });
        console.log('IP removal result:', response);

        // Blacklist a HWID
        console.log('Blacklisting HWID...');
        response = await keyAuth.addToBlacklist({
            hwid: 'example-hwid-string',
            reason: 'Multiple violations'
        });
        console.log('HWID blacklist result:', response);

        // Remove HWID from blacklist
        console.log('Removing HWID from blacklist...');
        response = await keyAuth.removeFromBlacklist({
            data: 'example-hwid-string',
            blacktype: 'HWID'  // Must be 'IP' or 'HWID'
        });
        console.log('HWID removal result:', response);

        // Blacklist a region
        console.log('Blacklisting region...');
        response = await keyAuth.addToBlacklist({
            region: 'example-region',
            country: 'US',
            reason: 'High fraud rate'
        });
        console.log('Region blacklist result:', response);

        // Blacklist an ASN
        console.log('Blacklisting ASN...');
        response = await keyAuth.addToBlacklist({
            asn: '12345',
            reason: 'VPN/Proxy detected'
        });
        console.log('ASN blacklist result:', response);
    } catch (error) {
        console.error('Error managing blacklist:', error);
        // Log more details about the error
        if (error instanceof Error) {
            console.error('Error details:', error.message);
        }
    }
}

// Run all examples
async function runExamples() {
    console.log('Getting user information...');
    await getUserInformation();

    console.log('\nManaging user...');
    await manageUser();

    console.log('\nExtending user subscription...');
    await extendUserSubscription();

    console.log('\nGetting user key information...');
    await getUserKeyInfo();

    console.log('\nPerforming ban/unban operations...');
    await banUnbanOperations();

    console.log('\nManaging subscription...');
    await manageSubscription();

    console.log('\nManaging subscription time...');
    await manageSubscriptionTime();

    console.log('\nDeleting user subscription...');
    await deleteUserSubscription();

    console.log('\nManaging blacklist...');
    await manageBlacklist();
}

// Execute the examples
runExamples().catch(console.error); 