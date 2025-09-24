"use client"

import { useQuery } from "@tanstack/react-query"
import { Separator } from "@/components/ui/separator"
import {FolderSearch,ArrowRight , StarOff} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle,CardAction, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
    const [fetchAgain,setFetchAgain] = useState(false)
    const router = useRouter()
    const {data:repos,isLoading } = useQuery({
        queryKey:["repos2",fetchAgain],
        queryFn: () => getStarred(),
    })

    const removeStarred = async (id) =>{
        try{
            await fetch("/api/deleteFromFavoriteOne",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({repoId:id})
            })
        }catch(err){
            throw err
        }finally{
            setFetchAgain(prev => !prev)
        }    
    }
    return (<>
    <div className="w-full pl-5">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Starred repositories
        </h2>
    </div>
    <div className="w-full flex justify-center items-center p-5">
        <div className="w-full flex justify-center items-center ">
            <div className="grid grid-cols-1  max-md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 w-full  gap-3">
                {(repos?.repos||[]).map(repo=>(
                <Card key={repo?.id} className=" flex justify-center " >
                    <CardHeader>
                        <CardTitle className="flex justify-start items-center ">
                            <StarOff fill="orange" className=" mr-1 max-sm:hidden" onClick={()=>{removeStarred(repo?.id)}} />
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
                    </CardHeader>
                </Card>
                ))}
            </div>
        </div>
    </div>
    </>)
}