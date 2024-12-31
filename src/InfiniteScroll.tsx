
import { useRef, useEffect, useState } from 'react'

const DOT_SIZE = 64 // 16 * 4 (w-16 in Tailwind is 4rem)
const GAP_SIZE = 32 // 8 * 4 (gap-8 in Tailwind is 2rem)
const SCROLL_SPEED = 1

export default function HorizontalInfiniteDots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const calculateDotCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const dotsPerRow = Math.ceil(containerWidth / (DOT_SIZE + GAP_SIZE)) + 1
        setDotCount(dotsPerRow * 6) // 6 rows
      }
    }

    calculateDotCount()
    window.addEventListener('resize', calculateDotCount)

    return () => window.removeEventListener('resize', calculateDotCount)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    let scrollPosition = 0

    const animate = () => {
      scrollPosition += SCROLL_SPEED
      if (scrollPosition >= DOT_SIZE + GAP_SIZE) {
        scrollPosition = 0
      }

      container.style.transform = `translateX(${-scrollPosition}px)`

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden bg-white relative">
      <div
        ref={containerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${dotCount}, ${DOT_SIZE}px)`,
          gridTemplateRows: 'repeat(6, auto)',
          gap: `${GAP_SIZE}px`,
          padding: `${GAP_SIZE}px`,
        }}
      >
        {Array.from({ length: dotCount * 6 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-full bg-pink-100"
          />
        ))}
      </div>
    </div>
  )
}
