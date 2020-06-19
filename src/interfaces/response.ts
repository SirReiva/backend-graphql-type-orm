export interface ResponseGQL<T> {
    flag: boolean;
    errors?: string[];
    result?: T;
}

export interface PaginatorResponseGQL<T> {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
}
