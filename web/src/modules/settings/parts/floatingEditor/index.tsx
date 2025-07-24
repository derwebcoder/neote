import { BalloonIcon } from "@/assets/BalloonIcon";
import { FloatingEditorSettings } from "./FloatingEditorSettings";
import type { SettingsItem } from "$/config/settingsList";
import { cn } from "@/modules/ui/lib/utils";

export const floatingEditorSettings: SettingsItem = {
  name: "Floating editor",
  icon: <BalloonIcon className={cn("h-5 w-5")} />,
  component: <FloatingEditorSettings />,
}