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