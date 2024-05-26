import { BookReponse } from './../../../../core/models/book-reponse.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookRequest, BookRequestUpdate } from '../../../../core/models/book-request.model';
import { BookService } from '../../../../core/services/book/book.service';
import { Subscription } from 'rxjs';
import { GenreService } from '../../../../core/services/genre/genre.service';
import { AuthorService } from '../../../../core/services/author/author.service';
import { Author } from '../../../../core/models/author.model';
import { Genre } from '../../../../core/models/genre.model';
import { CustomSnackbarService } from '../../../../core/services/custom-snackbar/custom-snackbar.service';

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

  bookReponse: BookReponse | null = null;

  bookToCompare: any;

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
    private router: Router,
    private customSnackbarService: CustomSnackbarService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = parseInt(id);
    }

    if (this.bookId !== 0) {
      this.title = 'Edit Book';

      this.bookService.getBook(this.bookId, 0).subscribe({
        next: book => {
          this.bookReponse = book;
          this.manageForm.patchValue({
            title: book.title,
            description: book.description,
            pages: book.pages,
            releaseDate: book.releaseDate,
            authorId: book.author.id as any,
            genreId: book.genre.id as any,
          });

          if (book.cover) {
            this.selectedPicture = `data:image/jpeg;base64 ,${book.cover}`;
          }

          this.bookToCompare = {...book, authorId: book.author.id, genreId: book.genre.id}
        },
        error: err => {
          console.log('Cant fetch book, ', err);
          this.router.navigate(['/dashboard']);
        }
      });
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

  onAdd() {
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
            this.router.navigate(['/dashboard']);
            this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Book has been added successfully', type: 'success', duration: 2500 })
          },
          error: (err) => {
            this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while adding book', type: 'error', duration: 2500 })
          }
        }))
      },
      error: (err) => {
        this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while adding book', type: 'error', duration: 2500 })
      }
    }));
  }

  onUpdate() {
    const data: BookRequestUpdate = this.getModifiedDat();

    this.bookService.updateBook(this.bookId, data).subscribe({
      next: (res) => {
        if (this.selectedBookCover) {
          this.bookService.uploadCover(this.bookId, this.selectedBookCover).subscribe({
            next: () => {
              this.router.navigate(['/dashboard']);
              this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Book has been updated successfully', type: 'success', duration: 2500 })
            },
            error: (err) => {
              this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while updating book', type: 'error', duration: 2500 });
            }
          })
        } else {
          this.router.navigate(['/dashboard']);
          this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Book has been updated successfully', type: 'success', duration: 2500 })
        }
      },
      error: (err) => {
        this.errors.form = err.error.message;
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  getModifiedDat(): BookRequestUpdate {
    const modifiedData: BookRequestUpdate = {} as BookRequestUpdate;
    const currentData = this.manageForm.value as { [key: string]: any };

    Object.keys(currentData).forEach(key => {
      if (currentData[key] !== this.bookToCompare[key]) {
        modifiedData[key as keyof BookRequestUpdate] = currentData[key];
      } else {
        modifiedData[key as keyof BookRequestUpdate] = null;
      }
    });
    return modifiedData;
  }

  get isFormValid() {
    if (this.bookReponse) {
      const currentData = this.manageForm.value as { [key: string]: any };

      const isModified = Object.keys(currentData).some(key => {
        return currentData[key] !== (this.bookToCompare as any)[key];
      }) || this.selectedPicture !== `data:image/jpeg;base64 ,${this.bookToCompare.cover}`

      return this.manageForm.invalid || !this.selectedPicture || !isModified;
    } else {
      return this.manageForm.invalid || !this.selectedPicture;
    }
  }

}
