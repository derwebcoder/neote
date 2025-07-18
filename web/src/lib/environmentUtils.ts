import { AppEnvironment, Environment } from "@/types/Environment"

export const isAppEnvironment = (env?: Environment): env is AppEnvironment => {
  if (env?.isApp) {
    return true
  }
  return false
}

export const getBrowserEnvironment = () => {
  return {
    isApp: false,
  } as const
}