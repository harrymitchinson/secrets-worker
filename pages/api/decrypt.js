import { decrypt } from "../../api/crypto";

export default async (event) => {
  const { request } = event;
  const { body } = request;
  const { id, password } = body;

  const secret = await SECRETS.get(id);
  if (secret == null) {
    return new Response(null, { status: 404 });
  }

  const raw = await decrypt(secret, password);

  await SECRETS.delete(id);

  return new Response(
    {
      data: raw,
    },
    { status: 200 }
  );
};
