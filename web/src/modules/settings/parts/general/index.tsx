import type { SettingsItem } from "$/config/settingsList";
import { SettingsIcon } from "lucide-react";
import { GeneralSettings } from "./GeneralSettings";

export const generalSettings: SettingsItem = {
  name: "General",
  icon: <SettingsIcon />,
  component: <GeneralSettings />,
}