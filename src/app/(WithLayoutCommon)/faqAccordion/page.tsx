import Faq from '@/Components/Faq/Faq'
import React from 'react'

const page = () => {
  return (
    <div className=' custom-container !my-20'>
         <h1 className='text-[40px] text-gray-700 font-semibold text-center my-10 '>FAQ</h1>

        <div className='flex flex-col md:flex-row justify-between '>
            <h1 className='text-[40px] text-gray-700 font-semibold '>Frequently Asked Questions</h1>

            <div>
               <Faq/>
            </div>
        </div>
    </div>
  )
}

export default page