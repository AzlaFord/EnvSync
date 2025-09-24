"use client"

import { useQuery } from "@tanstack/react-query"
import { Separator } from "@/components/ui/separator"
import {FolderSearch,ArrowRight} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle,CardAction, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const getStarred = async () =>{
    try{
        const res = await fetch("/api/getFavorite",)
        const result = await res.json()
        return result
    }catch(err){
        throw err
    }
}

export default function StarredPage(){
    const router = useRouter()
    const {data:repos,isLoading } = useQuery({
        queryKey:["repos2"],
        queryFn: () => getStarred(),
    })
    console.log(repos)
    return (<>
    <div className="w-full pl-5">
        <h1>Favorite</h1>
    </div>
    <Separator/>
    <div className="w-full flex justify-center items-center p-5">
        <div className="w-full flex justify-center items-center ">
            <div className="grid grid-cols-1 w-full gap-3">
                {(repos?.repos||[]).map(repo=>(
                <Card key={repo?.repo_name} className=" flex justify-center " >
                    <CardHeader>
                        <CardTitle>
                                <Button variant="link" className="p-0 h-auto font-semibold" 
                                onClick = {() =>{router.push(`/repositories/${repo?.repo_name}?owner=${repo?.owner}&cursor=Starred`)}}
                                >
                                    <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                        {repo?.owner}/{repo?.repo_name}
                                    </h4>
                                </Button>
                        </CardTitle>
                        <CardAction>
                            <Button onClick={()=>{router.push(`/repositories/${repo?.repo_name}?owner=${repo?.owner}&cursor=Starred`)}}>
                                Details<ArrowRight color="white"/>
                            </Button>
                        </CardAction>
                        <CardDescription>
                            <div>
                                <Badge variant="default">{repo?.language||"N/A"}</Badge>
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
                ))}
            </div>
        </div>
    </div>




    </>)
}