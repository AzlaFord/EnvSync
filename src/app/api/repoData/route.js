export async function POST(request){
    const body = await request.json()
    const {user,repoName} = body 
    if(!user){
        return new Response(JSON.stringify({message:"user e undefined"}),{
            status:400,
            headers:{"Content-Type":"application/json"}
        })
    }
    if(!repoName){
        return new Response(JSON.stringify({message:"repoName e undefined"}),{
            status:400,
            headers:{"Content-Type":"application/json"}
        })
    }
    const res = await fetch(`https://api.github.com/repos/${user}/${repoName}`, {
        headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.mercy-preview+json"
        },
        cache: "no-store",
    })
    if(!res.ok){
        return new Response(JSON.stringify({message:"resultatul e undefined ceva nu a mers bine"}),{
            status:res.status,
            headers:{"Content-Type":"application/json"}
        })
    }    
    const data = await res.json()

    return new Response(JSON.stringify({message:"Totul a mers bine",data}),{
        status:200,
        headers:{"Content-Type":"application/json"}
    })    
}