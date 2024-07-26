/**
 * @name bech32toEthAddress
 * @summary Converts bech32 address with `swtr` prefix to ethereum (0x-prefixed hex) format
 * @description Correct `swtr`-prefixed bech32 input address returns 0x-prefixed hex string. Otherwise, will throw an error
 * @example
 * bech32toEthAddress("swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"); // 0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A
 *
 */
export declare function bech32toEthAddress(address: string): string;
/**
 * @name ethAddressToBech32
 * @summary Converts ethereum address to bech32 with `swtr` prefix
 * @description Correct ethereum address returns bech32-encoded address with `swtr` prefix. Otherwise, will throw an error
 * @example
 * ethAddressToBech32("0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A"); // swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s
 */
export declare function ethAddressToBech32(address: string): string;
//# sourceMappingURL=conversion.d.ts.map