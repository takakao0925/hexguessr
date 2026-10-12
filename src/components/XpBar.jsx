import { levelInfo } from '../utils/membership'

export function XpBar({ xpGain }) {
  const { gained, newXp, prevLevel, newLevel } = xpGain
  const { xpInLevel } = levelInfo(newXp)

  return (
    <div className="xp-bar">
      <div className="xp-bar-head">
        <strong>Lv.{newLevel}</strong>
        <span>+{gained} XP</span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${xpInLevel}%` }} />
      </div>
      <div className="xp-bar-foot">
        {newLevel > prevLevel ? `升級！Lv.${prevLevel} → Lv.${newLevel}` : `${xpInLevel} / 100 XP`}
      </div>
    </div>
  )
}
