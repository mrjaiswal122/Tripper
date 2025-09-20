import { inriaSerif, italianno } from '@/libs/font'
import React from 'react'

type Props = {}

export default function section3({}: Props) {
  return (
    <section className='flex  bg-[#757B66] text-white w-full h-full'>
        <div className='flex-2 p-10 '>
            <h1 className={`${inriaSerif.className} w-fit mx-auto`}>CULTURAL PRESERVATION</h1>
            <h2 className={`${italianno.className} text-4xl w-fit mx-auto pt-6 pb-4`}>Preserving Fading Wisdom</h2>
            <p className={`${inriaSerif.className}`}>Amidst the serene landscapes of Sikkim, monasteries stand as living guardians of traditions that risk fading with time. Their sacred halls protect ancient manuscripts, ritual chants, and symbolic art that embody the essence of Buddhist philosophy. Each prayer wheel spun and each festival celebrated is not only an act of devotion but also a quiet effort to keep centuries-old wisdom alive for future generations. In preserving these spiritual and cultural treasures, Sikkim safeguards a heritage that continues to inspire harmony, mindfulness, and reverence for life.</p>
        </div>
        <div className={`${inriaSerif.className} flex-1 flex flex-col justify-center   p-3 `}>
          <a href="">ARCHIVED MANUSCRIPTS</a>
          <a href="">MONK INTERVIEWS</a>
          <a href="">QUOTES</a>
        </div>
    </section>
  )
}