export class FilterHome {
    columnName: string;
    query: string;

    constructor(columnName: string, query: string) {
        this.columnName = columnName;
        this.query = query;
    }
}
