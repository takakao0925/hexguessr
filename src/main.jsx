import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode is intentionally omitted: in dev it double-invokes effects,
// and react-three-fiber's Canvas loses its WebGL context on the simulated
// unmount without recreating it on remount, leaving the 3D scene permanently
// black. This only affects `npm run dev` — production builds strip
// StrictMode's double-invoke behavior entirely, so real players are unaffected.
createRoot(document.getElementById('root')).render(<App />)
