import { getRepoStared } from "@/app/lib/getAllStarred";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const data = await getRepoStared()
        if(!data.success){
            return NextResponse.json({message:"ceva nu a mers bine "},{status:400})
        }
        return NextResponse.json({message:"Totul a mers ",repos:data?.data},{status:200})
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}