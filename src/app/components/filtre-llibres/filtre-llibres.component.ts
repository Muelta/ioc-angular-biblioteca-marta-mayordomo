import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtre-llibres',
  standalone: true,
  templateUrl: './filtre-llibres.component.html',
  styleUrl: './filtre-llibres.component.scss'
})
export class FiltreLlibresComponent {

  @Input() categories: string[] = [];

  @Output() filtreAplicat = new EventEmitter<string>();

  aplicarFiltre(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtreAplicat.emit(select.value);
  }
}