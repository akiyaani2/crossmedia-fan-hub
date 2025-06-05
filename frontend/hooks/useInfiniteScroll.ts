import { useEffect, useRef } from 'react'

export function useInfiniteScroll(
  callback: () => void,
  isLoading: boolean
) {
  const observer = useRef<IntersectionObserver | null>(null)
  const loadRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isLoading) return
    const element = loadRef.current
    if (!element) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback()
      }
    })
    observer.current.observe(element)
    return () => {
      observer.current?.disconnect()
    }
  }, [callback, isLoading])

  return { loadRef }
} 