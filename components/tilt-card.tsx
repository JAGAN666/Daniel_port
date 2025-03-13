"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareOpacity?: number
  tiltAmount?: number
}

export function TiltCard({ children, className = "", glareOpacity = 0.2, tiltAmount = 10 }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateXValue = (mouseY / (rect.height / 2)) * -tiltAmount
    const rotateYValue = (mouseX / (rect.width / 2)) * tiltAmount

    // Calculate glare position
    const glareX = mouseX / rect.width + 0.5
    const glareY = mouseY / rect.height + 0.5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x * 100}% ${glarePosition.y * 100}%, rgba(255,255,255,${glareOpacity}), transparent 50%)`,
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  )
}

