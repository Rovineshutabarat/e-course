"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTablePlaceholderProps = {
  cols: number;
};

const DataTablePlaceholder = ({ cols }: DataTablePlaceholderProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-md shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-primary/10">
            <TableRow>
              {Array(cols)
                .fill(0)
                .map((_, index) => (
                  <TableHead key={index} className="w-20">
                    <Skeleton className="h-5 w-24 mx-auto" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  {Array(cols)
                    .fill(0)
                    .map((_, index) => (
                      <TableCell className="text-center" key={index}>
                        <Skeleton className="h-5 w-24 mx-auto" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTablePlaceholder;
