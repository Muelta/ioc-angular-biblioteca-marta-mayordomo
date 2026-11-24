import { BookApi, CreateBookApiDto } from '../models/book-api.model';
import { Book, ReadingStatus } from '../models/book.model';

export function adaptBookFromApi(raw: BookApi): Book {
  const titolNet = (raw.titol ?? '').trim();
  const titol = titolNet.length > 0 ? titolNet : 'Llibre sense títol';

  const descripcioNeta = (raw.descripcio ?? '').trim();
  const descripcio =
    descripcioNeta.length > 0 ? descripcioNeta : 'Sense descripció disponible.';

  const categoriaNeta = (raw.categoria ?? '').trim();
  const categoria =
    categoriaNeta.length > 0
      ? categoriaNeta.charAt(0).toUpperCase() + categoriaNeta.slice(1)
      : 'Sense categoria';

  const anyMatch = String(raw.dataPublicacio ?? '').trim().match(/^\d{4}/);
  const anyPublicacio = anyMatch ? anyMatch[0] : 'Any desconegut';

  const paginesNum = Number(raw.pagines);
  const pagines =
    Number.isFinite(paginesNum) && paginesNum >= 0 ? Math.round(paginesNum) : 0;

  const destacat = Boolean(raw.destacat);

  const estatRaw = (raw.estat ?? '').trim().toLowerCase();
  const estat: ReadingStatus =
    estatRaw === 'acabat'
      ? 'Acabat'
      : estatRaw === 'en procés' || estatRaw === 'en proces'
        ? 'En procés'
        : estatRaw === 'pendent'
          ? 'Pendent'
          : destacat
            ? 'Pendent'
            : 'En procés';

  return {
    id: String(raw.id),
    titol,
    descripcio,
    categoria,
    anyPublicacio,
    estat,
    pagines,
    destacat
  };
}

export function adaptBooksFromApi(rawList: BookApi[]): Book[] {
  return rawList.map(adaptBookFromApi);
}

export function adaptBookToApiDto(book: Omit<Book, 'id'>): CreateBookApiDto {
  return {
    titol: book.titol.trim(),
    descripcio: book.descripcio.trim() || 'Sense descripció disponible.',
    categoria: book.categoria.trim(),
    dataPublicacio: book.anyPublicacio.trim(),
    pagines: Number.isFinite(Number(book.pagines))
      ? Math.max(0, Math.round(Number(book.pagines)))
      : 0,
    destacat: Boolean(book.destacat),
    estat: book.estat
  };
}