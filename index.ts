export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  featured?: boolean;
  in_stock?: boolean;
  colors?: string[];
};

export type CartLine = { product: Product; quantity: number };
