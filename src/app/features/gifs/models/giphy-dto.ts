export interface GiphyDto {
  id: string;
  title: string;
  url: string;
  username: string;
  import_datetime: string;
  user?: {
    display_name: string;
  };
  images: {
    fixed_width_downsampled: { url: string; webp?: string };
    original: {
      url: string;
      width: string;
      height: string;
      size: string;
      webp?: string;
    };
  };
}

export interface GiphySearchResponse {
  data: GiphyDto[];
  pagination: { total_count: number; count: number; offset: number };
}

export interface GiphyByIdResponse {
  data: GiphyDto;
}
