import { Card } from "@/modules/ui/elements/card"

type GroupProps = {
  children: React.ReactNode
}

export const Group = ({ children }: GroupProps) => {
  return (
    <Card className="p-2 border-none">
      {children}
    </Card>
  )
} 