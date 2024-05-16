import { Genre } from "../../../core/models/genre.model";

export interface ManageGenreDialogData {
  title: string;
  confirmText: string;
  genre?: Genre;
}
