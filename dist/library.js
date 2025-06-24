import axios from 'axios';
export class KeyAuthSeller {
    sellerKey;
    baseUrl = 'https://keyauth.win/api/seller/';
    constructor(sellerKey) {
        this.sellerKey = sellerKey;
    }
    async makeRequest(type, params = {}) {
        try {
            const queryParams = new URLSearchParams({ sellerkey: this.sellerKey, type, ...params });
            const response = await axios.get(`${this.baseUrl}?${queryParams}`);
            return response.data;
        }
        catch (error) {
            const axiosError = error;
            throw new Error(`KeyAuth API Error: ${axiosError.message}`);
        }
    }
    // Add time to unused keys
    async addTime(time) {
        return this.makeRequest('addtime', { time });
    }
    // Assign key to user
    async assignKey(user, key) {
        return this.makeRequest('assignkey', { user, key });
    }
    // Ban a license key
    async banKey({ key, reason, userToo = false }) {
        return this.makeRequest('ban', { key, reason, userToo: userToo ? 1 : 0 });
    }
    // Add license(s)
    async addLicense(params) {
        return this.makeRequest('add', params);
    }
    // Activate a key for a user
    async activateKey(user, key, pass) {
        return this.makeRequest('activate', { user, key, pass });
    }
    // Delete all licenses
    async deleteAllLicenses() {
        return this.makeRequest('delalllicenses');
    }
    // Delete a single license
    async deleteLicense({ key, userToo = false }) {
        return this.makeRequest('del', { key, userToo: userToo ? 1 : 0 });
    }
    // Delete multiple licenses
    async deleteMultipleLicenses({ key, userToo = false }) {
        return this.makeRequest('delmultiple', { key, userToo: userToo ? 1 : 0 });
    }
    // Delete used licenses
    async deleteUsedLicenses() {
        return this.makeRequest('delused');
    }
    // Delete unused licenses
    async deleteUnusedLicenses() {
        return this.makeRequest('delunused');
    }
    // Fetch all keys
    async fetchAllKeys(format) {
        return this.makeRequest('fetchallkeys', format ? { format } : {});
    }
    // Get key info
    async getKeyInfo(key) {
        return this.makeRequest('info', { key });
    }
    // Set note for a key
    async setKeyNote(key, note) {
        return this.makeRequest('setnote', { key, note });
    }
    // Verify a key
    async verifyKey(key) {
        return this.makeRequest('verify', { key });
    }
    // Pause a user
    async pauseUser(username) {
        return this.makeRequest('pauseuser', { username });
    }
    // Unpause a user
    async unpauseUser(username) {
        return this.makeRequest('unpauseuser', { username });
    }
    // Reset a user
    async resetUser(user) {
        return this.makeRequest('resetuser', { user });
    }
    // Get user data
    async getUserData(user) {
        return this.makeRequest('userdata', { user });
    }
    // Ban a user
    async banUser(user, reason) {
        return this.makeRequest('banuser', { user, reason });
    }
    // Extend user subscription
    async extendUser({ user, sub, expiry, activeOnly = false }) {
        return this.makeRequest('extend', {
            user,
            sub,
            expiry,
            activeOnly: activeOnly ? 1 : 0
        });
    }
    // Get user's key
    async getUserKey(user) {
        return this.makeRequest('getkey', { user });
    }
    // Unban a user
    async unbanUser(user) {
        return this.makeRequest('unbanuser', { user });
    }
    // Unban a license key
    async unbanKey(key) {
        return this.makeRequest('unban', { key });
    }
    // Pause a subscription
    async pauseSubscription(subscription) {
        return this.makeRequest('pausesub', { subscription });
    }
    // Unpause a subscription
    async unpauseSubscription(subscription) {
        return this.makeRequest('unpausesub', { subscription });
    }
    // Subtract time from user's subscription
    async subtractTime({ user, sub, seconds }) {
        return this.makeRequest('subtract', { user, sub, seconds });
    }
    // Delete user's subscription
    async deleteSubscription({ user, sub }) {
        return this.makeRequest('delsub', { user, sub });
    }
    // Add to blacklist (IP, HWID, region, country, or ASN)
    async addToBlacklist(params) {
        // Filter out undefined parameters
        const blacklistParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined));
        return this.makeRequest('black', blacklistParams);
    }
    // Remove from blacklist (IP or HWID)
    async removeFromBlacklist({ data, blacktype }) {
        // Convert blacktype to lowercase to match API expectations
        const type = 'delblack';
        return this.makeRequest(type, {
            data,
            blacktype: blacktype.toLowerCase() // API might expect lowercase
        });
    }
    // Set user balance
    async setBalance({ username, day, week, month, threemonth, sixmonth, lifetime }) {
        return this.makeRequest('setbalance', {
            username,
            day,
            week,
            month,
            threemonth,
            sixmonth,
            lifetime
        });
    }
    // Add a new reseller account
    async addResellerAccount({ user, pass, keylevels, email, perms }) {
        return this.makeRequest('addAccount', {
            role: 'Reseller', // Hardcoded to Reseller as requested
            user,
            pass,
            keylevels,
            email
        });
    }
    // Delete a reseller or manager account
    async deleteAccount({ user }) {
        return this.makeRequest('deleteAccount', { user });
    }
    // Fetch all resellers and managers
    async fetchTeam() {
        return this.makeRequest('fetchteam');
    }
    // Get reseller balance
    async getResellerBalance({ username, appname }) {
        return this.makeRequest('getbalance', { username, appname });
    }
    // Retrieve all users
    async fetchAllUsers() {
        return this.makeRequest('fetchallusers');
    }
}
