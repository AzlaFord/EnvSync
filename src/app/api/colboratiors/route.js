export async function POST(request) {
    const body = await request.json()
    const {repoName,owner} = body
    const res = await fetch("https://api.github.com/graphql",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
        query:`{
            repository(owner:'${owner}',name='${repoName}'){
                collaborators(first:5){
                edges{
                    node{
                        login
                        avatarUrl
                        contributionsCollection{
                            commitContributionsByRepository {
                                contributions {
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
    const data = await res.json()
    return data
}