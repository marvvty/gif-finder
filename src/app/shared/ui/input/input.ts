import {
  Component,
  input,
  output,
  model,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'gfd-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input implements FormValueControl<string> {
  value = model<string>('');

  placeholder = input<string>('');
  type = input<string>('text');
  ariaLabel = input<string | undefined>(undefined);
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  touched = input<boolean>(false);
  touch = output<void>();

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
