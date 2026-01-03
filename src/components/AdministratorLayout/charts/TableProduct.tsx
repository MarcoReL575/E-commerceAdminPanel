import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { category } from '@/helpers/categoryList';
import { formatDate } from '@/helpers/formatDate';
import { useAdminStats } from '@/hooks/useAdminStats';
import type { ProductsProps } from '@/types/auth'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type PaginationState } from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CreateProduct } from './CreateProduct';

export default function TableProduct() {

    const { productsQuery } = useAdminStats()
    const {data: products, isLoading} = productsQuery
    if(isLoading) <div>Cargando...</div>
    
    const productsTable = useMemo(()=> {
        if(!products) return []
        return products.map((product)=> ({
            ...product,
            category: category.find((category)=> category.value === product.category_id)?.label ?? 'Sin categoría',
            status: product.is_active === true ? 'Activo' : 'Inactivo',
            created_at: formatDate(product.created_at)
        }));
    }, [products])
    
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([],)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const columns = useMemo<ColumnDef<ProductsProps, any>[]>(()=>
        [ 
            {
                accessorKey: 'url_image',
                header: 'Imagen',
                cell: ({getValue})=> {
                    const imageUrl = getValue() as string
                    return (
                        <div className='w-16 h-16 flex items-center justify-center'>
                            <img 
                                src={imageUrl}
                                alt={`Producto:${imageUrl}`} 
                                className='w-full h-full object-cover rounded-md border'
                            />
                        </div>
                    ) 
                }
            },
            {
                accessorKey: 'title',
                header: ({column}) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Nombre del Producto</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (cell)=> <span className='text-sm'>{cell.getValue() as string}</span>
            },
            {
                accessorKey: 'price',
                header: ({column}) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Precio</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (info)=> <span className='text-sm'>${info.getValue() as number}</span>
            },
            {
                accessorKey: 'stock',
                header: ({column}) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Stock</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (info)=> <span className='text-sm'>{info.getValue() as number}</span>
            },
            {
                accessorKey: 'category',
                header: ({column}) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Categoría</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (info)=> <span className='text-sm'>{info.getValue() as number}</span>
            },
            {
                accessorKey: 'status',
                header: ({column}) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Estatus</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (cell) => <span className="text-gray-900">{cell.getValue() as string}</span>
                
            },
            {
                accessorKey: 'created_at',
                header: 'Fecha de Alta',
                cell: (cell) => <span className="text-gray-900">{cell.getValue() as string}</span>
            },
        ], []
    )

    const table = useReactTable({
        data: productsTable ?? [],
        columns,
        state:{
            columnFilters,
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <Card>
            <CardHeader className='flex items-center justify-between'>
                <section>
                    <CardTitle>Tabla de Productos</CardTitle>
                    <CardDescription>Tabla de productos con toda su información</CardDescription>
                </section>
                <section>
                    <CreateProduct />
                </section>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className='flex justify-between items-center '>
                <section className='space-x-2'>
                    <span className='text-sm font-semibold text-gray-500'>
                        Filas por página
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        className='border border-gray-300 p-1 rounded-lg'
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </section>
                <section className='flex items-center space-x-4'>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <div className="flex items-center gap-1">
                        <div>Page</div>
                        <span>
                            <strong>{table.getState().pagination.pageIndex + 1} </strong>
                            of{' '}
                            {table.getPageCount()}
                        </span>
                    </div>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon />
                    </button>
                </section>
            </CardFooter>
        </Card>
    )
}
