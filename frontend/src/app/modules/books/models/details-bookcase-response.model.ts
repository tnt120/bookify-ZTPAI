import { Rating } from "./rating.model";

export interface DetailsBookcaseResponse {
  id: number;
  bookcaseId: number;
  rating?: Rating;
}

export interface DetailsBookcaseAction {
  id: number;
  bookcaseId: number;
  bookId: number;
}
