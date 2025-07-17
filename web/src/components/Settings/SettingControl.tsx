import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  title: string
  description: string
  action: React.ReactNode
}

export const SettingControl = ({ title, description, action }: Props) => {
  return (
    <Card className="p-2 border-none">
      <CardHeader className="p-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
        <CardAction>{action}</CardAction>
      </CardHeader>
    </Card>
  )
}