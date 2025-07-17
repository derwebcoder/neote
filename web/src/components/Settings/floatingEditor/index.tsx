import { BalloonIcon } from "@/assets/BalloonIcon";
import { FloatingEditor } from "@/components/Settings/floatingEditor/FloatingEditor";
import type { SettingsItem } from "@/components/Settings/settingsList";
import { cn } from "@/lib/utils";

export const floatingEditorSettings: SettingsItem = {
  name: "Floating editor",
  icon: <BalloonIcon className={cn("h-5 w-5")} />,
  component: <FloatingEditor />,
}