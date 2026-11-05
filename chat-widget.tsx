'use client';
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role:string;content:string}[]>([{role:"assistant",content:"Hello! Welcome to H&A Collection. I can help you explore our bags and bedsheets. What are you looking for?"}]);
  const [busy, setBusy] = useState(false);
  async function send() {
    const message = input.trim(); if (!message || busy) return;
    setInput(""); const next = [...messages, {role:"user",content:message}]; setMessages(next); setBusy(true);
    try {
      const res = await fetch("/api/chat", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message})});
      const data = await res.json(); setMessages(old => [...old,{role:"assistant",content:data.reply || "Please contact our team on 09017652705 for help."}]);
    } catch { setMessages(old => [...old,{role:"assistant",content:"I couldn't connect just now. Please contact us on 09017652705."}]); }
    finally { setBusy(false); }
  }
  return <><button className="chat-fab" onClick={()=>setOpen(!open)} aria-label="Open shopping assistant">{open?<X/>:<MessageCircle/>}</button>{open && <section className="chat-panel"><div className="chat-head"><b>H&A Shopping Assistant</b><span>Ask us about our collection</span></div><div className="chat-messages">{messages.map((m,i)=><p key={i} className={`bubble ${m.role}`}>{m.content}</p>)}{busy&&<p className="bubble assistant">Thinking…</p>}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask a question..."/><button onClick={send} disabled={busy}><Send size={17}/></button></div></section>}</>;
}
