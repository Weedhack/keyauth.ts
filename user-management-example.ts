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
}

// Execute the examples
runExamples().catch(console.error); 