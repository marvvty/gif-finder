import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'gfd-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly type = input<'button' | 'submit'>('button');
  readonly label = input('');
  readonly variant = input<'primary' | 'secondary' | 'icon'>('primary');
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly isDisabled = input(false);
  readonly btnClick = output<void>();

  protected onClick(): void {
    this.btnClick.emit();
  }
}
