import {createContext,useContext,useState,useEffect,ReactNode,useCallback} from 'react';
import {customers as c0,payments as p0,products as pr0,Customer,Payment,Product} from './data';
function useLS<T>(k:string,init:T){const [v,setV]=useState<T>(()=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):init}catch{return init}});useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},[k,v]);return [v,setV] as const}
interface Ctx{customers:Customer[];setCustomers:(f:(x:Customer[])=>Customer[])=>void;payments:Payment[];setPayments:(f:(x:Payment[])=>Payment[])=>void;products:Product[];setProducts:(f:(x:Product[])=>Product[])=>void;toast:(m:string)=>void;toasts:{id:number;m:string}[]}
const C=createContext<Ctx>(null as any);export const useStore=()=>useContext(C);
export function Provider({children}:{children:ReactNode}){
 const [customers,setCustomers]=useLS('sd2.c',c0);const [payments,setPayments]=useLS('sd2.p',p0);const [products,setProducts]=useLS('sd2.pr',pr0);
 const [toasts,setT]=useState<{id:number;m:string}[]>([]);
 const toast=useCallback((m:string)=>{const id=Date.now()+Math.random();setT(t=>[...t,{id,m}]);setTimeout(()=>setT(t=>t.filter(x=>x.id!==id)),3000)},[]);
 return <C.Provider value={{customers,setCustomers,payments,setPayments,products,setProducts,toast,toasts}}>{children}</C.Provider>}
