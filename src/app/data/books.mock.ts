import { Book } from '../models/book.model';

export const BOOKS: Book[] = [
  {
    id: 1,
    titol: 'Dràcula',
    descripcio: 'La història del comte Dràcula i el seu intent d’arribar a Anglaterra.',
    categoria: 'Terror gòtic',
    dataPublicacio: '1897',
    pagines: 418,
    destacat: true
  },
  {
    id: 2,
    titol: 'Frankenstein',
    descripcio: 'Un científic crea una criatura que canviarà la seva vida per sempre.',
    categoria: 'Terror gòtic',
    dataPublicacio: '1818',
    pagines: 280,
    destacat: true
  },
  {
    id: 3,
    titol: 'La sombra sobre Innsmouth',
    descripcio: 'Un jove descobreix els foscos secrets d’un poble costaner habitat per éssers misteriosos.',
    categoria: 'Terror còsmic',
    dataPublicacio: '1936-04-01',
    pagines: 160,
    destacat: false
  },
  {
    id: 4,
    titol: 'Cementiri d’animals',
    descripcio: 'Una família descobreix un lloc on els morts poden tornar a la vida.',
    categoria: 'Terror psicològic',
    dataPublicacio: '1983',
    pagines: 488,
    destacat: true
  },
  {
    id: 5,
    titol: 'El resplendor',
    descripcio: 'Una família passa l’hivern en un hotel aïllat ple de presències inquietants.',
    categoria: 'Terror psicològic',
    dataPublicacio: '1977',
    pagines: 688,
    destacat: false
  },
  {
    id: 6,
    titol: 'La maledicció de Hill House',
    descripcio: 'Un grup de persones investiga una casa amb fenòmens paranormals.',
    categoria: 'Terror sobrenatural',
    dataPublicacio: '1959',
    pagines: 246,
    destacat: false
  },
  {
    id: 7,
    titol: 'El retrat de Dorian Gray',
    descripcio: 'Un retrat amaga els secrets més foscos del seu protagonista.',
    categoria: 'Terror gòtic',
    dataPublicacio: '1890',
    pagines: 254,
    destacat: false
  },
  {
    id: 8,
    titol: 'La crida de Cthulhu',
    descripcio: 'Una investigació revela una presència antiga i aterridora.',
    categoria: 'Terror còsmic',
    dataPublicacio: '1928',
    pagines: 224,
    destacat: true
  },
  {
    id: 9,
    titol: 'Carrie',
    descripcio: 'Una adolescent amb poders extraordinaris pateix les conseqüències de l’assetjament.',
    categoria: 'Terror sobrenatural',
    dataPublicacio: '1974',
    pagines: 256,
    destacat: false
  },
  {
    id: 10,
    titol: 'La casa infernal',
    descripcio: 'Un equip investiga els misteris d’una mansió coneguda pels seus fenòmens paranormals.',
    categoria: 'Terror sobrenatural',
    dataPublicacio: '1971',
    pagines: 336,
    destacat: false
  }
];