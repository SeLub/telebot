import { useQuery } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { postlinesApi } from '../../api/endpoints'

interface Postline {
  postline_id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'deleted'
  last_updated: string
}

const columnHelper = createColumnHelper<Postline>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => (
      <Link to={`/postlines/${info.row.original.postline_id}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('last_updated', {
    header: 'Last Updated',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  }),
]

export function PostlinesPage() {
  const { data: postlines = [] } = useQuery({
    queryKey: ['postlines'],
    queryFn: postlinesApi.getAll
  })
  const table = useReactTable({
    data: postlines,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h1>Postlines</h1>
      <Link to="/postlines/new" className="button">
        Create New Postline
      </Link>
      
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
