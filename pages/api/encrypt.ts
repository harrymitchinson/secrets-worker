import { encrypt } from "../../api/crypto";

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

  const encrypted = await encrypt(secret, password);

  await SECRETS.put(id, encrypted, { expirationTtl: ttl });

  return new Response(JSON.stringify({ id, password, }), { status: 201 });
};
