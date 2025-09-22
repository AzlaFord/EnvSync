"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Star, GitFork, Clock } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { createClient2 } from "@/utils/supabase/client"
import LoadingPage from "./Loading"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

export const getRepos = async ({ login, cursor = null, direction = "next", pageSize = 10 }) => {

    if (!login) return []
    const body = { login, cursor, direction, pageSize }
    
    const res = await fetch("/api/repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })

    return res.json()
}


export const getDataUser = async () =>{
  const supabase = createClient2()
  const { data, error } = await supabase.auth.getSession()
  return data
}

export function RepositoryTable({ }) {
    
    const searchParams = useSearchParams();
    const cursor = searchParams.get("cursor")
    const router = useRouter()
    const direction = searchParams.get("direction") || "next"
    const { data: user, error: userError } = useQuery({
        queryKey: ['user'],
        queryFn: getDataUser,
    })

    const name = user?.session?.user?.identities[0]?.identity_data?.user_name

    const { data: repos, isLoading: isUserLoading } = useQuery({
        queryKey: ['repos', name, cursor, direction],
        queryFn: () => getRepos({ login: name, cursor, direction }),
        enabled: !!name, 
        refetchOnMount: 'always',
        keepPreviousData: true,
    })


    if (isUserLoading) return <LoadingPage />

    const pageInfo = repos?.data?.data?.user?.repositories?.pageInfo

    const getStatusColor = (status) => {
        switch (status) { 
            case false:
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case true:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }
    const nextPage = () => {
        if (pageInfo?.endCursor) {
            router.push(`/repositories?cursor=${pageInfo.endCursor}&direction=next`);
        }
    }

    const prevPage = () => {
        if (pageInfo?.startCursor) {
            router.push(`/repositories?cursor=${pageInfo.startCursor}&direction=prev`);
        }
    }

    return (
        <>
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Repositories
            </CardTitle>
            <CardDescription>Manage and explore your repositories</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="text-center">Stars</TableHead>
                <TableHead className="text-center">Forks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {(Array.isArray(repos?.data?.data?.user?.repositories?.edges) ? repos?.data?.data?.user?.repositories?.edges : []).map(repo => (
                <TableRow key={repo.node.id} className="hover:bg-muted/50">
                    <TableCell>
                        <div>
                            <Button
                            variant="link"
                            className="p-0 h-auto font-semibold text-left" 
                            onClick={() => router.push(`/repositories/${repo.node.name}?owner=${repo.node.owner.login}&cursor=${cursor}`)}
                            >
                            {repo.node.name !=null ?repo.node.name:" "}
                            </Button>
                            <p className="text-sm text-muted-foreground mt-1">{repo.node.description?repo.node.description:"There is no description"}</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{repo.node.primaryLanguage?.name ?? "N/A"}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4" />
                            {repo.node.stargazerCount != null ? repo.node.stargazerCount.toLocaleString() : 0}
                        </div>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <GitFork className="h-4 w-4" />
                            {repo.node.forkCount != null ?repo.node.forkCount:"0" }
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge className={getStatusColor(repo.node.isArchived)}>{repo.node.isArchived ? "Archived" : "Active"}</Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {repo.node.pushedAt ? new Date(repo.node.pushedAt).toLocaleDateString() : "N/A"}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                    <Button size="sm" onClick={() => router.push(`/repositories/${repo.node.name}?owner=${repo.node.owner.login}&cursor=${cursor}`)}>
                        View Details
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
        <div className="flex justify-end w-full">
            <Button variant="secondary" disabled={!pageInfo?.hasPreviousPage} onClick={prevPage}  className="ml-2 w-20">Prev</Button>
            <Button variant="secondary" disabled={!pageInfo?.hasNextPage} onClick={nextPage}  className="ml-2 w-20">Next</Button>
        </div>
    </>            
    )
}