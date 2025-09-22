'use client'

import { useState } from "react"
import { RepositoryTable } from "@/app/repository-table"

export default function RepositoriesPage() {
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [value, setValue] = useState("")

  if (selectedRepo) {
    return null
  }

  return (
    <RepositoryTable
      onRepositoryClick={setSelectedRepo}
      value={value}
      sendToParent={setValue}
    />
  )
}
