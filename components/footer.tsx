"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1a2e4c] text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-light">Pooya Pirayeshakbari</h3>
            <p className="font-serif text-white/70 leading-relaxed">
              Specializing in luxury properties and investment opportunities in the Greater Toronto Area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-serif font-light">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-white/80 mt-0.5" />
                <div>
                  <p className="font-serif">416-553-7707</p>
                  <p className="font-serif text-white/60 text-sm">Mobile</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-white/80 mt-0.5" />
                <div>
                  <p className="font-serif">(905) 731-2000</p>
                  <p className="font-serif text-white/60 text-sm">Office</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-white/80 mt-0.5" />
                <div>
                  <p className="font-serif">SOLD@REALTORPOOYA.CA</p>
                  <p className="font-serif text-white/60 text-sm">Email</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-serif font-light">Office</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-white/80 mt-0.5" />
              <p className="font-serif text-white/80 leading-relaxed">
                Royal LePage Your Community Realty
                <br />
                8854 Yonge Street
                <br />
                Richmond Hill, ON
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-serif font-light">Links</h3>
            <div className="space-y-3 font-serif">
              <p>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Home
                </a>
              </p>
              <p>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  About
                </a>
              </p>
              <p>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Listings
                </a>
              </p>
              <p>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Services
                </a>
              </p>
              <p>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-6 md:mb-0">
            <div className="h-10 w-auto relative">
              <Image
                src="/images/royallepage-community.webp"
                alt="Royal LePage Community Realty"
                width={140}
                height={40}
                className="object-contain brightness-0 invert opacity-70"
              />
            </div>
            <div className="h-10 w-auto relative">
              <Image
                src="/images/mls.png"
                alt="MLS Realtor"
                width={100}
                height={40}
                className="object-contain brightness-0 invert opacity-70"
              />
            </div>
          </div>

          <p className="text-white/60 font-serif text-sm">
            &copy; {new Date().getFullYear()} Pooya Pirayeshakbari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
