"use client"
import { BookText, SlidersHorizontal,LockKeyhole } from 'lucide-react';



const FeatureCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: React.ElementType }) => {
  return (
    <div className="py-8">
      

      <div className='flex flex-col justify-center items-center '>
        <div className='w-[90px] h-[90px] rounded-full bg-[#E6F2FD] flex justify-center items-center'>
        <Icon className="text-blue-500 " size={36} />
        </div>
        <h3 className="text-center text-gray-800 text-[22px] font-[700] mt-5 ">{title}</h3>
        <p className="text-center text-[18px] text-[#5C5C5C] mt-4">{description}</p>
      </div>

    </div>
  )
}







const HowItWork = () => {
  const features = [
    {
      title: "Fill out the form",
      description: "Provide your personal and academic details in a simple, easy-to-follow form.",
      icon: BookText
    },
    {
      title: "Choose your layout",
      description: "Select your preferred transcript layout, whether by grade level or subject area.",
      icon: SlidersHorizontal
    },
    {
      title: "Secure payment",
      description: "Complete your transaction with secure payment options for peace of mind.",
      icon: LockKeyhole
    },
    {
      title: "Download PDF",
      description: "Get your official transcript instantly with a downloadable, verified PDF.",
      icon: BookText
    },
  ];

  return (
    <section className='my-8 lg:mt-20 mb-20 bg-[#F1F8FE] py-16'> 


    <div className='custom-container '> 
        <h2 className='text-[48px] font-bold text-[#333333] text-center' >How it <span className='text-[#2A89E2]'>works</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((item, index) => (
        <FeatureCard
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
    </div>
    </section>
  )
}

export default HowItWork;
