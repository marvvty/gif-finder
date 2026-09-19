import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';

@Component({
  selector: 'gfd-state',
  templateUrl: './state.html',
  styleUrls: ['./state.scss'],
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class State {
  readonly text = input('');
  readonly hint = input('');
  readonly isLoading = input(false, { transform: booleanAttribute });

  protected readonly loaderIcon = lucideLoader;
}
