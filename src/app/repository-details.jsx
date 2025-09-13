"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"

import { getDataUser,getRepos } from "./repository-table"

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

const getRepositoryDetails = (name) => {

  return baseData
  
}

export function RepositoryDetails({ repositoryName, onBack }) {
  const repo = getRepositoryDetails(repositoryName)
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
  return (
    <div className="space-y-6">
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
                {repo.fullName}
              </CardTitle>
              <CardDescription className="mt-2 text-base">{repo.description}</CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {repo.language}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{repo.stars.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4" />
              <span className="font-semibold">{repo.forks}</span>
              <span className="text-muted-foreground text-sm">forks</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="font-semibold">{repo.watchers}</span>
              <span className="text-muted-foreground text-sm">watching</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="font-semibold">{repo.size}</span>
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
                <div>Created: {repo.createdAt}</div>
                <div>Last updated: {repo.updatedAt}</div>
                <div>
                  Default branch: <Badge variant="outline">{repo.defaultBranch}</Badge>
                </div>
                <div>License: {repo.license}</div>
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
                  <span className="font-semibold">{repo.commits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contributors:</span>
                  <span className="font-semibold">{repo.contributors}</span>
                </div>
                <div className="flex justify-between">
                  <span>Releases:</span>
                  <span className="font-semibold">{repo.releases}</span>
                </div>
                <div className="flex justify-between">
                  <span>Open issues:</span>
                  <span className="font-semibold text-orange-600">{repo.openIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pull requests:</span>
                  <span className="font-semibold text-blue-600">{repo.pullRequests}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Code className="h-4 w-4 mr-2" />
              View Code
            </Button>
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Issues ({repo.openIssues})
            </Button>
            <Button variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              Pull Requests ({repo.pullRequests})
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Contributors ({repo.contributors})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
  }
