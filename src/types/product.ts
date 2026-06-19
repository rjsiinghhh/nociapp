export type ProductBadge = 'organic' | 'seasonal' | 'heirloom' | 'local';

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pricePerUnit: number;
  unit: string;
  categoryId: string;
  badges: ProductBadge[];
  farmOrigin: string;
  inStock: boolean;
  stockCount?: number;
}
