import { decrypt } from "../../api/crypto";
import { logger, extractRequest } from "../../api/log";

const dec = new TextDecoder()

export default async ({ request }: EventContext<any, any, any>): Promise<Response> => {
  if (request.method != "POST") {
    return new Response(null, { status: 405 });
  }
  const { id, password } = await request.json()

  const log = logger("decrypt", { secret_id: id, correlation_id: request.headers.get("CF-ray") })
  log.info("handling request", {
    ...extractRequest(request),
    client_ip: request.headers.get("CF-Connecting-IP")
  })

  const encrypted = await SECRETS.get(id, 'arrayBuffer')
  if (encrypted == null) {
    log.info("secret not found")
    return new Response(null, { status: 404 })
  }
  log.info("got secret")

  let secret: ArrayBuffer
  try {
    secret = await decrypt(encrypted, password)
  } catch (e) {
    log.error("failed to decrypt secret", e)
    return new Response(null, { status: 401 })
  }
  log.info("decrypted secret")

  try {
    await SECRETS.delete(id);
  } catch (e) {
    log.error("failed to delete secret", e)
    return new Response(null, { status: 500 })
  }
  log.info("deleted secret")

  return new Response(
    JSON.stringify({ secret: dec.decode(secret) }),
    { status: 200 }
  );
};
