import { decrypt } from "../../api/crypto";

const dec = new TextDecoder()

export default async (event: EventContext<any, any, any>): Promise<Response> => {
  const request = event.request
  if (request.method != "POST") {
    return new Response(null, { status: 405 });
  }
  const { id, password } = await request.json()

  const encrypted = await SECRETS.get(id, 'arrayBuffer')
  if (encrypted == null) {
    return new Response(null, {status:404})
  }

  const secret = await decrypt(encrypted, password)
  await SECRETS.delete(id);

  return new Response(JSON.stringify({ secret: dec.decode(secret) }), { status: 200 });
};
