"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.decryptECDH = exports.encryptECDH = exports.getX25519PublicKey = exports.deriveSharedSecret = exports.deriveEncryptionKey = exports.USER_KEY_PREFIX = exports.TX_KEY_PREFIX = void 0;
const hmac_1 = require("@noble/hashes/hmac");
const sha256_1 = require("@noble/hashes/sha256");
const nacl = __importStar(require("tweetnacl"));
const deoxysii = __importStar(require("@oasisprotocol/deoxysii"));
const tweetnacl_1 = require("tweetnacl");
const utils_js_1 = require("./utils.js");
exports.TX_KEY_PREFIX = 'IOEncryptionKeyV1';
exports.USER_KEY_PREFIX = 'UserEncryptionKeyV1';
function deriveEncryptionKey(privateKey, salt) {
    return hmac_1.hmac.create(sha256_1.sha256, salt).update(privateKey).digest();
}
exports.deriveEncryptionKey = deriveEncryptionKey;
function deriveSharedSecret(privateKey, publicKey) {
    return nacl.scalarMult(privateKey, publicKey);
}
exports.deriveSharedSecret = deriveSharedSecret;
function getX25519PublicKey(privateKey) {
    return nacl.scalarMult.base(privateKey);
}
exports.getX25519PublicKey = getX25519PublicKey;
function encryptECDH(privateKey, nodePublicKey, data) {
    try {
        // Derive shared key
        const sharedSecret = deriveSharedSecret(privateKey, nodePublicKey);
        // Derive encryption key
        const encryptionKey = deriveEncryptionKey(sharedSecret, (0, utils_js_1.stringToU8a)(exports.TX_KEY_PREFIX));
        // Encrypt data
        const encryptionResult = encrypt(encryptionKey, data);
        if (encryptionResult.error) {
            return encryptionResult;
        }
        // Add user public key as prefix
        const userPublicKey = getX25519PublicKey(privateKey);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return { result: (0, utils_js_1.u8aConcat)(userPublicKey, encryptionResult.result) };
    }
    catch (e) {
        if (typeof e === 'string') {
            return { error: e };
        }
        else if (e instanceof Error) {
            return { error: e.message };
        }
        else {
            return { error: 'encryptECDH error' };
        }
    }
}
exports.encryptECDH = encryptECDH;
function decryptECDH(privateKey, nodePublicKey, encryptedData) {
    try {
        // Derive shared key
        const sharedSecret = deriveSharedSecret(privateKey, nodePublicKey);
        // Derive encryption key
        const encryptionKey = deriveEncryptionKey(sharedSecret, (0, utils_js_1.stringToU8a)(exports.TX_KEY_PREFIX));
        // Encrypt data
        return decrypt(encryptionKey, encryptedData);
    }
    catch (e) {
        if (typeof e === 'string') {
            return { error: e };
        }
        else if (e instanceof Error) {
            return { error: e.message };
        }
        else {
            return { error: 'decryptECDH error' };
        }
    }
}
exports.decryptECDH = decryptECDH;
function encrypt(privateKey, data) {
    try {
        const nonce = (0, tweetnacl_1.randomBytes)(deoxysii.NonceSize);
        const ad = (0, tweetnacl_1.randomBytes)(deoxysii.TagSize);
        const cipher = new deoxysii.AEAD(privateKey);
        const ciphertext = cipher.encrypt(nonce, data, ad);
        const encryptedData = (0, utils_js_1.u8aConcat)(nonce, ad, ciphertext);
        return { result: encryptedData };
    }
    catch (e) {
        if (typeof e === 'string') {
            return { error: e };
        }
        else if (e instanceof Error) {
            return { error: e.message };
        }
        else {
            return { error: 'decryption error' };
        }
    }
}
exports.encrypt = encrypt;
function decrypt(privateKey, encryptedData) {
    try {
        const nonce = encryptedData.subarray(0, deoxysii.NonceSize);
        const ad = encryptedData.subarray(deoxysii.NonceSize, deoxysii.NonceSize + deoxysii.TagSize);
        const ciphertext = encryptedData.subarray(deoxysii.NonceSize + deoxysii.TagSize);
        const cipher = new deoxysii.AEAD(privateKey);
        const plaintext = cipher.decrypt(nonce, ciphertext, ad);
        return { result: plaintext };
    }
    catch (e) {
        if (typeof e === 'string') {
            return { error: e };
        }
        else if (e instanceof Error) {
            return { error: e.message };
        }
        else {
            return { error: 'decryption error' };
        }
    }
}
exports.decrypt = decrypt;
//# sourceMappingURL=encryption.js.map