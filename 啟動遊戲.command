#!/bin/bash
cd "$(dirname "$0")"

echo "正在啟動色碼遊戲..."
npm run dev &
DEV_PID=$!

sleep 3
open "http://localhost:5173"

echo ""
echo "遊戲已在瀏覽器開啟。關閉這個視窗即可停止伺服器。"
wait $DEV_PID
