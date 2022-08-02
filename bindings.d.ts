export {};

import "@cloudflare/workers-types"

declare global {
  const SECRETS: KVNamespace;
}