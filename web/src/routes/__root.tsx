import { NavigationSidebar } from "@/components/NavigationSidebar/NavigationSidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen">
      <NavigationSidebar />
      <div className="w-full">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
