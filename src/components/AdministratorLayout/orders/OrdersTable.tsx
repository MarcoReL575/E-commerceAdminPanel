import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/helpers/formatDate";
import { statusOption, type OrdersShcema, type Status } from "@/types/auth";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState } from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditStatusButton from "./EditStatusButton";
import InfoOrders from "./InfoOrders";

export default function OrdersTable({ orderList }: { orderList: OrdersShcema[] | undefined }) {
    const [data, setData] = useState<OrdersShcema[]>(orderList ?? [])
    useEffect(() => {
        if (orderList) {
            setData(orderList)
        }
    }, [orderList]);

    const handleUserFilterChange = useCallback((value: string) => {
        if(value === 'all') {
            setColumnFilters([]);
            return
        }
        setColumnFilters([{ id: "status", value }])
    }, [])

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const columns = useMemo<ColumnDef<OrdersShcema, any>[]>(() =>
        [
            {
                accessorKey: 'profiles.username',
                header: ({ column }) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Clientes</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (info) => <span>{info.getValue()}</span>
            },
            {
                accessorKey: 'created_at',
                header: ({ column }) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Fecha</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (info) => <span>{formatDate(info.getValue())}</span>
            },
            {
                accessorKey: 'total',
                header: ({ column }) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Total</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: (info) => <span>${info.getValue()}</span>
            },
            {
                accessorKey: 'status',
                header: ({ column }) => (
                    <button
                        className="flex items-center space-x-1 hover:text-blue-600"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Estatus</span>
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                ),
                cell: ({ row, getValue }) => {
                    const status = getValue() as Status;
                    const orderId = row.original.id;
                    return (
                        <div className="flex items-center justify-between gap-x-2 w-70">
                            <span 
                                className={`p-1 border border-gray-400 capitalize rounded
                                ${status === 'pendiente' && 'bg-red-300 text-red-700'}
                                ${status === 'proceso' && 'bg-amber-300 text-amber-700'}
                                ${status === 'completado' && 'bg-green-300 text-green-700'}`}
                            >{status}</span>
                            <div className="flex items-center gap-x-2">
                                <EditStatusButton  orderId={orderId} />
                                <InfoOrders orderId={orderId} />
                            </div>
                        </div>
                    )
                }
            },
        ], [],
    )

    const table = useReactTable({
        data: data,
        columns: columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>Tabla de Órdenes</CardTitle>
                    <CardDescription>Todas las órdenes que se han realizado</CardDescription>
                </div>
                <div>
                    <Select onValueChange={handleUserFilterChange} defaultValue="all">
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Filtrar por usuario" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">--Todos Los Estatus--</SelectItem>
                            {statusOption?.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((header) => (
                            <TableRow key={header.id}>
                                {header.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    )
                                })}
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
            <CardFooter className="flex items-center justify-between">
                <section className="flex gap-x-2 items-center">
                    <span className="font-semibold">Mostrar</span>
                    <select
                        className="border border-gray-400 rounded-lg p-1"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </section>
                <section className="flex items-center gap-x-2">
                    <Button variant='outline'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon />
                    </Button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
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