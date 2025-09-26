import createClient from "@/utils/supabase/server";

export async function getInfoOnStarred(repo_id) {
    const supabase = await createClient()
    const { data, error: userError } = await supabase.auth.getUser()
    const user = data?.user

    if (userError || !user) {
        console.error("user error:", userError);
        throw userError || new Error("No user found")
    }
    const user_id = user.id

    const {data:found,error} = await supabase.from("favorite").select("id").eq("repo_id",repo_id).eq("user_id",user_id).limit(1)

    if(error){
        console.log(error)
        throw error
    }

    if (found.length > 0) {
        return { exists: true, message: "Randul exista",found }
    } else {
        return { exists: false, message: "Randul nu exista",found }
    }

}