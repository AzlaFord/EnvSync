import crypto from "crypto"

const ALGO = "aes-256-gcm";
const KEY = Buffer.from(process.env.ENVSYNC_SECRET_KEY, "utf8");

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    cipher: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decrypt({ cipher, iv, tag }) {
  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(tag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(cipher, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}