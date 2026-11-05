"use client";
import {useMemo,useState} from "react";
import type {Product} from "@/types";
import {ProductGrid} from "@/components/product-grid";
export function ShopClient({products}:{products:Product[]}) {
 const [q,setQ]=useState(""); const [category,setCategory]=useState("All");
 const categories=["All",...Array.from(new Set(products.map(p=>p.category)))];
 const filtered=useMemo(()=>products.filter(p=>(category==="All"||p.category===category)&&`${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())),[products,q,category]);
 return <><div className="shop-tools"><input className="search-input" placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)}/><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><ProductGrid products={filtered}/></>;
}
