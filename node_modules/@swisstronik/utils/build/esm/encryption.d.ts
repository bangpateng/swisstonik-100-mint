export declare const TX_KEY_PREFIX = "IOEncryptionKeyV1";
export declare const USER_KEY_PREFIX = "UserEncryptionKeyV1";
export declare function deriveEncryptionKey(privateKey: Uint8Array, salt: Uint8Array): Uint8Array;
export declare function deriveSharedSecret(privateKey: Uint8Array, publicKey: Uint8Array): Uint8Array;
export declare function getX25519PublicKey(privateKey: Uint8Array): Uint8Array;
interface CryptoResult {
    result?: Uint8Array;
    error?: string;
}
export declare function encryptECDH(privateKey: Uint8Array, nodePublicKey: Uint8Array, data: Uint8Array): CryptoResult;
export declare function decryptECDH(privateKey: Uint8Array, nodePublicKey: Uint8Array, encryptedData: Uint8Array): CryptoResult;
export declare function encrypt(privateKey: Uint8Array, data: Uint8Array): CryptoResult;
export declare function decrypt(privateKey: Uint8Array, encryptedData: Uint8Array): CryptoResult;
export {};
//# sourceMappingURL=encryption.d.ts.map