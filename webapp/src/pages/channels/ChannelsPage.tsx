import { useQuery } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { channelsApi } from '../../api/endpoints'

interface Channel {
  channel_id: string
  name: string
  description: string
  members_count: number
  language: string
}

const columnHelper = createColumnHelper<Channel>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => (
      <Link to={`/channels/${info.row.original.channel_id}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('members_count', {
    header: 'Members',
  }),
  columnHelper.accessor('language', {
    header: 'Language',
  }),
]

export function ChannelsPage() {
  const { data: channels = [] } = useQuery({
    queryKey: ['channels'],
    queryFn: channelsApi.getAll
  })

  const table = useReactTable({
    data: channels,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h1>Channels</h1>
      <Link to="/channels/new" className="button">
        Add New Channel
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
