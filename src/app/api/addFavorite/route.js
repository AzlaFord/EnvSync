import addToFavorites from "@/app/lib/addToFavorites"
import { NextResponse } from "next/server"

export async function POST(request) {
    const body = await request.json()
    const {repo_id,repo_name,language,owner} = body
    if(!repo_id || repo_id.length === 0){return NextResponse.json({message:" repo_id e undefined sau e gol sau null"},{status:400})}
    if(!repo_name || repo_name.length === 0){return NextResponse.json({message:" repoName e undefined sau e gol sau null"},{status:400})}
    if(!language || language.length === 0){return NextResponse.json({message:" language e undefined sau e gol sau null"},{status:400})}
    if(!owner || owner.length === 0){return NextResponse.json({message:" owner e undefined sau e gol sau null"},{status:400})}

    try{
        await addToFavorites(repo_id,owner,language,repo_name)
        return NextResponse.json({message:"a mers totul bine "},{status:201})
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}