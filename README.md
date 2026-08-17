# shadowrocket-ads

自用 [Shadowrocket](https://apps.apple.com/app/shadowrocket/id932747118)（小火箭）配置：在 [LingJingMaster](https://github.com/LingJingMaster/Shadowrocket-Rules) 分流上，只给几个常用 App 去开屏。

刻意做瘦：不堆墨鱼全量规则，不解密金融 App。

## 覆盖范围

| 做 | 不做 |
|---|---|
| 百度地图开屏 | 银行 / 证券 / 基金客户端 |
| QQ 音乐开屏 | 支付宝、微信支付、银联 |
| 哔哩哔哩开屏、推荐/动态广告 | 微信（避免登出） |
| 微博开屏和一部分信息流广告 | 会员解锁、改 VIP |
| 淘宝开屏 | 其它未列出的 App |

金融域名在规则最前面走 `DIRECT`，HTTPS 解密名单里是排除项。`Advertising.list` 拦不到这些域名。

开屏素材会缓存在 App 里。规则只影响**下次拉取**。QQ 音乐尤其明显：同一张广告反复出现，多半是缓存，不是规则没更新。iOS 没有「只清开屏缓存」；要清只能删除 App 再装，并且**先开小火箭再第一次打开**。

## 用配置（推荐）

解密主机名写在文件里，不用手填。

1. 小火箭 → **配置 → + → 从 URL 下载**：

```
https://raw.githubusercontent.com/a510167999-lkj/shadowrocket-ads/main/Shadowrocket-Ads.conf
```

GitHub raw 打不开时：

```
https://cdn.jsdelivr.net/gh/a510167999-lkj/shadowrocket-ads@main/Shadowrocket-Ads.conf
```

2. 点这份配置 → **使用配置**。
3. 首页原来的**节点订阅不用动**，仓库里没有节点。
4. **HTTPS 解密**打开。第一次：生成 CA → 系统「VPN 与设备管理」安装 →「关于本机 → 证书信任设置」打开信任。
5. 策略组 **广告拦截** 保持 `REJECT`。

之后在该配置上点**更新**即可。更新不会换证书，不必重装 CA。只有你点了「生成新的 CA」才要重新信任。

不要把更新地址改回 LingJingMaster 原版，否则解密主机名会被冲掉。

## 只用模块（可选）

已经有自己的分流、只想加点去广告时：

```
https://raw.githubusercontent.com/a510167999-lkj/shadowrocket-ads/main/StartUpAds.sgmodule
```

配置 → 模块 → + → 粘贴并打开开关。模块用 `%APPEND%` 追加解密域名，有的版本吃不进去。主机名对不上时，改用上面整份配置。

## 第一次怎么确认生效

小火箭开着，打开目标 App，看 **数据**：

| 看到 | 含义 |
|---|---|
| `newclient.map.baidu.com` / `tmead.y.qq.com` / `app.bilibili.com` 等，状态为解密或 REJECT | 规则已罩住 |
| 完全没有这些域名 | 没更新到这版，或小火箭没开 |
| 证书 / 握手失败 | App 锁了证书，网络规则搞不定 |

百度地图、淘宝、B 站开屏还在：划掉后台再开。QQ 音乐同一张反复出现：删除 App 重装后再测。

## 仓库里有什么

```
Shadowrocket-Ads.conf    整份配置（分流 + 去广告 + 解密主机名）
StartUpAds.sgmodule      只要去广告时用的模块
scripts/qqmusic.ads.js   QQ 音乐 musicu.fcg 去开屏脚本
```

不含节点、订阅、CA 私钥。

## 限制

- 不是全 App 去广告。未列出的软件不保证。
- 锁证书、走 QUIC、开屏打进业务大包时，可能去不掉。QQ 音乐墨鱼本人也没收录。
- 不要对银行 / 支付做 HTTPS 解密。

分流规则来自 LingJingMaster；百度地图 protobuf、B 站规则参考 [app2smile/rules](https://github.com/app2smile/rules)；思路参考墨鱼（按接口改写，不整站掐死）。
