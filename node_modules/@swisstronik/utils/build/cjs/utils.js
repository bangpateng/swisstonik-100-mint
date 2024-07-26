"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.u8aToHex = exports.hexStripPrefix = exports.hexToU8a = exports.u8aConcat = exports.stringToU8a = exports.TextDecoder = exports.BasicTextDecoder = exports.TextEncoder = exports.BasicTextEncoder = exports.REGEX_HEX_NOPREFIX = exports.REGEX_HEX_PREFIXED = void 0;
const global_js_1 = require("./global.js");
exports.REGEX_HEX_PREFIXED = /^0x[\da-fA-F]+$/;
exports.REGEX_HEX_NOPREFIX = /^[\da-fA-F]+$/;
const SWTR_PREFIX = "swtr";
const U8_TO_HEX = new Array(256);
const U16_TO_HEX = new Array(256 * 256);
const HEX_TO_U8 = {};
const HEX_TO_U16 = {};
for (let n = 0; n < 256; n++) {
    const hex = n.toString(16).padStart(2, '0');
    U8_TO_HEX[n] = hex;
    HEX_TO_U8[hex] = n;
}
for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
        const hex = U8_TO_HEX[i] + U8_TO_HEX[j];
        // eslint-disable-next-line no-bitwise
        const n = (i << 8) | j;
        U16_TO_HEX[n] = hex;
        HEX_TO_U16[hex] = n;
    }
}
class BasicTextEncoder {
    encode(value) {
        const u8a = new Uint8Array(value.length);
        for (let i = 0; i < value.length; i++) {
            u8a[i] = value.charCodeAt(i);
        }
        return u8a;
    }
}
exports.BasicTextEncoder = BasicTextEncoder;
exports.TextEncoder = typeof global_js_1.xglobal.TextEncoder === 'undefined'
    ? BasicTextEncoder
    : global_js_1.xglobal.TextEncoder;
class BasicTextDecoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-useless-constructor
    constructor(_) {
        // nothing
    }
    decode(value) {
        let result = '';
        for (let i = 0; i < value.length; i++) {
            result += String.fromCharCode(value[i]);
        }
        return result;
    }
}
exports.BasicTextDecoder = BasicTextDecoder;
exports.TextDecoder = typeof global_js_1.xglobal.TextEncoder === 'undefined'
    ? BasicTextDecoder
    : global_js_1.xglobal.TextDecoder;
const encoder = new exports.TextEncoder();
// eslint-disable-next-line @typescript-eslint/ban-types
function stringToU8a(value) {
    return value ? encoder.encode(value.toString()) : new Uint8Array();
}
exports.stringToU8a = stringToU8a;
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
function u8aConcat(...list) {
    let length = 0;
    let offset = 0;
    const u8as = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
        u8as[i] = list[i];
        length += u8as[i].length;
    }
    const result = new Uint8Array(length);
    for (let i = 0; i < u8as.length; i++) {
        result.set(u8as[i], offset);
        offset += u8as[i].length;
    }
    return result;
}
exports.u8aConcat = u8aConcat;
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
function hexToU8a(_value, bitLength = -1) {
    if (!_value) {
        return new Uint8Array();
    }
    const value = hexStripPrefix(_value).toLowerCase();
    const valLength = value.length / 2;
    const endLength = Math.ceil(bitLength === -1 ? valLength : bitLength / 8);
    const result = new Uint8Array(endLength);
    const offset = endLength > valLength ? endLength - valLength : 0;
    const dv = new DataView(result.buffer, offset);
    const mod = (endLength - offset) % 2;
    const length = endLength - offset - mod;
    for (let i = 0; i < length; i += 2) {
        dv.setUint16(i, HEX_TO_U16[value.substr(i * 2, 4)]);
    }
    if (mod) {
        dv.setUint8(length, HEX_TO_U8[value.substr(value.length - 2, 2)]);
    }
    return result;
}
exports.hexToU8a = hexToU8a;
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
function hexStripPrefix(value) {
    if (!value || value === '0x') {
        return '';
    }
    if (exports.REGEX_HEX_PREFIXED.test(value)) {
        return value.substr(2);
    }
    if (exports.REGEX_HEX_NOPREFIX.test(value)) {
        return value;
    }
    throw new Error(`Expected hex value to convert, found '${value}'`);
}
exports.hexStripPrefix = hexStripPrefix;
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
function u8aToHex(value, bitLength = -1, isPrefixed = true) {
    const length = Math.ceil(bitLength / 8);
    return `${isPrefixed ? '0x' : ''}${!value || !value.length
        ? ''
        : length > 0 && value.length > length
            ? `${hex(value.subarray(0, length / 2))}…${hex(value.subarray(value.length - length / 2))}`
            : hex(value)}`;
}
exports.u8aToHex = u8aToHex;
/** @internal */
function hex(value) {
    const mod = value.length % 2;
    const length = value.length - mod;
    const dv = new DataView(value.buffer, value.byteOffset);
    let result = '';
    for (let i = 0; i < length; i += 2) {
        result += U16_TO_HEX[dv.getUint16(i)];
    }
    if (mod) {
        result += U8_TO_HEX[dv.getUint8(length)];
    }
    return result;
}
//# sourceMappingURL=utils.js.map