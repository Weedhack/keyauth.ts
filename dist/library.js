"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyAuthSeller = void 0;
const axios_1 = __importDefault(require("axios"));
class KeyAuthSeller {
    constructor(sellerKey) {
        this.baseUrl = 'https://keyauth.win/api/seller/';
        this.sellerKey = sellerKey;
    }
    async makeRequest(type, params = {}) {
        try {
            const queryParams = new URLSearchParams({ sellerkey: this.sellerKey, type, ...params });
            const response = await axios_1.default.get(`${this.baseUrl}?${queryParams}`);
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
}
exports.KeyAuthSeller = KeyAuthSeller;
