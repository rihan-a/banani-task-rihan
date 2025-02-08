"use client";

import TableContainer from "./TableContainer";
import { TableData } from "@/types/table";

interface TableProps {
    data: TableData | null;
    loading: boolean;
    error?: string;
}

export default function Table({ data, loading, error }: TableProps) {
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full mt-[100px]">
            <h2 className="w-full mb-2 text-[12px] font-medium text-white">
                New table
            </h2>
            <TableContainer data={data} loading={loading} error={error} />
        </div>
    );
}
