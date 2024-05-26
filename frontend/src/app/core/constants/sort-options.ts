import { SortOption } from "../models/sort-option.model";

export const baseSortOptions: SortOption[] = [
  {
    sortBy: 'title',
    order: 'asc',
  },
  {
    sortBy: 'title',
    order: 'desc',
  },
  {
    sortBy: 'releaseDate',
    order: 'asc',
  },
  {
    sortBy: 'releaseDate',
    order: 'desc',
  },
];

export const baseSortAuthorsOptions: SortOption[] = [
  {
    sortBy: 'lastName',
    order: 'asc',
  },
  {
    sortBy: 'lastName',
    order: 'desc',
  },
  {
    sortBy: 'firstName',
    order: 'asc',
  },
  {
    sortBy: 'firstName',
    order: 'desc',
  },
]

export const baseSortGenresOptions: SortOption[] = [
  {
    sortBy: 'name',
    order: 'asc',
  },
  {
    sortBy: 'name',
    order: 'desc',
  },
]

export const baseSortCommentsOptions: SortOption[] = [
  {
    sortBy: 'createdAt',
    order: 'asc',
  },
  {
    sortBy: 'createdAt',
    order: 'desc',
  },
  {
    sortBy: 'book_id',
    order: 'asc',
  },
  {
    sortBy: 'book_id',
    order: 'desc',
  },
  {
    sortBy: 'user_id',
    order: 'asc',
  },
  {
    sortBy: 'user_id',
    order: 'desc',
  },
]
