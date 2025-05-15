export interface Category {
    id: number;
    name: string;
    parentId?: number; // Optional, for subcategories
    subcategories?: Category[]; // Nested subcategories
  }