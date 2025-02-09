import { useQuery } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { botsApi } from '../../api/endpoints'

interface Bot {
  bot_id: string
  name: string
  description: string
  logo_image: string | null
}

const columnHelper = createColumnHelper<Bot>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => (
      <Link to={`/bots/${info.row.original.bot_id}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('logo_image', {
    header: 'Logo',
    cell: info => info.getValue() ? 
      <img src={info.getValue()!} alt="Bot logo" className="bot-logo" /> : 
      null
  }),
]

export function BotsPage() {
  const { data: bots = [] } = useQuery({
    queryKey: ['bots'],
    queryFn: botsApi.getAll
  })

  const table = useReactTable({
    data: bots,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h1>Bots</h1>
      <Link to="/bots/new" className="button">
        Add New Bot
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
