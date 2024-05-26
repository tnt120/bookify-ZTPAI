export interface UpdateBookcaseRequest {
  bookId: number;
  bookcaseId: number;
  currentPage: number;
  rating?: number;
  comment?: string;
}
