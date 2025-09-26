import { deleteAllFavorite } from "@/app/lib/deleteAllFavorite";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try{
        const res = await deleteAllFavorite()
        if(!res.success){
            return NextResponse.json({message:"ceva nu a mers bine la stergearea"},{status:400})
        }
        return NextResponse.json({message:"a mers totul bine "},{status:204})
    }catch(err){
        return NextResponse.json({message:"ceava nu a mers bine la staergearea din favorite"},{status:400})
    }
}