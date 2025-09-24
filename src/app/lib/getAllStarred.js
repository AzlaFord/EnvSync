import createClient from "@/utils/supabase/server"

export async function getRepoStared() {
    const supabase = await createClient()
    const { data, error: userError } = await supabase.auth.getUser()
    const user = data?.user

    if (userError || !user) {
        console.error("user error:", userError);
        throw userError || new Error("No user found")
    }

    const user_id = user.id
    const { data: repos, error } = await supabase
        .from("favorite")
        .select("id,owner,repo_name,language")
        .eq("user_id", user_id)

    if (error) {
        console.log(error)
        throw error
    }

    return { message: "totul a mers bine", success: true, data: repos }
}
