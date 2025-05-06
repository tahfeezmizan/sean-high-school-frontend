import AcademicJourney from '@/Components/Home/AcademicJourney/AcademicJourney'
import Banner from '@/Components/Home/Banner/Banner'
import ChooseusPage from '@/Components/Home/Chooseus/ChooseusPage'
import HowItWork from '@/Components/Home/HowItWork/HowItWork'
import Pricing from '@/Components/Home/Pricing/Pricing'
import TestimonialsSection from '@/Components/Home/TestimonialsSection/TestimonialsSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <Banner/>
      <AcademicJourney/>
      <ChooseusPage/>
      <HowItWork/>
      <Pricing/>
      <TestimonialsSection/>
    </div>
  )
}

export default page