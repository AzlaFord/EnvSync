import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Star, GitFork, Clock } from "lucide-react"

export default function Loading(){
    const skeletonRows = Array.from({ length: 10 }, (_, i) => i);


    return (<>
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
                {skeletonRows.map((i) => (
                    <TableRow key={i} className="hover:bg-muted/50">
                        <TableCell>
                        <div>
                            <Button
                            variant="link"
                            className="p-0 h-auto font-semibold text-left"
                            >
                            <Skeleton className="h-5 w-[75px]"></Skeleton>
                            </Button>
                            <div className="text-sm text-muted-foreground mt-1"><Skeleton className="h-4 w-[170px]"/></div>
                        </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-[75px]"/>
                        </TableCell>
                        <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4" />
                            <Skeleton className="ml-1 h-4 w-[50px]"/>
                        </div>
                        </TableCell>
                        <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <GitFork className="h-4 w-4" />
                            <Skeleton className="ml-1 h-4 w-[50px]"/>
                        </div>
                        </TableCell>
                        <TableCell>
                        <Skeleton className="ml-1 h-4 w-[50px]"/>
                        </TableCell>
                        <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <Skeleton className="ml-1 h-4 w-[70px]"/>                        
                        </div>
                        </TableCell>
                        <TableCell className="text-right">
                        <Button size="sm">
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
            <Button variant="secondary"  className="ml-2 w-20">Prev</Button>
            <Button variant="secondary"  className="ml-2 w-20">Next</Button>
        </div>
    </>)
}