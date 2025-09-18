import { encrypt } from "./crypto";
import createClient from "@/utils/supabase/server";

export async function addEnvVars(repo_id, user_id, secretsInput) {
  const supabase = await createClient();

  let secretsArray = [];

  if (Array.isArray(secretsInput)) {
    secretsArray = secretsInput;
  } else if (typeof secretsInput === "object" && secretsInput !== null) {
    secretsArray = Object.entries(secretsInput).map(([key_name, value]) => ({
      key_name,
      value,
    }));
  } else {
    throw new Error("Invalid secrets format");
  }

  for (const s of secretsArray) {
    const { cipher, iv, tag } = encrypt(s.value);

    await supabase.from("env_vars").insert({
      repo_id,
      key_name: s.key_name,
      encrypted_value: cipher,
      iv,
      tag,
      created_by: user_id,
    });
  }
}
