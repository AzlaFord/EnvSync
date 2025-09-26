"use client"

import { RepositoryTable } from "@/app/repository-table"
import { useState, Suspense } from "react"
import LoadingPage from "@/app/Loading"
export default function RepositoriesPage() {
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [value, setValue] = useState("")

  if (selectedRepo) {
    return null
  }

  return (
    <Suspense fallback={<LoadingPage/>}>
      <RepositoryTable
        onRepositoryClick={setSelectedRepo}
        value={value}
        sendToParent={setValue}
      />
    </Suspense>
  )
}
