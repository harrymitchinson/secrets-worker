import { encrypt } from "../../api/crypto";
import { logger, extractRequest } from "../../api/log";

const generate = (length = 8) => [...crypto.getRandomValues(new Uint8Array(length))]
  .map((x, i) => (i = x / 255 * 61 | 0, String.fromCharCode(i + (i > 9 ? i > 35 ? 61 : 55 : 48))))
  .join("")

export default async (event: EventContext<any, any, any>): Promise<Response> => {
  const request = event.request
  if (request.method != "POST") {
    return new Response(null, { status: 405 });
  }
  const { secret, ttl } = await request.json()

  const id = generate(12)
  const password = generate(24)

  const log = logger("encrypt", { secretId: id, rayId: request.headers.get("CF-ray") })
  log.info("handling request", {
    ...extractRequest(request),
    clientIp: request.headers.get("CF-Connecting-IP")
  })

  let encrypted: ArrayBufferLike
  try {
    encrypted = await encrypt(secret, password);
  } catch (e) {
    log.error("failed to encrypt secret", e)
    return new Response(null, { status: 500 });
  }
  log.info("encypted secret")

  try {
    await SECRETS.put(id, encrypted, { expirationTtl: ttl });
  } catch (e) {
    log.error("failed to save secret", e)
    return new Response(null, { status: 500 });
  }
  log.info("saved secret")

  return new Response(
    JSON.stringify({ id, password, }),
    { status: 201 }
  );
};
