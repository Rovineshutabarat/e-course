"use client";

import SearchBar from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataTablePlaceholder from "@/components/shared/table-skeleton";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Download,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Enrollment = {
  id: number;
  student: string;
  course: string;
  date: string;
  status: string;
};

const dummyData: Enrollment[] = [
  {
    id: 1,
    student: "John Doe",
    course: "React Basics",
    date: "2026-03-01",
    status: "Active",
  },
  {
    id: 2,
    student: "Jane Smith",
    course: "Next.js Advanced",
    date: "2026-03-05",
    status: "Completed",
  },
  {
    id: 3,
    student: "Michael Lee",
    course: "TypeScript Mastery",
    date: "2026-03-10",
    status: "Active",
  },
];

const columns: ColumnDef<Enrollment>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "student",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student
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
      <div className="text-center">{row.getValue("student")}</div>
    ),
  },
  {
    accessorKey: "course",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Course
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
      <div className="text-center">{row.getValue("course")}</div>
    ),
  },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "status", header: "Status" },
];

const EnrollmentHistoryPage = () => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const isLoading = false;

  const table = useReactTable({
    data: dummyData,
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
          <h2 className="text-2xl font-bold tracking-tight">
            Manage Enrollment History
          </h2>
          <p className="text-sm mt-1 ml-1 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download />
            <span>Export</span>
          </Button>

          <Link href="">
            <Tooltip delayDuration={700}>
              <TooltipTrigger asChild>
                <Button className="cursor-pointer">
                  <Plus />
                  Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>create a new</TooltipContent>
            </Tooltip>
          </Link>
        </div>
      </div>

      <div className="flex justify-between gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          placeholder="Search Enrollment History..."
          displaySize="medium"
        />
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
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
        <DataTablePlaceholder cols={table.getAllColumns().length} />
      ) : (
        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-card">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-center font-semibold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
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
                      row.getIsSelected() &&
                        "bg-primary/10 hover:bg-primary/10",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center py-5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Data not found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* <div className="flex items-center gap-x-10 my-5 justify-end">
        <div className="flex items-center gap-x-3">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select
            value={String(pagination?.size ?? 10)}
            onValueChange={(value) =>
              setParams({
                size: Number(value),
              })
            }
          >
            <SelectTrigger className="w-[4.4rem] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="flex items-center text-sm text-muted-foreground">
          Page {pagination ? Number(pagination.page) + 1 : 0} of{" "}
          {pagination?.totalPages ?? 0}
        </p>
        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            disabled={!pagination?.hasPrevious}
            onClick={() =>
              setParams({
                page: Number(pagination?.page) - 1,
              })
            }
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            disabled={!pagination?.hasNext}
            onClick={() =>
              setParams({
                page: Number(pagination?.page) + 1,
              })
            }
          >
            <ChevronRight />
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default EnrollmentHistoryPage;
