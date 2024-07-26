"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xglobal = void 0;
function evaluateThis(fn) {
    return fn('return this');
}
exports.xglobal = 
/* eslint-disable no-restricted-globals */
typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
            ? self
            : typeof window !== 'undefined'
                ? window
                : evaluateThis(Function);
//# sourceMappingURL=global.js.map