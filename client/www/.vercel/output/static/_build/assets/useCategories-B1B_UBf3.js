import{r as T,u as p}from"./client-oEds41LK.js";import{t as f,H as A,k as O,O as y}from"./getAllCategories-BHeGl718.js";const m=1,_=1e6;let i=0;function l(){return i=(i+1)%Number.MAX_VALUE,i.toString()}const c=new Map,S=t=>{if(c.has(t))return;const e=setTimeout(()=>{c.delete(t),n({type:"REMOVE_TOAST",toastId:t})},_);c.set(t,e)},E=(t,e)=>{switch(e.type){case"ADD_TOAST":return{...t,toasts:[e.toast,...t.toasts].slice(0,m)};case"UPDATE_TOAST":return{...t,toasts:t.toasts.map(s=>s.id===e.toast.id?{...s,...e.toast}:s)};case"DISMISS_TOAST":{const{toastId:s}=e;return s?S(s):t.toasts.forEach(o=>{S(o.id)}),{...t,toasts:t.toasts.map(o=>o.id===s||s===void 0?{...o,open:!1}:o)}}case"REMOVE_TOAST":return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(s=>s.id!==e.toastId)}}},r=[];let a={toasts:[]};function n(t){a=E(a,t),r.forEach(e=>{e(a)})}function D({...t}){const e=l(),s=u=>n({type:"UPDATE_TOAST",toast:{...u,id:e}}),o=()=>n({type:"DISMISS_TOAST",toastId:e});return n({type:"ADD_TOAST",toast:{...t,id:e,open:!0,onOpenChange:u=>{u||o()}}}),{id:e,dismiss:o,update:s}}function M(){const[t,e]=T.useState(a);return T.useEffect(()=>(r.push(e),()=>{const s=r.indexOf(e);s>-1&&r.splice(s,1)}),[t]),{...t,toast:D,dismiss:s=>n({type:"DISMISS_TOAST",toastId:s})}}const d=async t=>{const e=await A(t);return e.data?e.data:null};function h(){const{getToken:t}=p(),e=t({template:"1_HOUR"}).then(o=>o?.toString());return{...f({queryKey:O.categories,queryFn:async()=>d(await e),enabled:!!e,staleTime:y}),queryFn:d}}export{M as a,h as u};
