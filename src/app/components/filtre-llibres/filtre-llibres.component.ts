import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';

export interface FiltreLlibresValue {
  text: string;
  categoria: string;
}

const SEARCH_HISTORY_KEY = 'biblioteca_filtre_historial_v1';

@Component({
  selector: 'app-filtre-llibres',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtre-llibres.component.html',
  styleUrl: './filtre-llibres.component.scss'
})
export class FiltreLlibresComponent implements OnInit {
  @Input() categories: string[] = [];

  @Output() filtreAplicat = new EventEmitter<FiltreLlibresValue>();

  private readonly booksService = inject(BooksService);

  readonly historialCerques = signal<string[]>(this.carregarHistorial());

  private readonly validarResultats: AsyncValidatorFn = (control) => {
    const terme = String(control.value ?? '').trim();

    if (!terme || terme.length < 3) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => this.booksService.hasSearchResults(terme)),
      map((hiHaResultats) => (hiHaResultats ? null : { noResults: true })),
      catchError(() => of({ apiError: true }))
    );
  };

  readonly formulari = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [this.validarResultats]
    }),
    categoria: new FormControl('', {
      nonNullable: true
    })
  });

  get campText() {
    return this.formulari.controls.text;
  }

  ngOnInit(): void {
    this.formulari.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (a: Partial<FiltreLlibresValue>, b: Partial<FiltreLlibresValue>) =>
            a.text === b.text && a.categoria === b.categoria
        )
      )
      .subscribe(() => {
        if (this.formulari.valid && !this.formulari.pending) {
          const valors = this.formulari.getRawValue();
          this.filtreAplicat.emit({
            text: valors.text.trim(),
            categoria: valors.categoria
          });
        }
      });
  }

  aplicarFiltre(): void {
    if (this.formulari.invalid || this.formulari.pending) {
      this.formulari.markAllAsTouched();
      return;
    }

    const valors = this.formulari.getRawValue();
    const textNet = valors.text.trim();

    this.desarAlHistorial(textNet);

    this.filtreAplicat.emit({
      text: textNet,
      categoria: valors.categoria
    });
  }

  restablirFiltres(): void {
    this.formulari.reset({
      text: '',
      categoria: ''
    });

    this.filtreAplicat.emit({
      text: '',
      categoria: ''
    });
  }

  aplicarDesDeHistorial(terme: string): void {
    this.formulari.patchValue({ text: terme });
    this.campText.markAsTouched();
    this.campText.updateValueAndValidity();

    this.filtreAplicat.emit({
      text: terme,
      categoria: this.formulari.controls.categoria.value
    });
  }

  esborrarHistorial(): void {
    this.historialCerques.set([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }

  private desarAlHistorial(terme: string): void {
    const net: string = terme.trim();
    if (!net) return;

    const actual: string[] = [...this.historialCerques()];
    const senseDuplicats: string[] = actual.filter(
      (entry: string): boolean => entry.toLowerCase() !== net.toLowerCase()
    );
    const nouHistorial: string[] = [net, ...senseDuplicats].slice(0, 6);

    this.historialCerques.set(nouHistorial);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nouHistorial));
  }

  private carregarHistorial(): string[] {
    try {
      const guardat = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (!guardat) return [];
      const parsed = JSON.parse(guardat);
      return Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === 'string')
        : [];
    } catch {
      return [];
    }
  }
}