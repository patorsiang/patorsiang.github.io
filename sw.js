if(!self.define){let e,n={};const i=(i,a)=>(i=new URL(i+".js",a).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let o={};const r=e=>i(e,t),c={module:{uri:t},exports:o,require:r};n[t]=Promise.all(a.map((e=>c[e]||r(e)))).then((e=>(s(...e),o)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/644-7e0c31d56a9792c9.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/main-7850956c96d5581e.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/pages/404-53ac83db1a02aaf1.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/pages/500-3d28a55006e13d31.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/pages/_app-20630f2d844a1a00.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/pages/experience-d0e4b59235bb6a64.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/pages/index-d3013c3969ab31e3.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/polyfills-0d1b80a048d4787e.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/chunks/webpack-f8187653f40ab7de.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/css/15a36d2e6b84f1f1.css",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-all-300-normal.87b78125.woff",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-all-400-normal.d51023e4.woff",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-all-500-normal.f489eb2e.woff",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-all-700-normal.976e78b3.woff",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-300-normal.57eb7fd8.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-400-normal.7f62091e.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-500-normal.087b35a9.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-700-normal.0e7076be.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-ext-300-normal.889a3aa7.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-ext-400-normal.c3f3489a.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-ext-500-normal.656144c8.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-latin-ext-700-normal.81cd45cb.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-thai-300-normal.117f1a07.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-thai-400-normal.c0a614be.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-thai-500-normal.19156914.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-thai-700-normal.1f0af9ee.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-vietnamese-300-normal.f9bc98f0.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-vietnamese-400-normal.a4d0f76f.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-vietnamese-500-normal.570d84d7.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/media/mali-vietnamese-700-normal.051fa8db.woff2",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/uQKwBCnzuZO3AV2BQg79S/_buildManifest.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/_next/static/uQKwBCnzuZO3AV2BQg79S/_ssgManifest.js",revision:"uQKwBCnzuZO3AV2BQg79S"},{url:"/bubbleProfile.jpg",revision:"e8c36cf3a51295d7c3d5988a3d6464f0"},{url:"/bubbleProfile.png",revision:"c143f1ceb7d082823ff7707eea14970d"},{url:"/bubbleProfile.webp",revision:"c6121d4be42e29e385352a55063d513e"},{url:"/favicon.ico",revision:"16f465b1d8d01645ced375a21e56db58"},{url:"/logo-128x128.png",revision:"85a276f0e3691413ebcc5372a0ee087b"},{url:"/logo-144x144.png",revision:"85678f54d1fe2e3e98a4da5987644ca9"},{url:"/logo-152x152.png",revision:"3d3662c5a374da86475ac404b740ea92"},{url:"/logo-192x192.png",revision:"bfd204608ec7b3cff118e01198d25cc6"},{url:"/logo-384x384.png",revision:"0a4e6c7901feace9154de876f8c28027"},{url:"/logo-512x512.png",revision:"0ef8c7fc4c89b00f94415d263a3fdbf0"},{url:"/logo-72x72.png",revision:"49476b07f38e865446f40702a7cb9829"},{url:"/logo-96x96.png",revision:"faf0c5a45ed4e0c07c4b43e7e6e4543d"},{url:"/logo.png",revision:"7ecb72e7d25e52a776ba811ee2247049"},{url:"/logo.svg",revision:"c77098639a41bd0ea64062cd7e1d2e26"},{url:"/manifest.json",revision:"102c3ff81aae0a7e3af37d8bce674394"},{url:"/mask.svg",revision:"0172b406c2c4a88222da6444b0e7dc5c"},{url:"/maskable_icon.png",revision:"d1880984ce8b0bca555f457176409bfb"},{url:"/maskable_icon_x128.png",revision:"f08c2045f82a5581b978faa4f94abb1c"},{url:"/maskable_icon_x48.png",revision:"770bfb48bb9713bfecbcfe467c00e22f"},{url:"/maskable_icon_x72.png",revision:"d5ca6447bac3e822fc110bbca4c95879"},{url:"/maskable_icon_x96.png",revision:"ee8fc038de4f5e985b0242862159a351"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:i,state:a})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
