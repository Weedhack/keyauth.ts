import axios, { AxiosResponse, AxiosError } from 'axios';

// Response type for KeyAuth API responses
interface KeyAuthResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

// Key info response type
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

// User data response type
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

// Types for various parameters
interface AddLicenseParams {
  format?: string;
  expiry?: string;
  mask?: string;
  level?: string;
  amount?: string;
  owner?: string;
  character?: string;
  note?: string;
}

interface BanParams {
  key: string;
  reason: string;
  userToo?: boolean;
}

interface DeleteParams {
  key: string;
  userToo?: boolean;
}

interface ExtendParams {
  user: string;
  sub: string;
  expiry: string;
  activeOnly?: boolean;
}

interface SubtractTimeParams {
  user: string;
  sub: string;
  seconds: string;
}

interface DeleteSubParams {
  user: string;
  sub: string;
}

interface BlacklistParams {
  ip?: string;
  hwid?: string;
  region?: string;
  country?: string;
  asn?: string;
  reason?: string;
}

type BlacklistType = 'IP' | 'HWID';

interface RemoveFromBlacklistParams {
  data: string;
  blacktype: BlacklistType;
}

export class KeyAuthSeller {
  private readonly sellerKey: string;
  private readonly baseUrl = 'https://keyauth.win/api/seller/';

  constructor(sellerKey: string) {
    this.sellerKey = sellerKey;
  }

  private async makeRequest<T = KeyAuthResponse>(type: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const queryParams = new URLSearchParams({ sellerkey: this.sellerKey, type, ...params });
      const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}?${queryParams}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`KeyAuth API Error: ${axiosError.message}`);
    }
  }

  // Add time to unused keys
  async addTime(time: string): Promise<KeyAuthResponse> {
    return this.makeRequest('addtime', { time });
  }

  // Assign key to user
  async assignKey(user: string, key: string): Promise<KeyAuthResponse> {
    return this.makeRequest('assignkey', { user, key });
  }

  // Ban a license key
  async banKey({ key, reason, userToo = false }: BanParams): Promise<KeyAuthResponse> {
    return this.makeRequest('ban', { key, reason, userToo: userToo ? 1 : 0 });
  }

  // Add license(s)
  async addLicense(params: AddLicenseParams): Promise<KeyAuthResponse> {
    return this.makeRequest('add', params);
  }

  // Activate a key for a user
  async activateKey(user: string, key: string, pass: string): Promise<KeyAuthResponse> {
    return this.makeRequest('activate', { user, key, pass });
  }

  // Delete all licenses
  async deleteAllLicenses(): Promise<KeyAuthResponse> {
    return this.makeRequest('delalllicenses');
  }

  // Delete a single license
  async deleteLicense({ key, userToo = false }: DeleteParams): Promise<KeyAuthResponse> {
    return this.makeRequest('del', { key, userToo: userToo ? 1 : 0 });
  }

  // Delete multiple licenses
  async deleteMultipleLicenses({ key, userToo = false }: DeleteParams): Promise<KeyAuthResponse> {
    return this.makeRequest('delmultiple', { key, userToo: userToo ? 1 : 0 });
  }

  // Delete used licenses
  async deleteUsedLicenses(): Promise<KeyAuthResponse> {
    return this.makeRequest('delused');
  }

  // Delete unused licenses
  async deleteUnusedLicenses(): Promise<KeyAuthResponse> {
    return this.makeRequest('delunused');
  }

  // Fetch all keys
  async fetchAllKeys(format?: string): Promise<KeyAuthResponse> {
    return this.makeRequest('fetchallkeys', format ? { format } : {});
  }

  // Get key info
  async getKeyInfo(key: string): Promise<KeyInfoResponse> {
    return this.makeRequest<KeyInfoResponse>('info', { key });
  }

  // Set note for a key
  async setKeyNote(key: string, note: string): Promise<KeyAuthResponse> {
    return this.makeRequest('setnote', { key, note });
  }

  // Verify a key
  async verifyKey(key: string): Promise<KeyAuthResponse> {
    return this.makeRequest('verify', { key });
  }

  // Pause a user
  async pauseUser(username: string): Promise<KeyAuthResponse> {
    return this.makeRequest('pauseuser', { username });
  }

  // Unpause a user
  async unpauseUser(username: string): Promise<KeyAuthResponse> {
    return this.makeRequest('unpauseuser', { username });
  }

  // Reset a user
  async resetUser(user: string): Promise<KeyAuthResponse> {
    return this.makeRequest('resetuser', { user });
  }

  // Get user data
  async getUserData(user: string): Promise<UserDataResponse> {
    return this.makeRequest<UserDataResponse>('userdata', { user });
  }

  // Ban a user
  async banUser(user: string, reason: string): Promise<KeyAuthResponse> {
    return this.makeRequest('banuser', { user, reason });
  }

  // Extend user subscription
  async extendUser({ user, sub, expiry, activeOnly = false }: ExtendParams): Promise<KeyAuthResponse> {
    return this.makeRequest('extend', {
      user,
      sub,
      expiry,
      activeOnly: activeOnly ? 1 : 0
    });
  }

  // Get user's key
  async getUserKey(user: string): Promise<KeyAuthResponse> {
    return this.makeRequest('getkey', { user });
  }

  // Unban a user
  async unbanUser(user: string): Promise<KeyAuthResponse> {
    return this.makeRequest('unbanuser', { user });
  }

  // Unban a license key
  async unbanKey(key: string): Promise<KeyAuthResponse> {
    return this.makeRequest('unban', { key });
  }

  // Pause a subscription
  async pauseSubscription(subscription: string): Promise<KeyAuthResponse> {
    return this.makeRequest('pausesub', { subscription });
  }

  // Unpause a subscription
  async unpauseSubscription(subscription: string): Promise<KeyAuthResponse> {
    return this.makeRequest('unpausesub', { subscription });
  }

  // Subtract time from user's subscription
  async subtractTime({ user, sub, seconds }: SubtractTimeParams): Promise<KeyAuthResponse> {
    return this.makeRequest('subtract', { user, sub, seconds });
  }

  // Delete user's subscription
  async deleteSubscription({ user, sub }: DeleteSubParams): Promise<KeyAuthResponse> {
    return this.makeRequest('delsub', { user, sub });
  }

  // Add to blacklist (IP, HWID, region, country, or ASN)
  async addToBlacklist(params: BlacklistParams): Promise<KeyAuthResponse> {
    // Filter out undefined parameters
    const blacklistParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );
    
    return this.makeRequest('black', blacklistParams);
  }

  // Remove from blacklist (IP or HWID)
  async removeFromBlacklist({ data, blacktype }: RemoveFromBlacklistParams): Promise<KeyAuthResponse> {
    return this.makeRequest('delblack', { data, blacktype });
  }
} 