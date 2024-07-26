"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeTxDataWithVC = exports.encodeVerifiableCredentialToRLP = void 0;
const ethers_1 = require("ethers");
const rlp_1 = __importDefault(require("rlp"));
const utils_js_1 = require("../utils.js");
/**
 * Encodes provided Verifiable Credential to RLP format
 * @param credential W3C Verifiable Credential
 */
function encodeVerifiableCredentialToRLP(credential) {
    if (credential.proof["type"] !== "JwtProof2020") {
        throw new Error(`encodeVerifiableCredentialToRLP: unsupported proof type: ${credential.proof["type"]}`);
    }
    const proof = credential.proof["jwt"];
    return (0, utils_js_1.u8aToHex)(rlp_1.default.encode(proof));
}
exports.encodeVerifiableCredentialToRLP = encodeVerifiableCredentialToRLP;
/**
 * Creates data for transaction / call to contract, which support `authorize` function
 * and can verify provided verifiable credential
 * @param credential Verifiable Credential
 */
function encodeTxDataWithVC(credential) {
    const functionSignature = "function authorize(bytes proof)";
    const contractInterface = new ethers_1.ethers.utils.Interface([functionSignature]);
    const encodedCredential = encodeVerifiableCredentialToRLP(credential);
    return contractInterface.encodeFunctionData("authorize", [encodedCredential]);
}
exports.encodeTxDataWithVC = encodeTxDataWithVC;
//# sourceMappingURL=coder.js.map