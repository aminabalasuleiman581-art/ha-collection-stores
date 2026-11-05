'use client';
import type { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";
export function ProductGrid({products}:{products:Product[]}) {
 const {add}=useCart();
 if (!products.length) return <p className="empty-state">No products found. Please check back soon.</p>;
 return <div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p} onAdd={add}/>)}</div>;
}
