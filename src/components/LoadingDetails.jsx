import { Skeleton } from "./ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export default function LoadingDetails(){
    return (<>
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
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
                <Skeleton className="ml-1 h-6 w-[70px]"/>
              </CardTitle>
              <CardDescription className="mt-2 text-base"><Skeleton className="ml-1 h-4 w-[200px]"/></CardDescription>
            </div>
            <Skeleton className="ml-1 h-4 w-[60px]"/>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                <Skeleton className="ml-1 h-4 w-[50px]"/>
              </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[100px]"/></span>
              <span className="text-muted-foreground text-sm"></span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4" />
              <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[100px]"/></span>
              <span className="text-muted-foreground text-sm"></span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[100px]"/></span>
              <span className="text-muted-foreground text-sm"></span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[100px]"/></span>
              <span className="text-muted-foreground text-sm"></span>
            </div>
          </div>
          
          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-end">
            <div className="space-y-3 justify-end">
              <h3 className="font-semibold flex items-center gap-2 ">
                <Calendar className="h-4 w-4" />
                Timeline
              </h3>
              <div className="space-y-2 text-sm justify-end">
                <div className="flex justify-start">Created: <Skeleton className="ml-1 h-4 w-[100px] "/></div>
                <div className="flex justify-start">Last updated:<Skeleton className="flex justify-end items-center ml-1 h-4 w-[100px]"/></div>
                <div className="flex justify-start">
                  Default branch: <Skeleton className="ml-1 h-4 w-[40px]"/>
                </div>
                <div className="flex justify-start">License: <Skeleton className="ml-1 h-4 w-[50px]"/></div>
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
                  <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[20px]"/></span>
                </div>
                <div className="flex justify-between">
                  <span>Contributors:</span>
                  <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[20px]"/></span>
                </div>
                <div className="flex justify-between">
                  <span>Releases:</span>
                  <span className="font-semibold"><Skeleton className="ml-1 h-4 w-[20px]"/></span>
                </div>
                <div className="flex justify-between">
                  <span>Open issues:</span>
                  <span className="font-semibold text-orange-600"><Skeleton className="ml-1 h-4 w-[20px]"/></span>
                </div>
                <div className="flex justify-between">
                  <span>Pull requests:</span>
                  <span className="font-semibold text-blue-600"><Skeleton className="ml-1 h-4 w-[20px]"/></span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
              View Env
            </Button>
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Issues 
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Contributors 
            </Button>
            <Button variant="outline"  >
              <GitBranch className="h-4 w-4 mr-2" />
              <a target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>)
}