"use client"
import * as React from "react"
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
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
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
