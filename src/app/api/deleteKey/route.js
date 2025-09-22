import { NextResponse } from "next/server"
import deleteKey from "@/app/lib/deleteKey"

export async function DELETE(request) {
    const body = await request.json()
    const {id} = body

    if(!id){
        return NextResponse.json({message:"Id nu este specificat"},{status:400})
    }
    try{
        const res = await deleteKey(id)
        
        if(!res.message){
            return NextResponse.json({message:"Cheia nu sa sters"},{status:400})
        }

        return NextResponse.json({message:"Cheia sa sters"},{status:200})

    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}