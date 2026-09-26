# Hexguessr — 專案交接筆記（給 Claude 用）

這份檔案是給任何在這個 repo 裡工作的 Claude Code session 看的（不論在哪台機器）。目的是讓從 Mac 換到 Windows（或任何新機器）接手時，AI 能立刻掌握專案脈絡，不需要重新摸索。

## 這是什麼專案

Hexguessr，一款色碼猜測遊戲（"色碼遊戲"）。玩家看到一個目標顏色，輸入 RGB/Hex 值去猜，並有 3D 色彩空間視覺化輔助。

## 技術棧與指令

- React + Vite，`@react-three/fiber` / `@react-three/drei` + `three` 做 3D 色彩空間視覺化
- `npm install`
- `npm run dev` — Vite dev server，port 5173
- `npm run build` — build 到 `dist/`
- `npm run preview`
- `npm run lint` — oxlint（規則見 `.oxlintrc.json`：`react/rules-of-hooks` error、`react/only-export-components` warn）

`.claude/launch.json` 已設定 Claude Code 的瀏覽器 preview 直接跑 `npm run dev`（port 5173），用 `preview_start` 對應這個 config 就好，不用自己另外開 dev server。

## 平台差異注意（Mac → Windows）

這個專案是在 macOS 上開發的，有一個地雷：

- `啟動遊戲.command` 是 **macOS 專屬** 的雙擊啟動腳本（bash + `open` 指令開瀏覽器），**在 Windows 上不能用**。Windows 上請直接用 `npm run dev`，或請 Claude 另外做一個 `.bat` / `.ps1` 的等效版本。

## 部署

- 部署到 GitHub Pages，由 `.github/workflows/deploy.yml` 在 push 到 `main` 時自動跑（在 `ubuntu-latest` runner 上 build，跟開發機器的 OS 無關）。
- `vite.config.js` 裡 `base: '/hexguessr/'` 是 GitHub Pages 路徑必須的設定，不要移除。
- Remote: https://github.com/takakao0925/hexguessr

## 專案結構速覽

- `src/App.jsx` — 主畫面切換（選單 / 遊戲中 / 結算）
- `src/components/` — `MainMenu`、`GameScreen`、`ColorSpace3D`（3D 視覺化）、`ColorTarget`、`RGBInputForm`、`GuessHistory`、`ResultStats`、`SetSummary`、`SuccessBanner`、`RankBoard`
- `src/hooks/useGame.js` — 遊戲核心狀態機；`useEnterKey.js` — Enter 鍵送出的輔助 hook
- `src/utils/color.js` — 色彩換算；`rankings.js` — 分數/段位邏輯；`comment.js` — 猜測回饋文字產生

## 功能開發歷程（git log，新到舊）

1. Add more to total score
2. Add rank（段位榜，對應 `rankings.js` / `RankBoard.jsx`）
3. Add one-shot mode
4. Fix GitHub Pages deployment（base path + build workflow）
5. Initial commit

## 關於「跨機器接手」這件事

- 這個 repo 本身透過 GitHub remote 同步，`git pull` 就能拿到最新程式碼——這部分不需要特別處理。
- **但 Claude Code 的對話紀錄/session 歷史不會跨機器同步**：紀錄存放在本機的 `~/.claude/projects/<路徑編碼>/`，資料夾名稱是根據專案的絕對路徑編碼產生的（例如 Mac 上是 `-Users-takakao-Documents-Hexgussr`），Windows 上路徑不同，編碼也完全不同，所以舊 session 不會自動出現在新機器上。
- 這份 `CLAUDE.md` 就是刻意做來取代「搬 session 紀錄」的作法：只要進到這個 repo，任何 Claude Code session 開始時都會自動讀到這份檔案，等於內建了專案背景，不需要额外匯入什麼。
- 之後專案有重大決策或約定（例如新的分數規則、UI 慣例），建議更新這份檔案，讓它保持有用。

## Commit 慣例

- 此 repo 目前的 commit 都是由 Claude Code 協助完成，commit message 結尾會帶：
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`（或當時使用的模型名稱）——沿用這個慣例即可。
