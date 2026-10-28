"use client";

import { useEffect, useState } from "react";
import ClientsNew from "./clients";
import Automation from "./automation";
import Finance from "./finance";
import Inventory from "./inventory";
import Marketing from "./marketing";
import Reviews from "./reviews";
import Payroll from "./payroll";
import Passes from "./passes";
import Analytics from "./analytics";
import ClientPortal from "./client-portal";
import Access from "./access";
import Integrations from "./integrations";
import Security from "./security";
import Telegram from "./telegram";
import Universal from "./universal";
import Onboarding from "./onboarding";
import Journey from "./journey";
import "./shell-upgrades.css";

type View = "assistant" | "booking" | "requests" | "schedule" | "clients" | "automation" | "finance" | "inventory" | "marketing" | "reviews" | "payroll" | "passes" | "analytics" | "portal" | "access" | "integrations" | "security" | "setup" | "journey" | "telegram" | "universal" | "team" | "salon" | "owner";
type Booking={id:string;clientName:string;clientPhone:string;service:string;staff:string;bookingDate:string;bookingTime:string;source:string;status:string;amount:number;createdAt:string};

const nav: {id: View; label: string; icon: string}[] = [
  {id:"assistant",label:"РР-Р·Р°РїРёСЃСЊ",icon:"вњ¦"},
  {id:"booking",label:"РћРЅР»Р°Р№РЅ-Р·Р°РїРёСЃСЊ",icon:"в—‰"},
  {id:"requests",label:"Р—Р°СЏРІРєРё",icon:"в°"},
  {id:"schedule",label:"Р Р°СЃРїРёСЃР°РЅРёРµ",icon:"в–¦"},
  {id:"clients",label:"РљР»РёРµРЅС‚С‹",icon:"в—Ћ"},
  {id:"automation",label:"РђРІС‚РѕРјР°С‚РёР·Р°С†РёСЏ",icon:"в†»"},
  {id:"finance",label:"Р¤РёРЅР°РЅСЃС‹",icon:"в‚Ѕ"},
  {id:"inventory",label:"РЎРєР»Р°Рґ",icon:"в–Ј"},
  {id:"marketing",label:"РњР°СЂРєРµС‚РёРЅРі",icon:"вњ¦"},
  {id:"reviews",label:"РћС‚Р·С‹РІС‹",icon:"в…"},
  {id:"payroll",label:"Р—Р°СЂРїР»Р°С‚Р°",icon:"в‚Ѕ"},
  {id:"passes",label:"РђР±РѕРЅРµРјРµРЅС‚С‹",icon:"в—‡"},
  {id:"analytics",label:"РђРЅР°Р»РёС‚РёРєР°",icon:"в†—"},
  {id:"portal",label:"РљР°Р±РёРЅРµС‚ РєР»РёРµРЅС‚Р°",icon:"в—‰"},
  {id:"access",label:"Р”РѕСЃС‚СѓРїС‹",icon:"в—ђ"},
  {id:"integrations",label:"РРЅС‚РµРіСЂР°С†РёРё",icon:"вЊЃ"},
  {id:"telegram",label:"Telegram",icon:"TG"},
  {id:"universal",label:"РўРёРї Р±РёР·РЅРµСЃР°",icon:"вЉ™"},
  {id:"security",label:"Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ",icon:"вњ“"},
  {id:"setup",label:"РќР°СЃС‚СЂРѕР№РєР°",icon:"вљ™"},
  {id:"journey",label:"РЎРєРІРѕР·РЅРѕР№ СЃС†РµРЅР°СЂРёР№",icon:"в†’"},
  {id:"team",label:"РљРѕРјР°РЅРґР°",icon:"в—‡"},
  {id:"salon",label:"РЎР°Р»РѕРЅ",icon:"вљ™"},
  {id:"owner",label:"РЎРµРіРѕРґРЅСЏ",icon:"вЊ‚"},
];
const navSections=[
  {name:"Р Р°Р±РѕС‚Р°",ids:["owner","assistant","booking","requests","schedule","journey"] as View[]},
  {name:"РљР»РёРµРЅС‚С‹ Рё РїСЂРѕРґР°Р¶Рё",ids:["clients","automation","marketing","reviews","passes","portal"] as View[]},
  {name:"РЈРїСЂР°РІР»РµРЅРёРµ",ids:["finance","inventory","payroll","analytics","team"] as View[]},
  {name:"РЎРёСЃС‚РµРјР°",ids:["integrations","telegram","universal","access","security","setup","salon"] as View[]},
];

const staff = [
  {name:"РњР°СЂРёСЏ",role:"РњР°РЅРёРєСЋСЂ",color:"#ff6b60",initial:"Рњ"},
  {name:"РЎРѕС„РёСЏ",role:"Р‘СЂРѕРІРё",color:"#7657e8",initial:"РЎ"},
  {name:"Р•Р»РµРЅР°",role:"Р’РѕР»РѕСЃС‹",color:"#16a085",initial:"Р•"},
];

export default function Home(){
  const [view,setView]=useState<View>("owner");
  const [step,setStep]=useState(0);
  const [booked,setBooked]=useState(false);
  const [bookings,setBookings]=useState<Booking[]>([]);
  const [saving,setSaving]=useState(false);
  const [modal,setModal]=useState(false);
  const [notifications,setNotifications]=useState(false);
  useEffect(()=>{fetch("/api/bookings").then(r=>r.ok?r.json():[]).then(setBookings).catch(()=>setBookings([]))},[]);
  const messages=[
    ["client","Р—РґСЂР°РІСЃС‚РІСѓР№С‚Рµ! РҐРѕС‡Сѓ Р·Р°РІС‚СЂР° РІРµС‡РµСЂРѕРј РЅР° РјР°РЅРёРєСЋСЂ"],
    ["ai","Р—РґСЂР°РІСЃС‚РІСѓР№С‚Рµ, РђРЅРЅР°! РџРѕРґРѕР№РґС‘С‚ Р»СЋР±РѕР№ РјР°СЃС‚РµСЂ РёР»Рё РЅСѓР¶РµРЅ РѕРїСЂРµРґРµР»С‘РЅРЅС‹Р№?"],
    ["client","Р›СЋР±РѕР№, РіР»Р°РІРЅРѕРµ РїРѕСЃР»Рµ 18:00"],
    ["ai","Р•СЃС‚СЊ РґРІР° РІР°СЂРёР°РЅС‚Р°: РњР°СЂРёСЏ РІ 18:30 РёР»Рё РђР»С‘РЅР° РІ 20:00. Р§С‚Рѕ СѓРґРѕР±РЅРµРµ?"],
    ["client","Р”Р°РІР°Р№С‚Рµ Рє РњР°СЂРёРё РІ 18:30"],
    ["ai","Р“РѕС‚РѕРІРѕ! РњР°РЅРёРєСЋСЂ Р·Р°РІС‚СЂР° РІ 18:30 Сѓ РњР°СЂРёРё. РќР°РїРѕРјРЅРёС‚СЊ Р·Р° 2 С‡Р°СЃР°?"],
  ];
  const count=[2,4,6][step];
  const createBooking=async(data:Omit<Booking,"id"|"status"|"createdAt">)=>{
    setSaving(true);
    try{const r=await fetch("/api/bookings",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});if(!r.ok)throw new Error();const item=await r.json();setBookings(x=>x.some(b=>b.id===item.id)?x:[...x,item]);return true}catch{return false}finally{setSaving(false)}
  };
  const updateStatus=async(id:string,status:string)=>{const r=await fetch(`/api/bookings/${id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({status})});if(!r.ok)return false;setBookings(x=>x.map(b=>b.id===id?{...b,status}:b));return true};
  const finish=async()=>{if(step<2){setStep(step+1);return}if(booked)return;const ok=await createBooking({clientName:"РђРЅРЅР° РљСЂС‹Р»РѕРІР°",clientPhone:"+7 900 000-00-00",service:"РњР°РЅРёРєСЋСЂ",staff:"РњР°СЂРёСЏ",bookingDate:"2026-10-27",bookingTime:"18:30",source:"ai",amount:2400});if(ok)setBooked(true)};
  return <main className="app-shell">
    <aside className="sidebar">
      <div className="logo"><span>V</span><div><b>VELA</b><small>beauty operating system</small></div></div>
      <nav>{navSections.map(section=><div className="nav-section" key={section.name}><button className="nav-section-title" disabled>{section.name}</button><div className="nav-section-items">{section.ids.map(id=>{const n=nav.find(x=>x.id===id)!;return <button key={n.id} className={view===n.id?"selected":""} onClick={()=>setView(n.id)}><i>{n.icon}</i>{n.label}{n.id==="assistant"&&<em>AI</em>}</button>})}</div></div>)}</nav>
      <div className="salon-card"><div className="salon-mark">Р›</div><div><b>РЎР°Р»РѕРЅ В«Р›РёРЅРёСЏВ»</b><small>РўР°СЂРёС„ В«Р‘РёР·РЅРµСЃВ»</small></div><span>вЊ„</span></div>
    </aside>

    <section className="workspace">
      <header><div><small>РЎРµРіРѕРґРЅСЏ, 26 РѕРєС‚СЏР±СЂСЏ</small><h1>{nav.find(n=>n.id===view)?.label}</h1></div><div className="header-actions"><button className="search">вЊ• <span>РџРѕРёСЃРє</span></button><div className="notification-wrap"><button className="notify" onClick={()=>setNotifications(!notifications)} aria-label="РЈРІРµРґРѕРјР»РµРЅРёСЏ">в—Џ<span className="notify-badge">4</span></button>{notifications&&<div className="notification-panel"><header><h3>РЈРІРµРґРѕРјР»РµРЅРёСЏ</h3><button onClick={()=>setNotifications(false)}>Р—Р°РєСЂС‹С‚СЊ</button></header>{[["в–¦","РќРѕРІР°СЏ Р·Р°РїРёСЃСЊ","РђРЅРЅР° В· РјР°РЅРёРєСЋСЂ В· Р·Р°РІС‚СЂР° 18:30","СЃРµР№С‡Р°СЃ"],["!","Р—Р°РєР°РЅС‡РёРІР°РµС‚СЃСЏ РјР°С‚РµСЂРёР°Р»","Р‘Р°Р·Р° РґР»СЏ РїРѕРєСЂС‹С‚РёСЏ вЂ” РЅР° 3 СѓСЃР»СѓРіРё","10 РјРёРЅ"],["в…","РќРѕРІС‹Р№ РѕС‚Р·С‹РІ","РСЂРёРЅР° РїРѕСЃС‚Р°РІРёР»Р° РѕС†РµРЅРєСѓ 3","25 РјРёРЅ"],["в†»","РЎРІРѕР±РѕРґРЅРѕРµ РѕРєРЅРѕ","Р—Р°РІС‚СЂР° РІ 15:00 Сѓ РЎРѕС„РёРё","1 С‡Р°СЃ"]].map(x=><article key={x[1]}><i>{x[0]}</i><span><b>{x[1]}</b><small>{x[2]}</small></span><em>{x[3]}</em></article>)}</div>}</div><div className="user">РђРљ</div></div></header>

      {view==="assistant"&&<div className="assistant-layout">
        <section className="intro">
          <div className="tag">вњ¦ РЈРњРќР«Р™ РђР”РњРРќРРЎРўР РђРўРћР </div>
          <h2>Р—Р°РїРёСЃС‹РІР°РµС‚ РєР»РёРµРЅС‚Р°<br/>РїСЂСЏРјРѕ РІ РґРёР°Р»РѕРіРµ</h2>
          <p>РџРѕРЅРёРјР°РµС‚ РѕР±С‹С‡РЅСѓСЋ СЂРµС‡СЊ, РїСЂРѕРІРµСЂСЏРµС‚ СЂР°СЃРїРёСЃР°РЅРёРµ Рё СЃРѕР·РґР°С‘С‚ Р·Р°РїРёСЃСЊ Р±РµР· РѕР¶РёРґР°РЅРёСЏ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°.</p>
          <div className="advantages"><div><b>24/7</b><span>РѕС‚РІРµС‡Р°РµС‚ РєР»РёРµРЅС‚Р°Рј</span></div><div><b>1 РјРёРЅ</b><span>РґРѕ РіРѕС‚РѕРІРѕР№ Р·Р°РїРёСЃРё</span></div><div><b>0</b><span>СЂСѓС‡РЅС‹С… РїРµСЂРµРЅРѕСЃРѕРІ</span></div></div>
          <div className="control"><button onClick={finish} disabled={saving}>{saving?"РЎРѕС…СЂР°РЅСЏРµРј...":step<2?"РџСЂРѕРґРѕР»Р¶РёС‚СЊ РґРёР°Р»РѕРі":"РџРѕРґС‚РІРµСЂРґРёС‚СЊ Р·Р°РїРёСЃСЊ"}</button><button className="ghost" onClick={()=>{setStep(0);setBooked(false)}}>РЎРЅР°С‡Р°Р»Р°</button></div>
          <small className="demo-note">Р‘РµР·РѕРїР°СЃРЅС‹Р№ СЂРµР¶РёРј РїРѕРєР°Р·Р°: РІРЅРµС€РЅРёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚РєР»СЋС‡РµРЅС‹.</small>
        </section>
        <section className="messenger">
          <div className="chat-head"><div className="salon-mark">Р›</div><div><b>РЎР°Р»РѕРЅ В«Р›РёРЅРёСЏВ»</b><small><i/> РР-РїРѕРјРѕС‰РЅРёРє РѕРЅР»Р°Р№РЅ</small></div><span>вЂўвЂўвЂў</span></div>
          <div className="messages">{messages.slice(0,count).map((m,i)=><div key={i} className={`message ${m[0]}`}><p>{m[1]}</p><time>19:{42+i*2}</time></div>)}{booked&&<div className="booking-ticket"><span>вњ“</span><div><b>Р—Р°РїРёСЃСЊ РїРѕРґС‚РІРµСЂР¶РґРµРЅР°</b><small>РњР°РЅРёРєСЋСЂ В· Р·Р°РІС‚СЂР°, 18:30 В· РњР°СЂРёСЏ</small></div></div>}</div>
          <div className="input"><span>РќР°РїРёС€РёС‚Рµ СЃРѕРѕР±С‰РµРЅРёРµ...</span><button>вћ¤</button></div>
        </section>
      </div>}

      {view==="booking"&&<OnlineBooking saving={saving} bookings={bookings} onSave={createBooking}/>}
      {view==="requests"&&<Requests bookings={bookings} onStatus={updateStatus} goSchedule={()=>setView("schedule")}/>}

      {view==="schedule"&&<Schedule bookings={bookings} onNew={()=>setModal(true)}/>}
      {view==="clients"&&<ClientsNew bookings={bookings}/>}
      {view==="automation"&&<Automation bookings={bookings}/>}
      {view==="finance"&&<Finance bookings={bookings} onStatus={updateStatus}/>}
      {view==="inventory"&&<Inventory/>}
      {view==="marketing"&&<Marketing/>}
      {view==="reviews"&&<Reviews/>}
      {view==="payroll"&&<Payroll/>}
      {view==="passes"&&<Passes/>}
      {view==="analytics"&&<Analytics/>}
      {view==="portal"&&<ClientPortal/>}
      {view==="access"&&<Access/>}
      {view==="integrations"&&<Integrations/>}
      {view==="telegram"&&<Telegram/>}
      {view==="universal"&&<Universal/>}
      {view==="security"&&<Security/>}
      {view==="setup"&&<Onboarding/>}
      {view==="journey"&&<Journey/>}
      {view==="team"&&<Team/>}
      {view==="salon"&&<Salon/>}
      {view==="owner"&&<Owner bookings={bookings} onNew={()=>setModal(true)} onSchedule={()=>setView("schedule")} onRequests={()=>setView("requests")}/>} 
    </section>
    {modal&&<BookingModal saving={saving} onClose={()=>setModal(false)} onSave={async d=>{const ok=await createBooking(d);if(ok)setModal(false)}}/>}
  </main>
}

function Schedule({bookings,onNew}:{bookings:Booking[];onNew:()=>void}){return <div className="page-content">
  <div className="toolbar"><div className="week"><button>вЂ№</button><b>26вЂ“31 РѕРєС‚СЏР±СЂСЏ</b><button>вЂє</button></div><div><button className="outline">РЎРµРіРѕРґРЅСЏ</button><button className="primary" onClick={onNew}>пј‹ РќРѕРІР°СЏ Р·Р°РїРёСЃСЊ</button></div></div>
  <div className="calendar"><div className="calendar-head"><span>Р’СЂРµРјСЏ</span>{staff.map((s,i)=><div key={s.name}><div className="avatar" style={{background:s.color}}>{s.initial}</div><b>{s.name}</b><small>{s.role}</small></div>)}</div>
    {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(t=><div className="calendar-row" key={t}><time>{t}</time>{staff.map(s=><div key={s.name}>{bookings.filter(b=>b.staff===s.name&&b.bookingTime.startsWith(t.slice(0,2))).map(b=><article className={`appointment ${b.source==="ai"?"new":""}`} key={b.id}><b>{b.clientName.split(" ")[0]} В· {b.service}</b><small>{b.bookingTime} В· {b.source==="ai"?"Р·Р°РїРёСЃР°Р» РР":b.source==="online"?"РѕРЅР»Р°Р№РЅ":"РІСЂСѓС‡РЅСѓСЋ"}</small></article>)}</div>)}</div>)}</div>
  <p className="footnote">Р Р°СЃРїРёСЃР°РЅРёРµ СЃРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ В· РѕР±РЅРѕРІР»РµРЅРѕ РЅРµСЃРєРѕР»СЊРєРѕ СЃРµРєСѓРЅРґ РЅР°Р·Р°Рґ.</p>
  </div>}

function Clients(){const rows=[["РђРЅРЅР° РљСЂС‹Р»РѕРІР°","12 РІРёР·РёС‚РѕРІ","РњР°РЅРёРєСЋСЂ","28 400 в‚Ѕ","Р—Р°РїРёСЃР°РЅР°"],["РСЂРёРЅР° Р’РѕР»РєРѕРІР°","7 РІРёР·РёС‚РѕРІ","Р‘СЂРѕРІРё","15 900 в‚Ѕ","Р’РµСЂРЅСѓС‚СЊ"],["РћР»СЊРіР° РњРёСЂРѕРЅРѕРІР°","18 РІРёР·РёС‚РѕРІ","РћРєСЂР°С€РёРІР°РЅРёРµ","64 200 в‚Ѕ","VIP"],["Р”Р°СЂСЊСЏ РЎРѕРєРѕР»РѕРІР°","3 РІРёР·РёС‚Р°","РЎС‚СЂРёР¶РєР°","8 700 в‚Ѕ","РќРѕРІР°СЏ"]];return <div className="page-content"><div className="toolbar"><div className="filters"><button className="active">Р’СЃРµ РєР»РёРµРЅС‚С‹</button><button>РќРѕРІС‹Рµ</button><button>Р”Р°РІРЅРѕ РЅРµ Р±С‹Р»Рё</button><button>VIP</button></div><button className="primary">пј‹ Р”РѕР±Р°РІРёС‚СЊ РєР»РёРµРЅС‚Р°</button></div><div className="client-table"><div className="table-head"><span>РљР»РёРµРЅС‚</span><span>РСЃС‚РѕСЂРёСЏ</span><span>Р›СЋР±РёРјР°СЏ СѓСЃР»СѓРіР°</span><span>РџРѕС‚СЂР°С‡РµРЅРѕ</span><span>РЎС‚Р°С‚СѓСЃ</span></div>{rows.map((r,i)=><div className="table-row" key={r[0]}><span className="client-name"><i>{r[0][0]}</i><b>{r[0]}<small>+7 900 000-0{i}0{i}</small></b></span><span>{r[1]}</span><span>{r[2]}</span><strong>{r[3]}</strong><em className={`state s${i}`}>{r[4]}</em></div>)}</div><p className="footnote">Р”РµРјРѕРЅСЃС‚СЂР°С†РёРѕРЅРЅР°СЏ РєР»РёРµРЅС‚СЃРєР°СЏ Р±Р°Р·Р°.</p></div>}

function OnlineBooking({saving,bookings,onSave}:{saving:boolean;bookings:Booking[];onSave:(d:Omit<Booking,"id"|"status"|"createdAt">)=>Promise<boolean>}){
 const services=[{name:"РњР°РЅРёРєСЋСЂ СЃ РїРѕРєСЂС‹С‚РёРµРј",short:"РњР°РЅРёРєСЋСЂ",duration:"1 С‡ 30 РјРёРЅ",price:2400,icon:"рџ’…",staff:["РњР°СЂРёСЏ"]},{name:"РљРѕСЂСЂРµРєС†РёСЏ Р±СЂРѕРІРµР№",short:"Р‘СЂРѕРІРё",duration:"1 С‡Р°СЃ",price:1600,icon:"вњ¦",staff:["РЎРѕС„РёСЏ"]},{name:"Р–РµРЅСЃРєР°СЏ СЃС‚СЂРёР¶РєР°",short:"РЎС‚СЂРёР¶РєР°",duration:"1 С‡Р°СЃ",price:2200,icon:"вњ‚",staff:["Р•Р»РµРЅР°"]},{name:"РћРєСЂР°С€РёРІР°РЅРёРµ РІРѕР»РѕСЃ",short:"РћРєСЂР°С€РёРІР°РЅРёРµ",duration:"2вЂ“3 С‡Р°СЃР°",price:5500,icon:"в—’",staff:["Р•Р»РµРЅР°"]}];
 const [stage,setStage]=useState(1);const [service,setService]=useState(services[0]);const [master,setMaster]=useState("РњР°СЂРёСЏ");const [time,setTime]=useState("13:30");const [client,setClient]=useState({name:"",phone:""});const [done,setDone]=useState(false);
 const times=["10:00","11:30","13:30","15:00","17:30","19:00"].filter(t=>!bookings.some(b=>b.staff===master&&b.bookingDate==="2026-10-28"&&b.bookingTime===t));
 const selectService=(s:typeof services[number])=>{setService(s);setMaster(s.staff[0]);setStage(2)};
 const submit=async()=>{if(!client.name.trim()||!client.phone.trim())return;const ok=await onSave({clientName:client.name,clientPhone:client.phone,service:service.short,staff:master,bookingDate:"2026-10-28",bookingTime:time,source:"online",amount:service.price});if(ok)setDone(true)};
 if(done)return <div className="public-booking success-screen"><div className="success-mark">вњ“</div><h2>Р’С‹ Р·Р°РїРёСЃР°РЅС‹!</h2><p>{service.name} В· 28 РѕРєС‚СЏР±СЂСЏ, {time}</p><div className="success-card"><span>РњР°СЃС‚РµСЂ</span><b>{master}</b><span>РђРґСЂРµСЃ</span><b>РћРјСЃРє, СѓР». Р›РµРЅРёРЅР°, 14</b><span>Рљ РѕРїР»Р°С‚Рµ РІ СЃР°Р»РѕРЅРµ</span><b>{service.price.toLocaleString("ru-RU")} в‚Ѕ</b></div><button className="primary" onClick={()=>{setDone(false);setStage(1);setClient({name:"",phone:""})}}>РЎРѕР·РґР°С‚СЊ РµС‰С‘ РѕРґРЅСѓ Р·Р°РїРёСЃСЊ</button></div>;
 return <div className="public-booking"><div className="booking-brand"><div className="salon-logo">Р›</div><div><small>РћРќР›РђР™Рќ-Р—РђРџРРЎР¬</small><h2>РЎР°Р»РѕРЅ РєСЂР°СЃРѕС‚С‹ В«Р›РёРЅРёСЏВ»</h2><p>РћРјСЃРє В· РµР¶РµРґРЅРµРІРЅРѕ 10:00вЂ“21:00</p></div></div><div className="booking-progress">{[1,2,3,4].map(n=><span key={n} className={n<=stage?"current":""}><i>{n}</i>{["РЈСЃР»СѓРіР°","РњР°СЃС‚РµСЂ","Р’СЂРµРјСЏ","РљРѕРЅС‚Р°РєС‚С‹"][n-1]}</span>)}</div>
 {stage===1&&<section className="booking-step"><h3>Р’С‹Р±РµСЂРёС‚Рµ СѓСЃР»СѓРіСѓ</h3><div className="service-options">{services.map(s=><button key={s.name} onClick={()=>selectService(s)}><i>{s.icon}</i><div><b>{s.name}</b><small>{s.duration}</small></div><strong>{s.price===5500?"РѕС‚ ":""}{s.price.toLocaleString("ru-RU")} в‚Ѕ</strong><em>вЂє</em></button>)}</div></section>}
 {stage===2&&<section className="booking-step"><button className="back-link" onClick={()=>setStage(1)}>в†ђ РќР°Р·Р°Рґ</button><h3>Р’С‹Р±РµСЂРёС‚Рµ РјР°СЃС‚РµСЂР°</h3><div className="master-option"><div className="avatar large" style={{background:staff.find(s=>s.name===master)?.color}}>{master[0]}</div><div><b>{master}</b><small>{service.name} В· в… 4,9</small></div><span>Р‘Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ<br/><b>28 РѕРєС‚СЏР±СЂСЏ</b></span><button className="primary" onClick={()=>setStage(3)}>Р’С‹Р±СЂР°С‚СЊ</button></div></section>}
 {stage===3&&<section className="booking-step"><button className="back-link" onClick={()=>setStage(2)}>в†ђ РќР°Р·Р°Рґ</button><h3>РЎСЂРµРґР°, 28 РѕРєС‚СЏР±СЂСЏ</h3><p className="step-sub">РЎРІРѕР±РѕРґРЅРѕРµ РІСЂРµРјСЏ Сѓ РјР°СЃС‚РµСЂР° {master}</p><div className="time-options">{times.map(t=><button key={t} className={time===t?"selected":""} onClick={()=>setTime(t)}>{t}</button>)}</div><button className="primary continue" onClick={()=>setStage(4)}>РџСЂРѕРґРѕР»Р¶РёС‚СЊ</button></section>}
 {stage===4&&<section className="booking-step"><button className="back-link" onClick={()=>setStage(3)}>в†ђ РќР°Р·Р°Рґ</button><h3>Р’Р°С€Рё РєРѕРЅС‚Р°РєС‚С‹</h3><div className="summary-line"><div><small>{service.name}</small><b>28 РѕРєС‚СЏР±СЂСЏ РІ {time} В· {master}</b></div><strong>{service.price.toLocaleString("ru-RU")} в‚Ѕ</strong></div><label>РРјСЏ<input value={client.name} onChange={e=>setClient({...client,name:e.target.value})} placeholder="РљР°Рє Рє РІР°Рј РѕР±СЂР°С‰Р°С‚СЊСЃСЏ"/></label><label>РўРµР»РµС„РѕРЅ<input value={client.phone} onChange={e=>setClient({...client,phone:e.target.value})} placeholder="+7 900 000-00-00"/></label><label className="consent"><input type="checkbox" defaultChecked/> РЎРѕРіР»Р°СЃРµРЅ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РґРµРјРѕРЅСЃС‚СЂР°С†РёРѕРЅРЅС‹С… РґР°РЅРЅС‹С…</label><button className="primary continue" disabled={saving||!client.name||!client.phone} onClick={submit}>{saving?"РЎРѕР·РґР°С‘Рј Р·Р°РїРёСЃСЊ...":"РџРѕРґС‚РІРµСЂРґРёС‚СЊ Р·Р°РїРёСЃСЊ"}</button></section>}
 <p className="booking-note">Р‘РµР·РѕРїР°СЃРЅР°СЏ Р·Р°РїРёСЃСЊ В· РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ РїСЂРёС…РѕРґРёС‚ РєР»РёРµРЅС‚Сѓ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё.</p></div>
}

function Requests({bookings,onStatus,goSchedule}:{bookings:Booking[];onStatus:(id:string,status:string)=>Promise<boolean>;goSchedule:()=>void}){const [filter,setFilter]=useState("active");const [busy,setBusy]=useState("");const shown=bookings.filter(b=>filter==="all"?true:filter==="active"?b.status==="confirmed":b.status===filter).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));const change=async(id:string,status:string)=>{setBusy(id+status);await onStatus(id,status);setBusy("")};const statusText=(s:string)=>s==="completed"?"Р—Р°РІРµСЂС€РµРЅР°":s==="cancelled"?"РћС‚РјРµРЅРµРЅР°":"РџРѕРґС‚РІРµСЂР¶РґРµРЅР°";return <div className="page-content requests-page"><div className="toolbar"><div><h2 className="section-title">Р’СЃРµ РѕР±СЂР°С‰РµРЅРёСЏ</h2><p className="section-sub">РћРЅР»Р°Р№РЅ, РР Рё СЂСѓС‡РЅС‹Рµ Р·Р°РїРёСЃРё РІ РѕРґРЅРѕРј РѕРєРЅРµ</p></div><button className="outline" onClick={goSchedule}>РћС‚РєСЂС‹С‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ</button></div><div className="request-summary"><article><small>РђРєС‚РёРІРЅС‹Рµ</small><b>{bookings.filter(b=>b.status==="confirmed").length}</b></article><article><small>Р§РµСЂРµР· РР</small><b>{bookings.filter(b=>b.source==="ai").length}</b></article><article><small>РћРЅР»Р°Р№РЅ</small><b>{bookings.filter(b=>b.source==="online").length}</b></article><article><small>Р—Р°РІРµСЂС€РµРЅС‹</small><b>{bookings.filter(b=>b.status==="completed").length}</b></article></div><div className="request-filters">{[["active","РђРєС‚РёРІРЅС‹Рµ"],["all","Р’СЃРµ"],["completed","Р—Р°РІРµСЂС€С‘РЅРЅС‹Рµ"],["cancelled","РћС‚РјРµРЅС‘РЅРЅС‹Рµ"]].map(f=><button key={f[0]} className={filter===f[0]?"active":""} onClick={()=>setFilter(f[0])}>{f[1]}</button>)}</div><div className="requests-list">{shown.length===0&&<div className="empty-state">Р’ СЌС‚РѕР№ РєР°С‚РµРіРѕСЂРёРё РїРѕРєР° РЅРµС‚ Р·Р°РїРёСЃРµР№</div>}{shown.map(b=><article key={b.id}><div className="request-date"><b>{b.bookingTime}</b><small>{b.bookingDate==="2026-10-28"?"28 РѕРєС‚СЏР±СЂСЏ":"27 РѕРєС‚СЏР±СЂСЏ"}</small></div><div className="request-person"><i>{b.clientName[0]}</i><p><b>{b.clientName}</b><small>{b.clientPhone}</small></p></div><div className="request-service"><b>{b.service}</b><small>РњР°СЃС‚РµСЂ: {b.staff} В· {b.amount.toLocaleString("ru-RU")} в‚Ѕ</small></div><span className={`source ${b.source}`}>{b.source==="ai"?"РР":b.source==="online"?"РћРЅР»Р°Р№РЅ":"Р’СЂСѓС‡РЅСѓСЋ"}</span><span className={`booking-status ${b.status}`}>{statusText(b.status)}</span><div className="request-actions">{b.status==="confirmed"&&<><button className="complete" disabled={busy!==""} onClick={()=>change(b.id,"completed")}>вњ“ Р—Р°РІРµСЂС€РёС‚СЊ</button><button className="cancel" disabled={busy!==""} onClick={()=>change(b.id,"cancelled")}>РћС‚РјРµРЅРёС‚СЊ</button></>}{b.status!=="confirmed"&&<button className="restore" disabled={busy!==""} onClick={()=>change(b.id,"confirmed")}>Р’РµСЂРЅСѓС‚СЊ</button>}</div></article>)}</div><p className="footnote">РЎС‚Р°С‚СѓСЃС‹ СЃРѕС…СЂР°РЅСЏСЋС‚СЃСЏ Рё РѕСЃС‚Р°СЋС‚СЃСЏ РїРѕСЃР»Рµ РѕР±РЅРѕРІР»РµРЅРёСЏ СЃС‚СЂР°РЅРёС†С‹.</p></div>}

function Team(){return <div className="page-content"><div className="toolbar"><div><h2 className="section-title">РљРѕРјР°РЅРґР° СЃРµРіРѕРґРЅСЏ</h2><p className="section-sub">Р—Р°РіСЂСѓР·РєР°, РІС‹СЂСѓС‡РєР° Рё Р±Р»РёР¶Р°Р№С€РёРµ Р·Р°РїРёСЃРё</p></div><button className="primary">пј‹ Р”РѕР±Р°РІРёС‚СЊ СЃРѕС‚СЂСѓРґРЅРёРєР°</button></div><div className="team-grid">{staff.map((s,i)=><article key={s.name}><div className="avatar large" style={{background:s.color}}>{s.initial}</div><h3>{s.name}</h3><p>{s.role}</p><div className="load"><span>Р—Р°РіСЂСѓР·РєР°</span><b>{[82,64,76][i]}%</b><i><em style={{width:`${[82,64,76][i]}%`,background:s.color}}/></i></div><dl><div><dt>Р—Р°РїРёСЃРµР№</dt><dd>{[8,6,5][i]}</dd></div><div><dt>РЎРµРіРѕРґРЅСЏ</dt><dd>{[12400,7800,16900][i].toLocaleString("ru-RU")} в‚Ѕ</dd></div></dl><button className="outline">РћС‚РєСЂС‹С‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ</button></article>)}</div></div>}

function Salon(){const services=[["РњР°РЅРёРєСЋСЂ СЃ РїРѕРєСЂС‹С‚РёРµРј","1 С‡ 30 РјРёРЅ","2 400 в‚Ѕ","РњР°СЂРёСЏ"],["РљРѕСЂСЂРµРєС†РёСЏ Рё РѕРєСЂР°С€РёРІР°РЅРёРµ Р±СЂРѕРІРµР№","1 С‡Р°СЃ","1 600 в‚Ѕ","РЎРѕС„РёСЏ"],["Р–РµРЅСЃРєР°СЏ СЃС‚СЂРёР¶РєР°","1 С‡Р°СЃ","2 200 в‚Ѕ","Р•Р»РµРЅР°"],["РћРєСЂР°С€РёРІР°РЅРёРµ РІРѕР»РѕСЃ","2вЂ“3 С‡Р°СЃР°","РѕС‚ 5 500 в‚Ѕ","Р•Р»РµРЅР°"]];return <div className="page-content salon-page"><div className="profile-banner"><div className="salon-logo">Р›</div><div><small>Р”Р•РњРћ-РЎРђР›РћРќ</small><h2>РЎР°Р»РѕРЅ РєСЂР°СЃРѕС‚С‹ В«Р›РёРЅРёСЏВ»</h2><p>РћРјСЃРє, СѓР». Р›РµРЅРёРЅР°, 14 В· РµР¶РµРґРЅРµРІРЅРѕ 10:00вЂ“21:00</p></div><span className="ready">вњ“ РџСЂРѕС„РёР»СЊ Р·Р°РїРѕР»РЅРµРЅ</span></div><div className="salon-columns"><section className="settings-card"><h3>РћСЃРЅРѕРІРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ</h3><dl className="info-list"><div><dt>РўРµР»РµС„РѕРЅ</dt><dd>+7 3812 55-24-24</dd></div><div><dt>РђРґСЂРµСЃ</dt><dd>РћРјСЃРє, СѓР». Р›РµРЅРёРЅР°, 14</dd></div><div><dt>Р§Р°СЃРѕРІРѕР№ РїРѕСЏСЃ</dt><dd>РћРјСЃРє, GMT+6</dd></div><div><dt>РћРЅР»Р°Р№РЅ-Р·Р°РїРёСЃСЊ</dt><dd><em>Р’РєР»СЋС‡РµРЅР°</em></dd></div><div><dt>РџСЂРµРґРѕРїР»Р°С‚Р°</dt><dd>20% РґР»СЏ РЅРѕРІС‹С… РєР»РёРµРЅС‚РѕРІ</dd></div></dl></section><section className="settings-card"><h3>РљР°РЅР°Р»С‹ Р·Р°РїРёСЃРё</h3><div className="channel-list"><div><span className="ch purple">AI</span><p><b>РР-РїРѕРјРѕС‰РЅРёРє VELA</b><small>РћС‚РІРµС‡Р°РµС‚ Рё СЃРѕР·РґР°С‘С‚ Р·Р°РїРёСЃРё РєСЂСѓРіР»РѕСЃСѓС‚РѕС‡РЅРѕ</small></p><em>РђРєС‚РёРІРµРЅ</em></div><div><span className="ch blue">TG</span><p><b>Telegram</b><small>Р”РµРјРѕРЅСЃС‚СЂР°С†РёРѕРЅРЅС‹Р№ РєР°РЅР°Р»</small></p><em>РџРѕРґРєР»СЋС‡С‘РЅ</em></div><div><span className="ch coral">WEB</span><p><b>РЎС‚СЂР°РЅРёС†Р° РѕРЅР»Р°Р№РЅ-Р·Р°РїРёСЃРё</b><small>Р”РѕСЃС‚СѓРїРЅР° РїРѕ РїСЂСЏРјРѕР№ СЃСЃС‹Р»РєРµ</small></p><em>РђРєС‚РёРІРЅР°</em></div></div></section></div><section className="services-card"><div className="card-title"><div><h3>РЈСЃР»СѓРіРё Рё С†РµРЅС‹</h3><small>4 СѓСЃР»СѓРіРё РґРѕСЃС‚СѓРїРЅС‹ РґР»СЏ РѕРЅР»Р°Р№РЅ-Р·Р°РїРёСЃРё</small></div><button className="outline">пј‹ Р”РѕР±Р°РІРёС‚СЊ СѓСЃР»СѓРіСѓ</button></div><div className="services-table"><div className="service-head"><span>РЈСЃР»СѓРіР°</span><span>Р”Р»РёС‚РµР»СЊРЅРѕСЃС‚СЊ</span><span>Р¦РµРЅР°</span><span>РњР°СЃС‚РµСЂ</span></div>{services.map((s,i)=><div className="service-row" key={s[0]}><span><i className={`service-dot d${i}`}/><b>{s[0]}</b></span><span>{s[1]}</span><strong>{s[2]}</strong><span>{s[3]}</span></div>)}</div></section><p className="footnote">РљРѕРЅС‚Р°РєС‚РЅС‹Рµ РґР°РЅРЅС‹Рµ Рё Р°РґСЂРµСЃ РІС‹РјС‹С€Р»РµРЅС‹ Рё РёСЃРїРѕР»СЊР·СѓСЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РІ РґРµРјРѕ.</p></div>}

function Owner({bookings,onNew,onSchedule,onRequests}:{bookings:Booking[];onNew:()=>void;onSchedule:()=>void;onRequests:()=>void}){const added=bookings.length;const ai=bookings.filter(b=>b.source==="ai").length;const revenue=84600+bookings.reduce((n,b)=>n+(b.amount||0),0);return <div className="page-content owner-page"><div className="owner-heading"><div><span className="eyebrow">Р РђР‘РћР§РР™ Р¦Р•РќРўР  VELA</span><h2>РЎРµРіРѕРґРЅСЏ РІ СЃР°Р»РѕРЅРµ</h2><p>Р“Р»Р°РІРЅРѕРµ Р·Р° РґРµРЅСЊ вЂ” РІ РѕРґРЅРѕРј СЌРєСЂР°РЅРµ. РЎР»РµРґСѓСЋС‰РёР№ РІРёР·РёС‚ СѓР¶Рµ РїРѕРґ РєРѕРЅС‚СЂРѕР»РµРј.</p></div><div className="owner-actions"><button className="outline" onClick={onSchedule}>РћС‚РєСЂС‹С‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ</button><button className="primary" onClick={onNew}>пј‹ РќРѕРІР°СЏ Р·Р°РїРёСЃСЊ</button></div></div><div className="notice"><span>вњ¦</span><p><b>РЈС‚СЂРµРЅРЅРёР№ РѕС‚С‡С‘С‚ РіРѕС‚РѕРІ</b><small>РР РЅР°С€С‘Р» РґРІР° РЅРµР·Р°РїРѕР»РЅРµРЅРЅС‹С… РѕРєРЅР° Рё 14 РєР»РёРµРЅС‚РѕРІ, РєРѕС‚РѕСЂС‹Рј РїРѕСЂР° РЅР°РїРѕРјРЅРёС‚СЊ Рѕ РїРѕРІС‚РѕСЂРЅРѕРј РІРёР·РёС‚Рµ.</small></p><button onClick={onRequests}>РџРѕСЃРјРѕС‚СЂРµС‚СЊ РґРµР№СЃС‚РІРёСЏ</button></div><div className="metric-grid"><article><small>РџР»Р°РЅРѕРІР°СЏ РІС‹СЂСѓС‡РєР°</small><b>{revenue.toLocaleString("ru-RU")} в‚Ѕ</b><em>СѓС‡С‚РµРЅС‹ РЅРѕРІС‹Рµ Р·Р°РїРёСЃРё</em></article><article><small>Р—Р°РіСЂСѓР·РєР°</small><b>{78+Math.min(added,8)}%</b><em>{19+added} РѕРєРѕРЅ Р·Р°РЅСЏС‚С‹</em></article><article><small>РќРѕРІС‹Рµ Р·Р°РїРёСЃРё</small><b>{7+added}</b><em>{4+ai} СЃРѕР·РґР°РЅС‹ С‡РµСЂРµР· РР</em></article><article><small>РџРѕРІС‚РѕСЂРЅС‹Рµ Р·Р°РїРёСЃРё</small><b>11</b><em>58% Р·Р°РІРµСЂС€С‘РЅРЅС‹С… РІРёР·РёС‚РѕРІ</em></article></div><div className="owner-columns"><article className="chart-card"><div className="card-title"><div><h3>Р—Р°РїРёСЃРё Р·Р° РЅРµРґРµР»СЋ</h3><small>РЎРѕР·РґР°РЅРѕ {86+added} Р·Р°РїРёСЃРµР№</small></div><b>+18%</b></div><div className="bars">{[46,62,55,78,68,92,72].map((h,i)=><div key={i}><i style={{height:`${Math.min(h+(i===1?added*3:0),100)}%`}}/><span>{["РџРЅ","Р’С‚","РЎСЂ","Р§С‚","РџС‚","РЎР±","Р’СЃ"][i]}</span></div>)}</div></article><article className="actions-card"><h3>Р§С‚Рѕ С‚СЂРµР±СѓРµС‚ РІРЅРёРјР°РЅРёСЏ</h3><div><span className="warn">!</span><p><b>2 СЃРІРѕР±РѕРґРЅС‹С… РѕРєРЅР° Р·Р°РІС‚СЂР°</b><small>РџСЂРµРґР»РѕР¶РёС‚СЊ РєР»РёРµРЅС‚Р°Рј РёР· Р»РёСЃС‚Р° РѕР¶РёРґР°РЅРёСЏ</small></p><button onClick={onRequests}>Р—Р°РїРѕР»РЅРёС‚СЊ</button></div><div><span className="purple">в†»</span><p><b>14 РєР»РёРµРЅС‚РѕРІ РїРѕСЂР° РІРµСЂРЅСѓС‚СЊ</b><small>РќРµ Р·Р°РїРёСЃС‹РІР°Р»РёСЃСЊ Р±РѕР»РµРµ 45 РґРЅРµР№</small></p><button onClick={onRequests}>РџРѕРґРіРѕС‚РѕРІРёС‚СЊ</button></div><div><span className="green">вњ“</span><p><b>Р’СЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР±СЂР°Р±РѕС‚Р°РЅС‹</b><small>РЎСЂРµРґРЅРµРµ РІСЂРµРјСЏ РѕС‚РІРµС‚Р° вЂ” 48 СЃРµРєСѓРЅРґ</small></p></div></article></div><p className="footnote">Р‘Р°Р·РѕРІС‹Рµ РїРѕРєР°Р·Р°С‚РµР»Рё РґРµРјРѕРЅСЃС‚СЂР°С†РёРѕРЅРЅС‹Рµ; РґРѕР±Р°РІР»РµРЅРЅС‹Рµ Р·Р°РїРёСЃРё СЃРѕС…СЂР°РЅСЏСЋС‚СЃСЏ РІ Р±Р°Р·Рµ.</p></div>}

function BookingModal({saving,onClose,onSave}:{saving:boolean;onClose:()=>void;onSave:(d:Omit<Booking,"id"|"status"|"createdAt">)=>void}){const [form,setForm]=useState({clientName:"",clientPhone:"",service:"РњР°РЅРёРєСЋСЂ",staff:"РњР°СЂРёСЏ",bookingDate:"2026-10-27",bookingTime:"12:00",source:"manual",amount:2400});const change=(k:string,v:string|number)=>setForm(f=>({...f,[k]:v}));return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><form className="booking-modal" onSubmit={e=>{e.preventDefault();onSave(form)}}><div className="modal-title"><div><small>РќРћР’РђРЇ Р—РђРџРРЎР¬</small><h2>Р”РѕР±Р°РІРёС‚СЊ РєР»РёРµРЅС‚Р° РІ СЂР°СЃРїРёСЃР°РЅРёРµ</h2></div><button type="button" onClick={onClose}>Г—</button></div><label>РРјСЏ РєР»РёРµРЅС‚Р°<input required value={form.clientName} onChange={e=>change("clientName",e.target.value)} placeholder="РђРЅРЅР° РљСЂС‹Р»РѕРІР°"/></label><label>РўРµР»РµС„РѕРЅ<input required value={form.clientPhone} onChange={e=>change("clientPhone",e.target.value)} placeholder="+7 900 000-00-00"/></label><div className="form-row"><label>РЈСЃР»СѓРіР°<select value={form.service} onChange={e=>change("service",e.target.value)}><option>РњР°РЅРёРєСЋСЂ</option><option>Р‘СЂРѕРІРё</option><option>РћРєСЂР°С€РёРІР°РЅРёРµ</option></select></label><label>РњР°СЃС‚РµСЂ<select value={form.staff} onChange={e=>change("staff",e.target.value)}>{staff.map(s=><option key={s.name}>{s.name}</option>)}</select></label></div><div className="form-row"><label>Р”Р°С‚Р°<input type="date" required value={form.bookingDate} onChange={e=>change("bookingDate",e.target.value)}/></label><label>Р’СЂРµРјСЏ<input type="time" required value={form.bookingTime} onChange={e=>change("bookingTime",e.target.value)}/></label></div><label>РЎС‚РѕРёРјРѕСЃС‚СЊ<input type="number" min="0" value={form.amount} onChange={e=>change("amount",Number(e.target.value))}/></label><div className="modal-actions"><button type="button" className="outline" onClick={onClose}>РћС‚РјРµРЅР°</button><button className="primary" disabled={saving}>{saving?"РЎРѕС…СЂР°РЅСЏРµРј...":"РЎРѕР·РґР°С‚СЊ Р·Р°РїРёСЃСЊ"}</button></div></form></div>}


