import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';
import { CategoriaLlibreComponent } from '../categoria-llibre/categoria-llibre.component';

@Component({
  selector: 'app-targeta-llibre',
  standalone: true,
  imports: [CategoriaLlibreComponent],
  templateUrl: './targeta-llibre.component.html',
  styleUrl: './targeta-llibre.component.scss'
})
export class TargetaLlibreComponent {

  @Input() llibre!: Book;

  @Output() llibreSeleccionat = new EventEmitter<Book>();

  seleccionar(): void {
    this.llibreSeleccionat.emit(this.llibre);
  }
}