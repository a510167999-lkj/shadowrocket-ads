// QQ音乐开屏/广告：按墨鱼网易云思路，改 musicu.fcg 响应体，不整站 REJECT。
// 只删 splash / advert / tmead 一类字段，不动听歌模块。

const raw = $response && $response.body;
if (!raw) {
  $done({});
}

let obj;
try {
  obj = JSON.parse(raw);
} catch (e) {
  $done({});
}

const killExact = new Set([
  "splash",
  "splashid",
  "splash_id",
  "splashad",
  "splash_ad",
  "tmead",
  "advert",
  "advertisement",
  "adinfo",
  "ad_info",
  "adlist",
  "ad_list",
  "openingad",
  "bootad",
  "focusad",
]);

function shouldKillKey(key) {
  const k = String(key).toLowerCase();
  if (killExact.has(k)) return true;
  if (k.includes("splash") && (k.includes("ad") || k.includes("screen") || k === "splash")) return true;
  if (k.includes("tmead")) return true;
  if (k.includes("advert")) return true;
  return false;
}

function walk(node, depth) {
  if (!node || typeof node !== "object" || depth > 10) return;
  if (Array.isArray(node)) {
    for (let i = node.length - 1; i >= 0; i--) {
      const item = node[i];
      if (item && typeof item === "object") {
        const t = String(item.type || item.module || item.id || "");
        if (/splash|tmead|advert/i.test(t) && /ad|splash/i.test(t)) {
          node.splice(i, 1);
          continue;
        }
        walk(item, depth + 1);
      }
    }
    return;
  }
  for (const key of Object.keys(node)) {
    if (shouldKillKey(key)) {
      delete node[key];
    } else {
      walk(node[key], depth + 1);
    }
  }
}

walk(obj, 0);
$done({ body: JSON.stringify(obj) });
