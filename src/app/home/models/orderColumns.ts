export class OrderColumns {
    columnName: string;
    ordered: boolean;
    orderType: string;

    constructor(columnName: string, ordered: boolean, orderType: string) {
        this.columnName = columnName;
        this.ordered = ordered;
        this.orderType = orderType;
    }
}
