import { supabase } from "@/app/lib/suprabase";

export async function POST(request){
    const {user ,session,error} = await supabase.auth.signInWithOAuth({
        provider:'github'
    })
    if(error){
        return new Response(JSON.stringify({message:"ceva nu a mers bine ", msgerr:error.message}),{
            status:500,
            headers:{"Content-Type":"application/json"}
        })
    }
    return new Response(JSON.stringify({message:"a mers totul bine"}),{
        status:200,
        headers:{"Content-Type":"application/json"}
    })
}