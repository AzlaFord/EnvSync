"use client"
import { useQuery } from "@tanstack/react-query"
import { createClient2 } from "@/utils/supabase/client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const getDataUser = async () =>{
  const supabase = createClient2()
  const { data, error } = await supabase.auth.getSession()
  return data
}
const data2 = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  
  ],
}

export function AppSidebar({
  ...props
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getDataUser,
  })

  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data2.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data2.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userData={data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
