"use client";
import { useEffect, useState } from "react";
import "./analytics.css";

const labels: Record<string,{title:string;items:[string,string,string,string]}> = {
  beauty:{title:"Аналитика салона",items:["Выручка","Визиты","Средний чек","Повторные записи"]},
  health:{title:"Аналитика клиники",items:["Выручка","Приёмы","Средний чек","Повторные пациенты"]},
  sport:{title:"Аналитика клуба",items:["Выручка","Тренировки","Средний абонемент","Продления"]},
  education:{title:"Аналитика учебного центра",items:["Выручка","Занятия","Средняя оплата","Повторные ученики"]},
  studio:{title:"Аналитика студии",items:["Выручка","Бронирования","Средний заказ","Повторные гости"]},
  other:{title:"Аналитика бизнеса",items:["Выручка","Заказы","Средний заказ","Повторные клиенты"]}
};
export default function AdaptiveAnalytics(){const[industry,setIndustry]=useState("beauty");useEffect(()=>{const sync=()=>setIndustry(localStorage.getItem("vela_industry")||"beauty");sync();const t=setInterval(sync,500);return()=>clearInterval(t)},[]);const cfg=labels[industry]||labels.other;const values=["102 100 ₽","84%","2 400 ₽","58%"];return <div className="page-content analytics-page"><section className="analytics-hero"><div><small>УПРАВЛЕНИЕ НА ОСНОВЕ ДАННЫХ</small><h2>{cfg.title}</h2><p>Показатели и рекомендации автоматически подстроены под выбранный тип бизнеса.</p></div><div className="forecast-card"><span>Прогноз выручки</span><b>1 294 000 ₽</b><em>↑ 12,7% к прошлому периоду</em></div></section><div className="analytics-metrics">{cfg.items.map((label,i)=><article key={label}><span>{label}</span><b>{values[i]}</b><em>{i===0?"учтены новые записи":i===3?"цель 75%":"↑ 14%"}</em></article>)}</div><section className="revenue-chart"><div className="a-title"><div><h3>Динамика показателей</h3><p>Сравнение по неделям</p></div><span>Обновлено автоматически</span></div><div className="chart-area">{[54,62,58,76,70,86,93].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><span>{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</span></div>)}</div></section><p className="footnote">Показатели демонстрационные и меняются вместе с профилем бизнеса.</p></div>}
