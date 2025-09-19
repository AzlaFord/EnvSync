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
  if (!repo_id.match(/^[0-9a-fA-F-]{36}$/)) {
    throw new Error("repo_id trebuie să fie un UUID valid");
  }
  for (const s of secretsArray) {
    const { cipher, iv, tag } = encrypt(s.value);
    const { data, error } = await supabase.from("env_vars").insert({
      repo_id,
      key_name: s.key_name,
      encrypted_value: cipher,
      iv,
      tag,
      created_by: user_id,
    });
    if (error) {
      console.error("Insert error:", error);
      throw error;
    }
  }
}
