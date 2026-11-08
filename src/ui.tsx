import {ReactNode,useState,useEffect,useRef} from 'react';import {X,ChevronDown} from 'lucide-react';import {Status,statusLabel} from './data';
export const Badge=({s}:{s:Status})=><span className={'badge '+s}>{statusLabel[s]}</span>;
export function Drawer({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}){
 useEffect(()=>{const h=(e:KeyboardEvent)=>e.key==='Escape'&&onClose();document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h)},[onClose]);
 if(!open)return null;return <><div className="overlay" onClick={onClose}/><aside className="drawer"><header><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={16}/></button></header><div className="drawer-body">{children}</div></aside></>}
export function Modal({open,onClose,title,children,footer}:{open:boolean;onClose:()=>void;title:string;children:ReactNode;footer?:ReactNode}){
 if(!open)return null;return <><div className="overlay" onClick={onClose}/><div className="modal"><header><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={16}/></button></header><div className="modal-body">{children}</div>{footer&&<footer>{footer}</footer>}</div></>}
export function Menu({label,items,icon}:{label?:ReactNode;items:{label:string;onClick:()=>void;danger?:boolean}[];icon?:ReactNode}){
 const [o,setO]=useState(false);const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setO(false)};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h)},[]);
 return <div className="menu" ref={ref}><button className={label?'btn':'icon-btn'} onClick={()=>setO(!o)}>{icon}{label}{label&&<ChevronDown size={14}/>}</button>{o&&<div className="menu-pop">{items.map(i=><button key={i.label} className={i.danger?'danger':''} onClick={()=>{i.onClick();setO(false)}}>{i.label}</button>)}</div>}</div>}
export const Field=({label,children}:{label:string;children:ReactNode})=><label className="field"><span>{label}</span>{children}</label>;
export const Empty=({text}:{text:string})=><div className="empty"><div className="empty-ic"/><p>{text}</p></div>;
export const Skeleton=({rows=6}:{rows?:number})=><div>{Array.from({length:rows}).map((_,i)=><div key={i} className="skel"/>)}</div>;
export function Pager({page,pages,total,per,set}:{page:number;pages:number;total:number;per:number;set:(n:number)=>void}){
 return <div className="pager"><span>{total?`${(page-1)*per+1}–${Math.min(page*per,total)} of ${total} results`:'0 results'}</span><div><button className="btn sm" disabled={page<=1} onClick={()=>set(page-1)}>Previous</button> <button className="btn sm" disabled={page>=pages} onClick={()=>set(page+1)}>Next</button></div></div>}
export function download(name:string,rows:(string|number)[][]){const b=new Blob([rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n')],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click()}

export function Avatar({size=24}:{size?:number}){const [ok,setOk]=useState(true);const st={width:size,height:size,fontSize:size/2.4};
 return ok?<img src="/avatar.jpg" alt="Ezekiel Vincent" className="avatar" style={{...st,objectFit:'cover'}} onError={()=>setOk(false)}/>:<span className="avatar" style={st}>EV</span>}
