import { useState } from 'react'
import { hexToRgb } from '../utils/color'

export function RGBInputForm({ onSubmit, disabled }) {
  const [hex, setHex] = useState('')

  const handleChange = (event) => {
    const cleaned = event.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)
    setHex(cleaned)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (hex.length !== 6) return
    onSubmit(hexToRgb(hex))
  }

  return (
    <form className="rgb-form" onSubmit={handleSubmit}>
      <label>
        色碼
        <div className="hex-input">
          <span className="hex-prefix">#</span>
          <input
            type="text"
            inputMode="text"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="ffffff"
            maxLength={6}
            value={hex}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>
      </label>
      <button type="submit" disabled={disabled || hex.length !== 6}>
        送出
      </button>
    </form>
  )
}
