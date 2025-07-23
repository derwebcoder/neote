import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/modules/ui/elements/card"

type SettingControlProps = {
  title: string
  description: string
  action: React.ReactNode
}

export const SettingControl = ({ title, description, action }: SettingControlProps) => {
  return (
    <CardHeader className="p-2">
      <CardTitle className="text-sm">{title}</CardTitle>
      <CardDescription className="text-xs">{description}</CardDescription>
      <CardAction>{action}</CardAction>
    </CardHeader>
  )
}

type SettingControlFrameProps = {
  children: React.ReactNode
}

export const SettingControlFrame = ({ children }: SettingControlFrameProps) => {
  return (
    <Card className="p-2 border-none">
      {children}
    </Card>
  )
} 