"use client";
import {useEffect, useState} from "react";
import "./universal.css";

const industries=[
  {id:"beauty",icon:"✦",title:"Красота и уход",text:"Салоны, студии, мастера, барбершопы",modules:"Записи · мастера · услуги · материалы",color:"#7657e8"},
  {id:"health",icon:"✚",title:"Здоровье",text:"Клиники, кабинеты, массаж, стоматология",modules:"Записи · специалисты · пациенты · документы",color:"#159b82"},
  {id:"sport",icon:"↗",title:"Спорт и фитнес",text:"Фитнес-клубы, йога, тренеры, бассейны",modules:"Расписание · абонементы · группы · оплаты",color:"#e06b4f"},
  {id:"education",icon:"◇",title:"Обучение",text:"Репетиторы, школы, курсы, студии",modules:"Занятия · ученики · группы · прогресс",color:"#d29420"},
  {id:"studio",icon:"◎",title:"Студии и аренда",text:"Фото-, видео-, коворкинги и площадки",modules:"Календарь · ресурсы · бронирования · тарифы",color:"#3b82c4"},
  {id:"other",icon:"＋",title:"Другая деятельность",text:"Любой бизнес, где клиенты бронируют услугу",modules:"Записи · клиенты · команда · аналитика",color:"#6c7488"},
];

export default function Universal(){
  const[selected,setSelected]=useState("beauty");
  const[current,setCurrent]=useState("beauty");
  useEffect(()=>{const saved=localStorage.getItem("vela_industry");if(saved&&industries.some(x=>x.id===saved)){setSelected(saved);setCurrent(saved)}},[]);
  const choose=(id:string)=>{setSelected(id);setCurrent(id);localStorage.setItem("vela_industry",id)};
  const active=industries.find(x=>x.id===selected)!;
  return <div className="page-content universal-page"><section className="universal-hero"><div><small>УНИВЕРСАЛЬНАЯ ПЛАТФОРМА</small><h2>Один VELA — для любого бизнеса услуг</h2><p>Выберите отрасль, и система предложит подходящие разделы, роли и сценарии автоматизации.</p></div><div className="universal-score"><span>Текущий шаблон</span><b>{industries.find(x=>x.id===current)?.title}</b><small>Профиль можно изменить в любой момент</small></div></section><div className="universal-grid">{industries.map(x=><button key={x.id} className={selected===x.id?"industry-card active":"industry-card"} onClick={()=>choose(x.id)}><i style={{background:x.color}}>{x.icon}</i><span><b>{x.title}</b><small>{x.text}</small><em>{x.modules}</em></span><strong>{selected===x.id?"✓":"→"}</strong></button>)}</div><section className="template-preview"><div><small>ПРЕДПРОСМОТР ШАБЛОНА</small><h3>{active.title}</h3><p>{active.text}. После выбора VELA настроит меню и стартовый набор процессов.</p><button className="primary" onClick={()=>{setCurrent(selected);localStorage.setItem("vela_industry",selected)}}>Выбрать шаблон «{active.title}»</button></div><div className="template-screen"><header><span>VELA</span><em>{active.title}</em></header><div className="template-lines"><i/><i/><i/><i/></div><footer>{active.modules.split(" · ").map(x=><span key={x}>✓ {x}</span>)}</footer></div></section><p className="footnote">Шаблон меняет структуру рабочего пространства, но не удаляет клиентов и записи.</p></div>
}
