import{c as nt,d as Pe,u as L}from"./button-D2Gc-Tkd.js";import{r as s,j as g,m as rt,p as ot,q as at}from"./client-oEds41LK.js";import{R as st,L as it,n as ct}from"./getAllCategories-BHeGl718.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=nt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function T(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e?.(o),n===!1||!o.defaultPrevented)return t?.(o)}}function ut(e,t){const n=s.createContext(t),r=a=>{const{children:c,...i}=a,f=s.useMemo(()=>i,Object.values(i));return g.jsx(n.Provider,{value:f,children:c})};r.displayName=e+"Provider";function o(a){const c=s.useContext(n);if(c)return c;if(t!==void 0)return t;throw new Error(`\`${a}\` must be used within \`${e}\``)}return[r,o]}function lt(e,t=[]){let n=[];function r(a,c){const i=s.createContext(c),f=n.length;n=[...n,c];const l=d=>{const{scope:h,children:p,...w}=d,u=h?.[e]?.[f]||i,m=s.useMemo(()=>w,Object.values(w));return g.jsx(u.Provider,{value:m,children:p})};l.displayName=a+"Provider";function v(d,h){const p=h?.[e]?.[f]||i,w=s.useContext(p);if(w)return w;if(c!==void 0)return c;throw new Error(`\`${d}\` must be used within \`${a}\``)}return[l,v]}const o=()=>{const a=n.map(c=>s.createContext(c));return function(i){const f=i?.[e]||a;return s.useMemo(()=>({[`__scope${e}`]:{...i,[e]:f}}),[i,f])}};return o.scopeName=e,[r,dt(o,...t)]}function dt(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const c=r.reduce((i,{useScope:f,scopeName:l})=>{const d=f(a)[`__scope${l}`];return{...i,...d}},{});return s.useMemo(()=>({[`__scope${t.scopeName}`]:c}),[c])}};return n.scopeName=t.scopeName,n}function M(e){const t=s.useRef(e);return s.useEffect(()=>{t.current=e}),s.useMemo(()=>(...n)=>t.current?.(...n),[])}function ft({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,o]=vt({defaultProp:t,onChange:n}),a=e!==void 0,c=a?e:r,i=M(n),f=s.useCallback(l=>{if(a){const d=typeof l=="function"?l(e):l;d!==e&&i(d)}else o(l)},[a,e,o,i]);return[c,f]}function vt({defaultProp:e,onChange:t}){const n=s.useState(e),[r]=n,o=s.useRef(r),a=M(t);return s.useEffect(()=>{o.current!==r&&(a(r),o.current=r)},[r,o,a]),n}var ht=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],N=ht.reduce((e,t)=>{const n=s.forwardRef((r,o)=>{const{asChild:a,...c}=r,i=a?Pe:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),g.jsx(i,{...c,ref:o})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function mt(e,t){e&&rt.flushSync(()=>e.dispatchEvent(t))}function pt(e,t=globalThis?.document){const n=M(e);s.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var gt="DismissableLayer",se="dismissableLayer.update",yt="dismissableLayer.pointerDownOutside",Et="dismissableLayer.focusOutside",fe,Re=s.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),xe=s.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:c,onDismiss:i,...f}=e,l=s.useContext(Re),[v,d]=s.useState(null),h=v?.ownerDocument??globalThis?.document,[,p]=s.useState({}),w=L(t,E=>d(E)),u=Array.from(l.layers),[m]=[...l.layersWithOutsidePointerEventsDisabled].slice(-1),y=u.indexOf(m),P=v?u.indexOf(v):-1,b=l.layersWithOutsidePointerEventsDisabled.size>0,C=P>=y,S=wt(E=>{const O=E.target,j=[...l.branches].some(q=>q.contains(O));!C||j||(o?.(E),c?.(E),E.defaultPrevented||i?.())},h),D=St(E=>{const O=E.target;[...l.branches].some(q=>q.contains(O))||(a?.(E),c?.(E),E.defaultPrevented||i?.())},h);return pt(E=>{P===l.layers.size-1&&(r?.(E),!E.defaultPrevented&&i&&(E.preventDefault(),i()))},h),s.useEffect(()=>{if(v)return n&&(l.layersWithOutsidePointerEventsDisabled.size===0&&(fe=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),l.layersWithOutsidePointerEventsDisabled.add(v)),l.layers.add(v),ve(),()=>{n&&l.layersWithOutsidePointerEventsDisabled.size===1&&(h.body.style.pointerEvents=fe)}},[v,h,n,l]),s.useEffect(()=>()=>{v&&(l.layers.delete(v),l.layersWithOutsidePointerEventsDisabled.delete(v),ve())},[v,l]),s.useEffect(()=>{const E=()=>p({});return document.addEventListener(se,E),()=>document.removeEventListener(se,E)},[]),g.jsx(N.div,{...f,ref:w,style:{pointerEvents:b?C?"auto":"none":void 0,...e.style},onFocusCapture:T(e.onFocusCapture,D.onFocusCapture),onBlurCapture:T(e.onBlurCapture,D.onBlurCapture),onPointerDownCapture:T(e.onPointerDownCapture,S.onPointerDownCapture)})});xe.displayName=gt;var bt="DismissableLayerBranch",Ct=s.forwardRef((e,t)=>{const n=s.useContext(Re),r=s.useRef(null),o=L(t,r);return s.useEffect(()=>{const a=r.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),g.jsx(N.div,{...e,ref:o})});Ct.displayName=bt;function wt(e,t=globalThis?.document){const n=M(e),r=s.useRef(!1),o=s.useRef(()=>{});return s.useEffect(()=>{const a=i=>{if(i.target&&!r.current){let f=function(){De(yt,n,l,{discrete:!0})};const l={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=f,t.addEventListener("click",o.current,{once:!0})):f()}else t.removeEventListener("click",o.current);r.current=!1},c=window.setTimeout(()=>{t.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(c),t.removeEventListener("pointerdown",a),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function St(e,t=globalThis?.document){const n=M(e),r=s.useRef(!1);return s.useEffect(()=>{const o=a=>{a.target&&!r.current&&De(Et,n,{originalEvent:a},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function ve(){const e=new CustomEvent(se);document.dispatchEvent(e)}function De(e,t,n,{discrete:r}){const o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?mt(o,a):o.dispatchEvent(a)}var Q=0;function Pt(){s.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??he()),document.body.insertAdjacentElement("beforeend",e[1]??he()),Q++,()=>{Q===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),Q--}},[])}function he(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var J="focusScope.autoFocusOnMount",ee="focusScope.autoFocusOnUnmount",me={bubbles:!1,cancelable:!0},Rt="FocusScope",Oe=s.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:a,...c}=e,[i,f]=s.useState(null),l=M(o),v=M(a),d=s.useRef(null),h=L(t,u=>f(u)),p=s.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;s.useEffect(()=>{if(r){let u=function(b){if(p.paused||!i)return;const C=b.target;i.contains(C)?d.current=C:A(d.current,{select:!0})},m=function(b){if(p.paused||!i)return;const C=b.relatedTarget;C!==null&&(i.contains(C)||A(d.current,{select:!0}))},y=function(b){if(document.activeElement===document.body)for(const S of b)S.removedNodes.length>0&&A(i)};document.addEventListener("focusin",u),document.addEventListener("focusout",m);const P=new MutationObserver(y);return i&&P.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",u),document.removeEventListener("focusout",m),P.disconnect()}}},[r,i,p.paused]),s.useEffect(()=>{if(i){ge.add(p);const u=document.activeElement;if(!i.contains(u)){const y=new CustomEvent(J,me);i.addEventListener(J,l),i.dispatchEvent(y),y.defaultPrevented||(xt(Tt(Ne(i)),{select:!0}),document.activeElement===u&&A(i))}return()=>{i.removeEventListener(J,l),setTimeout(()=>{const y=new CustomEvent(ee,me);i.addEventListener(ee,v),i.dispatchEvent(y),y.defaultPrevented||A(u??document.body,{select:!0}),i.removeEventListener(ee,v),ge.remove(p)},0)}}},[i,l,v,p]);const w=s.useCallback(u=>{if(!n&&!r||p.paused)return;const m=u.key==="Tab"&&!u.altKey&&!u.ctrlKey&&!u.metaKey,y=document.activeElement;if(m&&y){const P=u.currentTarget,[b,C]=Dt(P);b&&C?!u.shiftKey&&y===C?(u.preventDefault(),n&&A(b,{select:!0})):u.shiftKey&&y===b&&(u.preventDefault(),n&&A(C,{select:!0})):y===P&&u.preventDefault()}},[n,r,p.paused]);return g.jsx(N.div,{tabIndex:-1,...c,ref:h,onKeyDown:w})});Oe.displayName=Rt;function xt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(A(r,{select:t}),document.activeElement!==n)return}function Dt(e){const t=Ne(e),n=pe(t,e),r=pe(t.reverse(),e);return[n,r]}function Ne(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function pe(e,t){for(const n of e)if(!Ot(n,{upTo:t}))return n}function Ot(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Nt(e){return e instanceof HTMLInputElement&&"select"in e}function A(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&Nt(e)&&t&&e.select()}}var ge=At();function At(){let e=[];return{add(t){const n=e[0];t!==n&&n?.pause(),e=ye(e,t),e.unshift(t)},remove(t){e=ye(e,t),e[0]?.resume()}}}function ye(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Tt(e){return e.filter(t=>t.tagName!=="A")}var X=globalThis?.document?s.useLayoutEffect:()=>{},Mt=ot.useId||(()=>{}),It=0;function te(e){const[t,n]=s.useState(Mt());return X(()=>{e||n(r=>r??String(It++))},[e]),e||(t?`radix-${t}`:"")}var Lt="Portal",Ae=s.forwardRef((e,t)=>{const{container:n,...r}=e,[o,a]=s.useState(!1);X(()=>a(!0),[]);const c=n||o&&globalThis?.document?.body;return c?at.createPortal(g.jsx(N.div,{...r,ref:t}),c):null});Ae.displayName=Lt;function Ft(e,t){return s.useReducer((n,r)=>t[n][r]??n,e)}var z=e=>{const{present:t,children:n}=e,r=_t(t),o=typeof n=="function"?n({present:r.isPresent}):s.Children.only(n),a=L(r.ref,kt(o));return typeof n=="function"||r.isPresent?s.cloneElement(o,{ref:a}):null};z.displayName="Presence";function _t(e){const[t,n]=s.useState(),r=s.useRef({}),o=s.useRef(e),a=s.useRef("none"),c=e?"mounted":"unmounted",[i,f]=Ft(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return s.useEffect(()=>{const l=B(r.current);a.current=i==="mounted"?l:"none"},[i]),X(()=>{const l=r.current,v=o.current;if(v!==e){const h=a.current,p=B(l);e?f("MOUNT"):p==="none"||l?.display==="none"?f("UNMOUNT"):f(v&&h!==p?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,f]),X(()=>{if(t){let l;const v=t.ownerDocument.defaultView??window,d=p=>{const u=B(r.current).includes(p.animationName);if(p.target===t&&u&&(f("ANIMATION_END"),!o.current)){const m=t.style.animationFillMode;t.style.animationFillMode="forwards",l=v.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=m)})}},h=p=>{p.target===t&&(a.current=B(r.current))};return t.addEventListener("animationstart",h),t.addEventListener("animationcancel",d),t.addEventListener("animationend",d),()=>{v.clearTimeout(l),t.removeEventListener("animationstart",h),t.removeEventListener("animationcancel",d),t.removeEventListener("animationend",d)}}else f("ANIMATION_END")},[t,f]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:s.useCallback(l=>{l&&(r.current=getComputedStyle(l)),n(l)},[])}}function B(e){return e?.animationName||"none"}function kt(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Wt=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},F=new WeakMap,U=new WeakMap,$={},ne=0,Te=function(e){return e&&(e.host||Te(e.parentNode))},jt=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Te(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},Bt=function(e,t,n,r){var o=jt(t,Array.isArray(e)?e:[e]);$[n]||($[n]=new WeakMap);var a=$[n],c=[],i=new Set,f=new Set(o),l=function(d){!d||i.has(d)||(i.add(d),l(d.parentNode))};o.forEach(l);var v=function(d){!d||f.has(d)||Array.prototype.forEach.call(d.children,function(h){if(i.has(h))v(h);else try{var p=h.getAttribute(r),w=p!==null&&p!=="false",u=(F.get(h)||0)+1,m=(a.get(h)||0)+1;F.set(h,u),a.set(h,m),c.push(h),u===1&&w&&U.set(h,!0),m===1&&h.setAttribute(n,"true"),w||h.setAttribute(r,"true")}catch(y){console.error("aria-hidden: cannot operate on ",h,y)}})};return v(t),i.clear(),ne++,function(){c.forEach(function(d){var h=F.get(d)-1,p=a.get(d)-1;F.set(d,h),a.set(d,p),h||(U.has(d)||d.removeAttribute(r),U.delete(d)),p||d.removeAttribute(n)}),ne--,ne||(F=new WeakMap,F=new WeakMap,U=new WeakMap,$={})}},Ut=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=Wt(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live]"))),Bt(r,o,n,"aria-hidden")):function(){return null}},x=function(){return x=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},x.apply(this,arguments)};function Me(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function $t(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var K="right-scroll-bar-position",V="width-before-scroll-bar",Gt="with-scroll-bars-hidden",Ht="--removed-body-scroll-bar-size";function re(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Kt(e,t){var n=s.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var o=n.value;o!==r&&(n.value=r,n.callback(r,o))}}}})[0];return n.callback=t,n.facade}var Vt=typeof window<"u"?s.useLayoutEffect:s.useEffect,Ee=new WeakMap;function Xt(e,t){var n=Kt(null,function(r){return e.forEach(function(o){return re(o,r)})});return Vt(function(){var r=Ee.get(n);if(r){var o=new Set(r),a=new Set(e),c=n.current;o.forEach(function(i){a.has(i)||re(i,null)}),a.forEach(function(i){o.has(i)||re(i,c)})}Ee.set(n,e)},[e]),n}function Yt(e){return e}function zt(e,t){t===void 0&&(t=Yt);var n=[],r=!1,o={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(a){var c=t(a,r);return n.push(c),function(){n=n.filter(function(i){return i!==c})}},assignSyncMedium:function(a){for(r=!0;n.length;){var c=n;n=[],c.forEach(a)}n={push:function(i){return a(i)},filter:function(){return n}}},assignMedium:function(a){r=!0;var c=[];if(n.length){var i=n;n=[],i.forEach(a),c=n}var f=function(){var v=c;c=[],v.forEach(a)},l=function(){return Promise.resolve().then(f)};l(),n={push:function(v){c.push(v),l()},filter:function(v){return c=c.filter(v),n}}}};return o}function Zt(e){e===void 0&&(e={});var t=zt(null);return t.options=x({async:!0,ssr:!1},e),t}var Ie=function(e){var t=e.sideCar,n=Me(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return s.createElement(r,x({},n))};Ie.isSideCarExport=!0;function qt(e,t){return e.useMedium(t),Ie}var Le=Zt(),oe=function(){},Z=s.forwardRef(function(e,t){var n=s.useRef(null),r=s.useState({onScrollCapture:oe,onWheelCapture:oe,onTouchMoveCapture:oe}),o=r[0],a=r[1],c=e.forwardProps,i=e.children,f=e.className,l=e.removeScrollBar,v=e.enabled,d=e.shards,h=e.sideCar,p=e.noIsolation,w=e.inert,u=e.allowPinchZoom,m=e.as,y=m===void 0?"div":m,P=e.gapMode,b=Me(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),C=h,S=Xt([n,t]),D=x(x({},b),o);return s.createElement(s.Fragment,null,v&&s.createElement(C,{sideCar:Le,removeScrollBar:l,shards:d,noIsolation:p,inert:w,setCallbacks:a,allowPinchZoom:!!u,lockRef:n,gapMode:P}),c?s.cloneElement(s.Children.only(i),x(x({},D),{ref:S})):s.createElement(y,x({},D,{className:f,ref:S}),i))});Z.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Z.classNames={fullWidth:V,zeroRight:K};var Qt=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Jt(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Qt();return t&&e.setAttribute("nonce",t),e}function en(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function tn(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var nn=function(){var e=0,t=null;return{add:function(n){e==0&&(t=Jt())&&(en(t,n),tn(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},rn=function(){var e=nn();return function(t,n){s.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Fe=function(){var e=rn(),t=function(n){var r=n.styles,o=n.dynamic;return e(r,o),null};return t},on={left:0,top:0,right:0,gap:0},ae=function(e){return parseInt(e||"",10)||0},an=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[ae(n),ae(r),ae(o)]},sn=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return on;var t=an(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},cn=Fe(),W="data-scroll-locked",un=function(e,t,n,r){var o=e.left,a=e.top,c=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(Gt,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(W,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(c,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(K,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(V,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(K," .").concat(K,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(V," .").concat(V,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(W,`] {
    `).concat(Ht,": ").concat(i,`px;
  }
`)},be=function(){var e=parseInt(document.body.getAttribute(W)||"0",10);return isFinite(e)?e:0},ln=function(){s.useEffect(function(){return document.body.setAttribute(W,(be()+1).toString()),function(){var e=be()-1;e<=0?document.body.removeAttribute(W):document.body.setAttribute(W,e.toString())}},[])},dn=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=r===void 0?"margin":r;ln();var a=s.useMemo(function(){return sn(o)},[o]);return s.createElement(cn,{styles:un(a,!t,o,n?"":"!important")})},ie=!1;if(typeof window<"u")try{var G=Object.defineProperty({},"passive",{get:function(){return ie=!0,!0}});window.addEventListener("test",G,G),window.removeEventListener("test",G,G)}catch{ie=!1}var _=ie?{passive:!1}:!1,fn=function(e){return e.tagName==="TEXTAREA"},_e=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!fn(e)&&n[t]==="visible")},vn=function(e){return _e(e,"overflowY")},hn=function(e){return _e(e,"overflowX")},Ce=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var o=ke(e,r);if(o){var a=We(e,r),c=a[1],i=a[2];if(c>i)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},mn=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},pn=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},ke=function(e,t){return e==="v"?vn(t):hn(t)},We=function(e,t){return e==="v"?mn(t):pn(t)},gn=function(e,t){return e==="h"&&t==="rtl"?-1:1},yn=function(e,t,n,r,o){var a=gn(e,window.getComputedStyle(t).direction),c=a*r,i=n.target,f=t.contains(i),l=!1,v=c>0,d=0,h=0;do{var p=We(e,i),w=p[0],u=p[1],m=p[2],y=u-m-a*w;(w||y)&&ke(e,i)&&(d+=y,h+=w),i instanceof ShadowRoot?i=i.host:i=i.parentNode}while(!f&&i!==document.body||f&&(t.contains(i)||t===i));return(v&&(Math.abs(d)<1||!o)||!v&&(Math.abs(h)<1||!o))&&(l=!0),l},H=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},we=function(e){return[e.deltaX,e.deltaY]},Se=function(e){return e&&"current"in e?e.current:e},En=function(e,t){return e[0]===t[0]&&e[1]===t[1]},bn=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Cn=0,k=[];function wn(e){var t=s.useRef([]),n=s.useRef([0,0]),r=s.useRef(),o=s.useState(Cn++)[0],a=s.useState(Fe)[0],c=s.useRef(e);s.useEffect(function(){c.current=e},[e]),s.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var u=$t([e.lockRef.current],(e.shards||[]).map(Se),!0).filter(Boolean);return u.forEach(function(m){return m.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),u.forEach(function(m){return m.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var i=s.useCallback(function(u,m){if("touches"in u&&u.touches.length===2||u.type==="wheel"&&u.ctrlKey)return!c.current.allowPinchZoom;var y=H(u),P=n.current,b="deltaX"in u?u.deltaX:P[0]-y[0],C="deltaY"in u?u.deltaY:P[1]-y[1],S,D=u.target,E=Math.abs(b)>Math.abs(C)?"h":"v";if("touches"in u&&E==="h"&&D.type==="range")return!1;var O=Ce(E,D);if(!O)return!0;if(O?S=E:(S=E==="v"?"h":"v",O=Ce(E,D)),!O)return!1;if(!r.current&&"changedTouches"in u&&(b||C)&&(r.current=S),!S)return!0;var j=r.current||S;return yn(j,m,u,j==="h"?b:C,!0)},[]),f=s.useCallback(function(u){var m=u;if(!(!k.length||k[k.length-1]!==a)){var y="deltaY"in m?we(m):H(m),P=t.current.filter(function(S){return S.name===m.type&&(S.target===m.target||m.target===S.shadowParent)&&En(S.delta,y)})[0];if(P&&P.should){m.cancelable&&m.preventDefault();return}if(!P){var b=(c.current.shards||[]).map(Se).filter(Boolean).filter(function(S){return S.contains(m.target)}),C=b.length>0?i(m,b[0]):!c.current.noIsolation;C&&m.cancelable&&m.preventDefault()}}},[]),l=s.useCallback(function(u,m,y,P){var b={name:u,delta:m,target:y,should:P,shadowParent:Sn(y)};t.current.push(b),setTimeout(function(){t.current=t.current.filter(function(C){return C!==b})},1)},[]),v=s.useCallback(function(u){n.current=H(u),r.current=void 0},[]),d=s.useCallback(function(u){l(u.type,we(u),u.target,i(u,e.lockRef.current))},[]),h=s.useCallback(function(u){l(u.type,H(u),u.target,i(u,e.lockRef.current))},[]);s.useEffect(function(){return k.push(a),e.setCallbacks({onScrollCapture:d,onWheelCapture:d,onTouchMoveCapture:h}),document.addEventListener("wheel",f,_),document.addEventListener("touchmove",f,_),document.addEventListener("touchstart",v,_),function(){k=k.filter(function(u){return u!==a}),document.removeEventListener("wheel",f,_),document.removeEventListener("touchmove",f,_),document.removeEventListener("touchstart",v,_)}},[]);var p=e.removeScrollBar,w=e.inert;return s.createElement(s.Fragment,null,w?s.createElement(a,{styles:bn(o)}):null,p?s.createElement(dn,{gapMode:e.gapMode}):null)}function Sn(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const Pn=qt(Le,wn);var je=s.forwardRef(function(e,t){return s.createElement(Z,x({},e,{ref:t,sideCar:Pn}))});je.classNames=Z.classNames;var ce="Dialog",[Be,Wn]=lt(ce),[Rn,R]=Be(ce),Ue=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:a,modal:c=!0}=e,i=s.useRef(null),f=s.useRef(null),[l=!1,v]=ft({prop:r,defaultProp:o,onChange:a});return g.jsx(Rn,{scope:t,triggerRef:i,contentRef:f,contentId:te(),titleId:te(),descriptionId:te(),open:l,onOpenChange:v,onOpenToggle:s.useCallback(()=>v(d=>!d),[v]),modal:c,children:n})};Ue.displayName=ce;var $e="DialogTrigger",Ge=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=R($e,n),a=L(t,o.triggerRef);return g.jsx(N.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":de(o.open),...r,ref:a,onClick:T(e.onClick,o.onOpenToggle)})});Ge.displayName=$e;var ue="DialogPortal",[xn,He]=Be(ue,{forceMount:void 0}),Ke=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,a=R(ue,t);return g.jsx(xn,{scope:t,forceMount:n,children:s.Children.map(r,c=>g.jsx(z,{present:n||a.open,children:g.jsx(Ae,{asChild:!0,container:o,children:c})}))})};Ke.displayName=ue;var Y="DialogOverlay",Ve=s.forwardRef((e,t)=>{const n=He(Y,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=R(Y,e.__scopeDialog);return a.modal?g.jsx(z,{present:r||a.open,children:g.jsx(Dn,{...o,ref:t})}):null});Ve.displayName=Y;var Dn=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=R(Y,n);return g.jsx(je,{as:Pe,allowPinchZoom:!0,shards:[o.contentRef],children:g.jsx(N.div,{"data-state":de(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),I="DialogContent",Xe=s.forwardRef((e,t)=>{const n=He(I,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=R(I,e.__scopeDialog);return g.jsx(z,{present:r||a.open,children:a.modal?g.jsx(On,{...o,ref:t}):g.jsx(Nn,{...o,ref:t})})});Xe.displayName=I;var On=s.forwardRef((e,t)=>{const n=R(I,e.__scopeDialog),r=s.useRef(null),o=L(t,n.contentRef,r);return s.useEffect(()=>{const a=r.current;if(a)return Ut(a)},[]),g.jsx(Ye,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:T(e.onCloseAutoFocus,a=>{a.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:T(e.onPointerDownOutside,a=>{const c=a.detail.originalEvent,i=c.button===0&&c.ctrlKey===!0;(c.button===2||i)&&a.preventDefault()}),onFocusOutside:T(e.onFocusOutside,a=>a.preventDefault())})}),Nn=s.forwardRef((e,t)=>{const n=R(I,e.__scopeDialog),r=s.useRef(!1),o=s.useRef(!1);return g.jsx(Ye,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{e.onCloseAutoFocus?.(a),a.defaultPrevented||(r.current||n.triggerRef.current?.focus(),a.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:a=>{e.onInteractOutside?.(a),a.defaultPrevented||(r.current=!0,a.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const c=a.target;n.triggerRef.current?.contains(c)&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&o.current&&a.preventDefault()}})}),Ye=s.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:a,...c}=e,i=R(I,n),f=s.useRef(null),l=L(t,f);return Pt(),g.jsxs(g.Fragment,{children:[g.jsx(Oe,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:a,children:g.jsx(xe,{role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":de(i.open),...c,ref:l,onDismiss:()=>i.onOpenChange(!1)})}),g.jsxs(g.Fragment,{children:[g.jsx(An,{titleId:i.titleId}),g.jsx(Mn,{contentRef:f,descriptionId:i.descriptionId})]})]})}),le="DialogTitle",ze=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=R(le,n);return g.jsx(N.h2,{id:o.titleId,...r,ref:t})});ze.displayName=le;var Ze="DialogDescription",qe=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=R(Ze,n);return g.jsx(N.p,{id:o.descriptionId,...r,ref:t})});qe.displayName=Ze;var Qe="DialogClose",Je=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=R(Qe,n);return g.jsx(N.button,{type:"button",...r,ref:t,onClick:T(e.onClick,()=>o.onOpenChange(!1))})});Je.displayName=Qe;function de(e){return e?"open":"closed"}var et="DialogTitleWarning",[jn,tt]=ut(et,{contentName:I,titleName:le,docsSlug:"dialog"}),An=({titleId:e})=>{const t=tt(et),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return s.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Tn="DialogDescriptionWarning",Mn=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${tt(Tn).contentName}}.`;return s.useEffect(()=>{const o=e.current?.getAttribute("aria-describedby");t&&o&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},Bn=Ue,Un=Ge,$n=Ke,Gn=Ve,Hn=Xe,Kn=ze,Vn=qe,Xn=Je,Yn=class extends st{#t;#e;#r;constructor(e){super(),this.mutationId=e.mutationId,this.#e=e.mutationCache,this.#t=[],this.state=e.state||In(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){this.#t.includes(e)||(this.#t.push(e),this.clearGcTimeout(),this.#e.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.#t=this.#t.filter(t=>t!==e),this.scheduleGc(),this.#e.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.#t.length||(this.state.status==="pending"?this.scheduleGc():this.#e.remove(this))}continue(){return this.#r?.continue()??this.execute(this.state.variables)}async execute(e){this.#r=it({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(new Error("No mutationFn found")),onFail:(r,o)=>{this.#n({type:"failed",failureCount:r,error:o})},onPause:()=>{this.#n({type:"pause"})},onContinue:()=>{this.#n({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#e.canRun(this)});const t=this.state.status==="pending",n=!this.#r.canStart();try{if(!t){this.#n({type:"pending",variables:e,isPaused:n}),await this.#e.config.onMutate?.(e,this);const o=await this.options.onMutate?.(e);o!==this.state.context&&this.#n({type:"pending",context:o,variables:e,isPaused:n})}const r=await this.#r.start();return await this.#e.config.onSuccess?.(r,e,this.state.context,this),await this.options.onSuccess?.(r,e,this.state.context),await this.#e.config.onSettled?.(r,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(r,null,e,this.state.context),this.#n({type:"success",data:r}),r}catch(r){try{throw await this.#e.config.onError?.(r,e,this.state.context,this),await this.options.onError?.(r,e,this.state.context),await this.#e.config.onSettled?.(void 0,r,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,r,e,this.state.context),r}finally{this.#n({type:"error",error:r})}}finally{this.#e.runNext(this)}}#n(e){const t=n=>{switch(e.type){case"failed":return{...n,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...n,isPaused:!0};case"continue":return{...n,isPaused:!1};case"pending":return{...n,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:"pending",variables:e.variables,submittedAt:Date.now()};case"success":return{...n,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...n,data:void 0,error:e.error,failureCount:n.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"}}};this.state=t(this.state),ct.batch(()=>{this.#t.forEach(n=>{n.onMutationUpdate(e)}),this.#e.notify({mutation:this,type:"updated",action:e})})}};function In(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}export{Hn as C,Vn as D,Oe as F,Yn as M,Gn as O,$n as P,Bn as R,Kn as T,kn as X,Xn as a,Un as b,N as c,lt as d,T as e,z as f,xe as g,ft as h,X as i,M as j,Ut as k,Pt as l,je as m,mt as n,Ae as o,In as p,te as u};