export function ColorTarget({ color }) {
  const style = {
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
  }

  return <div className="color-target" style={style} aria-label="目標顏色" />
}
