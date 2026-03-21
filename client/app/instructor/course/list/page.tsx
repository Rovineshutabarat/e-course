"use client";

import DataTablePlaceholder from "@/components/shared/data-table-placeholder";
import SearchBar from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CourseService } from "@/services/course.service";
import { Course } from "@/types/entity/course";
import { useQuery } from "@tanstack/react-query";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, Download, Edit, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const columns: ColumnDef<Course>[] = [
    { accessorKey: "id", header: "ID" },
    {
        accessorKey: "title",
        enableSorting: true,
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="text-center cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Title
                {column.getIsSorted() === "asc" ? (
                    <ArrowUp />
                ) : column.getIsSorted() === "desc" ? (
                    <ArrowDown />
                ) : (
                    <ArrowUpDown />
                )}
            </Button>
        ),
        cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <div className="text-center">{row.original.category.name}</div>
        ),
    },
    {
        accessorKey: "instructor",
        header: "Instructor",
        cell: ({ row }) => (
            <div className="text-center">{row.original.instructor.username}</div>
        ),
    },
    {
        accessorKey: "price",
        enableSorting: true,
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="text-center cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Price
                {column.getIsSorted() === "asc" ? (
                    <ArrowUp />
                ) : column.getIsSorted() === "desc" ? (
                    <ArrowDown />
                ) : (
                    <ArrowUpDown />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center">
                {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(row.getValue("price"))}
            </div>
        ),
    },
    {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => <div className="text-center">{row.getValue("difficulty")}</div>,
    },
    {
        accessorKey: "visibility",
        header: "Visibility",
        cell: ({ row }) => <div className="text-center">{row.getValue("visibility")}</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={`/company/department/update/${row.original.id}`}
                        className="flex items-center gap-x-2 w-full"
                    >
                        <Edit />
                        <span>Edit</span>
                    </Link>
                </DropdownMenuItem>
                {/*<DropdownMenuItem*/}
                {/*  className="text-destructive flex items-center cursor-pointer"*/}
                {/*  onClick={() => setShowDeleteDialog(true)}*/}
                {/*>*/}
                {/*  <TrashIcon /> <span>Delete</span>*/}
                {/*</DropdownMenuItem>*/}
            </DropdownMenuContent>
        </DropdownMenu>,
    },
];

const CourseListPage = () => {
    const [columnVisibility, setColumnVisibility] = useState({});

    const { data, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => CourseService.getAllCategories(),
    });

    const courses = data?.data ?? [];

    const table = useReactTable({
        data: courses,
        columns,
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Manage Courses</h2>
                    <p className="text-sm mt-1 ml-1 text-muted-foreground">
                        Manage and monitor all available courses.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Download />
                        <span>Export</span>
                    </Button>
                    <Link href="/instructor/course/create">
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger asChild>
                                <Button className="cursor-pointer">
                                    <Plus />
                                    Create Course
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Create a new course</TooltipContent>
                        </Tooltip>
                    </Link>
                </div>
            </div>

            <div className="flex justify-between gap-4 md:flex-row md:items-center md:justify-between">
                <SearchBar placeholder="Search Courses..." displaySize="medium" />
                <div className="flex flex-col gap-4 sm:flex-row">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Manage Columns
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        className="capitalize"
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        disabled={isLoading}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {isLoading ? (
                <DataTablePlaceholder cols={columns.length} />
            ) : (
                <div className="rounded-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-card">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="text-center font-semibold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className={cn(
                                            "hover:bg-primary/10 cursor-pointer",
                                            row.getIsSelected() && "bg-primary/10 hover:bg-primary/10",
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="text-center py-5">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default CourseListPage;