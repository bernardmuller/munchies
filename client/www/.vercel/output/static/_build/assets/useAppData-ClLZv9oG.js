import{r as f,u as C}from"./client-oEds41LK.js";import{S,n as m,v as H,w as I,u as L,x as D,y as x,A,B as T,C as U,D as w,E as R,F as k,G as B,z as i,l as F,q as M,k as y,H as G,O as g}from"./getAllCategories-BHeGl718.js";import{g as N}from"./getCurrentLoggedInUser-DPzxe7eQ.js";import{g as _}from"./getAllIngredients-Bz8TcYMr.js";import{a as K,g as j}from"./getLatestGrocerylistByHouseholdId-Dk3ckNDT.js";function q(t,s){return t.filter(u=>!s.includes(u))}function P(t,s,u){const n=t.slice(0);return n[s]=u,n}var z=class extends S{#r;#t;#i;#n;#e;#s;#a;#u;constructor(t,s,u){super(),this.#r=t,this.#n=u,this.#i=[],this.#e=[],this.#t=[],this.setQueries(s)}onSubscribe(){this.listeners.size===1&&this.#e.forEach(t=>{t.subscribe(s=>{this.#l(t,s)})})}onUnsubscribe(){this.listeners.size||this.destroy()}destroy(){this.listeners=new Set,this.#e.forEach(t=>{t.destroy()})}setQueries(t,s,u){this.#i=t,this.#n=s,m.batch(()=>{const n=this.#e,r=this.#d(this.#i);r.forEach(o=>o.observer.setOptions(o.defaultedQueryOptions,u));const a=r.map(o=>o.observer),e=a.map(o=>o.getCurrentResult()),d=a.some((o,p)=>o!==n[p]);n.length===a.length&&!d||(this.#e=a,this.#t=e,this.hasListeners()&&(q(n,a).forEach(o=>{o.destroy()}),q(a,n).forEach(o=>{o.subscribe(p=>{this.#l(o,p)})}),this.#c()))})}getCurrentResult(){return this.#t}getQueries(){return this.#e.map(t=>t.getCurrentQuery())}getObservers(){return this.#e}getOptimisticResult(t,s){const u=this.#d(t),n=u.map(r=>r.observer.getOptimisticResult(r.defaultedQueryOptions));return[n,r=>this.#o(r??n,s),()=>u.map((r,a)=>{const e=n[a];return r.defaultedQueryOptions.notifyOnChangeProps?e:r.observer.trackResult(e,d=>{u.forEach(o=>{o.observer.trackProp(d)})})})]}#o(t,s){return s?((!this.#s||this.#t!==this.#u||s!==this.#a)&&(this.#a=s,this.#u=this.#t,this.#s=H(this.#s,s(t))),this.#s):t}#d(t){const s=new Map(this.#e.map(n=>[n.options.queryHash,n])),u=[];return t.forEach(n=>{const r=this.#r.defaultQueryOptions(n),a=s.get(r.queryHash);if(a)u.push({defaultedQueryOptions:r,observer:a});else{const e=this.#e.find(d=>d.options.queryHash===r.queryHash);u.push({defaultedQueryOptions:r,observer:e??new I(this.#r,r)})}}),u.sort((n,r)=>t.findIndex(a=>a.queryHash===n.defaultedQueryOptions.queryHash)-t.findIndex(a=>a.queryHash===r.defaultedQueryOptions.queryHash))}#l(t,s){const u=this.#e.indexOf(t);u!==-1&&(this.#t=P(this.#t,u,s),this.#c())}#c(){if(this.hasListeners()){const t=this.#s,s=this.#o(this.#t,this.#n?.combine);t!==s&&m.batch(()=>{this.listeners.forEach(u=>{u(this.#t)})})}}};function E({queries:t,...s},u){const n=L(),r=D(),a=x(),e=f.useMemo(()=>t.map(l=>{const h=n.defaultQueryOptions(l);return h._optimisticResults=r?"isRestoring":"optimistic",h}),[t,n,r]);e.forEach(l=>{A(l),T(l,a)}),U(a);const[d]=f.useState(()=>new z(n,e,s)),[o,p,Q]=d.getOptimisticResult(e,s.combine);f.useSyncExternalStore(f.useCallback(l=>r?()=>{}:d.subscribe(m.batchCalls(l)),[d,r]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),f.useEffect(()=>{d.setQueries(e,s,{listeners:!1})},[e,s,d]);const b=o.some((l,h)=>w(e[h],l))?o.flatMap((l,h)=>{const c=e[h];if(c){const v=new I(n,c);if(w(c,l))return R(c,v,a);k(l,r)&&R(c,v,a)}return[]}):[];if(b.length>0)throw Promise.all(b);const O=o.find((l,h)=>{const c=e[h];return c&&B({result:l,errorResetBoundary:a,throwOnError:c.throwOnError,query:n.getQueryCache().get(c.queryHash)})});if(O?.error)throw O.error;return p(Q())}const W=i.object({id:i.string().uuid(),firstname:i.string(),lastname:i.string(),household_id:i.string().uuid()}),Y=i.object({id:i.string().uuid(),name:i.string(),category_id:i.string().uuid(),createdat:i.string().refine(t=>!isNaN(Date.parse(t)),{message:"Invalid date"}),createdby:i.string().uuid().nullable(),deleted:i.boolean()}),J=i.object({id:i.string().uuid(),type:i.number(),check:i.boolean(),ingredient:Y,createdby:i.string().uuid().nullable()}),V=i.object({id:i.string().uuid(),createdat:i.string().refine(t=>!isNaN(Date.parse(t)),{message:"Invalid date"}),items:i.array(J)});i.object({id:i.string().uuid(),createdBy:i.string().uuid(),createdAt:i.string().refine(t=>!isNaN(Date.parse(t)),{message:"Invalid date"}),active:i.boolean(),members:i.array(W),grocerylist:V});async function X(t){return await F(M.getCurrentUserHouseholdDetails(),"GET",void 0,{accessToken:t})}function ie(){const{getToken:t}=C(),s=t({template:"1_HOUR"}).then(e=>e?.toString()),[u,n]=f.useState({userListId:null,householdListId:null}),r=E({queries:[{queryKey:y.currentUser,queryFn:async()=>{const e=await N(await s);return e.data?e.data:null},enabled:!!s,staleTime:g},{queryKey:y.latestGrocerylistByUserId,queryFn:async()=>{const e=await j(await s);return e.data?(n(d=>({...d,householdListId:e.data?e.data.id:null})),e.data):null},enabled:!!s,staleTime:g}]}),a=E({queries:[{queryKey:y.categories,queryFn:async()=>{const e=await G(await s);return e.data?e.data:null},enabled:!!s,staleTime:g},{queryKey:y.ingredients,queryFn:async()=>{const e=await _(await s);return e.data?e.data:null},enabled:!!s,staleTime:g},{queryKey:y.latestGrocerylistByHouseholdId,queryFn:async()=>{const e=await K(await s);return e.data?e.data:null},enabled:!!s&&!!u.householdListId,staleTime:g},{queryKey:y.currentUserHouseholdDetails,queryFn:async()=>{const e=await X(await s);return e.data?e.data:null},enabled:!!s,staleTime:g}]});return{currentUser:r[0].data,categories:a[0].data,ingredients:a[2].data,myList:r[1].data,myHouseholdList:a[2].data,household:a[3].data,isLoading:r.some(e=>e.isLoading),isFetching:r.some(e=>e.isFetching),isError:r.some(e=>e.isError),isAbsent:r.some(e=>!e.data)}}export{X as g,ie as u};