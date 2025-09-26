import createClient from "@/utils/supabase/server"

export async function POST(request){
    const supabase = await createClient()
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