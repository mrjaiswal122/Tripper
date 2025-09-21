import { inriaSerif, italianno } from '@/libs/font';
import React from 'react'

type Props = {}

function GetInTouch({}: Props) {
  return (
<section className='relative '>
    <div className='mb-3'>
        <h1 className={`${inriaSerif.className} w-fit mx-auto`}>Get in Touch</h1>
        <h2 className={`${italianno.className} text-[#C52F23] text-5xl mx-auto w-fit`}>Have questions about monasteries, festivals, or planning your visit? We’re here to guide you.</h2>
    </div>
    <div className='flex w-[85vw] mx-auto'>

    <div className='flex-1 flex flex-col gap-10 justify-center items-center'>
        <form action="" className='grid grid-cols-2 gap-10'>
            <label htmlFor="name" className="flex flex-col gap-1">
                ENTER YOUR NAME
                <input id="name" type="text" className="border-b-2 border-black bg-transparent outline-none" />
            </label>
            <label htmlFor="email" className="flex flex-col gap-1">
                ENTER YOUR EMAIL
                <input id="email" type="text" className="border-b-2 border-black bg-transparent outline-none" />
            </label>
            <label htmlFor="phone" className="flex flex-col gap-1">
                ENTER YOUR PHONE NUMBER
                <input id="phone" type="text" className="border-b-2 border-black bg-transparent outline-none" />
            </label>
            <label htmlFor="message" className="flex flex-col gap-1">
                ENTER YOUR MESSAGE HERE
                <input id="message" type="text" className="border-b-2 border-black bg-transparent outline-none" />
            </label>
        </form>
        <button className={`${inriaSerif.className} w-fit mx-auto border p-3`}>SUBMIT</button>
    </div>
    <div className='flex-1 px-10 w-fit h-fit relative'>
        <img src="/wallking_monk.jpg" alt="walking_monk" className='object-cover' />
        <div className='absolute bg-[#757B66] h-5/6 w-1/2 top-10 -right-5 -z-40'></div>
    </div>
    </div>
    <div className='h-10 w-full bg-[#757B66] absolute bottom-0 left-0 -z-50'></div>
</section>  )
}

export default GetInTouch;