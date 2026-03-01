export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnailUrl: string[];
  canvasUrl: string;
  zIndex: number;
  maxCount?: number;
  type?: string;
}

export interface ProductData {
  desks: Product[];
  chairs: Product[];
  monitors: Product[];
  accessories: Product[];
}
