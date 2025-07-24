import { CardHeader, CardTitle, CardDescription, CardAction } from "@/modules/ui/elements/card"

type ItemProps = {
  title: string
  description: string
  action: React.ReactNode
}

export const Item = ({ title, description, action }: ItemProps) => {
  return (
    <CardHeader className="p-2">
      <CardTitle className="text-sm">{title}</CardTitle>
      <CardDescription className="text-xs">{description}</CardDescription>
      <CardAction>{action}</CardAction>
    </CardHeader>
  )
}