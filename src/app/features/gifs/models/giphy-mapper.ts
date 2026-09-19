import { GiphyDto } from './giphy-dto';

const UNTITLED = 'GIF';
const UNKNOWN_AUTHOR = 'Anonymous';

const toNumber = (value: string): number => {
  return Number(value) || 0;
};

const toDate = (value: string): Date | null => {
  const date = new Date(value.replace(' ', 'T') + 'Z');
  return isNaN(date.getTime()) ? null : date;
};

const toText = (value: string, fallback: string): string => {
  return value.trim() === '' ? fallback : value;
};

export interface Gif {
  id: string;
  title: string;
  author: string;
  createdAt: Date | null;

  previewUrl: string;
  displayUrl: string;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  sizeBytes: number;
}

export interface GifPage {
  items: Gif[];
  totalCount: number;
  offset: number;
}

export const toGif = (dto: GiphyDto): Gif => {
  const preview = dto.images.fixed_width_downsampled;
  const original = dto.images.original;

  return {
    id: dto.id,
    title: toText(dto.title, UNTITLED),
    author: toText(dto.user?.display_name ?? dto.username, UNKNOWN_AUTHOR),
    createdAt: toDate(dto.import_datetime),

    previewUrl: preview.webp ?? preview.url,
    displayUrl: original.webp ?? original.url,
    originalUrl: original.url,
    originalWidth: toNumber(original.width),
    originalHeight: toNumber(original.height),
    sizeBytes: toNumber(original.size),
  };
};
