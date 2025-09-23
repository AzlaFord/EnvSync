"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {FolderSearch,ArrowRight} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle,CardAction, CardDescription } from "@/components/ui/card"
import debounce from "lodash.debounce"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import LoadingSearch from "@/components/loading_search"

const searchRepo = async (query) => {
    if (!query) return { items: [] }

    const res = await fetch("/api/searchRepo",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({search:query})
    })
    try{
        const result = await res.json()
        return result
    }catch(err){
        throw Error(err)
    }
}

export default function SearchPage(){
    const router = useRouter()
    const [query,setQuery] = useState("")
    const {data:repos,refetch,isFetching,isLoading } = useQuery({
        queryKey:['search',query],
        queryFn:() => searchRepo(query),
        enabled: false 
    })
    console.log(repos?.data?.data )
    useEffect(() => {
        const handler = debounce(() => {
            if (query) refetch()
            }, 500)
        handler()
        return () => handler.cancel()
    }, [query, refetch])
    
    return (<>
        <div className="flex justify-center mt-2 w-full">
            <div className="flex justify-center items-center w-full">
                <Input type="text" value={query} placeholder="Find a repository.." onChange={(e)=>setQuery(e.target.value)} className="w-full sm:w-1/2 md:w-1/3 border-black "/>
                <FolderSearch className=" ml-2 h-8 w-8"/>
            </div>
        </div>
        <Separator className='w-full sm:w-1/2 md:w-1/3 ml-1 mr-1'/>
        {query.length === 0 && <h1 className="flex justify-center scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Start searching ...</h1>}
        {isLoading && <LoadingSearch/>}
        <div className="ml-1  w-full flex justify-center ">
            <ul className="ml-1  w-full  md:w-1/2 rounded-2xl grid grid-cols-1 gap-2">
                {(repos?.data?.data?.search?.edges || []).map(repo => (
                <Card key={repo?.node?.id} className=" flex justify-center " >
                    <CardHeader>
                        <CardTitle>
                            <li>
                                <Button variant="link" className="p-0 h-auto font-semibold" 
                                onClick = {() =>{router.push(`/repositories/${repo?.node?.name}?owner=${repo?.node?.owner?.login}`)}}
                                >
                                    <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                        {repo?.node?.name}
                                    </h4>
                                </Button>
                            </li>                        
                        </CardTitle>
                        <CardAction>
                            <Button onClick={()=>{router.push(`/repositories/${repo?.node?.name}?owner=${repo?.node?.owner?.login}`)}}>
                                Details<ArrowRight color="white"/>
                            </Button>
                        </CardAction>
                        <CardDescription>
                            {repo?.node?.description || "There is no description"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {(repo?.node?.languages?.nodes || []).map(lang =>(
                                <Badge className="ml-1" key={lang?.name} variant="default">{lang?.name||"N/A"}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                ))}
            </ul>
        </div>
    </>)
}