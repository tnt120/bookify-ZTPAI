import { BookReponse } from "./book-reponse.model";

export interface PageResponse {
    content: BookReponse[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
    first: boolean;
    last: boolean;
}