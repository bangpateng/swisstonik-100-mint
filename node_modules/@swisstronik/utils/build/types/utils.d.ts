export declare const REGEX_HEX_PREFIXED: RegExp;
export declare const REGEX_HEX_NOPREFIX: RegExp;
export declare class BasicTextEncoder {
    encode(value: string): Uint8Array;
}
export declare const TextEncoder: {
    new (): TextEncoder;
    prototype: TextEncoder;
};
export declare class BasicTextDecoder {
    constructor(_?: 'utf-8' | 'utf8');
    decode(value: Uint8Array): string;
}
export declare const TextDecoder: {
    new (label?: string | undefined, options?: TextDecoderOptions | undefined): TextDecoder;
    prototype: TextDecoder;
};
export declare function stringToU8a(value?: string | String): Uint8Array;
/**
 * @name u8aConcat
 * @summary Creates a concatenated Uint8Array from the inputs.
 * @description
 * Concatenates the input arrays into a single `UInt8Array`.
 * @example
 * <BR>
 *
 * u8aConcat(
 *   new Uint8Array([1, 2, 3]),
 *   new Uint8Array([4, 5, 6])
 * ); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export declare function u8aConcat(...list: Uint8Array[]): Uint8Array;
/**
 * @name hexToU8a
 * @summary Creates a Uint8Array object from a hex string.
 * @description
 * `null` inputs returns an empty `Uint8Array` result. Hex input values return the actual bytes value converted to a Uint8Array. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @example
 * <BR>
 *
 * hexToU8a('0x80001f'); // Uint8Array([0x80, 0x00, 0x1f])
 * hexToU8a('0x80001f', 32); // Uint8Array([0x00, 0x80, 0x00, 0x1f])
 * ```
 */
export declare function hexToU8a(_value?: string | null, bitLength?: number): Uint8Array;
/**
 * @name hexStripPrefix
 * @summary Strips any leading `0x` prefix.
 * @description
 * Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.
 * @example
 * <BR>
 *
 * console.log('stripped', hexStripPrefix('0x1234')); // => 1234
 * ```
 */
export declare function hexStripPrefix(value?: string | null): string;
/**
 * @name u8aToHex
 * @summary Creates a hex string from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.
 * @example
 * <BR>
 *
 *
 * u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
 * ```
 */
export declare function u8aToHex(value?: Uint8Array | null, bitLength?: number, isPrefixed?: boolean): string;
//# sourceMappingURL=utils.d.ts.map