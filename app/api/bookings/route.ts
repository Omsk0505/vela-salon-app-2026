import { env } from "cloudflare:workers";

export async function GET(){
  const result=await env.DB.prepare("SELECT id, client_name as clientName, client_phone as clientPhone, service, staff, booking_date as bookingDate, booking_time as bookingTime, source, status, amount, created_at as createdAt FROM bookings ORDER BY booking_date, booking_time").all();
  return Response.json(result.results);
}

export async function POST(request:Request){
  const body=await request.json() as Record<string,unknown>;
  const required=["clientName","clientPhone","service","staff","bookingDate","bookingTime"];
  if(required.some(k=>typeof body[k]!=="string"||!(body[k] as string).trim())) return Response.json({error:"Заполните обязательные поля"},{status:400});
  const same=await env.DB.prepare("SELECT id, client_name as clientName, client_phone as clientPhone, service, staff, booking_date as bookingDate, booking_time as bookingTime, source, status, amount, created_at as createdAt FROM bookings WHERE client_phone = ? AND service = ? AND booking_date = ? AND booking_time = ? LIMIT 1")
    .bind(body.clientPhone,body.service,body.bookingDate,body.bookingTime).first();
  if(same) return Response.json(same);
  const occupied=await env.DB.prepare("SELECT id FROM bookings WHERE staff = ? AND booking_date = ? AND booking_time = ? LIMIT 1").bind(body.staff,body.bookingDate,body.bookingTime).first();
  if(occupied) return Response.json({error:"У мастера это время уже занято"},{status:409});
  const id=crypto.randomUUID();
  const createdAt=new Date().toISOString();
  await env.DB.prepare("INSERT INTO bookings (id, client_name, client_phone, service, staff, booking_date, booking_time, source, status, amount, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id,body.clientName,body.clientPhone,body.service,body.staff,body.bookingDate,body.bookingTime,body.source||"manual","confirmed",Number(body.amount||0),createdAt).run();
  return Response.json({id,...body,status:"confirmed",createdAt},{status:201});
}
