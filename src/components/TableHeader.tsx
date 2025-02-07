interface TableHeaderProps {
    headers: string[];
}

export default function TableHeader({ headers }: TableHeaderProps) {
    return (
        <thead className="bg-white sticky top-0">
            <tr className="h-[56px]">
                {headers.map((header: string, index: number) => (
                    <th 
                        key={index} 
                        className={`p-2 text-left text-sm ${index === 0 ? 'font-medium pl-[16px]' : 'font-normal'} text-gray-700 border-b bg-white ${index === 0 ? 'min-w-[200px]' : 'min-w-[96px]'}`}
                    >
                        {header}
                    </th>
                ))}
                <th 
                    className="p-1 text-left text-sm font-normal text-gray-700 border-b bg-white min-w-[48px]">
                    Actions
                </th>
            </tr>
        </thead>
    );
} 