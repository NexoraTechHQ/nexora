"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function NexoraLoader() {
  const [showDelayedElements, setShowDelayedElements] = useState(false)

  // Add a slight delay before showing the animated elements
  // This makes the animation feel more intentional
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedElements(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showDelayedElements ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="h-16 w-16 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
            N
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={showDelayedElements ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary"
          />
        </motion.div>

        {/* Loading message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showDelayedElements ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-semibold tracking-tight">Nexora</h2>
          <p className="text-sm text-muted-foreground">We're setting things up for you...</p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showDelayedElements ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative h-1 w-48 overflow-hidden rounded-full bg-muted"
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "15%" }}
            animate={{
              width: ["15%", "85%", "40%", "100%"],
              left: ["0%", "15%", "60%", "0%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

