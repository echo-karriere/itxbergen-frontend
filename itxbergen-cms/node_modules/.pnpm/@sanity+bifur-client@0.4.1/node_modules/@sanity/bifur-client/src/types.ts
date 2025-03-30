import type {Observable} from 'rxjs'

export type RequestMethod =
  | 'doc'
  | 'query'
  | 'mutate'
  | 'presence_rollcall'
  | 'presence_announce'
  | 'presence_disconnect'
  // authorization is both a request method (performs actual authorization) _AND_
  // a subscription method (emits authorization events, eg expiring tokens)
  | 'authorization'

export type SubscribeMethods =
  | 'presence'
  | 'listen'
  // authorization is both a request method (performs actual authorization) _AND_
  // a subscription method (emits authorization events, eg expiring tokens)
  | 'authorization'

export type RequestParams = Record<string, any>

export type JSONRpcMessage<T> = {
  jsonrpc: string
  id: string
  method: string
  params: RequestParams
  result: T
}

export interface BifurClient {
  heartbeats: Observable<Date>
  listen: <T>(method: SubscribeMethods, params?: RequestParams) => Observable<T>
  request: <T>(method: RequestMethod, params?: RequestParams) => Observable<T>
}

export interface SanityClientLike {
  config(): {dataset: string; token?: string}
  getUrl(path: string): string
}
