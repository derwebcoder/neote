import { Settings } from "@/components/Settings/Settings"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/modules/ui/elements/dialog"
import { Settings2 } from "lucide-react"

export const SettingsDialogButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex size-8 items-center justify-center rounded text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
          <Settings2 color="url(#gray_gradient)" strokeWidth={1.5} />
          <span className="sr-only">Settings</span>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <Settings />
      </DialogContent>
    </Dialog>
  )
}