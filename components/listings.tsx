"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react"

// Mock data for listings
const listings = [
  {
    id: 1,
    title: "Luxury Waterfront Estate",
    address: "123 Lakeshore Drive, Toronto",
    price: "$4,850,000",
    beds: 5,
    baths: 6,
    sqft: 6200,
    image: "/images/luxury-home-1.png",
  },
  {
    id: 2,
    title: "Modern Downtown Penthouse",
    address: "888 Bay Street, Toronto",
    price: "$3,295,000",
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    image: "/images/luxury-home-2.png",
  },
  {
    id: 3,
    title: "Exclusive Forest Hill Residence",
    address: "45 Park Lane, Toronto",
    price: "$5,750,000",
    beds: 6,
    baths: 7,
    sqft: 7500,
    image: "/images/luxury-home-3.png",
  },
]

export default function Listings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section id="listings" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif text-[#1a2e4c] font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Featured Listings
          </motion.h2>

          <motion.a
            href="#all-listings"
            className="flex items-center text-[#1a2e4c] font-serif group"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {listings.map((listing) => (
            <motion.div key={listing.id} variants={item} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-white px-4 py-2 text-[#1a2e4c] font-serif">{listing.price}</span>
                </div>
              </div>

              <h3 className="text-xl font-serif text-[#1a2e4c] mb-2">{listing.title}</h3>

              <div className="flex items-center text-[#1a2e4c]/70 mb-3">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="font-serif text-sm">{listing.address}</span>
              </div>

              <div className="flex items-center space-x-4 text-[#1a2e4c]/80 font-serif">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{listing.beds} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{listing.baths} Baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span>{listing.sqft} sqft</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
