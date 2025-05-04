import { EditorMain } from "@/components/EditorMain/EditorMain";
import { NavigationSidebar } from "@/components/NavigationSidebar/NavigationSidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen">
      <NavigationSidebar
        headerSlot={
          <div className="h-28 py-2">
            <EditorMain />
          </div>
        }
      />
      <main className="w-full">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
