import { DataTableContainer } from "$/components/TagDataTable/DataTable/DataTableContainer"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/modules/ui/elements/dialog"
import { Bookmark } from "lucide-react"

export const TriggerButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex size-8 items-center justify-center rounded text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
          <Bookmark color="url(#gray_gradient)" strokeWidth={1.5} />
          <span className="sr-only">Tags</span>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Tags</DialogTitle>
        <DialogDescription className="sr-only">
          View and edit your tags here.
        </DialogDescription>
        <div className="h-[460px]">
          <DataTableContainer />
        </div>
      </DialogContent>
    </Dialog>
  )
}