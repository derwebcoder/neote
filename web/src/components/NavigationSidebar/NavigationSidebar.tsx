import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  StickyNote,
  BotMessageSquare,
  GraduationCap,
  Settings2,
  ListTodo,
} from "lucide-react";
import React from "react";

// Menu items.
const items = [
  {
    title: "Notes",
    url: "#",
    icon: StickyNote,
    badge: null,
  },
  {
    title: "Chat",
    url: "#",
    icon: BotMessageSquare,
    badge: "soon",
  },
  {
    title: "Tasks",
    url: "#",
    icon: ListTodo,
    badge: "soon",
  },
  {
    title: "Learn",
    url: "#",
    icon: GraduationCap,
    badge: "soon",
  },
];

export type NavigationSidebarProps = {
  headerSlot?: React.ReactNode;
};

export const NavigationSidebar = ({ headerSlot }: NavigationSidebarProps) => {
  return (
    <SidebarProvider
      defaultOpen={true}
      className="w-fit"
      style={
        {
          "--sidebar-width": "18rem",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
    >
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader>{headerSlot}</SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>
                        <Badge variant="outline">{item.badge}</Badge>
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Settings2 />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
