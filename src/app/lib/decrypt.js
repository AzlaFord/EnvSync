import { decrypt } from "./crypto";
import createClient from "@/utils/supabase/server";

export async function getEnvVarsForRepo(repo_full_name) {
  const supabase = await createClient();
  console.log(repo_full_name)
  const { data, error } = await supabase
    .from("env_vars")
    .select("*")
    .eq("repo_full_name", repo_full_name);

  if (error) throw new Error("Failed to fetch secrets");

  const decryptedKeys = data.map(item => ({
    key_name: item.key_name,
    value: decrypt({
      cipher: item.encrypted_value,
      iv: item.iv,
      tag: item.tag,
    }),
    id: item.id,
  }));

  return decryptedKeys;
}
