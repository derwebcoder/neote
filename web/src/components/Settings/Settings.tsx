import { settings } from "@/components/Settings/settingsList"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/modules/ui/elements/sidebar"
import { useState } from "react"

export const Settings = () => {
  const [selectedItem, setSelectedItem] = useState<(typeof settings)[number]>(settings[0])

  return (
    <SidebarProvider className="items-start">
      <Sidebar collapsible="none" className="hidden md:flex">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {settings.map((item) => (
                  <SidebarMenuItem key={item.name} >
                    <SidebarMenuButton
                      asChild
                      isActive={item.name === selectedItem.name}
                      onClick={() => setSelectedItem(item)}
                    >
                      <span>
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <span className="text-sm font-bold">{selectedItem.name}</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          {selectedItem.component}
        </div>
      </main>
    </SidebarProvider>
  )
}