import { floatingEditorSettings } from "$/parts/floatingEditor";
import { SettingsIcon } from "lucide-react";

export type SettingsItem = {
  name: string
  icon: React.ReactNode
  component: React.ReactNode
}

export const settings: SettingsItem[] = [
  {
    name: "General",
    icon: <SettingsIcon />,
    component: <span>Something</span>,
  },
  floatingEditorSettings,
]