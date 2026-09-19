import { describe, expect, it } from 'vitest';
import { GiphyDto } from './giphy-dto';
import { toGif } from './giphy-mapper';

const createDto = (overrides: Partial<GiphyDto> = {}): GiphyDto => ({
  id: 'abc',
  title: 'Dancing cat',
  url: 'https://giphy.com/gifs/abc',
  username: 'catlover',
  import_datetime: '2023-04-05 06:07:08',
  user: { display_name: 'Cat Lover' },
  images: {
    fixed_width_downsampled: {
      url: 'https://media.giphy.com/preview.gif',
      webp: 'https://media.giphy.com/preview.webp',
    },
    original: {
      url: 'https://media.giphy.com/original.gif',
      webp: 'https://media.giphy.com/original.webp',
      width: '480',
      height: '270',
      size: '1048576',
    },
  },
  ...overrides,
});

describe('toGif', () => {
  it('maps the fields the UI needs', () => {
    const gif = toGif(createDto());

    expect(gif.id).toBe('abc');
    expect(gif.title).toBe('Dancing cat');
    expect(gif.author).toBe('Cat Lover');
    expect(gif.originalWidth).toBe(480);
    expect(gif.originalHeight).toBe(270);
    expect(gif.sizeBytes).toBe(1048576);
  });

  it('prefers webp for display and keeps the gif for download', () => {
    const gif = toGif(createDto());

    expect(gif.previewUrl).toBe('https://media.giphy.com/preview.webp');
    expect(gif.displayUrl).toBe('https://media.giphy.com/original.webp');
    expect(gif.originalUrl).toBe('https://media.giphy.com/original.gif');
  });

  it('falls back to the gif when Giphy has no webp', () => {
    const dto = createDto();
    delete dto.images.fixed_width_downsampled.webp;
    delete dto.images.original.webp;

    const gif = toGif(dto);

    expect(gif.previewUrl).toBe('https://media.giphy.com/preview.gif');
    expect(gif.displayUrl).toBe('https://media.giphy.com/original.gif');
  });

  it('falls back to the username, then to Anonymous', () => {
    expect(toGif(createDto({ user: undefined })).author).toBe('catlover');
    expect(toGif(createDto({ user: undefined, username: '' })).author).toBe(
      'Anonymous',
    );
  });

  it('falls back to a generic title when the title is blank', () => {
    expect(toGif(createDto({ title: '   ' })).title).toBe('GIF');
  });

  it('reads the Giphy date as UTC', () => {
    const gif = toGif(createDto());

    expect(gif.createdAt?.toISOString()).toBe('2023-04-05T06:07:08.000Z');
  });

  it('returns null for an unparsable date', () => {
    expect(toGif(createDto({ import_datetime: '' })).createdAt).toBeNull();
    expect(
      toGif(createDto({ import_datetime: 'nonsense' })).createdAt,
    ).toBeNull();
  });

  it('turns unparsable numbers into 0', () => {
    const dto = createDto();
    dto.images.original.size = '';
    dto.images.original.width = 'wide';

    const gif = toGif(dto);

    expect(gif.sizeBytes).toBe(0);
    expect(gif.originalWidth).toBe(0);
  });
});
