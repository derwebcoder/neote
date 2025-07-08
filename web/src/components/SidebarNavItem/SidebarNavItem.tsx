import { Link } from "@tanstack/react-router";
import React from "react";

export type SidebarNavItemProps = React.PropsWithChildren<{
  href: string;
}>;

export const SidebarNavItem = ({ href, children }: SidebarNavItemProps) => {
  return (
    <Link
      to={href}
      className={
        "flex size-8 items-center justify-center rounded text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      }
      style={
        {
          // border: "1px solid #777",
          // background: "linear-gradient(135deg, #567, #333 50%)",
        }
      }
    >
      {/* <div className="flex size-9 items-center justify-center rounded-lg bg-gray-900"> */}
      {children}
      {/* </div> */}
    </Link>
  );
};
