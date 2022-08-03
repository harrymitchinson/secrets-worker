export {};

import "@cloudflare/workers-types"
import React from "react";

declare global {
  const SECRETS: KVNamespace;
  const window: any;
  const localStorage: any;
}