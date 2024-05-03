export interface BookRequest {
  id?: number;
  title: string;
  description: string;
  pages: number;
  releaseDate: string;
  authorId: number;
  genreId: number;
}
