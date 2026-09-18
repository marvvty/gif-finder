import { GiphyDto } from './giphy-dto';

const toNumber = (value: string): number => {
  return Number(value) || 0;
};

const orNull = (value: string): string | null => {
  return value.trim() === '' ? null : value;
};

const toDate = (value: string): Date | null => {
  const date = new Date(value.replace(' ', 'T') + 'Z');
  return isNaN(date.getTime()) ? null : date;
};

export interface Gif {
  id: string;
  title: string | null;
  pageUrl: string;
  previewUrl: string;
  previewWebpUrl: string | null;
  author: string | null;
  createdAt: Date | null;

  originalUrl: string;
  originalWebpUrl: string | null;
  originalWidth: number;
  originalHeight: number;
  sizeBytes: number;
}

export const toGif = (dto: GiphyDto): Gif => {
  const preview = dto.images.fixed_width_downsampled;
  const original = dto.images.original;

  return {
    id: dto.id,
    title: orNull(dto.title),
    pageUrl: dto.url,
    previewUrl: preview.url,
    previewWebpUrl: preview.webp ?? null,
    author: dto.user?.display_name || dto.username || null,
    createdAt: toDate(dto.import_datetime),

    originalUrl: original.url,
    originalWebpUrl: original.webp ?? null,
    originalWidth: toNumber(original.width),
    originalHeight: toNumber(original.height),
    sizeBytes: toNumber(original.size),
  };
};
