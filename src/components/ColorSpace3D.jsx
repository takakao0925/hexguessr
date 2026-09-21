import { Canvas } from '@react-three/fiber'
import { Line, OrbitControls, Text } from '@react-three/drei'

const AXIS_LENGTH = 4

function toPosition(color) {
  return [
    (color.r / 255) * AXIS_LENGTH,
    (color.g / 255) * AXIS_LENGTH,
    (color.b / 255) * AXIS_LENGTH,
  ]
}

function Axis({ color, to, label }) {
  const labelPos = to.map((v) => v * 1.12)
  return (
    <>
      <Line points={[[0, 0, 0], to]} color={color} lineWidth={2} />
      <Text position={labelPos} fontSize={0.32} color={color}>
        {label}
      </Text>
    </>
  )
}

function Marker({ position, color, size }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
    </mesh>
  )
}

const CUBE_EDGES = [
  [0, 0, 0], [AXIS_LENGTH, 0, 0],
  [AXIS_LENGTH, 0, 0], [AXIS_LENGTH, AXIS_LENGTH, 0],
  [AXIS_LENGTH, AXIS_LENGTH, 0], [0, AXIS_LENGTH, 0],
  [0, AXIS_LENGTH, 0], [0, 0, 0],
  [0, 0, AXIS_LENGTH], [AXIS_LENGTH, 0, AXIS_LENGTH],
  [AXIS_LENGTH, 0, AXIS_LENGTH], [AXIS_LENGTH, AXIS_LENGTH, AXIS_LENGTH],
  [AXIS_LENGTH, AXIS_LENGTH, AXIS_LENGTH], [0, AXIS_LENGTH, AXIS_LENGTH],
  [0, AXIS_LENGTH, AXIS_LENGTH], [0, 0, AXIS_LENGTH],
  [0, 0, 0], [0, 0, AXIS_LENGTH],
  [AXIS_LENGTH, 0, 0], [AXIS_LENGTH, 0, AXIS_LENGTH],
  [AXIS_LENGTH, AXIS_LENGTH, 0], [AXIS_LENGTH, AXIS_LENGTH, AXIS_LENGTH],
  [0, AXIS_LENGTH, 0], [0, AXIS_LENGTH, AXIS_LENGTH],
]

export function ColorSpace3D({ guess, target }) {
  const guessPos = toPosition(guess)
  const targetPos = toPosition(target)

  return (
    <div className="color-space">
      <Canvas
        dpr={[1, 2]}
        frameloop="demand"
        style={{ width: '100%', height: 320 }}
        camera={{ position: [6, 6, 8], fov: 45 }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />

        <Axis color="#ff5c5c" to={[AXIS_LENGTH, 0, 0]} label="R" />
        <Axis color="#5cff5c" to={[0, AXIS_LENGTH, 0]} label="G" />
        <Axis color="#5c8cff" to={[0, 0, AXIS_LENGTH]} label="B" />

        <Line points={CUBE_EDGES} color="#888888" lineWidth={1} transparent opacity={0.25} segments />

        <Marker position={guessPos} color="#ffffff" size={0.16} />
        <Marker position={targetPos} color="#ffd24d" size={0.2} />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.12}
          minDistance={4}
          maxDistance={16}
          target={[AXIS_LENGTH / 2, AXIS_LENGTH / 2, AXIS_LENGTH / 2]}
        />
      </Canvas>
      <div className="color-space-legend">
        <span>
          <i className="dot guess" /> 你的位置
        </span>
        <span>
          <i className="dot target" /> 正確答案
        </span>
      </div>
    </div>
  )
}
