import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  async download(url: string, fileName: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');

      link.href = objectUrl;
      link.download = fileName;
      link.click();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

      return true;
    } catch {
      return false;
    }
  }
}
