"use client";
import {useState} from "react";
import "./integrations.css";

const initial=[
  {name:"WhatsApp",desc:"Запись, напоминания и ответы клиентам",icon:"WA",color:"#25a86b",on:true},
  {name:"Telegram",desc:"Уведомления и диалоги с клиентами",icon:"TG",color:"#3795df",on:true},
  {name:"Телефония",desc:"Карточка клиента при входящем звонке",icon:"☎",color:"#7657e8",on:false},
  {name:"Онлайн-оплата",desc:"Предоплата, сертификаты и возвраты",icon:"₽",color:"#172034",on:true},
];

export default function Integrations({onTelegram}:{onTelegram?:()=>void}){
  const [apps,setApps]=useState(initial); const [notice,setNotice]=useState("");
  const toggle=(name:string)=>{setApps(x=>x.map(a=>a.name===name?{...a,on:!a.on}:a));setNotice(`${name}: настройки обновлены`)};
  return <div className="page-content integrations-page"><section className="integrations-hero"><div><small>ЕДИНОЕ ЦИФРОВОЕ ПРОСТРАНСТВО</small><h2>Все сервисы бизнеса работают вместе</h2><p>Подключайте каналы общения, оплату и автоматизацию в одном месте.</p></div><div className="integration-health"><span>Состояние системы</span><b><i/> Всё работает</b><small>Проверено только что</small></div></section>{notice&&<div className="integration-notice">✓ {notice}</div>}<div className="integration-grid">{apps.map(a=><article key={a.name} className={a.on?"connected":""}><header><i style={{background:a.color}}>{a.icon}</i><span className={a.on?"status on":"status"}>{a.on?"Подключено":"Не подключено"}</span></header><h3>{a.name}</h3><p>{a.desc}</p><button className={a.on?"disconnect":"connect"} onClick={()=>a.name==="Telegram"&&a.on?onTelegram?.():toggle(a.name)}>{a.name==="Telegram"&&a.on?"Настроить":a.on?"Настроить":"Подключить"}</button></article>)}</div><p className="footnote">Реальные аккаунты подключаются в настройках выбранного канала.</p></div>
}
