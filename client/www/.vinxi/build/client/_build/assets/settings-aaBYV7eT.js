import{k as i,j as e,L as o,g as c,h}from"./client-oEds41LK.js";import{c as a}from"./utils-B7BGwIMI.js";import{b as x,B as m}from"./button-D2Gc-Tkd.js";import{U as d}from"./user-_ufPmFvn.js";import{H as f}from"./house-DsxACciB.js";function g({className:l,items:t,...r}){const n=i();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"hidden md:flex flex-col items-between md:min-h-[50vh] h-[50vh]",children:[e.jsx("nav",{className:a("hidden md:flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:items-between lg:h-full",l),...r,children:e.jsx("div",{className:"flex flex-col gap-1",children:t.map(s=>e.jsxs(o,{href:s.href,className:a(x({variant:"ghost"}),n.basepath===s.href?"bg-muted hover:bg-muted":"hover:bg-transparent hover:underline","justify-start px-2 flex gap-2"),children:[s.icon,s.title]},s.href))})}),e.jsx(m,{className:"w-full h-8",variant:"destructive",children:e.jsx(c,{})})]})})}const p=[{title:"My Profile",href:"/settings/profile",icon:e.jsx(d,{className:"h-5 w-5"})},{title:"My Household",href:"/settings/household",icon:e.jsx(f,{className:"h-5 w-5"})}],w=()=>e.jsxs("div",{className:"flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 min-h-[50vh]",children:[e.jsx("aside",{className:"lg:w-1/5",children:e.jsx(g,{items:p})}),e.jsx("div",{className:"flex-1",children:e.jsx(h,{})})]});export{w as component};
