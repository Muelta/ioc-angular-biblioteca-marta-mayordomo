export interface BookApi {
  id: number | string;
  titol: string;
  descripcio?: string;
  categoria: string;
  dataPublicacio: string;
  pagines: number | string;
  destacat?: boolean;
  estat?: string;
}

export type CreateBookApiDto = Omit<BookApi, 'id'>;