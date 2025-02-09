import { useQuery } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { postsApi } from '../../api/endpoints'

interface Post {
  post_id: string
  postline_id: string
  text: string
  media: {
    type: 'image' | 'video' | 'document' | 'audio'
    url: string
  }[]
  created_at: string
  updated_at: string
}

const columnHelper = createColumnHelper<Post>()

const columns = [
  columnHelper.accessor('text', {
    header: 'Content',
    cell: info => info.getValue().substring(0, 100) + '...'
  }),
  columnHelper.accessor('postline_id', {
    header: 'Postline',
  }),
  columnHelper.accessor('media', {
    header: 'Media',
    cell: info => info.getValue().length + ' files'
  }),
  columnHelper.accessor('created_at', {
    header: 'Created',
    cell: info => new Date(info.getValue()).toLocaleDateString()
  })
]

export function PostsPage() {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAll
  })

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/posts/new" className="button">
        Create New Post
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
