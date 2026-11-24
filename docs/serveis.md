# Servei HTTP (`BooksService`)

## Fitxer i responsabilitats
- **Servei:** `src/app/services/books.service.ts`
- **URL base:** importada des de `src/app/core/config/api.config.ts` (`API_CONFIG.baseUrl`).
- **Operacions HTTP:**
  - `GET /books`: recupera i adapta el llistat de llibres (`adaptBooksFromApi`).
  - `POST /books`: envia un nou llibre normalitzat (`adaptBookToApiDto`) i, amb `switchMap`, recarrega la llista actualitzada.

## Estats, reintents i `switchMap`
- **Estats:** `status` (`'idle' | 'loading' | 'success' | 'error'`), `books`, `error` i `submitting`.
- **Reintents:** `retry(...)` abans de `catchError` per absorbir talls puntuals.
- **`switchMap`:** aplicat a `filteredBooks$` (per cancel·lar consultes prèvies en canviar el filtre/cerca) i a `createBook(...)` (per encadenar la recàrrega de dades després del `POST`).