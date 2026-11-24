import { Book } from '../models/book.model';

export const BOOKS: Book[] = [
  {
    id: '1',
    titol: 'Dràcula',
    descripcio: 'La història del comte Dràcula i el seu intent d’arribar a Anglaterra.',
    categoria: 'Terror gòtic',
    anyPublicacio: '1897',
    estat: "Acabat",
    pagines: 418,
    destacat: true
  },
  {
    id: '2',
    titol: 'Frankenstein',
    descripcio: 'Un científic crea una criatura que canviarà la seva vida per sempre.',
    categoria: 'Terror gòtic',
    anyPublicacio: '1818',
    estat: "Pendent",
    pagines: 280,
    destacat: true
  },
  {
    id: '3',
    titol: 'La sombra sobre Innsmouth',
    descripcio: 'Un jove descobreix els foscos secrets d’un poble costaner habitat per éssers misteriosos.',
    categoria: 'Terror còsmic',
    anyPublicacio: '1936-04-01',
    estat: "Pendent",
    pagines: 160,
    destacat: false
  },
  {
    id: '4',
    titol: 'Cementiri d’animals',
    descripcio: 'Una família descobreix un lloc on els morts poden tornar a la vida.',
    categoria: 'Terror psicològic',
    anyPublicacio: '1983',
    estat: "Acabat",
    pagines: 488,
    destacat: true
  },
  {
    id: '5',
    titol: 'El resplendor',
    descripcio: 'Una família passa l’hivern en un hotel aïllat ple de presències inquietants.',
    categoria: 'Terror psicològic',
    anyPublicacio: '1977',
    estat: "En procés",
    pagines: 688,
    destacat: false
  },
  {
    id: '6',
    titol: 'La maledicció de Hill House',
    descripcio: 'Un grup de persones investiga una casa amb fenòmens paranormals.',
    categoria: 'Terror sobrenatural',
    anyPublicacio: '1959',
    estat: "Acabat",
    pagines: 246,
    destacat: false
  },
  {
    id: '7',
    titol: 'El retrat de Dorian Gray',
    descripcio: 'Un retrat amaga els secrets més foscos del seu protagonista.',
    categoria: 'Terror gòtic',
    anyPublicacio: '1890',
    estat: "Pendent",
    pagines: 254,
    destacat: false
  },
  {
    id: '8',
    titol: 'La crida de Cthulhu',
    descripcio: 'Una investigació revela una presència antiga i aterridora.',
    categoria: 'Terror còsmic',
    anyPublicacio: '1928',
    estat: "Pendent",
    pagines: 224,
    destacat: true
  },
  {
    id: '9',
    titol: 'Carrie',
    descripcio: 'Una adolescent amb poders extraordinaris pateix les conseqüències de l’assetjament.',
    categoria: 'Terror sobrenatural',
    anyPublicacio: '1974',
    estat: "Acabat",
    pagines: 256,
    destacat: false
  },
  {
    id: '10',
    titol: 'La casa infernal',
    descripcio: 'Un equip investiga els misteris d’una mansió coneguda pels seus fenòmens paranormals.',
    categoria: 'Terror sobrenatural',
    anyPublicacio: '1971',
    estat: "Acabat",
    pagines: 336,
    destacat: false
  }
];