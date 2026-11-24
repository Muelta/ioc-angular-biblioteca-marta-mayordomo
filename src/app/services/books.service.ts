import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
  retry,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import { API_CONFIG } from '../api/core/config/api.config';
import { BookApi } from '../models/book-api.model';
import { Book } from '../models/book.model';
import {
  adaptBookFromApi,
  adaptBookToApiDto,
  adaptBooksFromApi
} from '../adapters/book.adapter';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly booksUrl = `${API_CONFIG.baseUrl}/books`;

  private readonly _books = signal<Book[]>([]);
  private readonly _status = signal<RequestStatus>('idle');
  private readonly _error = signal<string | null>(null);
  private readonly _submitting = signal<boolean>(false);

  private readonly searchTerm$ = new BehaviorSubject<string>('');

  readonly books = this._books.asReadonly();
  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();
  readonly submitting = this._submitting.asReadonly();
  readonly isLoading = computed(() => this._status() === 'loading');
  readonly hasError = computed(() => this._status() === 'error');

  /**
   * Flux reactiu de cerca contra l'API utilitzant switchMap
   * per cancel·lar peticions anteriors quan canvia el terme.
   */
  readonly filteredBooks$: Observable<Book[]> = this.searchTerm$.pipe(
    switchMap((term) => {
      const cleanTerm = term.trim().toLowerCase();
      return this.fetchBooksRaw().pipe(
        map((books) =>
          cleanTerm
            ? books.filter(
                (book) =>
                  book.titol.toLowerCase().includes(cleanTerm) ||
                  book.categoria.toLowerCase().includes(cleanTerm) ||
                  book.descripcio.toLowerCase().includes(cleanTerm)
              )
            : books
        ),
        catchError(() => of(this._books()))
      );
    })
  );

  /**
   * Petició GET amb reintent, adaptació de dades i gestió d'estats.
   */
  getBooks(): Observable<Book[]> {
    this._status.set('loading');
    this._error.set(null);

    return this.fetchBooksRaw().pipe(
      tap((books) => {
        this._books.set(books);
        this._status.set('success');
      }),
      catchError((err: unknown) => {
        const message = this.formatHttpError(err, 'No s’han pogut carregar els llibres.');
        this._error.set(message);
        this._status.set('error');
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Actualitza el criteri de cerca per disparar filteredBooks$ via switchMap.
   */
  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }

  hasSearchResults(term: string): Observable<boolean> {
    const cleanTerm = term.trim().toLowerCase();
    return this.fetchBooksRaw().pipe(
      map((books) =>
        books.some(book =>
          book.titol.toLowerCase().includes(cleanTerm) ||
          book.categoria.toLowerCase().includes(cleanTerm) ||
          book.descripcio.toLowerCase().includes(cleanTerm)
        )
      )
    );
  }

  /**
   * Petició POST per crear un llibre i, mitjançant switchMap,
   * refrescar la llista completa des de l'API.
   */
  createBook(newBookData: Omit<Book, 'id'>): Observable<Book[]> {
    this._submitting.set(true);
    this._error.set(null);

    const payload = adaptBookToApiDto(newBookData);

    return this.http.post<BookApi>(this.booksUrl, payload).pipe(
      retry({ count: 1, delay: 300 }),
      map((createdRaw) => adaptBookFromApi(createdRaw)),
      switchMap(() => this.fetchBooksRaw()),
      tap((updatedBooks) => {
        this._books.set(updatedBooks);
        this._status.set('success');
      }),
      catchError((err: unknown) => {
        const message = this.formatHttpError(err, 'No s’ha pogut desar el llibre nou.');
        this._error.set(message);
        this._status.set('error');
        return throwError(() => new Error(message));
      }),
      finalize(() => {
        this._submitting.set(false);
      })
    );
  }

  private fetchBooksRaw(): Observable<Book[]> {
    return this.http.get<BookApi[]>(this.booksUrl).pipe(
      retry({ count: 2, delay: 400 }),
      map((rawBooks) => adaptBooksFromApi(rawBooks))
    );
  }

  private formatHttpError(err: unknown, fallbackMessage: string): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'No hi ha connexió amb l’API local (comprova que npm run api estigui actiu al port 3000).';
      }
      return `${fallbackMessage} (Codi HTTP ${err.status}).`;
    }
    return fallbackMessage;
  }
}