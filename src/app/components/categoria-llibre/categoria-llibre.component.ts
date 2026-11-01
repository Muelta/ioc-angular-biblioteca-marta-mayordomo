import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-category',
  standalone: true,
  templateUrl: './categoria-llibre.component.html',
  styleUrl: './categoria-llibre.component.scss'
})
export class CategoriaLlibreComponent {

  @Input() categoria: string = '';

}