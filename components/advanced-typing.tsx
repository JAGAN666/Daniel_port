"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AdvancedTypingProps {
  text: string
  className?: string
  typingSpeed?: number
  delayBeforeStart?: number
  cursorBlinkSpeed?: number
}

export function AdvancedTyping({
  text,
  className = "",
  typingSpeed = 50,
  delayBeforeStart = 500,
  cursorBlinkSpeed = 500,
}: AdvancedTypingProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Reset states
    setDisplayedText("")
    setIsTyping(false)
    setIsComplete(false)

    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
          timeoutRef.current = setTimeout(typeNextChar, typingSpeed)
        } else {
          setIsTyping(false)
          setIsComplete(true)
        }
      }

      typeNextChar()
    }, delayBeforeStart)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, typingSpeed, delayBeforeStart])

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {(isTyping || !isComplete) && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: cursorBlinkSpeed / 1000,
            repeatType: "reverse",
          }}
          className="inline-block w-[0.1em] h-[1.2em] bg-current ml-[1px] align-middle"
        />
      )}
    </div>
  )
}

