'use client'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col justify-end items-center h-screen pb-10 gap-2'>
      <Image className="rounded-xl" src="/perro.webp" alt="error" width={200} height={200} />
      <h2 className='text-xl uppercase text-red-600 font-bold'>Algo salio muy mal!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Intenta de nuevo perrin💖
      </button>
    </div>
  )
}