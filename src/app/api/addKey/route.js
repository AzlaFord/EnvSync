import { addEnvVars } from "@/app/lib/writesecret";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json()
    const {repoId,user_id,secrets} = body

    if(!repoId){
        return NextResponse.json({message:"repoId e undefined sau e introdus gresit"},{status:400})
    }
    if(!user_id){
        return NextResponse.json({message:"user id e undefined sau introdus gresit "},{status:400})
    }
    if(!secrets){
        return NextResponse.json({message:"nu sa introdus secrete correct sau e undefined/null"},{status:400})
    }
    try{
        await addEnvVars(repoId, user_id, secrets)
        return NextResponse.json({ message: "Secrets adaugate cu succes" },{status:200});
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }

}