// Strict ESM env, designed to run outside Node.js in envs that provide WebCrypto (deno, browsers, etc)

export default function getRandomValues(typedArray) {
  const crypto =
    typeof window !== 'undefined' && 'crypto' in window
      ? window.crypto
      : globalThis.crypto

  if (!crypto || !crypto.getRandomValues) {
    throw new Error('WebCrypto not available in this environment')
  }

  return crypto.getRandomValues(typedArray)
}
