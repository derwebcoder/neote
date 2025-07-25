import { floatingEditorSettings } from "$/parts/floatingEditor";
import { generalSettings } from "$/parts/general";

export type SettingsItem = {
  name: string
  icon: React.ReactNode
  component: React.ReactNode
}

export const settings: SettingsItem[] = [
  generalSettings,
  floatingEditorSettings,
]