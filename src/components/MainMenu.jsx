export function MainMenu({ onSelectMode }) {
  return (
    <div className="main-menu">
      <h1>色碼猜謎</h1>
      <p className="menu-subtitle">選擇遊戲模式</p>

      <div className="mode-list">
        <button type="button" className="mode-card" onClick={() => onSelectMode('oldChicken')}>
          <h2>老雞模式</h2>
          <p>每關只有一次作答機會，送出後直接看結算：座標距離、花費秒數、R/G/B 各軸差距。</p>
        </button>

        <button type="button" className="mode-card" onClick={() => onSelectMode('infinite')}>
          <h2>無限逼近</h2>
          <p>答錯會進入 3D 座標空間看自己跟正確答案的位置，可以無限次嘗試直到答對。</p>
        </button>
      </div>
    </div>
  )
}
