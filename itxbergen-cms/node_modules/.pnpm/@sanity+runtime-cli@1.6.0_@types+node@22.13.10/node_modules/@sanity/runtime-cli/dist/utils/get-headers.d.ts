import type { AuthParams } from './types.js';
export default function getHeaders({ token, projectId }: AuthParams): {
    Accept: string;
    'Content-Type': string;
    Authorization: string;
    'X-Sanity-Scope-Type': string;
    'X-Sanity-Scope-Id': string;
};
