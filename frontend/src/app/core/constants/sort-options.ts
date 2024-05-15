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
