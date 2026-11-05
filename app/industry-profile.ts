export type IndustryProfile={unit:string;person:string;service:string;team:string;packageLabel:string};
export const industryProfiles:Record<string,IndustryProfile>={
  beauty:{unit:"визит",person:"клиент",service:"услуга",team:"специалист",packageLabel:"пакет услуг"},
  health:{unit:"приём",person:"пациент",service:"процедура",team:"врач",packageLabel:"курс лечения"},
  sport:{unit:"тренировка",person:"участник",service:"занятие",team:"тренер",packageLabel:"абонемент"},
  education:{unit:"занятие",person:"ученик",service:"курс",team:"преподаватель",packageLabel:"пакет занятий"},
  studio:{unit:"бронирование",person:"клиент",service:"проект",team:"специалист",packageLabel:"пакет часов"},
  other:{unit:"заказ",person:"клиент",service:"услуга",team:"исполнитель",packageLabel:"пакет услуг"},
};
export function getIndustryProfile(industry:string){return industryProfiles[industry]||industryProfiles.other}
