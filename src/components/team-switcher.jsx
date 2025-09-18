"use client"
import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function Platfrom({
  platfrom
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{platfrom[0].name}</span>
            <span className="truncate text-xs">{platfrom[0].plan}</span>
          </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
