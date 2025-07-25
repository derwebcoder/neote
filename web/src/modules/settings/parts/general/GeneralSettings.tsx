import { Switch } from "@/modules/ui/elements/switch"
import { Item } from "$/components/Item/Item"
import { Group } from "$/components/Group/Group"
import { updateSettings, useGeneralSettings } from "$/stores/settingsStore"
import { tagStyleService } from "@/modules/tags/services/TagStyleService"
import { useState } from "react"
import '@/modules/tags/components/NeoteTagStyleSelection'
import { TagStyleSelectEvent } from "@/modules/tags/components/NeoteTagStyleSelection"

export const GeneralSettings = () => {
  const settings = useGeneralSettings()
  const [tagStyle, setTagStyle] = useState(tagStyleService.getStyle())

  const handleTagStyleChange = (event: TagStyleSelectEvent) => {
    console.log('event', event)
    tagStyleService.updateStyle(event.detail?.style ?? "basic")
    setTagStyle(event.detail?.style ?? "basic")
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div>
        <Group>
          <Item
            title="Animations"
            description="Enable or disable animations."
            action={
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
            action={
              <neote-tag-style-select
                value={tagStyle}
                onstyle-select={handleTagStyleChange}
              />
            }
          />
        </Group>
      </div>
    </div>
  )
}