"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">About Victoria Phantom Spares</h1>
        <p className="mt-4 text-muted-foreground">Your trusted partner in quality auto parts since 2010</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2010, Victoria Phantom Spares has grown from a small local shop to one of the leading auto parts
            suppliers in the region. Our journey began with a simple mission: to provide high-quality automotive parts at
            competitive prices while delivering exceptional customer service.
          </p>
          <p className="text-muted-foreground">
            Over the years, we've built strong relationships with manufacturers and suppliers worldwide, enabling us to
            offer an extensive range of genuine and aftermarket parts for all major vehicle brands.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-video overflow-hidden rounded-lg"
        >
          <Image
            src="/placeholder.svg"
            alt="Victoria Phantom Spares Store"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-6 md:col-span-2"
        >
          <h2 className="text-2xl font-bold">Why Choose Us</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quality Assurance",
                description:
                  "All our parts undergo rigorous quality checks to ensure they meet the highest standards of performance and durability.",
              },
              {
                title: "Expert Support",
                description:
                  "Our team of experienced professionals is always ready to help you find the right parts for your vehicle.",
              },
              {
                title: "Fast Shipping",
                description:
                  "We offer quick and reliable shipping services to get your parts delivered when you need them.",
              },
              {
                title: "Competitive Pricing",
                description:
                  "We work hard to offer the best prices without compromising on quality.",
              },
              {
                title: "Wide Selection",
                description:
                  "From engine components to body parts, we stock everything you need for your vehicle.",
              },
              {
                title: "Customer Satisfaction",
                description:
                  "Your satisfaction is our priority, backed by our hassle-free return policy.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex flex-col gap-2"
              >
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
