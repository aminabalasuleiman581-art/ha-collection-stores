 "use client";
import {useState} from "react";
import type {Product} from "@/types";
import {useCart} from "@/components/cart-provider";
import {naira,WHATSAPP_NUMBER} from "@/lib/format";
export function ProductDetail({product}:{product:Product}) {
 const {add}=useCart(); const [qty,setQty]=useState(1);
 const message=encodeURIComponent(`Hello H&A Collection, I am interested in ${product.name} (${naira(product.price)}). Quantity: ${qty}. Please confirm availability.`);
 return <div className="detail-grid"><div className="detail-image"><img src={product.image_url} alt={product.name}/></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><strong className="detail-price">{naira(product.price)}</strong><p>{product.description}</p><p className="stock">{product.in_stock?"Available — please confirm before payment":"Please contact us for availability"}</p>{product.colors?.length ? <p><b>Colour options:</b> {product.colors.join(", ")}</p>:null}<div className="quantity"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span>{qty}</span><button onClick={()=>setQty(qty+1)}>+</button></div><button className="button button-dark full" onClick={()=>{for(let i=0;i<qty;i++)add(product)}}>Add to cart</button><a className="button button-outline full" target="_blank" rel="noreferrer" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}>Order on WhatsApp</a><small className="muted">Prices and availability should be confirmed with our team before payment.</small></div></div>;
}
