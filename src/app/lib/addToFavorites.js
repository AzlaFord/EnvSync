import createClient from "@/utils/supabase/server";

export default async function addToFavorites(repo_id,owner,language,user_id,repo_name){
    const supabase = await createClient()
    const {error} = await supabase
        .from("favorite")
        .insert({repo_id:repo_id,owner:owner,language:language,user_id:user_id,repo_name:repo_name})
    if(error){
        console.error("Insert error:", error);
        throw error;
    }
    return {message:"sa inserat in tabelul favorite",success:true}
}