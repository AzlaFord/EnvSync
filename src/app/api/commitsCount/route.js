export async function POST(request) {
    const body = await request.json()
    const {repoName,owner} = body

    if(!owner){
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

    const res = await fetch("https://api.github.com/graphql",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
        query:`{
            repository(owner: "${owner}", name: "${repoName}") {
                defaultBranchRef {
                name
                target {
                    ... on Commit {
                    history {
                        totalCount
                    }
                    }
                }
                }
            }
            }
            }`
    })
    })
    if(!res.ok){
        return new Response(JSON.stringify({message:"ceva nu a mers bine"}),{
            status:500,
            headers:{"Content-Type":"application/json"}
        })        
    }
    const data = await res.json()
    return Response.json(data)

}