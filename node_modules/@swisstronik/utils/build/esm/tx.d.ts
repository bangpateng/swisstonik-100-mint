/**
 * Encrypts provided transaction data using random or provided encryption key using the provided public key
 * @param nodePublicKey Public key of the node, acquired via eth_getNodePublicKey
 * @param data Raw transaction `data` field
 * @param userEncryptionKey Encryption key which will be used as user encryption key for that transaction
 * @returns Encrypted `data` field for transaction in hex format
 */
export declare function encryptDataFieldWithPublicKey(nodePublicKey: string, data: string | Uint8Array, userEncryptionKey?: Uint8Array): [string, Uint8Array];
/**
 * Encrypts provided transaction data using random or provided encryption key
 * @param nodeURL URL of node with JSON-RPC (for example 127.0.0.1:8545)
 * @param data Raw transaction `data` field
 * @param userEncryptionKey Encryption key which will be used as user encryption key for that transaction
 * @returns Encrypted `data` field for transaction in hex format
 */
export declare function encryptDataField(nodeURL: string, data: string, userEncryptionKey?: Uint8Array): Promise<[string, Uint8Array]>;
/**
 * Decrypts node response (call / transaction result data) using the provided public key
 * @param nodePublicKey Public key of the node, acquired via eth_getNodePublicKey
 * @param encryptedResponse Encrypted returned data
 * @param encryptionKey Key used for encryption
 * @returns Decrypted result
 */
export declare function decryptNodeResponseWithPublicKey(nodePublicKey: string, encryptedResponse: string | Uint8Array, encryptionKey: Uint8Array): Uint8Array;
/**
 * Decrypts node response (call / transaction result data)
 * @param nodeURL URL of node with JSON-RPC (for example 127.0.0.1:8545)
 * @param encryptedResponse Encrypted returned data
 * @param encryptionKey Key used for encryption
 * @returns Decrypted result
 */
export declare function decryptNodeResponse(nodeURL: string, encryptedResponse: string, encryptionKey: Uint8Array): Promise<Uint8Array>;
//# sourceMappingURL=tx.d.ts.map