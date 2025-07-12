import { NavigationSidebar } from "@/components/NavigationSidebar/NavigationSidebar";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex justify-around">
        <div className="flex h-screen w-[clamp(820px,100vw,1200px)]">
          <NavigationSidebar />
          <div className="w-full">
            <Outlet />
          </div>
          <TanStackRouterDevtools position="bottom-right" />
        </div>
      </div>
      <Toaster position="bottom-left" />
    </>
  ),
});
