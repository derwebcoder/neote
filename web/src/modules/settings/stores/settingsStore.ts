import { createStore } from "@xstate/store"
import { useSelector } from "@xstate/store/react"
import { Settings } from "$/types/Settings"
import { toMerged } from "es-toolkit"
import { isAppEnvironment, getAppEnvironment } from "@/modules/environment"
import { DeepPartial } from "@/modules/types/DeepPartial"

let defaultSettings: Settings = {
  general: {
    animations: {
      enabled: true,
    },
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

  syncFromLocalStorage("general")

  settingsStore.trigger.update({
    settings: {
      general: {
        animations: {
          enabled: false,
        },
      },
    }
  })

  if (isAppEnvironment()) {
    // this loads floatingWindow settings for example
    const settings = await getAppEnvironment().settings.get()
    settingsStore.trigger.update({
      settings: settings
    })

    // update shared settings whenever they change
    const sharedSettingsSelector = settingsStore.select((state) => state.floatingWindow)
    sharedSettingsSelector.subscribe((state) => {
      getAppEnvironment().settings.set({
        floatingWindow: state
      })
    })
  }
}

export const getSettingsStore = () => {
  return settingsStore
}

export const updateSettings = (settings: DeepPartial<Settings>) => {
  settingsStore.trigger.update({
    settings: settings
  })
}

export const useFloatingWindowSettings = () => {
  const settings = useSelector(settingsStore, (state) => state.context.floatingWindow)
  return settings
}

export const useGeneralSettings = () => {
  const settings = useSelector(settingsStore, (state) => state.context.general)
  return settings
}

export const syncFromLocalStorage = (key: keyof Settings) => {
  const FULL_KEY = `neote_settings_${key}`

  const selector = settingsStore.select((state) => state[key])
  selector.subscribe((state) => {
    localStorage.setItem(FULL_KEY, JSON.stringify(state))
  })

  const settings = localStorage.getItem(FULL_KEY)
  if (!settings) {
    return
  }

  try {
    settingsStore.trigger.update({
      settings: {
        [key]: JSON.parse(settings)
      }
    })
  } catch (e) {
    console.error(e)
  }
}