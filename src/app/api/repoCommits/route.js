export async function POST(request){
    const body = await request.json()
    const {fullName} = body

    if(!fullName){
        return new Response(JSON.stringify({message:'fullName e gresit sau null sau undefinded'}),{
            status:400,
            headers:{"Content-Type":"application/json"}
        })
    }
    const res = await fetch(`https://api.github.com/repos/${fullName}/commits`)
    if(!res.ok){
        return new Response(JSON.stringify({message:'CEva nu a mers bine la rezultat',status: res.status}),{
            status:res.status,
            headers:{"Content-Type":"application/json"}
        })
    }

    const commits = await res.json()

    return new Response(JSON.stringify({message:'Succes',commits}),{
        status:200,
        headers:{"Content-Type":"application/json"}
    })    
}