"use client"

import { useState } from "react"
import { RepositoryTable } from "./repository-table"
import { RepositoryDetails } from "./repository-details"

export default function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState(null)

  return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          {selectedRepo ? (
            <RepositoryDetails repositoryName={selectedRepo} onBack={() => setSelectedRepo(null)} />
          ) : (
            <RepositoryTable onRepositoryClick={setSelectedRepo} />
          )}
        </div>
      </div>
  )
}
