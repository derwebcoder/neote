import { EditorMain } from "@/components/EditorMain/EditorMain";
import { NavigationSidebar } from "@/components/NavigationSidebar/NavigationSidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen" data-tag-style="token-gradient-light">
      <div
        className="fixed h-full w-full"
        style={{
          // backgroundImage:
          // "radial-gradient(at 17% 18%, #feffd2 0%, transparent 60%), radial-gradient(at 49% 62%, #ffeea9 0%, transparent 50%), radial-gradient(at 52% 94%, #ffbf78 0%, transparent 40%), radial-gradient(at 67% 2%, #ff7d29 0%, transparent 30%)",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1746121813274-50f7f8d4bad4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          filter: "blur(5px)",
        }}
      ></div>
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
