"use client"

import { useState } from "react"


export default function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState(null)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          {selectedRepo ? (
            <RepositoryDetails repositoryName={selectedRepo} onBack={() => setSelectedRepo(null)} />
          ) : (
            <RepositoryTable onRepositoryClick={setSelectedRepo} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}
