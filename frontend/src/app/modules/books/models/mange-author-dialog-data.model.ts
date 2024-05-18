import { Author } from "../../../core/models/author.model";

export interface ManageAuthorDialogData {
  title: string;
  confirmText: string;
  author?: Author;
}
