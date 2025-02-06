"use client";
import TableRow from "./TableRow";
import { TableData } from "@/types/table";

interface TableProps {
    data: TableData | null;
}

export default function Table({ data }: TableProps) {
    if (!data || !data.headers || !data.rows) {
        return <p className="text-gray-500 text-sm">No data available. Enter a prompt to generate a table.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 mt-[130px]">
            <div className="w-full max-w-4xl mx-auto overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full border-collapse text-black font-inter text-sm font-medium leading-6">
                    <thead className="bg-white">
                        <tr>
                            {data.headers.map((header: string, index: number) => (
                                <th key={index} className="p-3 text-left text-sm font-medium text-gray-700 border-b">
                                    {header}
                                </th>
                            ))}
                            <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, index) => (
                            <TableRow key={index} row={row} headers={data.headers} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
