import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';
import { TargetaLlibreComponent } from '../targeta-llibre/targeta-llibre.component';

@Component({
  selector: 'app-llista-elements',
  standalone: true,
  imports: [TargetaLlibreComponent],
  templateUrl: './llista-elements.component.html',
  styleUrl: './llista-elements.component.scss'
})
export class LlistaElementsComponent {

  @Input() llibres: Book[] = [];

  @Output() llibreSeleccionat = new EventEmitter<Book>();

  seleccionarLlibre(llibre: Book): void {
    this.llibreSeleccionat.emit(llibre);
  }
}