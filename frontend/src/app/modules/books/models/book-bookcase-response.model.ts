import { BookReponse } from "../../../core/models/book-reponse.model";
import { BookcaseType } from "./bookcase-type.model";

export interface BookBookcaseResponse {
  id: number;
  bookcaseType: BookcaseType;
  book: BookReponse;
  currentPage: number;
}
