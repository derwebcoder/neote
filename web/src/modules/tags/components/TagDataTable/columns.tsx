import { ColumnDef } from "@tanstack/react-table"
import { Tag } from "@/modules/tags/models/Tag"
import { defineNeoteTag } from "$/components/NeoteTag/NeoteTag"
import { defineNeoteHueSelect, NeoteHueSelectEvent } from "$/components/NeoteHueSelect/NeoteHueSelect"
import { DI } from "@/modules/dependency-injection"
import { TagIconSelect } from "$/components/TagIconSelect/TagIconSelect"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/modules/ui/elements/dropdown-menu"
import { Button } from "@/modules/ui/elements/button"

defineNeoteTag()
defineNeoteHueSelect()

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tag
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.getName()

      return <neote-tag name={name} />
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const tag = row.original
      const description = tag.getDescription()

      const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        tag.setDescription(event.target.value)
        DI.resolve("TagService").update(tag)
      }

      return <textarea defaultValue={description} onBlur={handleBlur} className="w-full h-full p-1 resize-none" />
    },
  },
  {
    accessorKey: "icon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Icon
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tag = row.original

      return <TagIconSelect tag={tag} />
    },
  },
  {
    accessorKey: "hue",
    enableGlobalFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const hue = row.original.getHue()

      const handleHueSelect = (event: NeoteHueSelectEvent) => {
        row.original.setHue(event.detail?.hue ?? 0)
        const tagService = DI.resolve('TagService')
        tagService.update(row.original)
      }

      return <neote-hue-select hue={hue} onhue-select={handleHueSelect} />
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tag = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => DI.resolve("TagService").delete(tag.getName())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]