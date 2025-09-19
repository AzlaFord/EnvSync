import { decrypt } from "./crypto";
import createClient from "@/utils/supabase/server";

export async function getEnvVar(repo_id, key_name) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("env_vars")
    .select("*")
    .eq("repo_id", repo_id)
    .eq("key_name", key_name)
    .single();

  if (error || !data) throw new Error("Secret not found or access denied");

  const decrypted = decrypt({
    cipher: data.encrypted_value,
    iv: data.iv,
    tag: data.tag,
  });

  return decrypted
}
