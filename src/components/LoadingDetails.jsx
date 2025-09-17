export default function LoadingDetails(){
    return (<>
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
                {repo.data?.full_name}
              </CardTitle>
              <CardDescription className="mt-2 text-base">{repo.description? repo.description:"There is no description"}</CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {repo.data?.language}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {(repo.data?.topics || []).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
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
                  <span className="font-semibold">{repo.contributors?repo.contributors:"1"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Releases:</span>
                  <span className="font-semibold">{repo.releases?repo.releases:"0"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Open issues:</span>
                  <span className="font-semibold text-orange-600">{repo.openIssues?repo.openIssues:"0"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pull requests:</span>
                  <span className="font-semibold text-blue-600">{repo.pullRequests?repo.pullRequests:"0"}</span>
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
              Issues ({repo.openIssues})
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Contributors ({repo.contributors})
            </Button>
            <Button variant="outline"  >
              <GitBranch className="h-4 w-4 mr-2" />
              <a href={repo.data?.html_url} target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>)
}