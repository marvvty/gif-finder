import {
  ChangeDetectionStrategy,
  Component,
  inject,
  computed,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '../../shared/ui/input/input';
import { Button } from '../../shared/ui/button/button';
import { NgIcon } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'gfd-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [Input, Button, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);

  protected readonly svg = lucideSearch;

  readonly searchTerm = signal('');
  readonly isSubmited = signal(false);
  readonly invalid = computed(() => this.searchTerm().length === 0);

  onSubmit(event: Event): void {
    event.preventDefault();

    this.isSubmited.set(true);
    const q = this.searchTerm().trim();

    if (!q) return;

    this.router.navigate(['/'], {
      queryParams: { q },
    });
  }
}
