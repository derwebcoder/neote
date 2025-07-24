export const isAppEnvironment = () => {
  if (window.neote?.isApp) {
    return true
  }
  return false
}