"use client"

import { useRef, useEffect, useState } from 'react'

const DOT_SIZE = 64 // 16 * 4 (w-16 in Tailwind is 4rem)
const GAP_SIZE = 32 // 8 * 4 (gap-8 in Tailwind is 2rem)
const SCROLL_SPEED = 1

export default function VerticalInfiniteDots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(0)
  const [rowCount, setRowCount] = useState(0)

  useEffect(() => {
    const calculateGridDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        const columnsPerRow = Math.ceil(containerWidth / (DOT_SIZE + GAP_SIZE))
        const rowsPerColumn = Math.ceil(containerHeight / (DOT_SIZE + GAP_SIZE)) + 1
        setColumnCount(columnsPerRow)
        setRowCount(rowsPerColumn)
      }
    }

    calculateGridDimensions()
    window.addEventListener('resize', calculateGridDimensions)

    return () => window.removeEventListener('resize', calculateGridDimensions)
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
      
      container.style.transform = `translateY(${scrollPosition}px)`
      
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
    <div className="w-full h-screen overflow-hidden bg-white relative" aria-label="Scrolling polka dot background">
      <div 
        ref={containerRef} 
        className="absolute inset-0 will-change-transform"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount}, ${DOT_SIZE}px)`,
          gridTemplateRows: `repeat(${rowCount}, ${DOT_SIZE}px)`,
          gap: `${GAP_SIZE}px`,
          padding: `${GAP_SIZE}px`,
        }}
      >
        {Array.from({ length: columnCount * rowCount }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-full bg-pink-100"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}

