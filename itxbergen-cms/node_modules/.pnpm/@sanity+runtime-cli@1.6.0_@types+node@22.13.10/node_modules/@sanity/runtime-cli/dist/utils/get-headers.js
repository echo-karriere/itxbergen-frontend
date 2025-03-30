export default function getHeaders({ token, projectId }) {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Sanity-Scope-Type': 'project',
        'X-Sanity-Scope-Id': projectId,
    };
}
