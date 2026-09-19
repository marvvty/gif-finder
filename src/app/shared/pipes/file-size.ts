import { Pipe, PipeTransform } from '@angular/core';

const BYTES_IN_KB = 1024;
const UNKNOWN = 'Unknown';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | null | undefined): string {
    if (!bytes || bytes < 0) {
      return UNKNOWN;
    }

    if (bytes < BYTES_IN_KB) {
      return `${bytes} B`;
    }

    const kilobytes = bytes / BYTES_IN_KB;

    if (kilobytes < BYTES_IN_KB) {
      return `${Math.round(kilobytes)} KB`;
    }

    return `${(kilobytes / BYTES_IN_KB).toFixed(1)} MB`;
  }
}
