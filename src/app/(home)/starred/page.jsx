"use client"

import { useQuery } from "@tanstack/react-query"

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
    const {data:repos,isLoading } = useQuery({
        queryKey:["repos2"],
        queryFn: () => getStarred(),
    })

    return (<>
    Starred
    </>)
}