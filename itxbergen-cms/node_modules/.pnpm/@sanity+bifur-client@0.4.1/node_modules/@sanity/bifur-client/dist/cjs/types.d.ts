import type { Observable } from 'rxjs';
export declare type RequestMethod = 'doc' | 'query' | 'mutate' | 'presence_rollcall' | 'presence_announce' | 'presence_disconnect' | 'authorization';
export declare type SubscribeMethods = 'presence' | 'listen' | 'authorization';
export declare type RequestParams = Record<string, any>;
export declare type JSONRpcMessage<T> = {
    jsonrpc: string;
    id: string;
    method: string;
    params: RequestParams;
    result: T;
};
export interface BifurClient {
    heartbeats: Observable<Date>;
    listen: <T>(method: SubscribeMethods, params?: RequestParams) => Observable<T>;
    request: <T>(method: RequestMethod, params?: RequestParams) => Observable<T>;
}
export interface SanityClientLike {
    config(): {
        dataset: string;
        token?: string;
    };
    getUrl(path: string): string;
}
