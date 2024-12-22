import hash from 'object-hash';

export function requestToKey(path: string, parameters: any) {
  return `${path}@${hash.sha1(parameters)}`;
}
