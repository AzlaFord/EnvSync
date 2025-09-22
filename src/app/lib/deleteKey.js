import createClient from "@/utils/supabase/server";


export default async function deleteKey(id) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("env_vars").delete().eq("id", id)

    if(error){
        console.error("Insert error:", error);
        throw error;
    }

    if(!data || data.length === 0){
        return { success: false, message: "Cheia nu a fost găsită sau nu s-a șters" }
    }

    return {message:"a mers totul bine",success:true}
}
