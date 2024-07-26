interface GetNodePublicKeyOptions {
    blockNumber?: string;
}
interface GetNodePublicKeyResult {
    publicKey?: string;
    error?: string;
}
export declare function getNodePublicKey(rpcEndpoint: string, options?: GetNodePublicKeyOptions): Promise<GetNodePublicKeyResult>;
export {};
//# sourceMappingURL=rpc.d.ts.map