"use client";

import DataTablePlaceholder from "@/components/shared/table-skeleton";
import SearchBar from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Download,
} from "lucide-react";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Payout = {
  id: number;
  requestedDate: string;
  processedDate: string | null;
  settledDate: string | null;
  amount: number;
  transferFee: number;
  method: "Bank Transfer" | "PayPal" | "Stripe";
  account: string;
  reference: string;
  status: "Completed" | "Pending" | "Processing" | "Failed";
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const dummyData: Payout[] = [
  {
    id: 1,
    requestedDate: "2026-03-01",
    processedDate: "2026-03-02",
    settledDate: "2026-03-03",
    amount: 3210,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20260301-001",
    status: "Completed",
  },
  {
    id: 2,
    requestedDate: "2026-02-01",
    processedDate: "2026-02-02",
    settledDate: "2026-02-04",
    amount: 2870,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20260201-001",
    status: "Completed",
  },
  {
    id: 3,
    requestedDate: "2026-01-01",
    processedDate: "2026-01-02",
    settledDate: "2026-01-03",
    amount: 3445,
    transferFee: 68.9,
    method: "PayPal",
    account: "john@mail.com",
    reference: "PAY-20260101-001",
    status: "Completed",
  },
  {
    id: 4,
    requestedDate: "2025-12-01",
    processedDate: "2025-12-02",
    settledDate: "2025-12-03",
    amount: 2540,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20251201-001",
    status: "Completed",
  },
  {
    id: 5,
    requestedDate: "2025-11-01",
    processedDate: "2025-11-02",
    settledDate: "2025-11-04",
    amount: 3150,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20251101-001",
    status: "Completed",
  },
  {
    id: 6,
    requestedDate: "2025-10-01",
    processedDate: "2025-10-02",
    settledDate: "2025-10-03",
    amount: 2775,
    transferFee: 7.19,
    method: "Stripe",
    account: "Stripe **8812",
    reference: "PAY-20251001-001",
    status: "Completed",
  },
  {
    id: 7,
    requestedDate: "2025-09-01",
    processedDate: "2025-09-02",
    settledDate: "2025-09-04",
    amount: 5125,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20250901-001",
    status: "Completed",
  },
  {
    id: 8,
    requestedDate: "2025-08-01",
    processedDate: "2025-08-02",
    settledDate: "2025-08-03",
    amount: 4635,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20250801-001",
    status: "Completed",
  },
  {
    id: 9,
    requestedDate: "2025-07-01",
    processedDate: "2025-07-02",
    settledDate: null,
    amount: 4875,
    transferFee: 97.5,
    method: "PayPal",
    account: "john@mail.com",
    reference: "PAY-20250701-001",
    status: "Failed",
  },
  {
    id: 10,
    requestedDate: "2026-04-01",
    processedDate: null,
    settledDate: null,
    amount: 1240,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20260401-001",
    status: "Pending",
  },
  {
    id: 11,
    requestedDate: "2026-03-19",
    processedDate: "2026-03-20",
    settledDate: null,
    amount: 980,
    transferFee: 6.5,
    method: "Bank Transfer",
    account: "BCA **4521",
    reference: "PAY-20260319-001",
    status: "Processing",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusStyle: Record<Payout["status"], string> = {
  Completed: "bg-emerald-500/10 text-emerald-600",
  Pending: "bg-amber-500/10   text-amber-600",
  Processing: "bg-blue-500/10    text-blue-600",
  Failed: "bg-red-500/10     text-red-600",
};

const fmtDate = (val: string | null) =>
  val ? (
    new Date(val).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  ) : (
    <span className="text-muted-foreground">—</span>
  );

const sortableHeader =
  (label: string) =>
  ({ column }: { column: any }) => (
    <Button
      variant="ghost"
      className="cursor-pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown />
      ) : (
        <ArrowUpDown />
      )}
    </Button>
  );

// ─── Columns ─────────────────────────────────────────────────────────────────

const columns: ColumnDef<Payout>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        #{row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "requestedDate",
    enableSorting: true,
    header: sortableHeader("Requested Date"),
    cell: ({ row }) => (
      <div className="text-center">
        {fmtDate(row.getValue("requestedDate"))}
      </div>
    ),
  },
  {
    accessorKey: "processedDate",
    header: "Processed Date",
    cell: ({ row }) => (
      <div className="text-center">
        {fmtDate(row.getValue("processedDate"))}
      </div>
    ),
  },
  {
    accessorKey: "settledDate",
    header: "Settled Date",
    cell: ({ row }) => (
      <div className="text-center">{fmtDate(row.getValue("settledDate"))}</div>
    ),
  },
  {
    accessorKey: "amount",
    enableSorting: true,
    header: sortableHeader("Amount"),
    cell: ({ row }) => (
      <div className="text-center font-semibold">
        ${(row.getValue("amount") as number).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "transferFee",
    header: "Transfer Fee",
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        ${(row.getValue("transferFee") as number).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("method")}</div>
    ),
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.getValue("account")}
      </div>
    ),
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <div className="text-center text-xs text-muted-foreground font-mono">
        {row.getValue("reference")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Payout["status"];
      return (
        <div className="flex justify-center">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[status]}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

const PayoutHistoryPage = () => {
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
          <h2 className="text-2xl font-bold tracking-tight">Payout History</h2>
          <p className="text-sm mt-1 ml-1 text-muted-foreground">
            All your withdrawal records and payout statuses.
          </p>
        </div>
        <Button variant="outline">
          <Download />
          <span>Export</span>
        </Button>
      </div>

      <div className="flex justify-between gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          placeholder="Search payout history..."
          displaySize="medium"
        />
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

      {isLoading ? (
        <DataTablePlaceholder cols={table.getAllColumns().length} />
      ) : (
        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-card">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
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
                    No payout records found.
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

export default PayoutHistoryPage;
