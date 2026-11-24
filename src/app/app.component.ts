import { Component, OnInit, effect, inject, signal } from '@angular/core';

import { Book } from './models/book.model';
import { BooksService } from './services/books.service';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { FiltreLlibresComponent, FiltreLlibresValue } from './components/filtre-llibres/filtre-llibres.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LlistaElementsComponent,
    FiltreLlibresComponent
  ],
  styleUrl: '../app/components/app.component.scss',
  templateUrl: '../app/components/app.component.html',
})
export class App implements OnInit {

  private readonly booksService = inject(BooksService);

  protected readonly title = signal('ioc-angular-biblioteca-marta-mayordomo');

  public appName = 'La Meva Biblioteca';

  llibres: Book[] = [];

  llibresFiltrats: Book[] = [];

  llibreSeleccionat: Book | null = null;

  categories: string[] = [];

  private ultimFiltre: FiltreLlibresValue = { text: '', categoria: '' };

  constructor() {
    effect(() => {
      const llibresApi = this.booksService.books();
      this.llibres = llibresApi;
      this.categories = [...new Set(llibresApi.map(llibre => llibre.categoria))];
      this.filtrarLlibres(this.ultimFiltre);
    });
  }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({ error: () => {} });
  }

  aplicarFiltre(filtres: FiltreLlibresValue): void {
    this.ultimFiltre = filtres;
    this.filtrarLlibres(filtres);
  }

  seleccionarLlibre(llibre: Book): void {
    this.llibreSeleccionat = llibre;
  }
  
  private filtrarLlibres(filtres: FiltreLlibresValue): void {
    const text = filtres.text.toLowerCase().trim();
    const categoria = filtres.categoria;

    this.llibresFiltrats = this.llibres.filter(llibre => {
      const coincideixText =
        !text ||
        llibre.titol.toLowerCase().includes(text) ||
        llibre.categoria.toLowerCase().includes(text) ||
        llibre.descripcio.toLowerCase().includes(text);

      const coincideixCategoria =
        categoria === '' || llibre.categoria === categoria;

      return coincideixText && coincideixCategoria;
    });
  }
}