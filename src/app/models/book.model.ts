export type ReadingStatus = 'Acabat' | 'Pendent' | 'En procés';

export interface Book {
  id: string;
  titol: string;
  descripcio: string;
  categoria: string;
  anyPublicacio: string;
  estat: ReadingStatus;
  pagines: number;
  destacat: boolean;
}