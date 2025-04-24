"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Mail } from "lucide-react"
import MarbleBackground from "./marble-background"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-[90vh] py-10 px-4 md:px-8 lg:px-16 overflow-hidden pt-32 bg-[#f8f5f2]">
      {/* Marble Background */}
      <MarbleBackground />

      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[#1a2e4c] opacity-5 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[#1a2e4c] opacity-5 rounded-full blur-[100px] transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto h-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1a2e4c] leading-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  POOYA
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  PIRAYESHAKBARI
                </motion.span>
              </h1>
              <motion.p
                className="text-lg md:text-xl text-[#1a2e4c]/70 font-serif mt-2"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                SALES REPRESENTATIVE
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <p className="text-lg md:text-xl text-[#1a2e4c]/80 font-serif leading-relaxed">
                Specializing in luxury properties and investment opportunities in the Greater Toronto Area.
              </p>

              <div className="flex flex-col space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#1a2e4c]" />
                  <a href="tel:4165537707" className="text-lg text-[#1a2e4c] font-serif hover:underline">
                    416-553-7707
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#1a2e4c]" />
                  <a href="mailto:SOLD@REALTORPOOYA.CA" className="text-lg text-[#1a2e4c] font-serif hover:underline">
                    SOLD@REALTORPOOYA.CA
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-[#1a2e4c] text-white font-serif text-lg transition-all duration-300 hover:bg-[#1a2e4c]/90"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-end h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Image 
              src="/images/pooya.png" 
              alt="Pooya Pirayeshakbari"
              width={600}
              height={800}
              className="object-contain max-h-full"
              priority 
              style={{ marginTop: 'auto' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
