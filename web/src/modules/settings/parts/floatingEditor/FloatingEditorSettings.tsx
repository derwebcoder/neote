import { Switch } from "@/modules/ui/elements/switch"
import { Item } from "$/components/Item/Item"
import { Group } from "$/components/Group/Group"
import { Slider } from "@/modules/ui/elements/slider"
import { updateSettings, useFloatingWindowSettings } from "$/stores/settingsStore"
import { isAppEnvironment } from "@/modules/environment"
import { Alert, AlertDescription, AlertTitle } from "@/modules/ui/elements/alert"
import { Laptop2 } from "lucide-react"
import { cn } from "@/modules/ui/lib/utils"

export const FloatingEditorSettings = () => {
  const settings = useFloatingWindowSettings()
  const isApp = isAppEnvironment()

  const handleOpacityChange = (value: number) => {
    updateSettings({
      floatingWindow: {
        opacity: value,
      },
    })
  }

  const handleOpaqueOnFocusChange = (value: boolean) => {
    updateSettings({
      floatingWindow: {
        opaqueOnFocus: value,
      },
    })
  }

  const handleShrinkOnBlurChange = (value: boolean) => {
    updateSettings({
      floatingWindow: {
        shrinkOnBlur: value,
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
        <Group>
          <Item
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
          <Item
            title="Opaque on focus"
            description="When you focus on the floating editor, it will become opaque."
            action={<Switch checked={settings.opaqueOnFocus ?? false} onCheckedChange={handleOpaqueOnFocusChange} disabled={!isApp} />}
          />
        </Group>
        <Group>
          <Item
            title="Shrink on blur"
            description="When the floating editor is not focused, it will shrink."
            action={<Switch checked={settings.shrinkOnBlur ?? false} onCheckedChange={handleShrinkOnBlurChange} disabled={!isApp} />}
          />
        </Group>
      </div>
    </div>
  )
}