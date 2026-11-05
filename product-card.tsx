import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { naira } from "@/lib/format";
export function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return <article className="product-card"><Link href={`/product/${product.slug}`} className="product-image"><img src={product.image_url} alt={product.name}/>{product.featured && <span className="tag">FEATURED</span>}</Link><div className="product-info"><span className="eyebrow">{product.category}</span><Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link><div className="product-bottom"><strong>{naira(product.price)}</strong><button className="icon-button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}><ShoppingCart size={17}/></button></div></div></article>;
}
