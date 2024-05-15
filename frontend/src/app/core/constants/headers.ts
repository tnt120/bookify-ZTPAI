import { HeaderItem } from "../models/header-item.model"

export const unAuthorizedHeaders: HeaderItem[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Login',
        path: '/auth'
    },
    {
        name: 'Register',
        path: '/auth/register'
    }
]

export const userHeaders: HeaderItem[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Bookcase',
        path: '/bookcase'
    },
]

export const adminHeaders: HeaderItem[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Dashboard',
        path: '/dashboard'
    },
]

export const dashboardTabHeaders: HeaderItem[] = [
  {
    name: 'Books',
    path: '/dashboard',
  },
  {
    name: 'Authors',
    path: '/dashboard/authors'
  },
  {
    name: 'Genres',
    path: '/dashboard/genres'
  },
  {
    name: 'Comments',
    path: '/dashboard/comments'
  }
];
