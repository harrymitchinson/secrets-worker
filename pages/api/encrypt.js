import { encrypt } from "../../api/crypto";

export default async (event) => {
  const { request } = event;
  if (request.method != "POST") {
    return new Response(null, { status: 405 });
  }
  const { body } = request;
  const { ttl, secret } = body;

  const encrypted = encrypt(secret, "password");

  await SECRETS.put(id, encrypted, { expirationTtl: ttl });

  return new Response(
    {
      id,
      password,
    },
    { status: 201 }
  );
};
