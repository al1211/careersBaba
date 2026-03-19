import React from 'react'
import Image from "next/image"
const Testimonials = () => {
  return (
    <div className='bg-black px-96 h-2/3 w-full'>
         <div className='bg-white h-full w-full flex items-center justify-center'>
          <Image src="/3.jpeg" alt="hello" width={200} height={400} className='h-96 w-full overflow-hidden object-fill'/>
         </div>
    </div>
  )
}

export default Testimonials