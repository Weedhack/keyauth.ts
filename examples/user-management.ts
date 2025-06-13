import { KeyAuthSeller } from '../library';

// Initialize the KeyAuth seller client
const keyAuth = new KeyAuthSeller('YOUR_SELLER_KEY');

async function demonstrateUserManagement() {
  try {
    // User Management Examples
    console.log('=== User Management Examples ===');

    // Get user data
    const userData = await keyAuth.getUserData('username123');
    console.log('User Data:', userData);

    // Ban a user
    const banResult = await keyAuth.banUser('username123', 'Violation of terms');
    console.log('Ban Result:', banResult);

    // Unban a user
    const unbanResult = await keyAuth.unbanUser('username123');
    console.log('Unban Result:', unbanResult);

    // Reset a user
    const resetResult = await keyAuth.resetUser('username123');
    console.log('Reset Result:', resetResult);

    // Pause a user
    const pauseResult = await keyAuth.pauseUser('username123');
    console.log('Pause Result:', pauseResult);

    // Unpause a user
    const unpauseResult = await keyAuth.unpauseUser('username123');
    console.log('Unpause Result:', unpauseResult);

    // Set user balance
    const balanceResult = await keyAuth.setBalance({
      username: 'username123',
      day: '1',
      week: '2',
      month: '1',
      threemonth: '0',
      sixmonth: '0',
      lifetime: '0'
    });
    console.log('Set Balance Result:', balanceResult);

    // Reseller Management Examples
    console.log('\n=== Reseller Management Examples ===');

    // Add a new reseller account
    const addResellerResult = await keyAuth.addResellerAccount({
      user: 'reseller123',
      pass: 'securepassword123',
      keylevels: '1,2,3',
      email: 'reseller@example.com'
    });
    console.log('Add Reseller Result:', addResellerResult);

    // Delete a reseller account
    const deleteResellerResult = await keyAuth.deleteAccount({
      user: 'reseller123'
    });
    console.log('Delete Reseller Result:', deleteResellerResult);

    // Fetch all resellers and managers
    const teamData = await keyAuth.fetchTeam();
    console.log('Team Data:', teamData);

    // Get reseller balance
    const resellerBalance = await keyAuth.getResellerBalance({
      username: 'reseller123',
      appname: 'MyApp'
    });
    console.log('Reseller Balance:', resellerBalance);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the examples
demonstrateUserManagement(); 