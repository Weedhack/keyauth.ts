interface KeyAuthResponse {
    success: boolean;
    message: string;
    [key: string]: any;
}
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
export declare class KeyAuthSeller {
    private readonly sellerKey;
    private readonly baseUrl;
    constructor(sellerKey: string);
    private makeRequest;
    addTime(time: string): Promise<KeyAuthResponse>;
    assignKey(user: string, key: string): Promise<KeyAuthResponse>;
    banKey({ key, reason, userToo }: BanParams): Promise<KeyAuthResponse>;
    addLicense(params: AddLicenseParams): Promise<KeyAuthResponse>;
    activateKey(user: string, key: string, pass: string): Promise<KeyAuthResponse>;
    deleteAllLicenses(): Promise<KeyAuthResponse>;
    deleteLicense({ key, userToo }: DeleteParams): Promise<KeyAuthResponse>;
    deleteMultipleLicenses({ key, userToo }: DeleteParams): Promise<KeyAuthResponse>;
    deleteUsedLicenses(): Promise<KeyAuthResponse>;
    deleteUnusedLicenses(): Promise<KeyAuthResponse>;
    fetchAllKeys(format?: string): Promise<KeyAuthResponse>;
    getKeyInfo(key: string): Promise<KeyInfoResponse>;
    setKeyNote(key: string, note: string): Promise<KeyAuthResponse>;
    verifyKey(key: string): Promise<KeyAuthResponse>;
    pauseUser(username: string): Promise<KeyAuthResponse>;
    unpauseUser(username: string): Promise<KeyAuthResponse>;
    resetUser(user: string): Promise<KeyAuthResponse>;
    getUserData(user: string): Promise<UserDataResponse>;
    banUser(user: string, reason: string): Promise<KeyAuthResponse>;
    extendUser({ user, sub, expiry, activeOnly }: ExtendParams): Promise<KeyAuthResponse>;
    getUserKey(user: string): Promise<KeyAuthResponse>;
    unbanUser(user: string): Promise<KeyAuthResponse>;
    unbanKey(key: string): Promise<KeyAuthResponse>;
    pauseSubscription(subscription: string): Promise<KeyAuthResponse>;
    unpauseSubscription(subscription: string): Promise<KeyAuthResponse>;
}
export {};
