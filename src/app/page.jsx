'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useState } from "react";
import { RepositoryTable } from "./repository-table"
import { RepositoryDetails } from "./repository-details"

export default function Page() {
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [value, setValue] = useState("")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="">Repositories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedRepo?.name ? selectedRepo?.name : "All Repositories"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {selectedRepo ? (
                <RepositoryDetails repositoryName={selectedRepo?.name} owner={selectedRepo.owner} onBack={() => setSelectedRepo(null)} />
              ) : (
                <RepositoryTable onRepositoryClick={setSelectedRepo} value={value} sendToParent={setValue} />
              )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
