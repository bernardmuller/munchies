import{useQueryClient as s,useQuery as o}from"@tanstack/react-query";import{k as t,O as c}from"./getAllCategories-f73zdoR0.js";import{useAuth as i}from"@clerk/tanstack-start";import{g as u}from"./getCurrentLoggedInUser-BSklaDhP.js";function d(){const{getToken:a}=i(),r=a({template:"1_HOUR"}).then(e=>e?.toString()),n=s();return{...o({queryKey:t.currentUser,queryFn:async()=>{const e=await u(await r);return e.data?e.data:null},enabled:!!r,staleTime:c}),prefetch:async()=>{if(r)return await n.cancelQueries(t.currentUser),await n.prefetchQuery({queryKey:t.currentUser,queryFn:async()=>{const e=await u(await r);return e.data?e.data:null}})}}}export{d as u};
