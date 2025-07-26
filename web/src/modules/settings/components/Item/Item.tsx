import { CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from "@/modules/ui/elements/card"

type ItemProps = {
  title: string
  description: string
  actionRight?: React.ReactNode
  actionBottom?: React.ReactNode
}

export const Item = ({ title, description, actionRight, actionBottom }: ItemProps) => {
  return (
    <CardHeader className="p-2">
      <CardTitle className="text-sm">{title}</CardTitle>
      <CardDescription className="text-xs">{description}</CardDescription>
      {actionRight &&
        <CardAction>{actionRight}</CardAction>
      }
      {actionBottom &&
        <CardFooter className="mt-2">{actionBottom}</CardFooter>
      }
    </CardHeader>
  )
}