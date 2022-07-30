const dec = new TextDecoder();
const enc = new TextEncoder();

export async function decrypt(encrypted, password) {
  const buffer = Uint8Array.from(Buffer.from(encrypted, "base64"), (c) =>
    c.charCodeAt(null)
  );
  const salt = buffer.slice(0, 16);
  const iv = buffer.slice(16, 16 + 12);
  const data = buffer.slice(16 + 12);

  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
  const raw = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    data
  );
  return dec.decode(raw);
}

const getPasswordKey = (password) =>
  crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

const deriveKey = (passwordKey, salt, keyUsage) =>
  crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    keyUsage
  );

async function encrypt(data, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
  const encrypted = await crypto.subtle
    .encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      enc.encode(data)
    )
    .then((x) => new Uint8Array(x));

  let buff = new Uint8Array(
    salt.byteLength + iv.byteLength + encrypted.byteLength
  );
  buff.set(salt, 0);
  buff.set(iv, salt.byteLength);
  buff.set(encrypted, salt.byteLength + iv.byteLength);

  return buff.toString("base64");
}
