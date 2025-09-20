import React from 'react'
import {inriaSerif, italianno} from "@/libs/font"
type Props = {}

function section2({}: Props) {
  return (
    <div className=' w-[100vw] relative  mt-10  '>
        <div className='flex w-[85%] mx-auto'>

        
        <div className='flex-1'>
            <img src="/S1.jpg" alt="s1" className='h-full object-cover p-8 ' />
        </div>
        <div className='flex-2 pr-10'>
            <h1 className={`${inriaSerif.className} w-fit mx-auto text-2xl`}>Sacred Monasteries of Sikkim</h1>
            <h2 className={`${italianno.className} text-[#C52F23] text-4xl`}>Journey through ancient walls that echo with chants, wisdom, and timeless traditions.</h2>
            <p className={`${inriaSerif.className} p-3`}>"Stepping into the sacred monasteries of Sikkim is like entering a realm where time slows down, and every corner whispers stories of devotion and resilience. The ancient walls, adorned with intricate murals and prayer wheels, carry the voices of generations who sought peace, knowledge, and enlightenment within these sanctuaries. As chants resonate through the crisp mountain air, one feels the seamless blend of spirituality and nature, a reminder that these monasteries are not just places of worship, but living treasures that preserve wisdom, culture, and timeless traditions."</p>
            <div className='flex gap-3 ' >
                <img src="/S2.jpg" alt="s2" className='flex-1 pb-8 w-[33%] object-cover'/>
                <img src="/S3.jpg" alt="s3" className='flex-1 pb-8 w-[33%] object-cover'/>
                <img src="/S4.jpg" alt="s4" className='flex-1 pb-8 w-[33%] object-cover'/>
            </div>
        </div>
        </div>
        <div className='absolute left-0 top-0 w-[100vw] h-3/4 bg-[#F4F0ED] -z-10'></div>
    </div>
  )
}

export default section2