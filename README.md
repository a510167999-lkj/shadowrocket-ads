# shadowrocket-ads

自用小火箭配置：LingJingMaster 分流 + 墨鱼开屏/去广告 + 已写好 HTTPS 解密主机名。

## 小火箭里用

配置 → 右上角 + → 从 URL 下载：

```
https://raw.githubusercontent.com/a510167999-lkj/shadowrocket-ads/main/Shadowrocket-Ads.conf
```

国内 GitHub raw 拉不下时：

```
https://cdn.jsdelivr.net/gh/a510167999-lkj/shadowrocket-ads@main/Shadowrocket-Ads.conf
```

导入后点「使用配置」。节点订阅仍用首页原来的，不用写进这份文件。

之后在该配置上点更新即可拉新规则。HTTPS 解密保持打开，证书继续信任。

只要模块、不要整份配置时：

```
https://raw.githubusercontent.com/a510167999-lkj/shadowrocket-ads/main/StartUpAds.sgmodule
```

（模块 → + → 粘贴）

不含节点、证书、微信/支付宝解密。
