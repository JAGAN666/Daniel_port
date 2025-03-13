"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"

export function StatsSection() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Research Impact</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white h-full transition-all duration-300 hover:shadow-lg text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <AnimatedCounter end={15} suffix="+" className="text-4xl font-bold text-primary mb-2" />
                <p className="text-slate-600">Publications</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white h-full transition-all duration-300 hover:shadow-lg text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <AnimatedCounter end={10} suffix="+" className="text-4xl font-bold text-primary mb-2" />
                <p className="text-slate-600">Years Experience</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white h-full transition-all duration-300 hover:shadow-lg text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <AnimatedCounter end={25} suffix="+" className="text-4xl font-bold text-primary mb-2" />
                <p className="text-slate-600">Research Projects</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white h-full transition-all duration-300 hover:shadow-lg text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <AnimatedCounter end={500} suffix="+" className="text-4xl font-bold text-primary mb-2" />
                <p className="text-slate-600">Citations</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

