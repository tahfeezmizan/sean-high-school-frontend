
import Link from 'next/link'
import bannerImg from '../../../image/student-banner.jpg'


const Banner = () => {
  return (
    <div style={ {backgroundImage: `url('${bannerImg.src}')`} } className='relative bg-cover bg-no-repeat bg-center  h-[880px] z-0 lg:mb-20'>
       <div className='absolute inset-0 bg-black/55'></div>

        {/* content  */}
        <div className='custom-container z-10'>
        <div className='absolute top-1/3 flex flex-col  space-y-4.5  '>
            <h2 className='text-[#fff] text-[72px]  max-w-4xl leading-20 font-semibold '>Get Your Official High School Transcript in
            Minutes!</h2>
            <p className='text-[#FFFFFF] text-[18px]  max-w-4xl font-normal'>Easily generate a professional, official transcript with all necessary academic details, ready for college applications or personal use.</p>


            <div className=" mt-8">
            <Link
              href="/login"
              className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-4.5 px-10 rounded-full text-white cursor-pointer "
            >
              Create Your Transcript
            </Link>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Banner