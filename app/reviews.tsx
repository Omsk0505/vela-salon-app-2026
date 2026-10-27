"use client";

import { useMemo, useState } from "react";
import "./reviews.css";

type Review = {
  id: number;
  client: string;
  service: string;
  master: string;
  rating: number;
  text: string;
  date: string;
  source: string;
};

const reviews: Review[] = [
  {id:1,client:"Анна Крылова",service:"Маникюр",master:"Мария",rating:5,text:"Очень аккуратно и быстро. Отдельное спасибо за подбор цвета!",date:"Сегодня, 11:42",source:"После визита"},
  {id:2,client:"Ирина Волкова",service:"Коррекция бровей",master:"София",rating:3,text:"Результат хороший, но пришлось ждать почти 20 минут.",date:"Вчера, 18:10",source:"WhatsApp"},
  {id:3,client:"Ольга Миронова",service:"Окрашивание",master:"Елена",rating:5,text:"Цвет получился именно таким, как хотела. Уже записалась снова.",date:"24 октября",source:"Онлайн-запись"},
  {id:4,client:"Дарья Соколова",service:"Стрижка",master:"Елена",rating:4,text:"Всё понравилось, удобно записываться и быстро подтвердили визит.",date:"23 октября",source:"После визита"},
];

export default function Reviews(){
  const [filter,setFilter]=useState("Все");
  const [selected,setSelected]=useState<Review>(reviews[1]);
  const [reply,setReply]=useState("");
  const [sent,setSent]=useState<number[]>([]);
  const [requested,setRequested]=useState(false);
  const visible=useMemo(()=>reviews.filter(r=>filter==="Все"||(filter==="Требуют ответа"?r.rating<=3:r.rating===Number(filter))),[filter]);
  const generate=()=>setReply(selected.rating<=3
    ?`Ирина, спасибо, что рассказали об ожидании. Нам важно начинать услуги вовремя. Мы уже проверяем расписание и начислили вам 300 бонусов на следующий визит. Будем рады исправить впечатление!`
    :`${selected.client.split(" ")[0]}, спасибо за тёплые слова! Очень рады, что вам понравился результат. Передадим отзыв мастеру и будем ждать вас снова 💜`);
  const send=()=>{if(!reply.trim())return;setSent(x=>[...x,selected.id]);setReply("")};
  return <div className="page-content reviews-page">
    <section className="reviews-hero"><div><small>РЕПУТАЦИЯ САЛОНА</small><h2>Каждый отзыв превращается в действие</h2><p>Система сама просит оценку после визита, замечает недовольство и помогает ответить клиенту вовремя.</p></div><div className="rating-orbit"><b>4,8</b><span>★★★★★</span><small>средняя оценка</small></div></section>
    <div className="review-metrics"><article><span>Получено за месяц</span><b>68</b><em>↑ 24% к сентябрю</em></article><article><span>Ответили клиентам</span><b>96%</b><em>среднее время — 12 мин</em></article><article><span>Негатив решён</span><b>8 из 9</b><em>до публикации отзыва</em></article><article><span>Повторно записались</span><b>21</b><em>после обратной связи</em></article></div>
    {requested&&<div className="review-success">✓ Запрос оценки подготовлен для 12 клиентов после сегодняшних визитов. В демо сообщения не отправляются.</div>}
    <div className="reviews-toolbar"><div>{["Все","Требуют ответа","5","4"].map(f=><button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f}{f==="Требуют ответа"&&<i>1</i>}</button>)}</div><button className="primary" onClick={()=>setRequested(true)}>Запросить отзывы</button></div>
    <div className="reviews-layout"><section className="review-list">{visible.map(r=><button key={r.id} className={selected.id===r.id?"selected":""} onClick={()=>{setSelected(r);setReply("")}}><span className="review-avatar">{r.client[0]}</span><div><header><b>{r.client}</b><time>{r.date}</time></header><span className={`stars rating-${r.rating}`}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</span><p>{r.text}</p><small>{r.service} · {r.master}</small></div>{sent.includes(r.id)&&<em>Ответ отправлен</em>}</button>)}</section>
      <aside className="review-detail"><div className="detail-head"><div><small>ОТЗЫВ КЛИЕНТА</small><h3>{selected.client}</h3></div><span className={`score score-${selected.rating}`}>{selected.rating},0</span></div><div className="detail-stars">{"★".repeat(selected.rating)}{"☆".repeat(5-selected.rating)}</div><blockquote>«{selected.text}»</blockquote><dl><div><dt>Услуга</dt><dd>{selected.service}</dd></div><div><dt>Мастер</dt><dd>{selected.master}</dd></div><div><dt>Источник</dt><dd>{selected.source}</dd></div></dl>{selected.rating<=3&&<div className="risk-note"><b>Нужно внимание</b><span>Клиент упомянул ожидание. Лучше ответить сегодня и предложить компенсацию.</span></div>}<label>Ответ клиенту<textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder="Напишите ответ или подготовьте его с помощью ИИ"/></label><div className="reply-actions"><button className="ai-reply" onClick={generate}>✦ Подготовить ответ</button><button className="primary" disabled={!reply.trim()} onClick={send}>{sent.includes(selected.id)?"Отправить ещё раз":"Отправить ответ"}</button></div><p className="review-demo">Демо: реальные сообщения и ответы на площадках не публикуются.</p></aside>
    </div>
    <section className="master-rating"><div><small>КАЧЕСТВО КОМАНДЫ</small><h3>Рейтинг мастеров</h3></div>{[{n:"Мария",s:"Маникюр",r:"4,9",c:31},{n:"София",s:"Брови",r:"4,7",c:19},{n:"Елена",s:"Волосы",r:"4,8",c:27}].map((m,i)=><article key={m.n}><i className={`master-color m${i}`}>{m.n[0]}</i><span><b>{m.n}</b><small>{m.s}</small></span><strong>★ {m.r}</strong><em>{m.c} отзывов</em></article>)}</section>
  </div>
}
