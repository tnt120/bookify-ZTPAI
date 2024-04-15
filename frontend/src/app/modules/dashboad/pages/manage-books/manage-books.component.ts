import { Component, inject } from '@angular/core';
import { BookService } from '../../../books/services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../../books/models/book.model';
import { HeaderItem } from '../../../../core/models/header-item.model';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.scss'
})
export class ManageBooksComponent {
  private readonly bookService = inject(BookService);

  protected books$!: Observable<Book[]>;

  displayedColumns: string[] = ['title', 'author', 'genre', 'pages', 'actions'];

  navItems: HeaderItem[] = [
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
  ]

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
  }

  onEdit(book: Book) {
    console.log('edit', book);
  }

  onDelete(book: Book) {
    console.log('delete', book);
  }
}
