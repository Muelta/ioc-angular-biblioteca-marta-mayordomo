import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtre-llibres',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtre-llibres.component.html',
  styleUrl: './filtre-llibres.component.scss'
})

export class FiltreLlibresComponent {
  @Input() categories: string[] = [];
  @Output() filtreAplicat = new EventEmitter<{
    text: string;
    categoria: string;
  }>();

  textCerca: string = '';
  categoriaSeleccionada: string = '';

  aplicarFiltre(): void {
    this.filtreAplicat.emit({
      text: this.textCerca.trim(),
      categoria: this.categoriaSeleccionada
    });
  }

  restablirFiltres(): void {
    this.textCerca = '';
    this.categoriaSeleccionada = '';

    this.filtreAplicat.emit({
      text: '',
      categoria: ''
    });
  }
}