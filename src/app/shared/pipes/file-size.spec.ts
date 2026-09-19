import { describe, expect, it } from 'vitest';
import { FileSizePipe } from './file-size';

describe('FileSizePipe', () => {
  const pipe = new FileSizePipe();

  it('reports missing sizes as unknown', () => {
    expect(pipe.transform(0)).toBe('Unknown');
    expect(pipe.transform(null)).toBe('Unknown');
    expect(pipe.transform(undefined)).toBe('Unknown');
    expect(pipe.transform(-1)).toBe('Unknown');
  });

  it('keeps small files in bytes instead of rounding to 0 KB', () => {
    expect(pipe.transform(1)).toBe('1 B');
    expect(pipe.transform(500)).toBe('500 B');
    expect(pipe.transform(1023)).toBe('1023 B');
  });

  it('formats kilobytes', () => {
    expect(pipe.transform(1024)).toBe('1 KB');
    expect(pipe.transform(2048)).toBe('2 KB');
    expect(pipe.transform(1024 * 1023)).toBe('1023 KB');
  });

  it('formats megabytes with one decimal', () => {
    expect(pipe.transform(1024 * 1024)).toBe('1.0 MB');
    expect(pipe.transform(1024 * 1024 * 3.45)).toBe('3.5 MB');
  });
});
