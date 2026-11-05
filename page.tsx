import Link from "next/link";
import { ArrowRight, Heart, PackageCheck, Sparkles } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
export default async function Home() {
  const products = await getProducts();
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow light">MADE WITH CARE · MADE FOR YOU</span><h1>Little details.<br/><em>Beautiful living.</em></h1><p>Discover handmade bags and beautiful bedsheets, thoughtfully selected to bring style and comfort to your everyday.</p><Link className="button button-light" href="/shop">Explore the collection <ArrowRight size={17}/></Link><div className="hero-note"><span>H&A</span><small>Handmade with love</small></div></div><div className="hero-photo"><img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85" alt="Elegant handbag"/></div></div></section>
    <section className="container section"><div className="section-heading"><div><span className="eyebrow">CURATED FOR YOU</span><h2>Shop the collection</h2></div><Link className="text-link" href="/shop">View all products <ArrowRight size={16}/></Link></div><ProductGrid products={products.slice(0,4)}/></section>
    <section className="category-band"><div className="container category-grid"><Link href="/shop?category=Handmade%20Bags" className="category-tile bag-tile"><span>01 / ACCESSORIES</span><h2>Bags with<br/>personality.</h2><b>Shop bags <ArrowRight size={16}/></b></Link><Link href="/shop?category=Bedsheets" className="category-tile bed-tile"><span>02 / HOME COMFORT</span><h2>Make room<br/>for comfort.</h2><b>Shop bedsheets <ArrowRight size={16}/></b></Link></div></section>
    <section className="container values section"><div className="value"><Heart/><h3>Made with care</h3><p>Thoughtful details and a personal touch in every piece.</p></div><div className="value"><Sparkles/><h3>Everyday elegance</h3><p>Beautiful finds designed to complement your lifestyle.</p></div><div className="value"><PackageCheck/><h3>Personal service</h3><p>Speak directly with us for product details and orders.</p></div></section>
    <section className="closing-cta"><span className="eyebrow light">YOUR NEXT FAVOURITE FIND</span><h2>Find something lovely.</h2><Link href="/shop" className="button button-light">Shop H&A Collection <ArrowRight size={17}/></Link></section>
  </>;
}
