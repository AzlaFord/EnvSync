import { getEnvVarsForRepo } from "@/app/lib/decrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json()
    const {repo_full_name} = body

    if(!repo_full_name){return NextResponse.json({message:"repo full name e null"},{status:400})}
    try{
        const result  = await getEnvVarsForRepo(repo_full_name)
        return NextResponse.json({message:"a mers totul bine",data:result},{status:200})
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }

}