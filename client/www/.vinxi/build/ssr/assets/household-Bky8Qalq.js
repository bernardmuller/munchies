import{jsx as e,jsxs as a}from"react/jsx-runtime";import*as m from"react";import{useState as H,useCallback as q}from"react";import{B as l}from"./button-DZIqpug3.js";import{D as C,a as D,b as k,c as T,d as I,I as S,f as w}from"./input-DPMfAGGT.js";import*as u from"@radix-ui/react-avatar";import{c as h}from"./utils-bhneXptQ.js";import{Home as _,UserPlus as b,LogOut as x,Clipboard as J}from"lucide-react";import{useQuery as M,useQueryClient as f,useMutation as y}from"@tanstack/react-query";import{g as B,u as Q}from"./useAppData-BtM9UegS.js";import{k as c,O as K,h as g,a as v}from"./getAllCategories-f73zdoR0.js";import{useAuth as p}from"@clerk/tanstack-start";import{z as d}from"zod";import*as R from"@radix-ui/react-label";import{cva as E}from"class-variance-authority";import{useForm as G}from"react-hook-form";import"@radix-ui/react-slot";import"@radix-ui/react-dialog";import"clsx";import"tailwind-merge";import"./getCurrentLoggedInUser-BSklaDhP.js";import"./getAllIngredients-6sXcg4a7.js";import"./getLatestGrocerylistByHouseholdId-edhHmGoA.js";import"axios";const j=m.forwardRef(({className:o,...t},s)=>e(u.Root,{ref:s,className:h("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",o),...t}));j.displayName=u.Root.displayName;const Y=m.forwardRef(({className:o,...t},s)=>e(u.Image,{ref:s,className:h("aspect-square h-full w-full",o),...t}));Y.displayName=u.Image.displayName;const A=m.forwardRef(({className:o,...t},s)=>e(u.Fallback,{ref:s,className:h("flex h-full w-full items-center justify-center rounded-full bg-muted",o),...t}));A.displayName=u.Fallback.displayName;function z(){const{getToken:o}=p(),t=o({template:"1_HOUR"}).then(s=>s?.toString());return M({queryKey:c.currentUserHouseholdDetails,queryFn:async()=>{const s=await B(await t);return s.data?s.data:null},enabled:!!t,staleTime:K})}d.object({householdId:d.string()});async function V({householdId:o,accessToken:t}){return await g(v.joinHousehold(),"POST",{householdId:o},{accessToken:t})}function W(){const o=f(),{getToken:t}=p();return y({mutationKey:["join-household"],mutationFn:async({householdId:s})=>{const r=await t({template:"1_HOUR"}).then(n=>n?.toString());return V({householdId:s,accessToken:r})},onSuccess:()=>{o.invalidateQueries(c.currentUserHouseholdDetails)}})}async function X({accessToken:o}){return await g(v.leaveHousehold(),"POST",void 0,{accessToken:o})}function Z(){const o=f(),{getToken:t}=p();return y({mutationKey:["leave-household"],mutationFn:async()=>{const s=await t({template:"1_HOUR"}).then(r=>r?.toString());return X({accessToken:s})},onSuccess:()=>{o.invalidateQueries([...c.currentUserHouseholdDetails,...c.latestGrocerylistByUserId,...c.latestGrocerylistByHouseholdId])}})}d.object({id:d.string(),createdBy:d.string(),createdAt:d.string(),active:d.boolean()});async function $({accessToken:o}){return await g(v.households(),"POST",void 0,{accessToken:o})}function ee(){const o=f(),{getToken:t}=p();return y({mutationKey:["create-household"],mutationFn:async()=>{const s=await t({template:"1_HOUR"}).then(r=>r?.toString());return $({accessToken:s})},onSuccess:()=>{o.invalidateQueries(c.currentUserHouseholdDetails)}})}function oe(){const[o,t]=H(null),s=q(async r=>{if(!navigator?.clipboard)return console.warn("Clipboard not supported"),!1;try{return await navigator.clipboard.writeText(r),t(r),!0}catch(n){return console.warn("Copy failed",n),t(null),!1}},[]);return[o,s]}const te=E("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),L=m.forwardRef(({className:o,...t},s)=>e(R.Root,{ref:s,className:h(te(),o),...t}));L.displayName=R.Root.displayName;function se({trigger:o,onSubmit:t}){const{handleSubmit:s,register:r,formState:n}=G();return a(C,{children:[e(D,{asChild:!0,children:o}),a(k,{children:[e(T,{children:e(I,{children:"Join an Existing Household"})}),a("form",{onSubmit:s(t),className:"space-y-4",children:[a("div",{className:"space-y-2",children:[e(L,{htmlFor:"household-id",children:"Household ID"}),e(S,{id:"household-id",...r("householdId"),placeholder:"Enter household ID",required:!0}),n.errors.householdId&&e("p",{className:"text-sm text-red-500",children:"Please enter a valid Household ID"})]}),e(l,{type:"submit",className:"w-full",children:"Join Household"})]})]})]})}function ae(){const{data:o}=z(),t=ee(),s=W(),r=Z(),[n,U]=oe(),[O,N]=H(!1),F=async i=>{await s.mutateAsync({householdId:i.householdId})},P=async()=>{U(o.id).catch(i=>{console.error("Failed to copy!",i)}),N(!0),setTimeout(()=>N(!1),2e3)};return!o||!o?.id?a("div",{className:" mx-auto max-w-md",children:[e("h2",{className:"text-2xl font-bold text-center mb-1",children:"My Household"}),e("h4",{className:"text-md text-center mb-4 self-center px-4 text-gray-500",children:"Get started by creating a household or join an existing one. When part of a household you can share a grocery list with other members."}),a("div",{className:"space-y-4",children:[a(l,{className:"w-full",onClick:()=>t.mutateAsync(),isLoading:t.isPending,children:[e(_,{className:"mr-2 h-4 w-4"})," Create Household"]}),e(se,{trigger:a(l,{variant:"outline",className:"w-full",children:[e(b,{className:"mr-2 h-4 w-4"})," Join Household"]}),onSubmit:F})]})]}):e("div",{className:"bg-white p-4 md:p-0 rounded-lg md:rounded-0 mx-2 md:mx-0",children:a("div",{className:"space-y-6",children:[a("div",{className:"flex justify-between items-center",children:[e("h2",{className:"text-2xl font-bold",children:"My Household"}),a(C,{children:[e(D,{asChild:!0,children:a(l,{variant:"destructive",isLoading:r.isPending,children:[e(x,{className:"mr-2 h-4 w-4"})," Leave"]})}),a(k,{children:[e(T,{children:e(I,{children:"Leave Household"})}),a("div",{children:[e("div",{className:"mb-8",children:e("h2",{className:"text-sm mb-2",children:"Are you sure you want to leave your household?"})}),a("div",{className:"w-full flex justify-end gap-2 items-center",children:[e(w,{children:e(l,{variant:"outline",children:"No, Cancel"})}),e(w,{children:a(l,{variant:"destructive",onClick:()=>r.mutateAsync(),isLoading:r.isPending,children:[e(x,{className:"mr-2 h-4 w-4"})," Yes, Leave"]})})]})]})]})]})]}),a("div",{children:[e("h3",{className:"text-lg font-semibold mb-3",children:"Members"}),e("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:o.members.map(i=>a("div",{className:"flex items-center space-x-3 bg-gray-50 p-3 rounded-md",children:[e(j,{children:a(A,{children:[i.firstname[0],i.lastname[0]]})}),a("span",{className:"font-medium",children:[i.firstname," ",i.lastname]})]},i.id))})]}),a("div",{children:[e("h3",{className:"text-lg font-semibold mb-3",children:"Invite New Members"}),e("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:a("div",{className:"flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2",children:[e(S,{value:o.id,readOnly:!0,className:"flex-grow"}),a(l,{variant:"outline",onClick:P,children:[O?e(b,{className:"mr-2 h-4 w-4"}):e(J,{className:"mr-2 h-4 w-4"}),n?"Copied!":"Copy"]})]})}),e("p",{className:"text-sm text-muted-foreground mt-2",children:"Share this ID with others to invite them to your household."})]})]})})}const ke=()=>{const{isLoading:o}=Q();return o?e("div",{children:"Loading..."}):e(ae,{})};export{ke as component};