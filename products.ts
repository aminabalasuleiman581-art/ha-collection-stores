import type { Product } from "@/types";

export const demoProducts: Product[] = [
  { id: "bag-01", name: "Everyday Handmade Tote", slug: "everyday-handmade-tote", description: "A versatile handmade tote for everyday essentials. Contact us to confirm fabric and colour options.", price: 18500, category: "Handmade Bags", image_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7", featured: true, in_stock: true, colors: ["Chocolate", "Cream"] },
  { id: "bag-02", name: "Classic Shoulder Bag", slug: "classic-shoulder-bag", description: "A simple, elegant shoulder bag made with care. Ask us about current designs.", price: 22000, category: "Fashion Bags", image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", featured: true, in_stock: true, colors: ["Brown", "Black"] },
  { id: "sheet-01", name: "Soft Comfort Bedsheet Set", slug: "soft-comfort-bedsheet-set", description: "Bring a fresh, cosy feel to your bedroom. Confirm available sizes and patterns before ordering.", price: 28000, category: "Bedsheets", image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304", featured: true, in_stock: true, colors: ["White", "Beige"] },
  { id: "sheet-02", name: "Elegant Pattern Bedsheet", slug: "elegant-pattern-bedsheet", description: "A beautiful bedsheet option for a neat and welcoming bedroom.", price: 32000, category: "Bedsheet Sets", image_url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0", featured: false, in_stock: true, colors: ["Neutral", "Floral"] }
];

export async function getProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(url, key);
      const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });
      if (!error && data?.length) return data as Product[];
    } catch { /* fall back to preview catalogue until Supabase is configured */ }
  }
  return demoProducts;
}
