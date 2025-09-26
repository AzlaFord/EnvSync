"use client"
import { Skeleton } from "./skeleton"
import { Card, CardContent, CardHeader, CardTitle,CardAction, CardDescription } from "@/components/ui/card"

export default function  LoadingStarred(){
    return (<>
    
                {/* <Card key={repo?.id} className=" flex justify-center " >
                    <CardHeader>
                        <CardTitle className="flex justify-start items-center ">
                                <Button variant="link" className="p-0 h-auto font-semibold" 
                                onClick = {() =>{router.push(`/repositories/${repo?.repo_name}?owner=${repo?.owner}&cursor=Starred`)}}
                                >
                                    <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                        {repo?.owner}/{repo?.repo_name}
                                    </h4>
                                </Button>
                            <StarOff fill="orange" className="ml-2 mr-1 max-sm:hidden" onClick={()=>{removeStarred(repo?.id)}} />
                        </CardTitle>
                        <CardAction>
                            <Button onClick={()=>{router.push(`/repositories/${repo?.repo_name}?owner=${repo?.owner}&cursor=Starred`)}}>
                                Details<ArrowRight color="white"/>
                            </Button>
                        </CardAction>
                    </CardHeader>
                </Card> */}
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>
                <Skeleton className="w-full rounded-xl h-20 bg-[#D9D9D9]"/>

    
    </>)
}