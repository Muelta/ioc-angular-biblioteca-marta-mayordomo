export interface Book {
  id: number;
  titol: string;
  descripcio: string;
  categoria: string;
  dataPublicacio: string;
  pagines: number;
  destacat?: boolean;
}