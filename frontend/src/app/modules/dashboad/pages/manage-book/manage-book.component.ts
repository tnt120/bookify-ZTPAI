import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookRequest } from '../../../../core/models/book-request.model';
import { BookService } from '../../../../core/services/book/book.service';
import { Subscription } from 'rxjs';
import { GenreService } from '../../../../core/services/genre/genre.service';
import { AuthorService } from '../../../../core/services/author/author.service';
import { Author } from '../../../../core/models/author.model';
import { Genre } from '../../../../core/models/genre.model';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class ManageBookComponent implements OnInit, OnDestroy {

  bookId: number = 0;

  title: string = 'Add Book';

  selectedPicture: string | undefined;

  selectedBookCover: File | undefined;

  subscriptions: Subscription[] = [];

  authors: Author[] | null = null;

  genres: Genre[] | null = null;

  errors = {
    title: '',
    description: '',
    pages: '',
    releaseDate: '',
    author: '',
    genre: '',
    cover: '',
    form: '',
  }

  manageForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    pages: [0, [Validators.required, Validators.min(1)]],
    releaseDate: ['', [Validators.required]],
    authorId: [null, [Validators.required]],
    genreId: [null, [Validators.required]],
  })

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formErrorService: FormErrorService,
    private bookService: BookService,
    private genreService: GenreService,
    private authorService: AuthorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = parseInt(id);
    }

    if (this.bookId !== 0) {
      this.title = 'Edit Book';
    }

    this.subscriptions.push(this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors;
    }));

    this.subscriptions.push(this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateError(field: keyof typeof this.errors, name: string) {
    this.errors[field] = this.formErrorService.getErrorMessage(this.manageForm, field, name);
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target?.files[0];

    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  submit() {
    const formValue = this.manageForm.value;

    const data: BookRequest = {
      title: formValue.title!,
      description: formValue.description!,
      pages: formValue.pages!,
      releaseDate: formValue.releaseDate!,
      authorId: formValue.authorId!,
      genreId: formValue.genreId!,
    }

    this.subscriptions.push(this.bookService.saveBook(data).subscribe({
      next: (id) => {
        this.subscriptions.push(this.bookService.uploadCover(id, this.selectedBookCover!).subscribe({
          next: (res: any) => {
            console.log(res);
            this.router.navigate(['/dashboard']);
          }
        }))
      },
      error: (err) => {
        this.errors.form = err.error.message;
      }
    }));
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
