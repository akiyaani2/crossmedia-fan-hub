import React, { FC } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'

interface CardProps {
  title: string
  posterUrl: string | null
  type: string
  user: string
  likes: number
  comments: number
  slug?: string
  isLoading?: boolean
}

const Card: FC<CardProps> = ({ title, posterUrl, type, user, likes, comments, slug, isLoading }) => {
  // Skeleton Loader Component (Inline for simplicity)
  const SkeletonLoader = () => (
    <div className="border border-medium-gray/20 rounded-lg overflow-hidden bg-gray-800/50 animate-pulse">
      <div className="w-full h-48 bg-gray-700/60"></div> {/* Image Placeholder */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700/60 rounded w-3/4"></div> {/* Title Placeholder */}
        <div className="h-3 bg-gray-700/60 rounded w-1/4"></div> {/* Type Placeholder */}
        <div className="h-3 bg-gray-700/60 rounded w-1/2"></div> {/* User Placeholder */}
        <div className="flex items-center justify-between mt-2 pt-1">
          <div className="h-3 bg-gray-700/60 rounded w-1/4"></div> {/* Likes Placeholder */}
          <div className="h-3 bg-gray-700/60 rounded w-1/4"></div> {/* Comments Placeholder */}
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return <SkeletonLoader />
  }

  // Main Card Content
  const cardContent = (
    <div className="relative group border border-medium-gray/30 rounded-lg overflow-hidden bg-gray-800/60 hover:border-neon-accent/50 hover:shadow-xl hover:shadow-neon-accent/10 transition-all duration-300 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden"> 
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700/60 text-medium-gray">
            {/* Placeholder Icon or Text */}
            <span className="text-xs">No Image</span>
          </div>
        )}
        {/* Hover Stats Overlay - similar to TrendingCarousel */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 
                        flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-4 text-white drop-shadow-lg">
            <span className="flex items-center text-sm font-medium">
              <Heart className="w-4 h-4 mr-1 fill-soft-coral text-soft-coral" /> {likes > 1000 ? `${(likes/1000).toFixed(1)}k` : likes}
            </span>
            <span className="flex items-center text-sm font-medium">
              <MessageCircle className="w-4 h-4 mr-1 fill-neon-accent/70 text-neon-accent" /> {comments}
            </span>
          </div>
        </div>
      </div>
      {/* Text Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold mb-1 text-light-gray group-hover:text-neon-accent transition-colors line-clamp-2">{title}</h3>
        {user && <p className="text-xs text-medium-gray mb-2">by <span className="hover:text-light-gray transition-colors">{user}</span></p>}
        <div className="mt-auto pt-1"> {/* Push tag to bottom */}
          <span className="text-xs bg-cosmic-blue/80 text-white px-2.5 py-1 rounded-full font-medium">
            {type}
          </span>
        </div>
      </div>
    </div>
  )
  
  // Conditionally wrap content with Link if slug is provided
  return slug ? <Link href={`/work/${slug}`} className="block h-full" >{cardContent}</Link> : cardContent;
}

export default Card 