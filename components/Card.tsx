import React, { FC } from 'react'

interface CardProps {
  title: string
  posterUrl: string | null
  type: string
  user: string
  likes: number
  comments: number
}

const Card: FC<CardProps> = ({ title, posterUrl, type, user, likes, comments }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-900">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-700 text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4 text-white">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-400">Type: {type}</p>
        <p className="text-sm text-gray-400">User: {user}</p>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
          <span>Likes: {likes}</span>
          <span>Comments: {comments}</span>
        </div>
      </div>
    </div>
  )
}

export default Card 