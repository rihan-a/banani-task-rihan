export interface TableData {
    tableName: string;
    headers: string[];
    rows: TableRowData[];
    actions: boolean;
}

export interface TableRowData {
    [key: string]: string | IconItem;
}

export interface IconItem {
    icon: string;
    value: string;
}
