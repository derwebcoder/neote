import { createStore } from "@xstate/store"
import { useSelector } from "@xstate/store/react"
import { Settings } from "@/modules/types/Settings"
import { toMerged } from "es-toolkit"
import { isAppEnvironment, getAppEnvironment } from "@/modules/environment"
import { DeepPartial } from "@/modules/types/DeepPartial"

let defaultSettings: Settings = {
  animations: {
    enabled: true,
  },
  floatingWindow: {
    opacity: 100,
    opaqueOnFocus: false,
    shrinkOnBlur: false,
  },
}

export const settingsStore = createStore({
  context: defaultSettings,
  on: {
    update: (context, event: { settings: DeepPartial<Settings> }) => {
      return toMerged(context, event.settings)
    },
  },
})

export const initSettingsStore = async () => {
  if (isAppEnvironment()) {
    const settings = await getAppEnvironment().settings.get()
    settingsStore.trigger.update({
      settings: settings
    })
  }
}

export const getSettingsStore = () => {
  return settingsStore
}

const sharedSettingsSelector = settingsStore.select((state) => state.floatingWindow)
sharedSettingsSelector.subscribe((state) => {
  if (isAppEnvironment()) {
    getAppEnvironment().settings.set({
      floatingWindow: state
    })
  }
})

export const useFloatingWindowSettings = () => {
  const settings = useSelector(settingsStore, (state) => state.context.floatingWindow)
  return settings
}