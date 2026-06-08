# LexiDict — HTML to Figma (div-only)

**Important:** Copy **only** the `<div>...</div>` block for each screen.  
Do **not** include `<!DOCTYPE>`, `<html>`, `<head>`, `<meta>`, `<style>`, `class`, `<input>`, `<button>`, `<p>`, or `<span>`.

Supported: **`div` only** + **inline `style`** + **text inside divs**.

Frame size: **390 × 844 px**

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#0A0A0F` |
| Surface | `#13131A` |
| Border | `#1E1E2E` |
| Primary | `#6C63FF` |
| Secondary | `#A78BFA` |
| Text Primary | `#F0F0FF` |
| Text Secondary | `#8888AA` |
| Error | `#FF5C8A` |

---

## Screen 1 — Search (Empty State)

```html
<div style="width:390px;height:844px;display:flex;flex-direction:column;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;box-sizing:border-box;">
  <div style="height:44px;flex-shrink:0;"></div>
  <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:16px 20px;flex-shrink:0;">
    <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:#F0F0FF;font-size:22px;">☰</div>
    <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#6C63FF;">LexiDict</div>
    <div style="width:40px;height:40px;"></div>
  </div>
  <div style="padding:0 24px;flex-shrink:0;">
    <div style="display:flex;flex-direction:row;align-items:center;height:52px;border-radius:50px;background-color:#13131A;border:1.5px solid #6C63FF;padding-left:20px;padding-right:6px;box-sizing:border-box;">
      <div style="flex:1;font-size:16px;color:#8888AA;">Search a word...</div>
      <div style="background-color:#6C63FF;color:#F0F0FF;font-weight:600;font-size:14px;padding:10px 20px;border-radius:50px;">Go</div>
    </div>
  </div>
  <div style="margin-top:20px;padding-left:24px;flex-shrink:0;">
    <div style="font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8888AA;margin-bottom:10px;">RECENT</div>
    <div style="display:flex;flex-direction:row;padding-right:24px;">
      <div style="background-color:#13131A;border:1px solid #1E1E2E;color:#F0F0FF;font-size:14px;padding:8px 16px;border-radius:50px;margin-right:8px;">hello</div>
      <div style="background-color:#13131A;border:1px solid #1E1E2E;color:#F0F0FF;font-size:14px;padding:8px 16px;border-radius:50px;margin-right:8px;">world</div>
      <div style="background-color:#13131A;border:1px solid #1E1E2E;color:#F0F0FF;font-size:14px;padding:8px 16px;border-radius:50px;">ephemeral</div>
    </div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;">
    <div style="font-size:72px;opacity:0.6;margin-bottom:20px;">📖</div>
    <div style="font-size:16px;line-height:26px;color:#8888AA;max-width:260px;">Search for any English word to get started</div>
  </div>
</div>
```

---

## Screen 2 — Word Detail

```html
<div style="width:390px;height:844px;display:flex;flex-direction:column;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;box-sizing:border-box;">
  <div style="height:44px;flex-shrink:0;"></div>
  <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #1E1E2E;flex-shrink:0;">
    <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:#6C63FF;font-size:32px;font-weight:300;">‹</div>
    <div style="font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8888AA;">DEFINITION</div>
    <div style="width:40px;height:40px;"></div>
  </div>
  <div style="flex:1;overflow:hidden;padding:24px;box-sizing:border-box;">
    <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <div style="font-size:36px;font-weight:800;letter-spacing:-0.5px;color:#F0F0FF;">hello</div>
      <div style="width:44px;height:44px;border-radius:22px;background-color:#6C63FF;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🔊</div>
    </div>
    <div style="font-size:16px;line-height:26px;color:#8888AA;margin-bottom:24px;">/həˈloʊ/</div>
    <div style="background-color:#13131A;border:1px solid #1E1E2E;border-radius:16px;padding:20px;margin-bottom:16px;box-sizing:border-box;">
      <div style="display:inline-block;background-color:rgba(108,99,255,0.2);color:#6C63FF;font-size:11px;font-weight:600;letter-spacing:1px;padding:4px 12px;border-radius:50px;margin-bottom:12px;">noun</div>
      <div style="height:1px;background-color:#1E1E2E;margin-bottom:16px;"></div>
      <div style="font-size:15px;line-height:26px;color:#F0F0FF;margin-bottom:16px;"><div style="display:inline;color:#6C63FF;font-weight:600;">1. </div>A greeting used when meeting or answering the telephone.</div>
      <div style="margin-top:8px;margin-left:16px;padding-left:12px;border-left:2px solid #A78BFA;">
        <div style="font-size:14px;line-height:22px;color:#8888AA;font-style:italic;">"she was getting polite nods and hellos from people"</div>
      </div>
      <div style="font-size:15px;line-height:26px;color:#F0F0FF;margin-top:16px;"><div style="display:inline;color:#6C63FF;font-weight:600;">2. </div>An expression of greeting.</div>
    </div>
    <div style="background-color:#13131A;border:1px solid #1E1E2E;border-radius:16px;padding:20px;box-sizing:border-box;">
      <div style="display:inline-block;background-color:rgba(108,99,255,0.2);color:#6C63FF;font-size:11px;font-weight:600;letter-spacing:1px;padding:4px 12px;border-radius:50px;margin-bottom:12px;">verb</div>
      <div style="height:1px;background-color:#1E1E2E;margin-bottom:16px;"></div>
      <div style="font-size:15px;line-height:26px;color:#F0F0FF;"><div style="display:inline;color:#6C63FF;font-weight:600;">1. </div>To greet someone; to say hello.</div>
      <div style="margin-top:8px;margin-left:16px;padding-left:12px;border-left:2px solid #A78BFA;">
        <div style="font-size:14px;line-height:22px;color:#8888AA;font-style:italic;">"I helloed him when he came near"</div>
      </div>
    </div>
  </div>
</div>
```

---

## Screen 3 — Search History

```html
<div style="width:390px;height:844px;display:flex;flex-direction:column;background-color:#13131A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;box-sizing:border-box;">
  <div style="height:44px;flex-shrink:0;"></div>
  <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #1E1E2E;flex-shrink:0;">
    <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:#6C63FF;font-size:32px;font-weight:300;">‹</div>
    <div style="font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8888AA;">HISTORY</div>
    <div style="width:40px;height:40px;"></div>
  </div>
  <div style="padding:16px 20px 24px;border-bottom:1px solid #1E1E2E;margin-bottom:16px;flex-shrink:0;">
    <div style="font-size:36px;margin-bottom:8px;">📚</div>
    <div style="font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#6C63FF;">LexiDict</div>
    <div style="font-size:13px;color:#8888AA;margin-top:4px;">Your personal dictionary</div>
  </div>
  <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:0 20px;margin-bottom:8px;flex-shrink:0;">
    <div style="font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8888AA;">SEARCH HISTORY</div>
    <div style="font-size:13px;color:#FF5C8A;font-weight:500;">Clear all</div>
  </div>
  <div style="display:flex;flex-direction:row;align-items:center;padding:14px 20px;border-bottom:1px solid #1E1E2E;">
    <div style="font-size:14px;opacity:0.5;margin-right:12px;">🔍</div>
    <div style="font-size:16px;line-height:26px;color:#F0F0FF;">hello</div>
  </div>
  <div style="display:flex;flex-direction:row;align-items:center;padding:14px 20px;border-bottom:1px solid #1E1E2E;">
    <div style="font-size:14px;opacity:0.5;margin-right:12px;">🔍</div>
    <div style="font-size:16px;line-height:26px;color:#F0F0FF;">ephemeral</div>
  </div>
  <div style="display:flex;flex-direction:row;align-items:center;padding:14px 20px;border-bottom:1px solid #1E1E2E;">
    <div style="font-size:14px;opacity:0.5;margin-right:12px;">🔍</div>
    <div style="font-size:16px;line-height:26px;color:#F0F0FF;">serendipity</div>
  </div>
  <div style="display:flex;flex-direction:row;align-items:center;padding:14px 20px;border-bottom:1px solid #1E1E2E;">
    <div style="font-size:14px;opacity:0.5;margin-right:12px;">🔍</div>
    <div style="font-size:16px;line-height:26px;color:#F0F0FF;">world</div>
  </div>
  <div style="display:flex;flex-direction:row;align-items:center;padding:14px 20px;border-bottom:1px solid #1E1E2E;">
    <div style="font-size:14px;opacity:0.5;margin-right:12px;">🔍</div>
    <div style="font-size:16px;line-height:26px;color:#F0F0FF;">dictionary</div>
  </div>
</div>
```

---

## Screen 4 — Error State

```html
<div style="width:390px;height:844px;display:flex;flex-direction:column;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;box-sizing:border-box;">
  <div style="height:44px;flex-shrink:0;"></div>
  <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:16px 20px;flex-shrink:0;">
    <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:#F0F0FF;font-size:22px;">☰</div>
    <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#6C63FF;">LexiDict</div>
    <div style="width:40px;height:40px;"></div>
  </div>
  <div style="padding:0 24px;flex-shrink:0;">
    <div style="display:flex;flex-direction:row;align-items:center;height:52px;border-radius:50px;background-color:#13131A;border:1.5px solid #1E1E2E;padding-left:20px;padding-right:6px;box-sizing:border-box;">
      <div style="flex:1;font-size:16px;color:#F0F0FF;">xyznotaword</div>
      <div style="background-color:#6C63FF;color:#F0F0FF;font-weight:600;font-size:14px;padding:10px 20px;border-radius:50px;">Go</div>
    </div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
    <div style="font-size:22px;font-weight:800;color:#F0F0FF;margin-bottom:8px;">Word Not Found</div>
    <div style="font-size:15px;line-height:26px;color:#8888AA;margin-bottom:24px;max-width:280px;">We couldn't find 'xyznotaword'. Check the spelling and try again.</div>
    <div style="background-color:#6C63FF;color:#F0F0FF;font-weight:600;font-size:16px;padding:14px 28px;border-radius:50px;">Try Again</div>
  </div>
</div>
```

---

## Screen 5 — Loading State

```html
<div style="width:390px;height:844px;display:flex;flex-direction:column;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;box-sizing:border-box;">
  <div style="height:44px;flex-shrink:0;"></div>
  <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:16px 20px;flex-shrink:0;">
    <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:#F0F0FF;font-size:22px;">☰</div>
    <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#6C63FF;">LexiDict</div>
    <div style="width:40px;height:40px;"></div>
  </div>
  <div style="padding:0 24px;flex-shrink:0;">
    <div style="display:flex;flex-direction:row;align-items:center;height:52px;border-radius:50px;background-color:#13131A;border:1.5px solid #6C63FF;padding-left:20px;padding-right:6px;box-sizing:border-box;">
      <div style="flex:1;font-size:16px;color:#F0F0FF;">hello</div>
      <div style="background-color:#6C63FF;color:#F0F0FF;font-weight:600;font-size:14px;padding:10px 20px;border-radius:50px;">Go</div>
    </div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <div style="width:40px;height:40px;border-radius:20px;border:3px solid #1E1E2E;border-top-color:#6C63FF;margin-bottom:16px;box-sizing:border-box;"></div>
    <div style="font-size:15px;line-height:26px;color:#8888AA;">Looking up word...</div>
  </div>
</div>
```

---

## Import checklist

- [ ] Copy **one** `<div>...</div>` block only (start to end)
- [ ] No `class` attribute anywhere
- [ ] No `<style>`, `<meta>`, `<input>`, `<button>`, `<p>`, `<span>`, `<h1>`
- [ ] Only `div` tags with inline `style="..."`
- [ ] Import at **390 × 844 px**

## Screen map

| # | Screen |
|---|--------|
| 1 | Search (empty + recent chips) |
| 2 | Word detail |
| 3 | Search history |
| 4 | Error state |
| 5 | Loading state |
