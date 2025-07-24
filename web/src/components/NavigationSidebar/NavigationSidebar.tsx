import {
  StickyNote,
  BotMessageSquare,
  GraduationCap,
  ListTodo,
} from "lucide-react";
import Logo from "@/assets/logo.svg";
import { SidebarNavItem } from "@/components/SidebarNavItem/SidebarNavItem";
import { TriggerButton as SettingsButton } from "@/modules/settings/components/TriggerButton/TriggerButton";

// Menu items.
const items = [
  {
    title: "Notes",
    url: "#",
    icon: <StickyNote color="url(#gray_gradient)" strokeWidth={1.5} />,
    badge: null,
  },
  {
    title: "Chat",
    url: "#",
    icon: <BotMessageSquare color="url(#gray_gradient)" strokeWidth={1.5} />,
    badge: "soon",
  },
  {
    title: "Tasks",
    url: "#",
    icon: <ListTodo color="url(#gray_gradient)" strokeWidth={1.5} />,
    badge: "soon",
  },
  {
    title: "Learn",
    url: "#",
    icon: <GraduationCap color="url(#gray_gradient)" strokeWidth={1.5} />,
    badge: "soon",
  },
];

export const NavigationSidebar = () => {
  return (
    <>
      <nav className="flex flex-col items-center px-2">
        <a href="#" className="pt-4 pb-6">
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
            <img src={Logo} alt="logo" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="sr-only truncate font-medium">Neote</span>
          </div>
        </a>
        <div className="flex h-full flex-col items-center">
          <ol>
            {items.map((item) => (
              <li key={item.title} className="pb-3">
                <SidebarNavItem href={item.url}>
                  {item.icon}
                  <span className="sr-only">{item.title}</span>
                </SidebarNavItem>
              </li>
            ))}
          </ol>
          <hr className="w-full border-stone-300 mt-3 pb-6" />
          <ol>
            <li className="pb-2">
              <SettingsButton />
            </li>
          </ol>
        </div>
      </nav>
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="blue_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0ef" />
            <stop offset="100%" stopColor="#00f" />
          </linearGradient>
          <linearGradient
            id="green_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fd0" />
            <stop offset="100%" stopColor="#0d0" />
          </linearGradient>
          <linearGradient
            id="red_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f0e" />
            <stop offset="100%" stopColor="#f00" />
          </linearGradient>
          <linearGradient
            id="cyan_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#add" />
            <stop offset="100%" stopColor="#0dd" />
          </linearGradient>
          <linearGradient
            id="gray_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#d6d3d1" />
            <stop offset="100%" stopColor="#57534e" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
