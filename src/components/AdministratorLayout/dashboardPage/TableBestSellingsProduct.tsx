import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { BestSellingProduct, BestSellingProductTable } from "@/types/auth";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type PaginationState } from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function TableBestSellingsProduct({data}:{data: BestSellingProduct[]}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
   const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = useMemo<ColumnDef<BestSellingProductTable | any>[]>(()=>
    [
      {
        accessorKey: 'product_image',
        header: 'Imagen',
        cell: ({getValue}) => {
          const imgurl = getValue() as string
          return (
            <div className='w-20 h-20 flex items-center justify-center'>
              <img src={imgurl} alt={imgurl} className='w-full h-full object-cover rounded-md border'/>
            </div>
          )
        }
      },
      {
        accessorKey: 'product_name',
        header: ()=> <div className="flex items-center gap-x-2"><span>Producto</span><ArrowUpDown className="w-4 h-4" /></div>,
        cell: (info)=> <span>{info.getValue() as string}</span>
      },
      {
        accessorKey: 'total_revenue',
        header: ({column})=> (
          <button className="flex items-center gap-x-2" onClick={()=> column.toggleSorting(column.getIsSorted() === "asc")}>
            <span>Cantidad Generada</span><ArrowUpDown className="w-4 h-4"/>
          </button>
        ),
        cell: (info)=> <span className="text-lg font-semibold">${info.getValue() as string}</span>
      },
      {
        accessorKey: 'total_sold',
        header: ({column})=> (
          <button className="flex items-center gap-x-2" onClick={()=> column.toggleSorting(column.getIsSorted() === "asc")}>
            <span>Cantidad Vendida</span><ArrowUpDown className="w-4 h-4"/>
          </button>
        ),
        cell: (info)=> <span className="font-bold text-xl">{info.getValue() as string}</span>
      },
    ], []
  )

  const table = useReactTable({
    columns,
    data: data?? [],
    filterFns: {},
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl capitalize">productos más vendidos</CardTitle>
        <CardDescription>La siguiente tabla muestra la información de los productos maás vendidos</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup)=>(
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header)=> (
                  <TableHead key={header.id} className="w-25">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row)=>(
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell)=>(
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <section className="flex items-center gap-x-2">
          <div>
            Mostrar
          </div>
          <select
            value={table.getState().pagination.pageSize}
            className="border border-gray-400 rounded-lg p-1"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5,10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </section>
        <section className="flex items-center gap-x-2">
          <Button
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <Button
            variant='outline'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
        </section>
      </CardFooter>
    </Card>
  )
}