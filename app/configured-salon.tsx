"use client";

import { useEffect, useState } from "react";

export default function ConfiguredSalon(){
  const [name,setName]=useState("Салон красоты «Линия»");
  const [address,setAddress]=useState("Омск, ул. Ленина, 14");
  const [open,setOpen]=useState("10:00");
  const [close,setClose]=useState("21:00");
  useEffect(()=>{
    setName(localStorage.getItem("vela_salon_name")||"Салон красоты «Линия»");
    setAddress(localStorage.getItem("vela_salon_address")||"Омск, ул. Ленина, 14");
    setOpen(localStorage.getItem("vela_salon_open")||"10:00");
    setClose(localStorage.getItem("vela_salon_close")||"21:00");
  },[]);
  return <div className="page-content salon-page"><div className="profile-banner"><div className="salon-logo">{name.slice(0,1)}</div><div><small>ДЕМО-САЛОН</small><h2>{name}</h2><p>{address} · ежедневно {open}–{close}</p></div><span className="ready">✓ Профиль заполнен</span></div><section className="settings-card"><h3>Основная информация</h3><dl className="info-list"><div><dt>Название</dt><dd>{name}</dd></div><div><dt>Адрес</dt><dd>{address}</dd></div><div><dt>График</dt><dd>{open}–{close}</dd></div><div><dt>Онлайн-запись</dt><dd><em>Включена</em></dd></div></dl></section><p className="footnote">Данные подгружаются из настроек салона и сохраняются в демо.</p></div>;
}
