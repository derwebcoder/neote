import { Switch } from "@/components/ui/switch"
import { SettingControl, SettingControlFrame } from "@/components/Settings/SettingControl"
import { Slider } from "@/components/ui/slider"
import { settingsStore, useFloatingWindowSettings } from "@/stores/settingsStore"

export const FloatingEditorSettings = () => {

  const settings = useFloatingWindowSettings()

  console.log(settings)

  const handleOpacityChange = (value: number) => {
    settingsStore.trigger.update({
      settings: {
        floatingWindow: {
          opacity: value,
        },
      },
    })
  }

  const handleOpaqueOnFocusChange = (value: boolean) => {
    settingsStore.trigger.update({
      settings: {
        floatingWindow: {
          opaqueOnFocus: value,
        },
      },
    })
  }

  const handleShrinkOnBlurChange = (value: boolean) => {
    settingsStore.trigger.update({
      settings: {
        floatingWindow: {
          shrinkOnBlur: value,
        },
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <SettingControlFrame>
        <SettingControl
          title="Opacity"
          description="Control the opacity of the window."
          action={
            <Slider
              max={100}
              min={20}
              step={1}
              className="w-[80px]"
              value={[settings.opacity ?? 100]}
              onValueChange={(value) => handleOpacityChange(value[0])}
            />}
        />
        <SettingControl
          title="Opaque on focus"
          description="When you focus on the floating editor, it will become opaque."
          action={<Switch checked={settings.opaqueOnFocus ?? false} onCheckedChange={handleOpaqueOnFocusChange} />}
        />
      </SettingControlFrame>
      <SettingControlFrame>
        <SettingControl
          title="Shrink on blur"
          description="When the floating editor is not focused, it will shrink."
          action={<Switch checked={settings.shrinkOnBlur ?? false} onCheckedChange={handleShrinkOnBlurChange} />}
        />
      </SettingControlFrame>
    </div>
  )
}