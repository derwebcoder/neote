import { Switch } from "@/modules/ui/elements/switch"
import { SettingControl, SettingControlFrame } from "@/components/Settings/SettingControl"
import { Slider } from "@/modules/ui/elements/slider"
import { settingsStore, useFloatingWindowSettings } from "@/stores/settingsStore"
import { isAppEnvironment } from "@/lib/environmentUtils"
import { Alert, AlertDescription, AlertTitle } from "@/modules/ui/elements/alert"
import { Laptop2 } from "lucide-react"
import { cn } from "@/modules/ui/lib/utils"

export const FloatingEditorSettings = () => {
  const settings = useFloatingWindowSettings()
  const isApp = isAppEnvironment(window.neote)

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
      {!isApp && (
        <Alert className="mb-4">
          <Laptop2 className="h-4 w-4" />
          <AlertTitle>Desktop App Feature</AlertTitle>
          <AlertDescription>
            These settings are only available in the Neote desktop app. Download the app to unlock floating editor functionality and customize its behavior!
          </AlertDescription>
        </Alert>
      )}
      <div className={cn(!isApp && "opacity-40")}>
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
                disabled={!isApp}
              />}
          />
          <SettingControl
            title="Opaque on focus"
            description="When you focus on the floating editor, it will become opaque."
            action={<Switch checked={settings.opaqueOnFocus ?? false} onCheckedChange={handleOpaqueOnFocusChange} disabled={!isApp} />}
          />
        </SettingControlFrame>
        <SettingControlFrame>
          <SettingControl
            title="Shrink on blur"
            description="When the floating editor is not focused, it will shrink."
            action={<Switch checked={settings.shrinkOnBlur ?? false} onCheckedChange={handleShrinkOnBlurChange} disabled={!isApp} />}
          />
        </SettingControlFrame>
      </div>
    </div>
  )
}