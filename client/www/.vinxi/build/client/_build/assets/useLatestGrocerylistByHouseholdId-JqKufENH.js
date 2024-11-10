import{c as a}from"./button-D2Gc-Tkd.js";import{t as o,k as n,O as y}from"./getAllCategories-BHeGl718.js";import{g as i,a as l}from"./getLatestGrocerylistByHouseholdId-Dk3ckNDT.js";import{u}from"./client-oEds41LK.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a("FilterX",[["path",{d:"M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055",key:"1fi1da"}],["path",{d:"m22 3-5 5",key:"12jva0"}],["path",{d:"m17 3 5 5",key:"k36vhe"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);function h({initialData:t}){const{getToken:r}=u(),s=r({template:"1_HOUR"}).then(e=>e?.toString());return o({queryKey:n.latestGrocerylistByUserId,queryFn:async()=>{const e=await i(await s);return e.data?e.data:t},initialData:t,enabled:!!s,staleTime:y})}function g({initialData:t}){const{getToken:r}=u(),s=r({template:"1_HOUR"}).then(e=>e?.toString());return o({queryKey:n.latestGrocerylistByHouseholdId,queryFn:async()=>{const e=await l(await s);return e.data?e.data:t},initialData:t,enabled:!!s,staleTime:y})}export{f as F,g as a,k as b,h as u};
