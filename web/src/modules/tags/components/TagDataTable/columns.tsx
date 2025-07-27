import { ColumnDef } from "@tanstack/react-table"
import { Tag } from "@/modules/tags/models/Tag"
import { defineNeoteTag } from "$/components/NeoteTag/NeoteTag"

defineNeoteTag()

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
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "hue",
    header: "Color",
  },
  // {
  //   accessorKey: 'count',
  //   header: 'Count',
  // }
]