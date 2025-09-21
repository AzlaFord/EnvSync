'use client'

import { RepositoryDetails } from "@/app/repository-details"
import React from "react"

export default function RepositoryDetailsPage({ params, searchParams }) {
    const { id } = React.use(params)  
    const { owner, userId } = React.use(searchParams)
    return <RepositoryDetails repositoryName={id} owner={owner} userId={userId} />
}

