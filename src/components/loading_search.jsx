"use client"
import { Card, CardContent, CardHeader, CardTitle,CardAction, CardDescription } from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import {ArrowRight} from "lucide-react"

export default function LoadingSearch(){
    return (<>
    <div className="ml-1  w-full flex justify-center ">
        <div className=" ml-1  w-full  md:w-1/2 rounded-2xl grid grid-cols-1 gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                            <Button variant="link" className="p-0 h-auto font-semibold" 
                            >
                            <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                <Skeleton className="h-10 w-50" />
                            </h4>
                            </Button>
                    </CardTitle>
                    <CardAction>
                        <Button>
                            Details<ArrowRight color="white"/>
                        </Button>
                    </CardAction>
                    <CardDescription>
                        <Skeleton className="h-4 w-35" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex">
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                            <Button variant="link" className="p-0 h-auto font-semibold" 
                            >
                            <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                <Skeleton className="h-10 w-50" />
                            </h4>
                            </Button>
                                            
                    </CardTitle>
                    <CardAction>
                        <Button>
                            Details<ArrowRight color="white"/>
                        </Button>
                    </CardAction>
                    <CardDescription>
                        <Skeleton className="h-4 w-35" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex">
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        
                            <Button variant="link" className="p-0 h-auto font-semibold" 
                            >
                            <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                <Skeleton className="h-10 w-50" />
                            </h4>
                            </Button>
                    </CardTitle>
                    <CardAction>
                        <Button>
                            Details<ArrowRight color="white"/>
                        </Button>
                    </CardAction>
                    <CardDescription>
                        <Skeleton className="h-4 w-35" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex">
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                            <Button variant="link" className="p-0 h-auto font-semibold" 
                            >
                            <h4 className="scroll-m-20  md:text-2xl font-semibold tracking-tight">
                                <Skeleton className="h-10 w-50" />
                            </h4>
                            </Button>
                    </CardTitle>
                    <CardAction>
                        <Button>
                            Details<ArrowRight color="white"/>
                        </Button>
                    </CardAction>
                    <CardDescription>
                        <Skeleton className="h-4 w-35" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex">
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                        <Skeleton className="h-4 w-12 ml-1" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
    </>)
}