"use client";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableData } from "@/types/table";

interface TableProps {
    data: TableData | null;
    error: string | null;
}

export default function Table({ data, error }: TableProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h2 className="w-full mb-2 text-[12px] font-medium text-gray-500">
                New table
            </h2>

            {(!data || !data.headers || !data.rows) ? (
                <div className="flex items-center justify-center text-gray-500 text-sm h-[56px] w-[640px] bg-white">
                    {error && (
                        <span className="text-red-500">
                            {error}
                        </span>
                    )}
                </div>
            ) : (
                <div className="w-full min-w-[640px] max-w-[900px] overflow-hidden rounded-lg shadow-lg">
                    <div className="max-h-[336px] overflow-y-auto bg-white">
                        <table className="table-auto border-collapse text-black font-inter text-sm font-medium leading-6 w-full">
                            <TableHeader headers={data.headers} />
                            <TableBody rows={data.rows} headers={data.headers} />
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
