"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodePublicKey = void 0;
const axios_1 = __importDefault(require("axios"));
async function getNodePublicKey(rpcEndpoint, options) {
    let blockNumber = 'latest';
    if (options) {
        if (options.blockNumber) {
            blockNumber = options.blockNumber;
        }
    }
    const requestData = {
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_getNodePublicKey',
        params: [blockNumber],
    };
    try {
        const { data } = await axios_1.default.post(rpcEndpoint, requestData);
        if (!data.result) {
            throw new Error('corrupted response');
        }
        return { publicKey: data.result };
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            return { error: err.message };
        }
        else {
            return {
                error: `Cannot get node public key: an unexpected error occurred: ${err}`,
            };
        }
    }
}
exports.getNodePublicKey = getNodePublicKey;
//# sourceMappingURL=rpc.js.map