"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, UserCircle2, Send, ImagePlus, X, Pin } from "lucide-react"

interface Comment {
  id: number
  user_name: string
  content: string
  profile_image?: string
  created_at: string
  is_pinned?: boolean
}

interface CommentFormData {
  newComment: string
  userName: string
  imageFile: File | null
}

// Mock data for demonstration
const mockComments: Comment[] = [
  {
    id: 1,
    user_name: "Admin",
    content: "Welcome to my portfolio! Feel free to leave your thoughts and feedback.",
    created_at: new Date().toISOString(),
    is_pinned: true,
  },
  {
    id: 2,
    user_name: "John Doe",
    content: "Amazing portfolio! The design is really clean and modern.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    user_name: "Jane Smith",
    content: "Love the animations and smooth transitions. Great work!",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments.filter((c) => !c.is_pinned))
  const [pinnedComment] = useState<Comment | null>(mockComments.find((c) => c.is_pinned) || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CommentFormData>({
    newComment: "",
    userName: "",
    imageFile: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const formatDate = (timestamp: string): string => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMinutes < 1) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB. Please choose a smaller image.")
        e.target.value = ""
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.")
        e.target.value = ""
        return
      }

      setFormData((prev) => ({ ...prev, imageFile: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.newComment.trim() || !formData.userName.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now(),
        user_name: formData.userName,
        content: formData.newComment,
        created_at: new Date().toISOString(),
        profile_image: imagePreview || undefined,
      }

      setComments((prev) => [newComment, ...prev])
      setFormData({ newComment: "", userName: "", imageFile: null })
      setImagePreview(null)
      setIsSubmitting(false)
    }, 1000)
  }

  const totalComments = comments.length + (pinnedComment ? 1 : 0)

  return (
    <div className="w-full bg-gradient-to-b from-card/50 to-card/30 rounded-2xl backdrop-blur-xl shadow-xl border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Comments <span className="text-primary">({totalComments})</span>
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
              maxLength={15}
              placeholder="Enter your name"
              className="w-full p-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.newComment}
              maxLength={200}
              onChange={(e) => setFormData((prev) => ({ ...prev, newComment: e.target.value }))}
              placeholder="Write your message here..."
              className="w-full p-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Profile Photo <span className="text-muted-foreground">(optional)</span>
            </label>
            <div className="flex items-center gap-4 p-4 bg-muted/50 border border-border rounded-xl">
              {imagePreview ? (
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, imageFile: null }))
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove Photo</span>
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="profile-image"
                  />
                  <label
                    htmlFor="profile-image"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all border border-dashed border-primary/50 hover:border-primary group cursor-pointer"
                  >
                    <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Choose Profile Photo</span>
                  </label>
                  <p className="text-center text-muted-foreground text-sm mt-2">Max file size: 5MB</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full h-12 bg-gradient-to-r from-primary to-blue-500 rounded-xl font-medium text-primary-foreground overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Post Comment</span>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4 h-[328px] overflow-y-auto overflow-x-hidden custom-scrollbar pt-1 pr-1">
          {/* Pinned Comment */}
          {pinnedComment && (
            <div className="px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30 hover:bg-gradient-to-r hover:from-primary/15 hover:to-blue-500/15">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Pin className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Pinned Comment</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full text-primary bg-primary/30 transition-colors">
                  <UserCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate text-foreground">{pinnedComment.user_name}</h4>
                      <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">Admin</span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(pinnedComment.created_at)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm break-words leading-relaxed relative bottom-2">
                    {pinnedComment.content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Regular Comments */}
          {comments.length === 0 && !pinnedComment ? (
            <div className="text-center py-8">
              <UserCircle2 className="w-12 h-12 text-primary mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No comments yet. Start the conversation!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 bg-card/50 border-border hover:bg-card/70"
              >
                <div className="flex items-start gap-3">
                  {comment.profile_image ? (
                    <img
                      src={comment.profile_image || "/placeholder.svg"}
                      alt={`${comment.user_name}'s profile`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                    />
                  ) : (
                    <div className="p-2 rounded-full text-primary bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <UserCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h4 className="font-medium truncate text-foreground">{comment.user_name}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm break-words leading-relaxed relative bottom-2">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentSection
