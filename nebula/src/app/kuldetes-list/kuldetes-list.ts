import { Component, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { NebulaApi, API_URL } from '../../services/nebula-api';
import { Kuldetes } from '../../models/kuldetes';

@Component({
  selector: 'app-kuldetes-list',
  standalone: true,
  templateUrl: './kuldetes-list.html'
})

export class KuldetesList {

  private readonly api = inject(NebulaApi);
  protected readonly kuldetesek = httpResource<Kuldetes[]>(
    () => `${API_URL}/kuldetesek`,
    {
      defaultValue: []
    }
  );

  protected readonly saving = signal(false);
  protected readonly errorMessage = signal('');

  remove(id: string) {

    this.api.deleteKuldetes(id).subscribe({

      next: () => {
        this.kuldetesek.update(lista => lista.filter(k => k.id !== id));
      },

      error: (err: Error) => {this.errorMessage.set(err.message);}

    });
  }

  changeStatus(id: string) {

    this.api.patchKuldetes(id, {statusz: 'teljesitett'}).subscribe({

      next: (updated) => {
        this.kuldetesek.update(lista =>
          lista.map(k =>k.id === id ? updated : k)
        );
      },

      error: (err: Error) => {
        this.errorMessage.set(err.message);
      }

    });
  }
}