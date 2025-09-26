import createClient from "@/utils/supabase/server"

export async function deleteAllFavorite(){
    const supabase = await createClient()
    const { data:{user}, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        console.error("user error:", userError);
        throw userError || new Error("No user found")
    }
    const {error} = await supabase.from("favorite").delete().eq("user_id",user.id)
    if(error){
        console.error("error:", error);
        throw error || new Error("No user found")
    }
    
    return {message:"totul bine ",success:true}
}