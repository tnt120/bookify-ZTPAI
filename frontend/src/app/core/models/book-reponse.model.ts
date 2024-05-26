import { Comment } from "../../modules/books/models/comment.model";
import { Rating } from "../../modules/books/models/rating.model";
import { Author } from "./author.model";
import { Genre } from "./genre.model";

export interface BookReponse {
    id: number;
    title: string;
    cover: string;
    author: Author;
    genre: Genre;
    pages: number;
    releaseDate: string;
    description: string;
    avgRating: number;
    ratings?: Rating[];
    comments?: Comment[];
    commentCount?: number;
}