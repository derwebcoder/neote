import { ColumnDef } from "@tanstack/react-table"
import { Tag } from "@/modules/tags/models/Tag"
import { defineNeoteTag } from "$/components/NeoteTag/NeoteTag"
import { defineNeoteHueSelect, NeoteHueSelectEvent } from "$/components/NeoteHueSelect/NeoteHueSelect"
import { DI } from "@/modules/dependency-injection"
import { TagIconSelect } from "$/components/TagIconSelect/TagIconSelect"

defineNeoteTag()
defineNeoteHueSelect()

export const columns: ColumnDef<Tag>[] = [
  {
    header: "Tag",
    cell: ({ row }) => {
      const name = row.original.getName()

      return <neote-tag name={name} />
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    header: "Icon",
    cell: ({ row }) => {
      const tag = row.original

      return <TagIconSelect tag={tag} />
    },
  },
  {
    header: "Color",
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
  // {
  //   accessorKey: 'count',
  //   header: 'Count',
  // }
]