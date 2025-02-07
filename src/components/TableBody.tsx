import TableRow from "./TableRow";

interface TableBodyProps {
    rows: any[];
    headers: string[];
}

export default function TableBody({ rows, headers }: TableBodyProps) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <TableRow key={index} row={row} headers={headers} />
            ))}
        </tbody>
    );
} 