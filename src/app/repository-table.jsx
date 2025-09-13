"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Star, GitFork, Clock } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { createClient2 } from "@/utils/supabase/client"

const getRepos = async (nume) => {
  const res = await fetch("/api/repo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: nume }),
  })
  const data = await res.json()
  return data
}


const getDataUser = async () =>{
  const supabase = createClient2()
  const { data, error } = await supabase.auth.getSession()
  return data
}

export function RepositoryTable({ onRepositoryClick }) {
    const { data: user, error: userError, isLoading: isUserLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getDataUser,
    })
    const name = user?.session?.user?.identities[0]?.identity_data?.user_name
    const { data: repos } = useQuery({
        queryKey: ['repos', name],
        queryFn: () => getRepos(name),
        enabled: !!name, 
    })
    console.log("salut",repos)

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

    return (
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
                
                {(repos || []).map((repo) => (
                <TableRow key={repo.name} className="hover:bg-muted/50">
                    <TableCell>
                    <div>
                        <Button
                        variant="link"
                        className="p-0 h-auto font-semibold text-left"
                        onClick={() => onRepositoryClick(repo.name)}
                        >
                        {repo.name}
                        </Button>
                        <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <Badge variant="outline">{repo.language}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4" />
                        {repo.stargazers_count.toLocaleString()}
                    </div>
                    </TableCell>
                    <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {repo.forks}
                    </div>
                    </TableCell>
                    <TableCell>
                    <Badge className={getStatusColor(repo.archived)}>{repo.archived?"Archived":"Active"}</Badge>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {repo.pushed_at.slice(0, 10)}
                    </div>
                    </TableCell>
                    <TableCell className="text-right">
                    <Button size="sm" onClick={() => onRepositoryClick(repo.name)}>
                        View Details
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    )
    }
