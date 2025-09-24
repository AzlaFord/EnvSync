import { deleteOne } from "@/app/lib/deleteOneStarred"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    const body = await request.json()
    const { repoId} = body
    
    try{
        const res = await deleteOne(repoId)
        if(!res.success){
            return NextResponse.json({message:"ceva nu a mers bine la stergere"},{status:400})
        }
        return NextResponse.json({message:"a mers bine la stergere"},{status:200})
    }catch(err){
        return NextResponse.json({message:"ceva nu a mers bine "},{status:500})
    }
}