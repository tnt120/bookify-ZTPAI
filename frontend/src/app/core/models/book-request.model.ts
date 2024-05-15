export interface BookRequest {
  id?: number;
  title: string;
  description: string;
  pages: number;
  releaseDate: string;
  authorId: number;
  genreId: number;
}

export interface BookRequestUpdate {
  id?: number | null;
  title: string | null;
  description: string | null;
  pages: number | null;
  releaseDate: string | null;
  authorId: number | null;
  genreId: number | null;
}
