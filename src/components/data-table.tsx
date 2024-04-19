import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Props<T> {
  columns: ColumnDef<T>[];
  datas: T[];
}

export default function DataTable<T>(props: Readonly<Props<T>>) {
  const { columns = [], datas = [] } = props;

  const table = useReactTable({
    data: datas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full h-full flex flex-col items-end custom-scrollbar">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      aria-label={`header-${header.id}`}
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {datas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={table.getVisibleFlatColumns().length}>
                  <div className="text-center py-4">No Data</div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow aria-label="row" key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
