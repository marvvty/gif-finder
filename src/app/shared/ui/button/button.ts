import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import type {} from '@ng-icons/lucide';

@Component({
  selector: 'gfd-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  type = input<'button' | 'submit'>('button');
  label = input('');
  variant = input<'primary' | 'secondary' | 'icon'>('primary');
  ariaLabel = input<string | undefined>(undefined);
  disabled = input(false);
  btnClick = output<void>();

  onClick(): void {
    this.btnClick.emit();
  }
}
