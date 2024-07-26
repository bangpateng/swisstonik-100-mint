import { VerifiableCredential } from "./types.js";
/**
 * Encodes provided Verifiable Credential to RLP format
 * @param credential W3C Verifiable Credential
 */
export declare function encodeVerifiableCredentialToRLP(credential: VerifiableCredential): string;
/**
 * Creates data for transaction / call to contract, which support `authorize` function
 * and can verify provided verifiable credential
 * @param credential Verifiable Credential
 */
export declare function encodeTxDataWithVC(credential: VerifiableCredential): string;
//# sourceMappingURL=coder.d.ts.map