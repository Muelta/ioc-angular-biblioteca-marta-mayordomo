# Models i adaptador de dades (`BookApi` -> `Book`)

## Fitxers implicats
- **Model d'API:** `src/app/models/book-api.model.ts` (`BookApi`, `CreateBookApiDto`)
- **Model intern:** `src/app/models/book.model.ts` (`Book`, `ReadingStatus`)
- **Adaptador:** `src/app/adapters/book.adapter.ts` (`adaptBookFromApi`, `adaptBooksFromApi`, `adaptBookToApiDto`)

## Taula de mapatge: resposta API -> model intern

| Camp API (`BookApi`) | Tipus API | Camp intern (`Book`) | Tipus intern | Normalització / transformació aplicada |
|---|---|---|---|---|
| `id` | `number \| string` | `id` | `string` | Conversió homogènia a `string` |
| `titol` | `string` | `titol` | `string` | `trim()` i valor per defecte `'Llibre sense títol'` |
| `descripcio` | `string?` | `descripcio` | `string` | `trim()` i substitució si és buida |
| `categoria` | `string` | `categoria` | `string` | `trim()` i primera lletra en majúscula |
| `dataPublicacio` | `string` | `anyPublicacio` | `string` | Extracció de l'any (`YYYY`) per unificar formats (`"1897"` i `"1936-04-01"`) |
| `pagines` | `number \| string` | `pagines` | `number` | Conversió numèrica segura amb `Number()` i `Number.isFinite()` (mínim `0`) |
| `destacat` | `boolean?` | `destacat` | `boolean` | Conversió explícita a booleà (`Boolean(...)`) |
| `estat` | `string?` | `estat` | `'Acabat' \| 'Pendent' \| 'En procés'` | Normalització a `ReadingStatus` (`'Acabat'`, `'Pendent'`, `'En procés'`) amb valor per defecte segons `estat` o `destacat` |