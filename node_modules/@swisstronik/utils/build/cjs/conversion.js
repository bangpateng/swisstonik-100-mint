"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethAddressToBech32 = exports.bech32toEthAddress = void 0;
const bech32_1 = require("bech32");
const utils_js_1 = require("./utils.js");
const { encode, decode, toWords, fromWords } = bech32_1.bech32;
const SWTR_PREFIX = "swtr";
/**
 * @name bech32toEthAddress
 * @summary Converts bech32 address with `swtr` prefix to ethereum (0x-prefixed hex) format
 * @description Correct `swtr`-prefixed bech32 input address returns 0x-prefixed hex string. Otherwise, will throw an error
 * @example
 * bech32toEthAddress("swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s"); // 0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A
 *
 */
function bech32toEthAddress(address) {
    const { prefix, words } = decode(address);
    if (prefix !== SWTR_PREFIX) {
        throw Error(`Incorrect prefix. Expected: ${SWTR_PREFIX}, Got: ${prefix}`);
    }
    const addressBytes = Uint8Array.from(fromWords(words));
    return (0, utils_js_1.u8aToHex)(addressBytes);
}
exports.bech32toEthAddress = bech32toEthAddress;
/**
 * @name ethAddressToBech32
 * @summary Converts ethereum address to bech32 with `swtr` prefix
 * @description Correct ethereum address returns bech32-encoded address with `swtr` prefix. Otherwise, will throw an error
 * @example
 * ethAddressToBech32("0x8C3FFC3600BCB365F7141EAF47B5921AEFB7917A"); // swtr13sllcdsqhjektac5r6h50dvjrthm0yt6zw3q4s
 */
function ethAddressToBech32(address) {
    const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    if (!ethAddressRegex.test(address)) {
        throw Error("Invalid ethereum address");
    }
    const addressBytes = (0, utils_js_1.hexToU8a)(address);
    return encode(SWTR_PREFIX, toWords(addressBytes));
}
exports.ethAddressToBech32 = ethAddressToBech32;
//# sourceMappingURL=conversion.js.map