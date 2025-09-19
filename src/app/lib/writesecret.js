import { encrypt } from "./crypto";
import createClient from "@/utils/supabase/server";

export async function addEnvVars(repo_id, user_id, secret, repo_full_name) {
  const supabase = await createClient();

  const { cipher, iv, tag } = encrypt(secret.value);

  const { error } = await supabase.from("env_vars").insert({
    repo_id: Number(repo_id),
    key_name: secret.key,
    repo_full_name,
    encrypted_value: cipher,
    iv,
    tag,
    created_by: Number(user_id),
  });

  if (error) {
    console.error("Insert error:", error);
    throw error;
  }
}