function evaluateThis(fn) {
    return fn('return this');
}
export const xglobal = 
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