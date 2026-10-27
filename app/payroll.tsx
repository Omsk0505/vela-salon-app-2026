"use client";

import { useMemo, useState } from "react";
import "./payroll.css";

const people=[
  {name:"Мария",role:"Маникюр",revenue:126400,rate:40,bonus:5000,advance:15000,color:"#ff6b60",services:52,hours:118},
  {name:"София",role:"Брови",revenue:98400,rate:38,bonus:3000,advance:10000,color:"#7657e8",services:61,hours:104},
  {name:"Елена",role:"Волосы",revenue:168700,rate:42,bonus:7000,advance:20000,color:"#16a085",services:39,hours:126},
];

export default function Payroll(){
  const [period,setPeriod]=useState("Октябрь");
  const [selected,setSelected]=useState(people[0]);
  const [approved,setApproved]=useState(false);
  const [bonus,setBonus]=useState(selected.bonus);
  const choose=(p:typeof people[number])=>{setSelected(p);setBonus(p.bonus);setApproved(false)};
  const total=useMemo(()=>Math.round(selected.revenue*selected.rate/100)+bonus-selected.advance,[selected,bonus]);
  const payrollTotal=people.reduce((sum,p)=>sum+Math.round(p.revenue*p.rate/100)+p.bonus-p.advance,0)+(bonus-selected.bonus);
  return <div className="page-content payroll-page">
    <section className="payroll-hero"><div><small>АВТОМАТИЧЕСКИЙ РАСЧЁТ</small><h2>Зарплата без таблиц и споров</h2><p>VELA учитывает выполненные услуги, личный процент, премии и авансы — владелец только проверяет итог.</p></div><div className="payroll-total"><span>К выплате за {period.toLowerCase()}</span><b>{payrollTotal.toLocaleString("ru-RU")} ₽</b><em>3 сотрудника</em></div></section>
    <div className="payroll-controls"><div className="period-switch"><button>‹</button><select value={period} onChange={e=>setPeriod(e.target.value)}><option>Сентябрь</option><option>Октябрь</option><option>Ноябрь</option></select><button>›</button></div><div><button className="outline">Скачать расчёт</button><button className="primary" onClick={()=>setApproved(true)}>{approved?"✓ Ведомость утверждена":"Утвердить ведомость"}</button></div></div>
    {approved&&<div className="payroll-success">✓ Расчёт за {period.toLowerCase()} утверждён. Это демонстрация — реальные выплаты не создаются.</div>}
    <div className="payroll-metrics"><article><span>Выручка команды</span><b>393 500 ₽</b><em>↑ 14% к прошлому месяцу</em></article><article><span>Фонд оплаты труда</span><b>{payrollTotal.toLocaleString("ru-RU")} ₽</b><em>{Math.round(payrollTotal/393500*100)}% от выручки</em></article><article><span>Премии</span><b>{(people.reduce((s,p)=>s+p.bonus,0)+(bonus-selected.bonus)).toLocaleString("ru-RU")} ₽</b><em>за план и отзывы</em></article><article><span>Средний доход мастера</span><b>{Math.round(payrollTotal/3).toLocaleString("ru-RU")} ₽</b><em>после авансов</em></article></div>
    <div className="payroll-layout"><section className="payroll-table"><div className="p-table-head"><span>Сотрудник</span><span>Выручка</span><span>Условия</span><span>К выплате</span></div>{people.map(p=>{const current=p.name===selected.name;const pay=Math.round(p.revenue*p.rate/100)+(current?bonus:p.bonus)-p.advance;return <button key={p.name} className={current?"selected":""} onClick={()=>choose(p)}><span className="employee"><i style={{background:p.color}}>{p.name[0]}</i><b>{p.name}<small>{p.role}</small></b></span><strong>{p.revenue.toLocaleString("ru-RU")} ₽</strong><span>{p.rate}% + премия</span><b>{pay.toLocaleString("ru-RU")} ₽</b></button>})}</section>
      <aside className="payroll-detail"><div className="p-detail-head"><div><small>РАСЧЁТ СОТРУДНИКА</small><h3>{selected.name}</h3><p>{selected.role}</p></div><i style={{background:selected.color}}>{selected.name[0]}</i></div><div className="formula"><div><span>Процент с услуг</span><b>{selected.revenue.toLocaleString("ru-RU")} ₽ × {selected.rate}%</b><strong>{Math.round(selected.revenue*selected.rate/100).toLocaleString("ru-RU")} ₽</strong></div><div><span>Премия</span><b>План и рейтинг</b><label><input type="number" min="0" step="500" value={bonus} onChange={e=>{setBonus(Number(e.target.value));setApproved(false)}}/> ₽</label></div><div className="minus"><span>Выплаченный аванс</span><b>15 октября</b><strong>− {selected.advance.toLocaleString("ru-RU")} ₽</strong></div></div><div className="payout"><span>Итого к выплате</span><b>{total.toLocaleString("ru-RU")} ₽</b></div><p className="formula-note">Все строки расчёта прозрачны для владельца и сотрудника.</p></aside>
    </div>
    <section className="motivation"><div><small>МОТИВАЦИЯ</small><h3>До премии за план осталось</h3><p>Система показывает мастеру понятную цель и считает результат автоматически.</p></div>{people.map((p,i)=>{const progress=[92,84,106][i];return <article key={p.name}><header><b>{p.name}</b><span>{progress}%</span></header><div><i style={{width:`${Math.min(progress,100)}%`,background:p.color}}/></div><small>{progress>=100?"План выполнен — премия начислена":`${(150000-p.revenue).toLocaleString("ru-RU")} ₽ до плана`}</small></article>})}</section>
    <p className="footnote">Демонстрационные показатели. Модуль не создаёт банковские переводы и бухгалтерские документы.</p>
  </div>
}
