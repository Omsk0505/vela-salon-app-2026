"use client";
import { useEffect, useState } from "react";
import "./marketing.css";

const profiles: Record<string,{title:string; audience:string; offer:string; channel:string}> = {
  beauty:{title:"Маркетинг салона",audience:"гостей",offer:"скидку 10% на следующий визит",channel:"WhatsApp"},
  health:{title:"Маркетинг клиники",audience:"пациентов",offer:"бесплатную консультацию",channel:"SMS"},
  sport:{title:"Маркетинг клуба",audience:"участников",offer:"пробную тренировку",channel:"Telegram"},
  education:{title:"Маркетинг учебного центра",audience:"учеников",offer:"пробное занятие",channel:"Email"},
  studio:{title:"Маркетинг студии",audience:"гостей",offer:"бонус к бронированию",channel:"WhatsApp"},
  other:{title:"Маркетинг бизнеса",audience:"клиентов",offer:"персональное предложение",channel:"SMS"},
};

export default function AdaptiveMarketing(){
  const [industry,setIndustry]=useState("beauty");
  const [segment,setSegment]=useState("Давно не были");
  const [sent,setSent]=useState(false);
  useEffect(()=>{const sync=()=>setIndustry(localStorage.getItem("vela_industry")||"beauty");sync();const t=setInterval(sync,500);return()=>clearInterval(t)},[]);
  const p=profiles[industry]||profiles.other;
  const segments=["Давно не были","Постоянные","Новые","VIP"];
  return <div className="page-content marketing-page"><div className="marketing-hero"><div><small>УМНЫЙ МАРКЕТИНГ</small><h2>{p.title}</h2><p>Выберите аудиторию — VELA подготовит персональное сообщение и поможет вернуть {p.audience}.</p></div><div className="campaign-result"><span>Выручка от кампаний</span><b>42 600 ₽</b><em>↑ 31% за месяц</em></div></div><div className="marketing-stats"><article><span>{p.audience[0].toUpperCase()+p.audience.slice(1)} в базе</span><b>174</b></article><article><span>Вернулись после сообщения</span><b>29</b></article><article><span>Конверсия</span><b>18,7%</b></article><article><span>Кампаний запущено</span><b>12</b></article></div>{sent&&<div className="campaign-success">✓ Кампания подготовлена для сегмента «{segment}». В демо реальные сообщения не отправляются.</div>}<div className="marketing-grid"><section><div className="m-title"><div><h3>Сегменты {p.audience}</h3><p>Обновляются автоматически</p></div></div><div className="segments">{segments.map(x=><button key={x} className={segment===x?"selected":""} onClick={()=>{setSegment(x);setSent(false)}}><i>{x[0]}</i><span><b>{x}</b><small>по активности</small></span><strong>{x==="Давно не были"?46:x==="Постоянные"?83:x==="Новые"?27:18}</strong><em>{p.audience}</em></button>)}</div></section><section className="campaign"><div className="m-title"><div><h3>Новая кампания</h3><p>Для сегмента «{segment}»</p></div><span>{p.channel}</span></div><div className="message-card"><div><i>V</i><b>VELA</b></div><p>Здравствуйте! Мы подготовили для вас <strong>{p.offer}</strong>. Подберём удобное время?</p><small>12:40 ✓✓</small></div><div className="forecast"><span>Получателей <b>46</b></span><span>Ожидаем откликов <b>9</b></span><span>Прогноз выручки <b>28 520 ₽</b></span></div><button className="primary launch" disabled={sent} onClick={()=>setSent(true)}>{sent?"Кампания подготовлена":"Подготовить кампанию"}</button><p className="demo-safe">Демо: реальные сообщения не отправляются.</p></section></div></div>
}
