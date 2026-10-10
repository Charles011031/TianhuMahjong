# 🀄 天胡麻将馆

澳洲麻将馆的记账系统 —— 计时收费、会员充值、员工打卡、实时同步。

## 🌐 打开即用

| 地址 | 说明 |
|---|---|
| **https://charles011031.github.io/TianhuMahjong/** | ⚡ **平时用这个**（推荐） |
| [Apps Script 备用地址][old] | 🔁 新地址打不开时的备用，**数据是同一份** |

[old]: https://script.google.com/macros/s/AKfycbwVkGJRHdVRlKCuKsAM7SQk0wZIhuPiJwDul2eJT8UepNqyrZWC_-bV27VESy71uCku/exec

## 📱 装成手机 App（PWA）

| 手机 | 步骤 |
|---|---|
| **iPhone / iPad** | 用 **Safari** 打开 → 点底部「分享」⬆️ → 「添加到主屏幕」 |
| **Android** | 用 Chrome 打开 → 右上角 ⋮ → 「安装应用」 |
| **Mac** | Chrome/Edge 打开 → 地址栏右侧的 ⊕ 安装图标 |

装好后桌面会出现「**天胡**」图标，点开全屏显示，断网也能打开。

## 📁 目录说明

```
├── index.html      ← 网页本体（就是整个系统，单文件）
├── manifest.json   ← PWA 配置（App 名字、图标、颜色）
├── sw.js           ← Service Worker（离线缓存，网络优先）
├── assets/         ← 图标
│   ├── icon-180.png           苹果手机用的
│   ├── icon-192.png           安卓用的
│   ├── icon-512.png           高清
│   └── icon-maskable-512.png  安卓自适应图标
└── README.md
```

> **关于位置**：`index.html` / `manifest.json` / `sw.js` **必须放在根目录** ——
> GitHub Pages 的入口、以及 Service Worker 的作用域都要求这样，**请勿移动**。

## 🔧 技术说明

```
前端   单文件 HTML（约 600 KB），无框架、无构建步骤
数据   Firebase Realtime Database（多设备实时同步）
托管   GitHub Pages（静态）
导出   独立的 Apps Script 任务，每 5 分钟把数据同步到 Google 表格
```

## ✅ 主要功能

- **桌台计时** —— 独立计时、统一价格、暂停、换桌、自定义时间
- **结算收费** —— 现金 / 刷卡（含手续费）/ 人民币 / 会员余额
- **按人分账** —— 台费按人数平分、每人可代付多人、零食按份认领
- **分次结算** —— 一次没收齐可以记在桌上，之后点「补收」继续收
- **会员** —— 充值档位、赠送、余额抵扣、流水可改可删（软删除留痕）
- **员工** —— 打卡、工时、工资汇总、忙日加成、充值提成
- **多设备** —— 手机 / 平板 / 电脑同时记账，改动几秒内同步

## 🚀 更新流程

```
改代码 → 生成 → 部署两个地址（由维护脚本自动完成）
你不需要做任何事，打开网页就是最新版
```

## ⚠️ 数据安全

- 数据在 **Firebase 云端**，不在浏览器里 —— 换设备、清缓存都不会丢
- 网页文件本身**不含任何密码或密钥**
- 建议定期用系统里的「备份」功能导出完整 JSON

---

*本项目仅供天胡麻将馆内部使用。*
