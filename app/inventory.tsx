"use client";
import { useEffect, useMemo, useState } from "react";
import "./inventory.css";

type Industry = "beauty" | "health" | "sport" | "education" | "studio" | "other";
type Item = { n: string; c: string; q: number; min: number; u: string; p: number };

const catalogs: Record<Industry, { label: string; subtitle: string; items: Item[] }> = {
  beauty: { label: "Материалы салона", subtitle: "Система списывает расходники после визита и заранее собирает заказ поставщику.", items: [{n:"Гель-лак Nude 07",c:"Маникюр",q:3,min:5,u:"шт",p:690},{n:"База каучуковая",c:"Маникюр",q:8,min:4,u:"шт",p:820},{n:"Краска для бровей",c:"Брови",q:2,min:3,u:"шт",p:560},{n:"Шампунь профессиональный",c:"Волосы",q:6,min:3,u:"л",p:1100},{n:"Оксидант 6%",c:"Волосы",q:1,min:2,u:"л",p:740},{n:"Перчатки нитриловые",c:"Расходники",q:7,min:4,u:"уп",p:480}] },
  health: { label: "Материалы клиники", subtitle: "Контролируйте медицинские материалы, инструменты и расходники по кабинетам.", items: [{n:"Перчатки смотровые",c:"Расходники",q:12,min:20,u:"уп",p:860},{n:"Анестетик карпульный",c:"Стоматология",q:8,min:10,u:"уп",p:1450},{n:"Композит световой",c:"Терапия",q:3,min:5,u:"шт",p:3900},{n:"Слюноотсосы",c:"Расходники",q:45,min:30,u:"шт",p:38},{n:"Маски медицинские",c:"Расходники",q:6,min:10,u:"уп",p:540},{n:"Стерильные наборы",c:"Стерилизация",q:7,min:12,u:"шт",p:310}] },
  sport: { label: "Инвентарь клуба", subtitle: "Следите за инвентарём, экипировкой и расходными материалами тренировок.", items: [{n:"Коврики для йоги",c:"Инвентарь",q:8,min:10,u:"шт",p:1800},{n:"Резинки эспандеры",c:"Фитнес",q:14,min:8,u:"шт",p:650},{n:"Мячи гимнастические",c:"Инвентарь",q:3,min:5,u:"шт",p:2400},{n:"Полотенца",c:"Расходники",q:22,min:30,u:"шт",p:420},{n:"Бутылки воды",c:"Бар",q:48,min:24,u:"шт",p:90},{n:"Дезинфектор",c:"Зал",q:2,min:4,u:"л",p:780}] },
  education: { label: "Ресурсы центра", subtitle: "Управляйте учебными материалами, оборудованием и расходниками занятий.", items: [{n:"Рабочие тетради",c:"Материалы",q:18,min:25,u:"шт",p:280},{n:"Маркеры для доски",c:"Канцелярия",q:4,min:8,u:"уп",p:430},{n:"Папки для учеников",c:"Канцелярия",q:31,min:20,u:"шт",p:170},{n:"Бумага А4",c:"Канцелярия",q:6,min:10,u:"уп",p:520},{n:"Наушники",c:"Оборудование",q:12,min:8,u:"шт",p:2100},{n:"Наборы для практики",c:"Курсы",q:3,min:6,u:"шт",p:3200}] },
  studio: { label: "Материалы студии", subtitle: "Ведите остатки материалов и оборудования для каждого направления студии.", items: [{n:"Холсты 40×50",c:"Живопись",q:9,min:12,u:"шт",p:740},{n:"Акриловые краски",c:"Материалы",q:5,min:8,u:"уп",p:1200},{n:"Кисти набор",c:"Инвентарь",q:14,min:10,u:"уп",p:980},{n:"Глина",c:"Керамика",q:7,min:10,u:"кг",p:450},{n:"Перчатки",c:"Расходники",q:12,min:8,u:"уп",p:360},{n:"Фартуки",c:"Оборудование",q:4,min:6,u:"шт",p:1100}] },
  other: { label: "Остатки организации", subtitle: "Единый контроль материалов, товаров и расходников по всем направлениям.", items: [{n:"Основной материал",c:"Материалы",q:8,min:10,u:"шт",p:1200},{n:"Расходный комплект",c:"Расходники",q:14,min:8,u:"уп",p:640},{n:"Оборудование",c:"Инвентарь",q:3,min:4,u:"шт",p:3200},{n:"Упаковка",c:"Продажи",q:21,min:15,u:"шт",p:180},{n:"Средство ухода",c:"Сервис",q:5,min:8,u:"л",p:720},{n:"Перчатки",c:"Безопасность",q:6,min:10,u:"уп",p:390}] }
};

export default function Inventory() {
  const [industry, setIndustry] = useState<Industry>("beauty");
  const [ordered, setOrdered] = useState(false);
  useEffect(() => { const sync = () => setIndustry((localStorage.getItem("vela_industry") || "beauty") as Industry); sync(); const timer = window.setInterval(sync, 500); return () => window.clearInterval(timer); }, []);
  const catalog = catalogs[industry] ?? catalogs.other;
  const [items, setItems] = useState<Item[]>(catalog.items);
  useEffect(() => { setItems(catalog.items); setOrdered(false); }, [industry]);
  const low = useMemo(() => items.filter(x => x.q <= x.min), [items]);
  const total = items.reduce((sum, item) => sum + item.q * item.p, 0);
  const order = () => { setOrdered(true); setItems(items.map(x => x.q <= x.min ? {...x, q: x.min + 5} : x)); };
  return <div className="page-content stock-page"><div className="stock-hero"><div><small>УМНЫЙ СКЛАД · {catalog.label.toUpperCase()}</small><h2>Остатки под контролем</h2><p>{catalog.subtitle}</p></div><button className="primary" onClick={order}>{ordered ? "✓ Заказ сформирован" : `Заказать недостающее · ${low.length}`}</button></div><div className="stock-stats"><article><span>Позиций на складе</span><b>{items.length}</b></article><article><span>Нужно пополнить</span><b className="danger">{low.length}</b></article><article><span>Стоимость остатков</span><b>{total.toLocaleString("ru-RU")} ₽</b></article><article><span>Списано за месяц</span><b>9 840 ₽</b></article></div>{ordered && <div className="order-ok">✓ Черновик заказа создан. Система добавила {low.length} позиций на пополнение.</div>}<section className="stock-table"><div className="stock-title"><div><h3>Остатки</h3><p>Обновляется автоматически после последнего визита</p></div><button onClick={order}>＋ Приход товара</button></div><div className="stock-head"><span>Материал</span><span>Категория</span><span>Остаток</span><span>Минимум</span><span>Статус</span></div>{items.map((x, i) => <div className="stock-row" key={x.n}><span><i>{["●","◆","✦","◒","◐","▦"][i]}</i><b>{x.n}<small>{x.p} ₽ / {x.u}</small></b></span><span>{x.c}</span><strong>{x.q} {x.u}</strong><span>{x.min} {x.u}</span><em className={x.q <= x.min ? "low" : "ok"}>{x.q <= x.min ? "Нужно пополнить" : "В наличии"}</em></div>)}</section></div>;
}
