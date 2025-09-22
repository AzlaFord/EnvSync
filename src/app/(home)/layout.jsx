"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'
export default function HomeLayout({children}){
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)
    return (
    <>
    <SidebarProvider>
        <AppSidebar collapsible="offcanvas" />
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 mb-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-6 mr-2 mt-1 scale-y-50" />
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.map((seg, idx) => {
                    const href = '/' + segments.slice(0, idx + 1).join('/')
                    const isLast = idx === segments.length - 1
                    return (
                        <BreadcrumbItem key={href}>
                        {isLast ? (
                            <BreadcrumbPage>{seg.charAt(0).toUpperCase() + seg.slice(1)}</BreadcrumbPage>
                        ) : (
                            
                            <BreadcrumbLink href={href}>{seg.charAt(0).toUpperCase() + seg.slice(1)}</BreadcrumbLink>
                            
                        )}
                        </BreadcrumbItem>
                    )
                    })}
                </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
    </>)
}