import { Switch } from "@/components/ui/switch"
import { SettingControl } from "@/components/Settings/SettingControl"
import { Slider } from "@/components/ui/slider"

export const FloatingEditor = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <SettingControl
        title="Opacity"
        description="Control the opacity of the window."
        action={<Slider defaultValue={[50]} max={100} min={20} step={1} className="w-[80px]" />}
      />
      <SettingControl
        title="Opaque on focus"
        description="When you focus on the floating editor, it will become opaque."
        action={<Switch />}
      />
      <SettingControl
        title="Shrink on blur"
        description="When the floating editor is not focused, it will shrink."
        action={<Switch />}
      />
    </div>
  )
}