import {
  SanityImageHotspot,
  SanityImageCrop,
} from '@sanity/image-url/lib/types/types';

export type SanityImage = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
};

export type SanitySlug = {
  current: string;
  _type: string;
};

export type SanityObject = {
  _type: string;
};

export type SanityColor = {
  _type: string;
  alpha: number;
  hex: string;
  hsl: {
    _type: string;
    a: number;
    h: number;
    l: number;
    s: number;
  };
  hsv: {
    _type: string;
    a: number;
    h: number;
    s: number;
    v: number;
  };
  rgb: {
    _type: string;
    a: number;
    b: number;
    g: number;
    r: number;
  };
};
