import { useState } from 'react'
import { loadNickname, saveNickname } from '../utils/rankings'

export function MainMenu({ onStart }) {
  const [askingNickname, setAskingNickname] = useState(false)
  const [nickname, setNickname] = useState(loadNickname)

  if (askingNickname) {
    const handleSubmit = (event) => {
      event.preventDefault()
      const trimmed = nickname.trim() || '玩家'
      saveNickname(trimmed)
      onStart('oldChicken', trimmed)
    }

    return (
      <div className="main-menu">
        <h1>老雞模式</h1>
        <p className="menu-subtitle">輸入你的暱稱</p>
        <form className="nickname-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="玩家暱稱"
            maxLength={12}
            autoFocus
            required
          />
          <div className="result-actions">
            <button type="submit">開始</button>
            <button type="button" className="secondary" onClick={() => setAskingNickname(false)}>
              返回
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="main-menu">
      <h1>色碼猜謎</h1>
      <p className="menu-subtitle">選擇遊戲模式</p>

      <div className="mode-list">
        <button type="button" className="mode-card" onClick={() => setAskingNickname(true)}>
          <h2>老雞模式</h2>
          <p>每關只有一次作答機會，送出後直接看結算：座標距離、花費秒數、R/G/B 各軸差距。每 10 關結算一次總成績，並列入排行榜。</p>
        </button>

        <button type="button" className="mode-card" onClick={() => onStart('infinite')}>
          <h2>無限逼近</h2>
          <p>答錯會進入 3D 座標空間看自己跟正確答案的位置，可以無限次嘗試直到答對。</p>
        </button>
      </div>
    </div>
  )
}
