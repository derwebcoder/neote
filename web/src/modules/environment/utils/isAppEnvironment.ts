import { AppEnvironment, Environment } from "$/types/Environments"

export const isAppEnvironment = (env?: Environment): env is AppEnvironment => {
  if (env?.isApp) {
    return true
  }
  return false
}