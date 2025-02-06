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
             <h2 className="absolute top-[-25px] left-[0px] text-[12px] font-inter font-medium leading-5 text-left text-[#888788]">
                New table
            </h2>
            <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
                <div className="max-h-[336px] overflow-y-auto">
                    <table className="w-full border-collapse text-black font-inter text-sm font-medium leading-6">
                        <thead className="bg-white sticky top-0">
                            <tr className="h-[56px]">
                                {data.headers.map((header: string, index: number) => (
                                    <th key={index} className={`p-3 text-left text-sm ${index === 0 ? 'font-medium' : 'font-normal'} text-gray-700 border-b bg-white`}>
                                        {header}
                                    </th>
                                ))}
                                <th className="p-3 text-left text-sm font-normal text-gray-700 border-b bg-white">
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
        </div>
    );
}
