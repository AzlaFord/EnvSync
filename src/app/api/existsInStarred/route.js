import { getInfoOnStarred } from "@/app/lib/isItStarred";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json()
    const {repo_id} = body

    try{
        const data = await getInfoOnStarred(repo_id)
        if(!data.exists){
            return NextResponse.json({message:"nu a fost gasit",exista:data.exists},{status:204})
        }
        return NextResponse.json({message:"a fost gasit",exista:data.exists},{status:200})
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}