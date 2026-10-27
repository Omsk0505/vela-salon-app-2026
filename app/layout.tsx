import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./iphone.css";
export const viewport: Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#172034"};
export const metadata: Metadata={title:"VELA — система управления салоном красоты",description:"Онлайн-запись, клиенты, финансы, команда, маркетинг и ИИ-помощник в одной системе",manifest:"/manifest.webmanifest",appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"VELA"},icons:{icon:[{url:"/icons/icon-192.png",sizes:"192x192",type:"image/png"},{url:"/icons/icon-512.png",sizes:"512x512",type:"image/png"}],apple:[{url:"/icons/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
