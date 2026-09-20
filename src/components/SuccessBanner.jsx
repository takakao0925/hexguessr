export function SuccessBanner({ elapsed, attempts, onNext }) {
  return (
    <div className="success-banner">
      <h2>答對了！</h2>
      <p>
        花了 {elapsed.toFixed(1)} 秒，共 {attempts} 次嘗試
      </p>
      <button type="button" onClick={onNext}>
        下一關
      </button>
    </div>
  )
}
