import{j as e}from"./client-oEds41LK.js";import{u as c}from"./useGetCurrentLoggedInUser-TD5-7DA1.js";import{u as m}from"./useAppData-ClLZv9oG.js";import"./getAllCategories-BHeGl718.js";import"./getCurrentLoggedInUser-DPzxe7eQ.js";import"./getAllIngredients-Bz8TcYMr.js";import"./getLatestGrocerylistByHouseholdId-Dk3ckNDT.js";function o(){const s=c();if(!s.data&&s.isFetching)return e.jsx("div",{children:"Loading..."});const{firstName:t,lastName:r,email:i,image:n,numberOfLists:l,numberOfItems:a}=s.data;return e.jsxs("div",{className:"min-h-[50vh] text-center ",children:[e.jsx("h2",{className:"text-2xl font-bold text-center mb-1",children:"My Profile"}),e.jsxs("div",{className:"space-y-4 p-4 w-full flex flex-col items-center",children:[e.jsx("div",{className:"relative",children:e.jsx("img",{src:n,alt:"profile-pic",className:"w-24 h-24 rounded-full object-cover bg-slate-100"})}),e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"",children:[e.jsxs("h1",{className:"text-2xl font-bold",children:[t," ",r]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:i})]})}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("span",{children:[e.jsx("strong",{children:l??0})," lists"]}),e.jsxs("span",{children:[e.jsx("strong",{children:a??0})," items"]})]}),e.jsx("div",{className:"space-y-2"})]})]})}const N=()=>{const{isLoading:s}=m();return s?e.jsx("div",{children:"Loading..."}):e.jsx(o,{})};export{N as component};
