import { TableComponentsProps } from "@/types/table";

export default function TableHeader({ headers, hasData, actions }: TableComponentsProps) {
    return (
        <thead className="bg-white sticky top-0">
            <tr className="h-[56px]">
                {headers.map((header: string, index: number) => (
                    <th 
                        key={index} 
                        className={`p-2 text-left text-sm ${index === 0 ? 'font-medium pl-[16px]' : 'font-normal'} text-gray-700 border-b bg-white ${index === 0 ? 'md:min-w-[200px]' : 'md:min-w-[96px]'}`}
                    >
                        {header}
                    </th>
                ))}
                {hasData && actions && (
                    <th 
                        className="p-1 text-left text-sm font-normal text-gray-700 border-b bg-white w-[20px] md:min-w-[48px]">
                        Actions
                    </th>
                )}
            </tr>
        </thead>
    );
}
