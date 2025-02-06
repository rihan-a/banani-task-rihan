"use client";
import { useState } from "react";

export default function Table({ data }: { data: any }) {
  if (!data || !data.headers || !data.rows) {
    return <p className="text-gray-500 text-sm">No data available. Enter a prompt to generate a table.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse text-black font-inter text-sm font-medium leading-6">
          <thead className="bg-gray-100">
            <tr>
              {data.headers.map((header: string, index: number) => (
                <th key={index} className="p-3 text-left text-sm font-medium text-gray-700 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition border-b">
                {Object.keys(row).map((key, colIndex) => (
                  <td key={colIndex} className="p-3 text-sm text-gray-700">
                    {typeof row[key] === "object" && row[key].icon ? (
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-gray-600 mr-2">{row[key].icon}</span>
                        {row[key].value}
                      </div>
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
