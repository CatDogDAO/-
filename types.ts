
export interface CangjieData {
  char: string;
  code: string;
  radicals: string[];
  explanation?: string;
}

export interface RadicalMap {
  [key: string]: {
    radical: string;
    category: string;
  };
}

export enum CangjieVersion {
  V3 = 'v3',
  V5 = 'v5'
}
