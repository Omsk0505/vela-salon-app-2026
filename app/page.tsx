"use client";

import { useEffect, useState } from "react";
import ClientsNew from "./clients";
import Automation from "./automation";
import Finance from "./finance";
import Inventory from "./inventory";
import Marketing from "./marketing";
import ConfiguredSalon from "./configured-salon";
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
  {id:"assistant",label:"ИИ-запись",icon:"✦"},
  {id:"booking",label:"Онлайн-запись",icon:"◉"},
  {id:"requests",label:"Заявки",icon:"☰"},
  {id:"schedule",label:"Расписание",icon:"▦"},
  {id:"clients",label:"Клиенты",icon:"◎"},
  {id:"automation",label:"Автоматизация",icon:"↻"},
  {id:"finance",label:"Финансы",icon:"₽"},
  {id:"inventory",label:"Склад",icon:"▣"},
  {id:"marketing",label:"Маркетинг",icon:"✦"},
  {id:"reviews",label:"Отзывы",icon:"★"},
  {id:"payroll",label:"Зарплата",icon:"₽"},
  {id:"passes",label:"Абонементы",icon:"◇"},
  {id:"analytics",label:"Аналитика",icon:"↗"},
  {id:"portal",label:"Кабинет клиента",icon:"◉"},
  {id:"access",label:"Доступы",icon:"◐"},
  {id:"integrations",label:"Интеграции",icon:"⌁"},
  {id:"telegram",label:"Telegram",icon:"TG"},
  {id:"universal",label:"Тип бизнеса",icon:"⊙"},
  {id:"security",label:"Безопасность",icon:"✓"},
  {id:"setup",label:"Настройка",icon:"⚙"},
  {id:"journey",label:"Сквозной сценарий",icon:"→"},
  {id:"team",label:"Команда",icon:"◇"},
  {id:"salon",label:"Салон",icon:"⚙"},
  {id:"owner",label:"Сегодня",icon:"⌂"},
];
const navSections=[
  {name:"Работа",ids:["owner","assistant","booking","requests","schedule","journey"] as View[]},
  {name:"Клиенты и продажи",ids:["clients","automation","marketing","reviews","passes","portal"] as View[]},
  {name:"Управление",ids:["finance","inventory","payroll","analytics","team"] as View[]},
  {name:"Система",ids:["integrations","telegram","universal","access","security","setup","salon"] as View[]},
];

const staff = [
  {name:"Мария",role:"Маникюр",color:"#ff6b60",initial:"М"},
  {name:"София",role:"Брови",color:"#7657e8",initial:"С"},
  {name:"Елена",role:"Волосы",color:"#16a085",initial:"Е"},
];

export default function Home(){
  const [view,setView]=useState<View>("owner");
  const [step,setStep]=useState(0);
  const [booked,setBooked]=useState(false);
  const [bookings,setBookings]=useState<Booking[]>([]);
  const [saving,setSaving]=useState(false);
  const [bookingError,setBookingError]=useState("");
  const [modal,setModal]=useState(false);
  const [notifications,setNotifications]=useState(false);
  const [salonName,setSalonName]=useState("Салон «Линия»");
  const [salonAddress,setSalonAddress]=useState("Омск, ул. Ленина, 14");
  const [salonOpen,setSalonOpen]=useState("10:00");
  const [salonClose,setSalonClose]=useState("21:00");
  useEffect(()=>{
    const sync=()=>{setSalonName(localStorage.getItem("vela_salon_name") || "Салон «Линия»");setSalonAddress(localStorage.getItem("vela_salon_address") || "Омск, ул. Ленина, 14");setSalonOpen(localStorage.getItem("vela_salon_open") || "10:00");setSalonClose(localStorage.getItem("vela_salon_close") || "21:00")};
    sync(); const timer=window.setInterval(sync,500); return()=>window.clearInterval(timer);
  },[]);
  useEffect(()=>{fetch("/api/bookings").then(r=>r.ok?r.json():[]).then(setBookings).catch(()=>setBookings([]))},[]);
  const messages=[
    ["client","Здравствуйте! Хочу завтра вечером на маникюр"],
    ["ai","Здравствуйте, Анна! Подойдёт любой мастер или нужен определённый?"],
    ["client","Любой, главное после 18:00"],
    ["ai","Есть два варианта: Мария в 18:30 или Алёна в 20:00. Что удобнее?"],
    ["client","Давайте к Марии в 18:30"],
    ["ai","Готово! Маникюр завтра в 18:30 у Марии. Напомнить за 2 часа?"],
  ];
  const count=[2,4,6][step];
  const createBooking=async(data:Omit<Booking,"id"|"status"|"createdAt">)=>{
    setSaving(true);setBookingError("");
    try{const r=await fetch("/api/bookings",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});const payload=await r.json().catch(()=>({}));if(!r.ok)throw new Error(typeof payload?.error==="string"?payload.error:`Не удалось сохранить запись (${r.status})`);const item=payload as Booking;setBookings(x=>x.some(b=>b.id===item.id)?x:[...x,item]);return true}catch(error){setBookingError(error instanceof Error?error.message:"Не удалось сохранить запись");return false}finally{setSaving(false)}
  };
  const updateStatus=async(id:string,status:string)=>{const r=await fetch(`/api/bookings/${id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({status})});if(!r.ok)return false;setBookings(x=>x.map(b=>b.id===id?{...b,status}:b));return true};
  const finish=async()=>{if(step<2){setStep(step+1);return}if(booked)return;const ok=await createBooking({clientName:"Анна Крылова",clientPhone:"+7 900 000-00-00",service:"Маникюр",staff:"Мария",bookingDate:"2026-10-27",bookingTime:"18:30",source:"ai",amount:2400});if(ok)setBooked(true)};
  return <main className="app-shell" onClick={e=>{const t=e.target as HTMLElement;if(t.closest(".search"))setView("clients");if(t.closest(".user"))setView("owner")}}>
    <aside className="sidebar">
      <div className="logo"><span>V</span><div><b>VELA</b><small>beauty operating system</small></div></div>
      <nav>{navSections.map(section=><div className="nav-section" key={section.name}><button className="nav-section-title" disabled>{section.name}</button><div className="nav-section-items">{section.ids.map(id=>{const n=nav.find(x=>x.id===id)!;return <button key={n.id} className={view===n.id?"selected":""} onClick={()=>setView(n.id)}><i>{n.icon}</i>{n.label}{n.id==="assistant"&&<em>AI</em>}</button>})}</div></div>)}</nav>
      <div className="salon-card"><div className="salon-mark">{salonName.slice(0,1)}</div><div><b>{salonName}</b><small>Тариф «Бизнес»</small></div><span>⌄</span></div>
    </aside>

    <section className="workspace">
      <header><div><small>Сегодня, 26 октября</small><h1>{nav.find(n=>n.id===view)?.label}</h1></div><div className="header-actions"><button className="search">⌕ <span>Поиск</span></button><div className="notification-wrap"><button className="notify" onClick={()=>setNotifications(!notifications)} aria-label="Уведомления">●<span className="notify-badge">4</span></button>{notifications&&<div className="notification-panel"><header><h3>Уведомления</h3><button onClick={()=>setNotifications(false)}>Закрыть</button></header>{[["▦","Новая запись","Анна · маникюр · завтра 18:30","сейчас"],["!","Заканчивается материал","База для покрытия — на 3 услуги","10 мин"],["★","Новый отзыв","Ирина поставила оценку 3","25 мин"],["↻","Свободное окно","Завтра в 15:00 у Софии","1 час"]].map(x=><article key={x[1]}><i>{x[0]}</i><span><b>{x[1]}</b><small>{x[2]}</small></span><em>{x[3]}</em></article>)}</div>}</div><div className="user">АК</div></div></header>

      {view==="assistant"&&<div className="assistant-layout">
        <section className="intro">
          <div className="tag">✦ УМНЫЙ АДМИНИСТРАТОР</div>
          <h2>Записывает клиента<br/>прямо в диалоге</h2>
          <p>Понимает обычную речь, проверяет расписание и создаёт запись без ожидания администратора.</p>
          <div className="advantages"><div><b>24/7</b><span>отвечает клиентам</span></div><div><b>1 мин</b><span>до готовой записи</span></div><div><b>0</b><span>ручных переносов</span></div></div>
          <div className="control"><button onClick={finish} disabled={saving}>{saving?"Сохраняем...":step<2?"Продолжить диалог":"Подтвердить запись"}</button><button className="ghost" onClick={()=>{setStep(0);setBooked(false)}}>Сначала</button></div>
          <small className="demo-note">Безопасный режим показа: внешние сообщения отключены.</small>
        </section>
        <section className="messenger">
          <div className="chat-head"><div className="salon-mark">{salonName.slice(0,1)}</div><div><b>{salonName}</b><small><i/> ИИ-помощник онлайн</small></div><span>•••</span></div>
          <div className="messages">{messages.slice(0,count).map((m,i)=><div key={i} className={`message ${m[0]}`}><p>{m[1]}</p><time>19:{42+i*2}</time></div>)}{booked&&<div className="booking-ticket"><span>✓</span><div><b>Запись подтверждена</b><small>Маникюр · завтра, 18:30 · Мария</small></div></div>}</div>
          <div className="input"><span>Напишите сообщение...</span><button>➤</button></div>
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
      {view==="team"&&<Team onSchedule={()=>setView("schedule")}/>}
      {view==="salon"&&<ConfiguredSalon/>}
      {view==="owner"&&<Owner bookings={bookings} onNew={()=>setModal(true)} onSchedule={()=>setView("schedule")} onRequests={()=>setView("requests")}/>} 
    </section>
    {modal&&<BookingModal saving={saving} onClose={()=>{setBookingError("");setModal(false)}} onSave={async d=>{const ok=await createBooking(d);if(ok)setModal(false)}}/>}
    {bookingError&&<div role="alert" style={{position:"fixed",right:24,bottom:24,zIndex:30,maxWidth:420,padding:"14px 18px",border:"1px solid #fecaca",borderRadius:12,background:"#fff1f2",color:"#b42318",fontWeight:700,boxShadow:"0 12px 30px #11182722"}}>{bookingError}</div>}
  </main>
}

function Schedule({bookings,onNew}:{bookings:Booking[];onNew:()=>void}){const [day,setDay]=useState(0);const dates=["26 октября","27 октября","28 октября"];const currentDate=`2026-10-${String(26+day).padStart(2,"0")}`;const visible=bookings.filter(b=>b.bookingDate===currentDate);const free=Math.max(0,30-visible.length);return <div className="page-content">
  <div className="toolbar"><div className="week"><button onClick={()=>setDay(d=>Math.max(0,d-1))}>‹</button><b>{dates[day]}</b><button onClick={()=>setDay(d=>Math.min(dates.length-1,d+1))}>›</button></div><div><button className="outline">Сегодня</button><button className="primary" onClick={onNew}>＋ Новая запись</button></div></div>
  <div className="calendar"><div className="calendar-head"><span>Время</span>{staff.map((s,i)=><div key={s.name}><div className="avatar" style={{background:s.color}}>{s.initial}</div><b>{s.name}</b><small>{s.role}</small></div>)}</div>
    {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(t=><div className="calendar-row" key={t}><time>{t}</time>{staff.map(s=><div key={s.name}>{visible.filter(b=>b.staff===s.name&&b.bookingTime.startsWith(t.slice(0,2))).map(b=><article className={`appointment ${b.source==="ai"?"new":""}`} key={b.id}><b>{b.clientName.split(" ")[0]} · {b.service}</b><small>{b.bookingTime} · {b.source==="ai"?"записал ИИ":b.source==="online"?"онлайн":"вручную"}</small></article>)}</div>)}</div>)}</div>
  <div className="schedule-free"><b>{free} свободных окон</b><span>Можно предложить клиентам из листа ожидания</span></div><p className="footnote">Расписание синхронизировано · обновлено несколько секунд назад.</p>
  </div>}

function Clients(){const rows=[{name:"Анна Крылова",history:"12 визитов",service:"Маникюр",spent:"28 400 ₽",status:"Записана",kind:"active"},{name:"Ирина Волкова",history:"7 визитов",service:"Брови",spent:"15 900 ₽",status:"Вернуть",kind:"late"},{name:"Ольга Миронова",history:"18 визитов",service:"Окрашивание",spent:"64 200 ₽",status:"VIP",kind:"vip"},{name:"Дарья Соколова",history:"3 визита",service:"Стрижка",spent:"8 700 ₽",status:"Новая",kind:"new"}];const [filter,setFilter]=useState("all");const [query,setQuery]=useState("");const shown=rows.filter(r=>(filter==="all"||r.kind===filter)&&(!query.trim()||r.name.toLowerCase().includes(query.trim().toLowerCase())||r.service.toLowerCase().includes(query.trim().toLowerCase())));return <div className="page-content"><div className="toolbar"><div><h2 className="section-title">Клиенты</h2><p className="section-sub">История визитов, любимые услуги и возврат клиентов</p></div><div className="request-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Поиск клиента или услуги" aria-label="Поиск клиентов"/></div><button className="primary">＋ Добавить клиента</button></div><div className="filters">{[["all","Все клиенты"],["new","Новые"],["late","Давно не были"],["vip","VIP"]].map(f=><button key={f[0]} className={filter===f[0]?"active":""} onClick={()=>setFilter(f[0])}>{f[1]}</button>)}</div><div className="client-table"><div className="table-head"><span>Клиент</span><span>История</span><span>Любимая услуга</span><span>Потрачено</span><span>Статус</span></div>{shown.length===0&&<div className="empty-state">Клиенты не найдены</div>}{shown.map((r,i)=><div className="table-row" key={r.name}><span className="client-name"><i>{r.name[0]}</i><b>{r.name}<small>+7 900 000-0{i}0{i}</small></b></span><span>{r.history}</span><span>{r.service}</span><strong>{r.spent}</strong><em className={`state s${i}`}>{r.status}</em></div>)}</div><p className="footnote">Поиск и фильтры работают в демонстрационной клиентской базе.</p></div>}function OnlineBooking({saving,bookings,onSave}:{saving:boolean;bookings:Booking[];onSave:(d:Omit<Booking,"id"|"status"|"createdAt">)=>Promise<boolean>}){
 const services=[{name:"Маникюр с покрытием",short:"Маникюр",duration:"1 ч 30 мин",price:2400,icon:"💅",staff:["Мария"]},{name:"Коррекция бровей",short:"Брови",duration:"1 час",price:1600,icon:"✦",staff:["София"]},{name:"Женская стрижка",short:"Стрижка",duration:"1 час",price:2200,icon:"✂",staff:["Елена"]},{name:"Окрашивание волос",short:"Окрашивание",duration:"2–3 часа",price:5500,icon:"◒",staff:["Елена"]}];
 const [stage,setStage]=useState(1);const [service,setService]=useState(services[0]);const [master,setMaster]=useState("Мария");const [time,setTime]=useState("13:30");const [client,setClient]=useState({name:"",phone:""});const [done,setDone]=useState(false);
 const times=["10:00","11:30","13:30","15:00","17:30","19:00"].filter(t=>!bookings.some(b=>b.staff===master&&b.bookingDate==="2026-10-28"&&b.bookingTime===t));
 const selectService=(s:typeof services[number])=>{setService(s);setMaster(s.staff[0]);setStage(2)};
 const submit=async()=>{if(!client.name.trim()||!client.phone.trim())return;const ok=await onSave({clientName:client.name,clientPhone:client.phone,service:service.short,staff:master,bookingDate:"2026-10-28",bookingTime:time,source:"online",amount:service.price});if(ok)setDone(true)};
 if(done)return <div className="public-booking success-screen"><div className="success-mark">✓</div><h2>Вы записаны!</h2><p>{service.name} · 28 октября, {time}</p><div className="success-card"><span>Мастер</span><b>{master}</b><span>Адрес</span><b>Омск, ул. Ленина, 14</b><span>К оплате в салоне</span><b>{service.price.toLocaleString("ru-RU")} ₽</b></div><button className="primary" onClick={()=>{setDone(false);setStage(1);setClient({name:"",phone:""})}}>Создать ещё одну запись</button></div>;
 return <div className="public-booking"><div className="booking-brand"><div className="salon-logo">Л</div><div><small>ОНЛАЙН-ЗАПИСЬ</small><h2>Салон красоты «Линия»</h2><p>Омск · ежедневно 10:00–21:00</p></div></div><div className="booking-progress">{[1,2,3,4].map(n=><span key={n} className={n<=stage?"current":""}><i>{n}</i>{["Услуга","Мастер","Время","Контакты"][n-1]}</span>)}</div>
 {stage===1&&<section className="booking-step"><h3>Выберите услугу</h3><div className="service-options">{services.map(s=><button key={s.name} onClick={()=>selectService(s)}><i>{s.icon}</i><div><b>{s.name}</b><small>{s.duration}</small></div><strong>{s.price===5500?"от ":""}{s.price.toLocaleString("ru-RU")} ₽</strong><em>›</em></button>)}</div></section>}
 {stage===2&&<section className="booking-step"><button className="back-link" onClick={()=>setStage(1)}>← Назад</button><h3>Выберите мастера</h3><div className="master-option"><div className="avatar large" style={{background:staff.find(s=>s.name===master)?.color}}>{master[0]}</div><div><b>{master}</b><small>{service.name} · ★ 4,9</small></div><span>Ближайшее время<br/><b>28 октября</b></span><button className="primary" onClick={()=>setStage(3)}>Выбрать</button></div></section>}
 {stage===3&&<section className="booking-step"><button className="back-link" onClick={()=>setStage(2)}>← Назад</button><h3>Среда, 28 октября</h3><p className="step-sub">Свободное время у мастера {master}</p><div className="time-options">{times.map(t=><button key={t} className={time===t?"selected":""} onClick={()=>setTime(t)}>{t}</button>)}</div><button className="primary continue" onClick={()=>setStage(4)}>Продолжить</button></section>}
 {stage===4&&<section className="booking-step"><button className="back-link" onClick={()=>setStage(3)}>← Назад</button><h3>Ваши контакты</h3><div className="summary-line"><div><small>{service.name}</small><b>28 октября в {time} · {master}</b></div><strong>{service.price.toLocaleString("ru-RU")} ₽</strong></div><label>Имя<input value={client.name} onChange={e=>setClient({...client,name:e.target.value})} placeholder="Как к вам обращаться"/></label><label>Телефон<input value={client.phone} onChange={e=>setClient({...client,phone:e.target.value})} placeholder="+7 900 000-00-00"/></label><label className="consent"><input type="checkbox" defaultChecked/> Согласен на обработку демонстрационных данных</label><button className="primary continue" disabled={saving||!client.name||!client.phone} onClick={submit}>{saving?"Создаём запись...":"Подтвердить запись"}</button></section>}
 <p className="booking-note">Безопасная запись · подтверждение приходит клиенту автоматически.</p></div>
}

function Requests({bookings,onStatus,goSchedule}:{bookings:Booking[];onStatus:(id:string,status:string)=>Promise<boolean>;goSchedule:()=>void}){const [filter,setFilter]=useState("active");const [busy,setBusy]=useState("");const [query,setQuery]=useState("");const shown=bookings.filter(b=>{const matchesFilter=filter==="all"?true:filter==="active"?b.status==="confirmed":b.status===filter;const q=query.trim().toLowerCase();const matchesQuery=!q||b.clientName.toLowerCase().includes(q)||b.clientPhone.includes(q)||b.service.toLowerCase().includes(q);return matchesFilter&&matchesQuery}).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));const change=async(id:string,status:string)=>{setBusy(id+status);await onStatus(id,status);setBusy("")};const statusText=(s:string)=>s==="completed"?"Завершена":s==="cancelled"?"Отменена":"Подтверждена";return <div className="page-content requests-page"><div className="toolbar"><div><h2 className="section-title">Все обращения</h2><p className="section-sub">Онлайн, ИИ и ручные записи в одном окне</p></div><div className="request-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Поиск клиента, телефона или услуги" aria-label="Request search"/></div><button className="outline" onClick={goSchedule}>Открыть расписание</button></div><div className="request-summary"><article><small>Активные</small><b>{bookings.filter(b=>b.status==="confirmed").length}</b></article><article><small>Через ИИ</small><b>{bookings.filter(b=>b.source==="ai").length}</b></article><article><small>Онлайн</small><b>{bookings.filter(b=>b.source==="online").length}</b></article><article><small>Завершены</small><b>{bookings.filter(b=>b.status==="completed").length}</b></article></div><div className="request-filters">{[["active","Активные"],["all","Все"],["completed","Завершённые"],["cancelled","Отменённые"]].map(f=><button key={f[0]} className={filter===f[0]?"active":""} onClick={()=>setFilter(f[0])}>{f[1]}</button>)}</div><div className="requests-list">{shown.length===0&&<div className="empty-state">В этой категории пока нет записей</div>}{shown.map(b=><article key={b.id}><div className="request-date"><b>{b.bookingTime}</b><small>{b.bookingDate==="2026-10-28"?"28 октября":"27 октября"}</small></div><div className="request-person"><i>{b.clientName[0]}</i><p><b>{b.clientName}</b><small>{b.clientPhone}</small></p></div><div className="request-service"><b>{b.service}</b><small>Мастер: {b.staff} · {b.amount.toLocaleString("ru-RU")} ₽</small></div><span className={`source ${b.source}`}>{b.source==="ai"?"ИИ":b.source==="online"?"Онлайн":"Вручную"}</span><span className={`booking-status ${b.status}`}>{statusText(b.status)}</span><div className="request-actions">{b.status==="confirmed"&&<><button className="complete" disabled={busy!==""} onClick={()=>change(b.id,"completed")}>✓ Завершить</button><button className="cancel" disabled={busy!==""} onClick={()=>change(b.id,"cancelled")}>Отменить</button></>}{b.status!=="confirmed"&&<button className="restore" disabled={busy!==""} onClick={()=>change(b.id,"confirmed")}>Вернуть</button>}</div></article>)}</div><p className="footnote">Статусы сохраняются и остаются после обновления страницы.</p></div>}

function Team({onSchedule}:{onSchedule:()=>void}){return <div className="page-content"><div className="toolbar"><div><h2 className="section-title">Команда сегодня</h2><p className="section-sub">Загрузка, выручка и ближайшие записи</p></div><button className="primary">＋ Добавить сотрудника</button></div><div className="team-grid">{staff.map((s,i)=><article key={s.name}><div className="avatar large" style={{background:s.color}}>{s.initial}</div><h3>{s.name}</h3><p>{s.role}</p><div className="load"><span>Загрузка</span><b>{[82,64,76][i]}%</b><i><em style={{width:`${[82,64,76][i]}%`,background:s.color}}/></i></div><dl><div><dt>Записей</dt><dd>{[8,6,5][i]}</dd></div><div><dt>Сегодня</dt><dd>{[12400,7800,16900][i].toLocaleString("ru-RU")} ₽</dd></div></dl><button className="outline" onClick={onSchedule}>Открыть расписание</button></article>)}</div></div>}

function Salon(){const services=[["Маникюр с покрытием","1 ч 30 мин","2 400 ₽","Мария"],["Коррекция и окрашивание бровей","1 час","1 600 ₽","София"],["Женская стрижка","1 час","2 200 ₽","Елена"],["Окрашивание волос","2–3 часа","от 5 500 ₽","Елена"]];return <div className="page-content salon-page"><div className="profile-banner"><div className="salon-logo">Л</div><div><small>ДЕМО-САЛОН</small><h2>Салон красоты «Линия»</h2><p>Омск, ул. Ленина, 14 · ежедневно 10:00–21:00</p></div><span className="ready">✓ Профиль заполнен</span></div><div className="salon-columns"><section className="settings-card"><h3>Основная информация</h3><dl className="info-list"><div><dt>Телефон</dt><dd>+7 3812 55-24-24</dd></div><div><dt>Адрес</dt><dd>Омск, ул. Ленина, 14</dd></div><div><dt>Часовой пояс</dt><dd>Омск, GMT+6</dd></div><div><dt>Онлайн-запись</dt><dd><em>Включена</em></dd></div><div><dt>Предоплата</dt><dd>20% для новых клиентов</dd></div></dl></section><section className="settings-card"><h3>Каналы записи</h3><div className="channel-list"><div><span className="ch purple">AI</span><p><b>ИИ-помощник VELA</b><small>Отвечает и создаёт записи круглосуточно</small></p><em>Активен</em></div><div><span className="ch blue">TG</span><p><b>Telegram</b><small>Демонстрационный канал</small></p><em>Подключён</em></div><div><span className="ch coral">WEB</span><p><b>Страница онлайн-записи</b><small>Доступна по прямой ссылке</small></p><em>Активна</em></div></div></section></div><section className="services-card"><div className="card-title"><div><h3>Услуги и цены</h3><small>4 услуги доступны для онлайн-записи</small></div><button className="outline">＋ Добавить услугу</button></div><div className="services-table"><div className="service-head"><span>Услуга</span><span>Длительность</span><span>Цена</span><span>Мастер</span></div>{services.map((s,i)=><div className="service-row" key={s[0]}><span><i className={`service-dot d${i}`}/><b>{s[0]}</b></span><span>{s[1]}</span><strong>{s[2]}</strong><span>{s[3]}</span></div>)}</div></section><p className="footnote">Контактные данные и адрес вымышлены и используются только в демо.</p></div>}

function Owner({bookings,onNew,onSchedule,onRequests}:{bookings:Booking[];onNew:()=>void;onSchedule:()=>void;onRequests:()=>void}){const added=bookings.length;const ai=bookings.filter(b=>b.source==="ai").length;const revenue=84600+bookings.reduce((n,b)=>n+(b.amount||0),0);return <div className="page-content owner-page"><div className="owner-heading"><div><span className="eyebrow">РАБОЧИЙ ЦЕНТР VELA</span><h2>Сегодня в салоне</h2><p>Главное за день — в одном экране. Следующий визит уже под контролем.</p></div><div className="owner-actions"><button className="outline" onClick={onSchedule}>Открыть расписание</button><button className="primary" onClick={onNew}>＋ Новая запись</button></div></div><div className="notice"><span>✦</span><p><b>Утренний отчёт готов</b><small>ИИ нашёл два незаполненных окна и 14 клиентов, которым пора напомнить о повторном визите.</small></p><button onClick={onRequests}>Посмотреть действия</button></div><div className="metric-grid"><article><small>Плановая выручка</small><b>{revenue.toLocaleString("ru-RU")} ₽</b><em>учтены новые записи</em></article><article><small>Загрузка</small><b>{78+Math.min(added,8)}%</b><em>{19+added} окон заняты</em></article><article><small>Новые записи</small><b>{7+added}</b><em>{4+ai} созданы через ИИ</em></article><article><small>Повторные записи</small><b>11</b><em>58% завершённых визитов</em></article></div><div className="owner-columns"><article className="chart-card"><div className="card-title"><div><h3>Записи за неделю</h3><small>Создано {86+added} записей</small></div><b>+18%</b></div><div className="bars">{[46,62,55,78,68,92,72].map((h,i)=><div key={i}><i style={{height:`${Math.min(h+(i===1?added*3:0),100)}%`}}/><span>{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</span></div>)}</div></article><article className="actions-card"><h3>Что требует внимания</h3><div><span className="warn">!</span><p><b>2 свободных окна завтра</b><small>Предложить клиентам из листа ожидания</small></p><button onClick={onRequests}>Заполнить</button></div><div><span className="purple">↻</span><p><b>14 клиентов пора вернуть</b><small>Не записывались более 45 дней</small></p><button onClick={onRequests}>Подготовить</button></div><div><span className="green">✓</span><p><b>Все сообщения обработаны</b><small>Среднее время ответа — 48 секунд</small></p></div></article></div><p className="footnote">Базовые показатели демонстрационные; добавленные записи сохраняются в базе.</p></div>}

function BookingModal({saving,onClose,onSave}:{saving:boolean;onClose:()=>void;onSave:(d:Omit<Booking,"id"|"status"|"createdAt">)=>void}){const [form,setForm]=useState({clientName:"",clientPhone:"",service:"Маникюр",staff:"Мария",bookingDate:"2026-10-27",bookingTime:"12:00",source:"manual",amount:2400});const change=(k:string,v:string|number)=>setForm(f=>({...f,[k]:v}));return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><form className="booking-modal" onSubmit={e=>{e.preventDefault();onSave(form)}}><div className="modal-title"><div><small>НОВАЯ ЗАПИСЬ</small><h2>Добавить клиента в расписание</h2></div><button type="button" onClick={onClose}>×</button></div><label>Имя клиента<input required value={form.clientName} onChange={e=>change("clientName",e.target.value)} placeholder="Анна Крылова"/></label><label>Телефон<input required value={form.clientPhone} onChange={e=>change("clientPhone",e.target.value)} placeholder="+7 900 000-00-00"/></label><div className="form-row"><label>Услуга<select value={form.service} onChange={e=>change("service",e.target.value)}><option>Маникюр</option><option>Брови</option><option>Окрашивание</option></select></label><label>Мастер<select value={form.staff} onChange={e=>change("staff",e.target.value)}>{staff.map(s=><option key={s.name}>{s.name}</option>)}</select></label></div><div className="form-row"><label>Дата<input type="date" required value={form.bookingDate} onChange={e=>change("bookingDate",e.target.value)}/></label><label>Время<input type="time" required value={form.bookingTime} onChange={e=>change("bookingTime",e.target.value)}/></label></div><label>Стоимость<input type="number" min="0" value={form.amount} onChange={e=>change("amount",Number(e.target.value))}/></label><div className="modal-actions"><button type="button" className="outline" onClick={onClose}>Отмена</button><button className="primary" disabled={saving}>{saving?"Сохраняем...":"Создать запись"}</button></div></form></div>}
