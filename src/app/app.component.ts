import { Component, signal } from '@angular/core';

import { Book } from './models/book.model';
import { BOOKS } from './data/books.mock';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { FiltreLlibresComponent } from './components/filtre-llibres/filtre-llibres.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LlistaElementsComponent,
    FiltreLlibresComponent
  ],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {

  protected readonly title = signal('ioc-angular-biblioteca-marta-mayordomo');

  public appName = 'La Meva Biblioteca';

  llibres: Book[] = BOOKS;

  llibresFiltrats: Book[] = BOOKS;

  llibreSeleccionat: Book | null = null;

  categories: string[] = [
    ...new Set(BOOKS.map(llibre => llibre.categoria))
  ];

  aplicarFiltre(categoria: string): void {
    if (categoria === '') {
      this.llibresFiltrats = this.llibres;
    } else {
      this.llibresFiltrats = this.llibres.filter(
        llibre => llibre.categoria === categoria
      );
    }
  }

  seleccionarLlibre(llibre: Book): void {
    this.llibreSeleccionat = llibre;
  }
}