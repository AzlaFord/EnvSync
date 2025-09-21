'use client'

import RepositoryDetails from "../repository-details"

export default function RepositoryDetailsPage({ params }) {
  const { id } = params

  return (
    <RepositoryDetails repositoryName={id} owner={owner} userId={selectedRepo.userId} />
  )
}
