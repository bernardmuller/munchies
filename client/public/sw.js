if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let a={};const o=e=>c(e,i),u={module:{uri:i},exports:a,require:o};s[i]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(t(...e),a)))}}define(["./workbox-25fbbd61"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"9de3efaa2e5bbeea9b45c42a2281b4dc"},{url:"/_next/static/chunks/110-c627c04910ccf1cc.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/154-7fb220e41849bbed.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/171-7f6c575714ca6e45.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/222-3d815ce8e88758dd.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/337-a9adb0c9c070aca9.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/356-0686a217a1dd7103.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/444-d1befa3053866a10.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/583-a4309105083564a0.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/593-905d52ee176d2c62.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/596-afe03e7458465854.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/631-1f07954309492958.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/663-0d7e3abd53f59027.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/685-955799e5fdf7f299.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/713-0c7dd7f020a68a78.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/805-53f117a68fa71336.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/812-32c2fa0cd03c7a51.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/874-e800f4eeb276b8ed.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/919-7b94a6314ea3d98f.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/934-4f1bb73680478b2f.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(public)/layout-b2afbcd7a661b6e7.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(public)/login/page-85a3292789e73101.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(public)/page-ab80ef97a4b3ec2f.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(public)/signup/page-2d752b0a32423c8c.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/home/page-d635de1dd3914ed8.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/ingredients/new/page-bfa643eac75e67d3.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/layout-670340d6cbc1a4ed.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/mealplans/new/page-4761c165e393a1f1.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/meals/%5BmealId%5D/page-ef4829ca60a731f5.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/meals/new/page-d1127a8d740f3ecd.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/settings/archives/ingredients/page-79beb7422be7f45c.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/settings/ingredients/page-b0df397c678f01aa.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/settings/layout-a178cddd01c9108c.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/settings/page-64ea0c846164e96f.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/settings/preferences/page-6f02378c5e566452.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/(secure)/settings/profile/page-3a4640324e41b9a0.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/app/layout-6ecd84137c24d183.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/fd9d1056-938fb1ef96aed193.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/main-a26976949c2d97d9.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/main-app-12de3a9050c0926c.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c5814dd8488f98c5.js",revision:"hYYomeqc4hQ0ToMjuYYsQ"},{url:"/_next/static/css/030222c8af2712ae.css",revision:"030222c8af2712ae"},{url:"/_next/static/hYYomeqc4hQ0ToMjuYYsQ/_buildManifest.js",revision:"9398e4c00894b940f12c9ee80d3484b4"},{url:"/_next/static/hYYomeqc4hQ0ToMjuYYsQ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/munchies_preview.5967649d.png",revision:"70c6d3c758fab5d0371f6bd7618ec979"},{url:"/icon-192x192.png",revision:"943bd17d28a8c785f556f84434dcd805"},{url:"/icon-256x256.png",revision:"7ded59959c44e38d37a5dc4313a1734b"},{url:"/icon-384x384.png",revision:"90dae70fa6057f0e5fcc3fa02189e7f5"},{url:"/icon-512x512.png",revision:"56234eaef4170a97c38c4b9952167012"},{url:"/manifest.json",revision:"754ea9239250a2bcc142b527f864d16f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
