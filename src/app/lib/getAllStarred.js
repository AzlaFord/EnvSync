import createClient from "@/utils/supabase/server"

export async function getRepoStared() {
    const supabase = await createClient()
    const {data,error} =  await supabase
        .from("favorite")
        .select(owner,repo_name,language)

    if(error){
        console.log(error)
        throw error
    }
    return {message:"totul a mers bine",success:true,data}
}