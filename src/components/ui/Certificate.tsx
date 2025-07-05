"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Maximize2 } from "lucide-react"

interface CertificateProps {
  image: string
  title: string
  issuer: string
}

const Certificate: React.FC<CertificateProps> = ({ image, title, issuer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <>
      {/* Certificate Thumbnail */}
      <div className="relative group cursor-pointer" onClick={handleOpen}>
        <div className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/50">
          <div className="aspect-[4/3] relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-background/20 backdrop-blur-sm rounded-full p-3 border border-border">
                <Maximize2 className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-xs">{issuer}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-background/10 hover:bg-background/20 text-foreground transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Certificate Info */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground">Issued by {issuer}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Certificate
