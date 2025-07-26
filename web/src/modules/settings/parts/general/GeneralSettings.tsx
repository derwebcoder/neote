import { Switch } from "@/modules/ui/elements/switch"
import { Item } from "$/components/Item/Item"
import { Group } from "$/components/Group/Group"
import { updateSettings, useGeneralSettings } from "$/stores/settingsStore"
import { defineNeoteTagStyleSelect, NeoteTagStyleSelectEvent, tagStyleService } from "@/modules/tags"
import { useState } from "react"

defineNeoteTagStyleSelect()

export const GeneralSettings = () => {
  const settings = useGeneralSettings()
  const [tagStyle, setTagStyle] = useState(tagStyleService.getStyle())

  const handleTagStyleChange = (event: NeoteTagStyleSelectEvent) => {
    console.log('event', event)
    tagStyleService.updateStyle(event.detail?.style ?? "basic")
    setTagStyle(event.detail?.style ?? "basic")
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Group>
        <Item
          title="Animations"
          description="Enable or disable animations."
          actionRight={
            <Switch
              checked={settings.animations.enabled}
              onCheckedChange={(value) => updateSettings({
                general: {
                  animations: {
                    enabled: value,
                  },
                },
              })}
            />
          }
        />
      </Group>
      <Group>
        <Item
          title="Tag style"
          description="The style of the tags."
          actionBottom={
            <div className="text-xs text-muted-foreground">
              <neote-tag-style-select
                value={tagStyle}
                onstyle-select={handleTagStyleChange}
              />
            </div>
          }
        />
      </Group>
    </div>
  )
}