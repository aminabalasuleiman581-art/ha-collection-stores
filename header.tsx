import Link from "next/link";
import { ShoppingBag } from "lucide-react";
export function Header() {
  return <header className="site-header"><div className="container nav-wrap"><Link href="/" className="brand"><span className="brand-mark">H&A</span><span>COLLECTION<small>HANDMADE WITH LOVE</small></span></Link><nav><Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><Link className="cart-link" href="/cart"><ShoppingBag size={18}/> Cart</Link></div></header>;
}
