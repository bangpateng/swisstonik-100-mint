import axios from 'axios';
export async function getNodePublicKey(rpcEndpoint, options) {
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
        const { data } = await axios.post(rpcEndpoint, requestData);
        if (!data.result) {
            throw new Error('corrupted response');
        }
        return { publicKey: data.result };
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            return { error: err.message };
        }
        else {
            return {
                error: `Cannot get node public key: an unexpected error occurred: ${err}`,
            };
        }
    }
}
//# sourceMappingURL=rpc.js.map