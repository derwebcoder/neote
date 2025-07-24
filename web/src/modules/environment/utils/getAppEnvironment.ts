import { AppEnvironment } from "$/types/Environments"
import { isAppEnvironment } from "$/utils/isAppEnvironment"

export const getAppEnvironment = () => {
  if (!isAppEnvironment) {
    throw new Error('Not in app environment. Check first with isAppEnvironment()')
  }
  return window.neote as AppEnvironment
}