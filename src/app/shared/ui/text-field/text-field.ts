import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

@Component({
  selector: 'gfd-text-field',
  templateUrl: './text-field.html',
  styleUrls: ['./text-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextField {
  readonly value = model<string>('');

  readonly placeholder = input<string>('');
  readonly type = input<string>('text');
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly isDisabled = input<boolean>(false);
  readonly isInvalid = input<boolean>(false);
  readonly isTouched = input<boolean>(false);
  readonly errorMessage = input<string>('');
  readonly touch = output<void>();

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
