if(!self.define){let e,i={};const s=(s,a)=>(s=new URL(s+".js",a).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const c=e=>s(e,t),o={module:{uri:t},exports:r,require:c};i[t]=Promise.all(a.map((e=>o[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/main-8422b6ba8d3f8298.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/pages/404-39fb50b315be612d.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/pages/500-681394b9fc0345f8.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/pages/_app-dfed2af2a9064e8d.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/pages/experience-e355bc6472d061ae.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/pages/index-4e75a5827f2bd780.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/chunks/webpack-f8187653f40ab7de.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/css/f333d9feedb0520d.css",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/d0Pfbr43pkbisEBsc4iaR/_buildManifest.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/d0Pfbr43pkbisEBsc4iaR/_middlewareManifest.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/d0Pfbr43pkbisEBsc4iaR/_ssgManifest.js",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-all-300-normal.87b78125.woff",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-all-400-normal.d51023e4.woff",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-all-500-normal.f489eb2e.woff",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-all-700-normal.976e78b3.woff",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-300-normal.57eb7fd8.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-400-normal.7f62091e.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-500-normal.087b35a9.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-700-normal.0e7076be.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-ext-300-normal.889a3aa7.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-ext-400-normal.c3f3489a.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-ext-500-normal.656144c8.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-latin-ext-700-normal.81cd45cb.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-thai-300-normal.117f1a07.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-thai-400-normal.c0a614be.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-thai-500-normal.19156914.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-thai-700-normal.1f0af9ee.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-vietnamese-300-normal.f9bc98f0.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-vietnamese-400-normal.a4d0f76f.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-vietnamese-500-normal.570d84d7.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/_next/static/media/mali-vietnamese-700-normal.051fa8db.woff2",revision:"d0Pfbr43pkbisEBsc4iaR"},{url:"/bubbleProfile.png",revision:"c143f1ceb7d082823ff7707eea14970d"},{url:"/favicon.ico",revision:"16f465b1d8d01645ced375a21e56db58"},{url:"/logo-128x128.png",revision:"85a276f0e3691413ebcc5372a0ee087b"},{url:"/logo-144x144.png",revision:"85678f54d1fe2e3e98a4da5987644ca9"},{url:"/logo-152x152.png",revision:"3d3662c5a374da86475ac404b740ea92"},{url:"/logo-192x192.png",revision:"bfd204608ec7b3cff118e01198d25cc6"},{url:"/logo-384x384.png",revision:"0a4e6c7901feace9154de876f8c28027"},{url:"/logo-512x512.png",revision:"0ef8c7fc4c89b00f94415d263a3fdbf0"},{url:"/logo-72x72.png",revision:"49476b07f38e865446f40702a7cb9829"},{url:"/logo-96x96.png",revision:"faf0c5a45ed4e0c07c4b43e7e6e4543d"},{url:"/logo.png",revision:"7ecb72e7d25e52a776ba811ee2247049"},{url:"/logo.svg",revision:"c77098639a41bd0ea64062cd7e1d2e26"},{url:"/manifest.json",revision:"07d81cd6f981d32d1b13980288a44d07"},{url:"/mask.svg",revision:"0172b406c2c4a88222da6444b0e7dc5c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
