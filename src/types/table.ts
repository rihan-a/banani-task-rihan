export interface TableData {
    headers: string[];
    rows: TableRowData[];
}

export interface TableRowData {
    [key: string]: string | IconItem;
}

export interface IconItem {
    icon: string;
    value: string;
}
