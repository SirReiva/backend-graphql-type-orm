export interface ResponseGQL {
    flag: boolean;
    errors?: string[];
}

export interface PaginatorResponseGQL {
    items: any[];
    page: number;
    pageSize: number;
    total: number;
}
