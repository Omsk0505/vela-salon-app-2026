import { env } from "cloudflare:workers";

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const body=await request.json() as {status?:string};
  if(!["confirmed","completed","cancelled"].includes(body.status||"")) return Response.json({error:"Недопустимый статус"},{status:400});
  const result=await env.DB.prepare("UPDATE bookings SET status = ? WHERE id = ?").bind(body.status,id).run();
  if(!result.meta.changes) return Response.json({error:"Запись не найдена"},{status:404});
  return Response.json({id,status:body.status});
}
