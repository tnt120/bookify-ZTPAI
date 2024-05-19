import { Pagination } from "../models/pagination.model"

export const basePagination: Pagination = {
  pageSize: 10,
  pageIndex: 0,
  totalElements: 0,
  pageSizeOptions: [5, 10, 25, 50],
  pageEvent: undefined
}

export const bookcasePagination: Pagination = {
  pageSize: 5,
  pageIndex: 0,
  totalElements: 0,
  pageSizeOptions: [1, 5, 10],
  pageEvent: undefined
}
