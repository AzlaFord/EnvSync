"use client"
import { useQuery } from "@tanstack/react-query"
import { createClient2 } from "@/utils/supabase/client"
import * as React from "react"
import {
  Frame,
  Map,
  Settings2,
  Activity,
  Folder,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { Platfrom } from "@/components/team-switcher"
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
      name: "EnvSync",
      plan: "Save your keys",
    }
  ],
  navMain: [
    {
      title: "Repositories",
      url: "/",
      icon: Folder,
      isActive: true,
      items: [
        {
          title: "All Repositories",
          url: "/repositories",
          action: "repositories",
        },
        {
          title: "Search",
          url: "/search",
          action: "repositories",
        },
        {
          title: "Starred",
          url: "/starred",
          action: "repositories",
        }
      ],
    },
    {
      title: "Chat",
      url: "#",
      isActive: true,
      items: [
        {
          title: "AddUser",
          url: "/addUser",
        },
        {
          title: "CreateGroup",
          url: "/CreateGroup",
        },
        {
          title: "Friends",
          url: "/friends",
          action: "contributors",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Frontend Projects",
      url: "/chat",
      icon: Folder,
    },
    {
      name: "Backend APIs",
      url: "#",
      icon: Folder,
    },
    {
      name: "Mobile Apps",
      url: "#",
      icon: Folder,
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
        <Platfrom platfrom={data2.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data2.navMain} />
        <NavProjects projects={data2.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userData={data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
