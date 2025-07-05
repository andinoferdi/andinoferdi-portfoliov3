"use client"

import type React from "react"
import { useState } from "react"
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react"
import SocialLinks from "@/components/ui/SocialLinks"
import CommentSection from "@/components/ui/CommentSection"

interface FormData {
  name: string
  email: string
  message: string
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] pb-16 bg-background/70" id="Contact">
      <div className="text-center mb-2 sm:px-0 px-[5%]">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto gradient-text">Hubungi Saya</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base mt-2">
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <div className="h-auto py-6 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0">
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div className="bg-card/50 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-500 hover:shadow-primary/10 border border-border">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 gradient-text">Hubungi</h2>
                <p className="text-muted-foreground">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-primary opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-muted/50 rounded-xl border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 hover:border-primary/30 disabled:opacity-50"
                  required
                />
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-muted/50 rounded-xl border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 hover:border-primary/30 disabled:opacity-50"
                  required
                />
              </div>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-muted/50 rounded-xl border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 hover:border-primary/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-blue-500 text-primary-foreground py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-border flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-500 hover:shadow-primary/10 border border-border">
            <CommentSection />
          </div>
        </div>
      </div>

      {/* Footer content integrated into Contact section */}
      <div className="text-center mt-12 pt-8 border-t border-border/30">
        <span className="text-sm text-muted-foreground">
          © 2025{" "}
          <a href="https://eki.my.id/" className="hover:underline text-primary transition-colors">
            EkiZR™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  )
}

export default ContactPage
