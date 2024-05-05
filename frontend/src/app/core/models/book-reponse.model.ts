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
}