import { encrypt } from "./crypto";

export async function addEnvVars(repo_id, user_id, secrets) {

    for (const s of secrets) {
        const { cipher, iv, tag } = encrypt(s.value);
        await supabase.from('env_vars').insert({
        repo_id,
        key_name: s.key_name,
        encrypted_value: cipher,
        iv,
        tag,
        created_by: user_id,
        });
    }
}
