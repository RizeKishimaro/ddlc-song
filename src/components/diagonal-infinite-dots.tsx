
"use client"

import { useRef, useEffect, useState } from "react"
import { Heart } from "./Heart"

const HEART_SIZE = 64 // 16 * 4 (w-16 in Tailwind is 4rem)
const GAP_SIZE = 32 // 8 * 4 (gap-8 in Tailwind is 2rem)
const SCROLL_SPEED_X = 0.5
const SCROLL_SPEED_Y = 0.5

export default function DiagonalInfiniteHearts({ ended }: { ended: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(0)
  const [rowCount, setRowCount] = useState(0)

  useEffect(() => {
    const calculateGridDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        const columnsPerRow = Math.ceil(containerWidth / (HEART_SIZE + GAP_SIZE)) + 1
        const rowsPerColumn = Math.ceil(containerHeight / (HEART_SIZE + GAP_SIZE)) + 1
        setColumnCount(columnsPerRow)
        setRowCount(rowsPerColumn)
      }
    }

    calculateGridDimensions()
    window.addEventListener("resize", calculateGridDimensions)

    return () => window.removeEventListener("resize", calculateGridDimensions)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    let scrollPositionX = 0
    let scrollPositionY = 0

    const animate = () => {
      if (!ended) {
        scrollPositionX += SCROLL_SPEED_X
        scrollPositionY += SCROLL_SPEED_Y

        if (scrollPositionX >= HEART_SIZE + GAP_SIZE) {
          scrollPositionX = 0
        }
        if (scrollPositionY >= HEART_SIZE + GAP_SIZE) {
          scrollPositionY = 0
        }

        container.style.transform = `translate(${scrollPositionX}px, ${scrollPositionY}px)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [ended])

  if (ended) {
    return (
      <div className="w-full h-screen bg-black flex items-center overflow-hidden justify-center z-10">
        <div
          className="absolute top-full w-full h-2/3 text-white text-center"
          style={{
            animation: "scroll 8s linear forwards",
            animationPlayState: "running",
            opacity: 1,
            transition: "opacity 2s ease-in-out",
          }}
        >
          <h1 className="text-3xl font-bold mb-10">Doki Doki Literature Club</h1>
          <ul className="text-lg">
            <li>Monika</li>
            <li>Sayori</li>
            <li>Yuri</li>
            <li>Natsuki</li>
            <li>Special Thanks to You, the Player</li>
          </ul>
          <p className="mt-10 text-sm">Created by Rize Kishimaro</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-white relative" aria-label="Scrolling heart background">
      <div
        ref={containerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount}, ${HEART_SIZE}px)`,
          gridTemplateRows: `repeat(${rowCount}, ${HEART_SIZE}px)`,
          gap: `${GAP_SIZE}px`,
          padding: `${GAP_SIZE}px`,
          width: `calc(100% + ${HEART_SIZE + GAP_SIZE}px)`,
          height: `calc(100% + ${HEART_SIZE + GAP_SIZE}px)`,
          top: `-${HEART_SIZE + GAP_SIZE}px`,
          left: `-${HEART_SIZE + GAP_SIZE}px`,
        }}
      >
        {Array.from({ length: columnCount * rowCount }).map((_, i) => (
          <Heart key={i} className="w-16 h-16 text-pink-100" aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}


