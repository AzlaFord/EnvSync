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

    const {data:found,error} = await supabase.from("favorite").select("owner").eq("repo_id",repo_id).eq("user_id",user_id)

    if(error){
        console.log(error)
        throw error
    }
    return {message:"a mers totul bine ",success:true}
}