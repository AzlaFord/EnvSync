"use client"
import DataIssues from "@/components/issuesData"
import DataColab from "@/components/colaboratorsData"
import LoadingDetails from "@/components/LoadingDetails"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import KeysSection from "@/components/env-keys-section"
import { useState } from "react"
import {
  ArrowLeft,
  GitBranch,
  Star,
  GitFork,
  Eye,
  Download,
  Calendar,
  User,
  FileText,
  Code,
  AlertCircle,
} from "lucide-react"

function timeAgo(dateString) {
  const updatedAt = new Date(dateString)
  const diff = Date.now() - updatedAt.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours   = Math.floor(minutes / 60)
  const days    = Math.floor(hours / 24)
  const months  = Math.floor(days / 30)
  const years   = Math.floor(days / 365)

  if (seconds < 60) return `${seconds} seconds ago`
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24)   return `${hours} hours ago`
  if (days < 30)    return `${days} days ago`
  if (months < 12)  return `${months} months ago`
  return `${years} years ago`
}

export const getRepoData = async (userName,repo) =>{
  const result = await fetch("/api/repoData",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ user: userName, repoName: repo })
  })
  const data = await result.json()
  return data
}

export const getCommitCount = async (repo,userName) =>{
  const result = await fetch("/api/commitsCount",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({repoName:repo,owner:userName})
  })
  const data = result.json()
  return data
}

export function RepositoryDetails({ repositoryName,owner,userId, onBack }) {

  const [isOpenIssues,setIsOpenIssues] = useState(false)
  const [isOpenColab,setIsOpenColab] = useState(true)

  const {data:dataRepo }= useQuery({
    queryKey:['colabs',owner],
    queryFn:()=> getCommitCount(repositoryName,owner),
    enabled: !! owner
  })

  const commitsCount = dataRepo?.data?.repository?.defaultBranchRef?.target?.history?.totalCount

  const { data: repo } = useQuery({
    queryKey: ['repos', owner,repositoryName],
    queryFn: () => getRepoData(owner,repositoryName),
    enabled: !!owner && !!repositoryName,
  })
  console.log(dataRepo?.data?.repository?.collaborators?.edges)
  if (!repo) return <LoadingDetails/>

  return (
    <div className="space-y-6 overflow-auto ">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Repositories
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <GitBranch className="h-6 w-6" />
                {repo.data?.full_name}
              </CardTitle>
              <CardDescription className="mt-2 text-base">{repo.description? repo.description:"There is no description"}</CardDescription>
            </div>
            <Badge variant="outline"  className="text-sm text-">
              {repo.data?.language}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {(dataRepo?.data?.repository?.languages?.nodes || []).map((topic) => (
              <Badge key={topic.name} variant="secondary" className="text-xs ">
                { topic?.name }
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{repo.data?.stargazers_count}</span>
              <span className="text-muted-foreground text-sm">stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4" />
              <span className="font-semibold">{repo.data?.forks}</span>
              <span className="text-muted-foreground text-sm">forks</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="font-semibold">{repo.data?.watchers}</span>
              <span className="text-muted-foreground text-sm">watching</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="font-semibold">{repo.data ?(repo.data?.size / 1024).toFixed(2):"0.00"}MB</span>
              <span className="text-muted-foreground text-sm">size</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </h3>
              <div className="space-y-2 text-sm">
                <div>Created: {repo.data?.created_at? new Date(repo.data?.created_at).toLocaleDateString():"N/A"}</div>
                <div>Last updated: {timeAgo(repo.data?.updated_at)}</div>
                <div>
                  Default branch: <Badge variant="outline">{repo.data?.default_branch}</Badge>
                </div>
                <div>License: {repo.data?.license?repo.data?.license:"No license"}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Code className="h-4 w-4" />
                Activity
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Commits:</span>
                  <span className="font-semibold">{commitsCount?commitsCount:"0"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contributors:</span>
                  <span className="font-semibold">{dataRepo?.data?.repository?.collaborators?.edges?.length||"1"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Releases:</span>
                  <span className="font-semibold">{dataRepo?.data?.repository?.releases?.totalCount||"0"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Open issues:</span>
                  <span className="font-semibold text-orange-600">{dataRepo?.data?.repository?.issues?.totalCount||"0"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pull requests:</span>
                  <span className="font-semibold text-blue-600">{dataRepo?.data?.repository?.pullRequests?.totalCount||"0"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <KeysSection repositoryName={repo.data?.full_name} repositoryId={repo.data?.id}  userId={userId} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={()=>{setIsOpenIssues(prev => !prev), setIsOpenColab(false)}}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Issues ({dataRepo?.data?.repository?.issues?.totalCount ||"0"})
            </Button>
            <Button variant="outline" onClick={()=>{setIsOpenColab(prev => !prev),setIsOpenIssues(false)}} >
              <User className="h-4 w-4 mr-2" />
              Contributors ({dataRepo?.data?.repository?.collaborators?.edges?.length||"1"})
            </Button>
            <Button variant="outline" asChild>
              <a href={repo.data?.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <GitBranch className="h-4 w-4 mr-2" />
                Repository
              </a>
            </Button>
          </div>
          <Separator className="mt-2"></Separator>
          {isOpenColab &&(<DataColab colabs={dataRepo?.data?.repository?.collaborators?.edges}/>  )}
          {isOpenIssues &&(<DataIssues/>) }
        </CardContent>
      </Card>
    </div>
  )
  }
