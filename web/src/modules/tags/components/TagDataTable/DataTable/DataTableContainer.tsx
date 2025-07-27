import { DataTable } from "$/components/TagDataTable/DataTable/DataTable"
import { columns } from "$/components/TagDataTable/columns"
import { useGetAllTags } from "$/hooks/useGetAllTags"

export const DataTableContainer = () => {
  const tags = useGetAllTags()
  return (
    <div>
      <DataTable columns={columns} data={tags} />
    </div>
  )
}