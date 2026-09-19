import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { TextField } from '../../shared/ui/text-field/text-field';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'gfd-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [TextField, Button, NgIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly searchIcon = lucideSearch;

  private readonly queryFromUrl = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('q') ?? '')),
    { initialValue: '' },
  );

  protected readonly searchTerm = linkedSignal(() => this.queryFromUrl());

  protected readonly isInvalid = computed(
    () => this.searchTerm().trim() === '',
  );

  protected readonly isSubmitted = linkedSignal<string, boolean>({
    source: this.searchTerm,
    computation: () => false,
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);

    const query = this.searchTerm().trim();

    if (!query) {
      return;
    }

    this.router.navigate(['/'], { queryParams: { q: query } });
  }
}
