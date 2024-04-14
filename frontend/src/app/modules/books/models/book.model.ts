import { Rating } from "./rating.model";
import { Comment } from './comment.model';

export interface Book {
    id: number,
    title: string,
    author: string,
    imageUrl: string,
    ratings: Rating[],
    genre?: string,
    description?: string,
    pages?: number,
    releaseDate?: string,
    comments?: Comment[],
}