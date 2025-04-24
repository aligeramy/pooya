"use client"

import Hero from "@/components/hero"
import Listings from "@/components/listings"
import WhyChooseMe from "@/components/why-choose-me"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f2]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Listings />
        <WhyChooseMe />
      </div>
      <Footer />
    </main>
  )
}
