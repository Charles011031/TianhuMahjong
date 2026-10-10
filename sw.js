/* 天胡麻将馆 · Service Worker
 * ------------------------------------------------------------
 * 设计原则（很重要）：
 *   ① 静态资源用【网络优先】——
 *      先请求网络，拿到就用最新的；网络不通才用缓存。
 *      ★ 绝不"缓存优先" —— 那样我改完代码你手机上还是旧版 ✗
 *   ② Firebase 的请求【完全不拦截】——
 *      营业额、会员、打卡这些数据必须永远走实时网络 ✗
 *      一旦被缓存，你会看到过期数据，那比没网更糟 ✗
 *   ③ 装好立刻生效（skipWaiting + clients.claim）——
 *      不然手机上要关掉重开好几次才更新 ✗
 * ------------------------------------------------------------ */

var CACHE = 'tianhu-mahjong-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-180.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .catch(function () { /* 某个资源拿不到也不阻塞安装 */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
                             .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;

  // 只处理 GET；POST/PUT/DELETE 一律走网络（写数据绝不能被缓存）
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (x) { return; }

  // ★ 只接管【同源】的静态资源
  //   Firebase（另一个域名）的请求、以及任何跨域请求 → 完全不拦 ✗
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(req).then(function (res) {
      // 拿到新的 → 顺手更新缓存（下次没网也能开）
      if (res && res.status === 200 && res.type === 'basic') {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
      }
      return res;
    }).catch(function () {
      // 没网 → 用缓存兜底
      return caches.match(req).then(function (r) {
        return r || caches.match('./index.html');
      });
    })
  );
});
