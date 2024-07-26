"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptNodeResponse = exports.decryptNodeResponseWithPublicKey = exports.encryptDataField = exports.encryptDataFieldWithPublicKey = void 0;
const encryption_js_1 = require("./encryption.js");
const utils_js_1 = require("./utils.js");
const rpc_js_1 = require("./rpc.js");
const tweetnacl_1 = require("tweetnacl");
/**
 * Encrypts provided transaction data using random or provided encryption key using the provided public key
 * @param nodePublicKey Public key of the node, acquired via eth_getNodePublicKey
 * @param data Raw transaction `data` field
 * @param userEncryptionKey Encryption key which will be used as user encryption key for that transaction
 * @returns Encrypted `data` field for transaction in hex format
 */
function encryptDataFieldWithPublicKey(nodePublicKey, data, userEncryptionKey) {
    // Generate random user encryption key if is not provided
    userEncryptionKey = userEncryptionKey != null ? userEncryptionKey : (0, tweetnacl_1.randomBytes)(32);
    // Create encryption key using KDF
    const encryptionPrivateKey = (0, encryption_js_1.deriveEncryptionKey)(userEncryptionKey, (0, utils_js_1.stringToU8a)(encryption_js_1.USER_KEY_PREFIX));
    let dataEncoded = typeof data === "string" ? (0, utils_js_1.hexToU8a)(data) : data;
    // Encrypt data
    const encryptionResult = (0, encryption_js_1.encryptECDH)(encryptionPrivateKey, (0, utils_js_1.hexToU8a)(nodePublicKey), dataEncoded);
    if (!encryptionResult.result) {
        throw new Error(`Encryption error. Reason: ${encryptionResult.error}`);
    }
    return [(0, utils_js_1.u8aToHex)(encryptionResult.result), userEncryptionKey];
}
exports.encryptDataFieldWithPublicKey = encryptDataFieldWithPublicKey;
/**
 * Encrypts provided transaction data using random or provided encryption key
 * @param nodeURL URL of node with JSON-RPC (for example 127.0.0.1:8545)
 * @param data Raw transaction `data` field
 * @param userEncryptionKey Encryption key which will be used as user encryption key for that transaction
 * @returns Encrypted `data` field for transaction in hex format
 */
async function encryptDataField(nodeURL, data, userEncryptionKey) {
    // Generate random user encryption key if is not provided
    userEncryptionKey = userEncryptionKey != null ? userEncryptionKey : (0, tweetnacl_1.randomBytes)(32);
    // Create encryption key using KDF
    const encryptionPrivateKey = (0, encryption_js_1.deriveEncryptionKey)(userEncryptionKey, (0, utils_js_1.stringToU8a)(encryption_js_1.USER_KEY_PREFIX));
    // Obtain node public key
    const nodePublicKeyResponse = await (0, rpc_js_1.getNodePublicKey)(nodeURL);
    if (!nodePublicKeyResponse.publicKey) {
        throw new Error(`Cannot obtain node public key. Reason: ${nodePublicKeyResponse.error}`);
    }
    const nodePublicKey = nodePublicKeyResponse.publicKey;
    // Encrypt data
    const encryptionResult = (0, encryption_js_1.encryptECDH)(encryptionPrivateKey, (0, utils_js_1.hexToU8a)(nodePublicKey), (0, utils_js_1.hexToU8a)(data));
    if (!encryptionResult.result) {
        throw new Error(`Encryption error. Reason: ${encryptionResult.error}`);
    }
    return [(0, utils_js_1.u8aToHex)(encryptionResult.result), userEncryptionKey];
}
exports.encryptDataField = encryptDataField;
/**
 * Decrypts node response (call / transaction result data) using the provided public key
 * @param nodePublicKey Public key of the node, acquired via eth_getNodePublicKey
 * @param encryptedResponse Encrypted returned data
 * @param encryptionKey Key used for encryption
 * @returns Decrypted result
 */
function decryptNodeResponseWithPublicKey(nodePublicKey, encryptedResponse, encryptionKey) {
    // Create encryption key using KDF
    const encryptionPrivateKey = (0, encryption_js_1.deriveEncryptionKey)(encryptionKey, (0, utils_js_1.stringToU8a)(encryption_js_1.USER_KEY_PREFIX));
    let responseEncoded = typeof encryptedResponse === "string" ? (0, utils_js_1.hexToU8a)(encryptedResponse) : encryptedResponse;
    const decryptionResult = (0, encryption_js_1.decryptECDH)(encryptionPrivateKey, (0, utils_js_1.hexToU8a)(nodePublicKey), responseEncoded);
    if (!decryptionResult.result) {
        throw new Error(`Decryption error. Reason: ${decryptionResult.error}`);
    }
    return decryptionResult.result;
}
exports.decryptNodeResponseWithPublicKey = decryptNodeResponseWithPublicKey;
/**
 * Decrypts node response (call / transaction result data)
 * @param nodeURL URL of node with JSON-RPC (for example 127.0.0.1:8545)
 * @param encryptedResponse Encrypted returned data
 * @param encryptionKey Key used for encryption
 * @returns Decrypted result
 */
async function decryptNodeResponse(nodeURL, encryptedResponse, encryptionKey) {
    // Create encryption key using KDF
    const encryptionPrivateKey = (0, encryption_js_1.deriveEncryptionKey)(encryptionKey, (0, utils_js_1.stringToU8a)(encryption_js_1.USER_KEY_PREFIX));
    // Obtain node public key
    const nodePublicKeyResponse = await (0, rpc_js_1.getNodePublicKey)(nodeURL);
    if (!nodePublicKeyResponse.publicKey) {
        throw new Error(`Cannot obtain node public key. Reason: ${nodePublicKeyResponse.error}`);
    }
    const nodePublicKey = nodePublicKeyResponse.publicKey;
    const decryptionResult = (0, encryption_js_1.decryptECDH)(encryptionPrivateKey, (0, utils_js_1.hexToU8a)(nodePublicKey), (0, utils_js_1.hexToU8a)(encryptedResponse));
    if (!decryptionResult.result) {
        throw new Error(`Decryption error. Reason: ${decryptionResult.error}`);
    }
    return decryptionResult.result;
}
exports.decryptNodeResponse = decryptNodeResponse;
//# sourceMappingURL=tx.js.map