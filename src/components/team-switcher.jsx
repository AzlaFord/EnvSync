"use client"
import * as React from "react"
import Image from "next/image"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuButton
} from "@/components/ui/sidebar"

export function Platfrom({
  platfrom
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <div className="">
            <Image
            className="flex aspect-square size-12 rounded-lg" 
              src="/file.svg" 
              alt="icon" 
              width={60}   
              height={50}  
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{platfrom[0].name}</span>
            <span className="truncate text-xs">{platfrom[0].plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
