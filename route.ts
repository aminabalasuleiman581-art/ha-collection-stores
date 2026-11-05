import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getProducts } from "@/lib/products";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
    if (!message) return NextResponse.json({ reply: "Please type a question." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ reply: "Thanks for reaching H&A Collection! Please call or WhatsApp 09017652705 for product details and current availability." });
    const products = await getProducts();
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are H&A Shopping Assistant for H&A Collection in Jos, Nigeria. Be warm and concise. Only use the following product data for claims about products; do not invent stock, sizes, colours or prices. Prices are NGN. Business phone: 09017652705. Address: Rikkos New Layout, Jos North LGA, Plateau State, Nigeria. Product catalogue: ${JSON.stringify(products)}` },
        { role: "user", content: message }
      ],
      max_tokens: 250
    });
    return NextResponse.json({ reply: response.choices[0]?.message?.content || "Please contact us on 09017652705." });
  } catch {
    return NextResponse.json({ reply: "Sorry, the assistant is unavailable. Please contact us on 09017652705." }, { status: 500 });
  }
}
