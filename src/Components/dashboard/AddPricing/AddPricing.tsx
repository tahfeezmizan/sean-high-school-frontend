'use client';

import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  description: string;
  price: number;
  included: string
};




export default function AddPricingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };






  return (
    <div className='px-4 md:px-6'>

<h2 className="text-[24px] font-bold  text-[#333] my-10">Pricing</h2>



    <form onSubmit={handleSubmit(onSubmit)} className="p-14  rounded-xl space-y-4 bg-[#FFFFFF]">
      {/* Name Field */}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="w-full border border-gray-200  rounded bg-[#F5F7FD] p-3 focus:outline-none"
          placeholder="Enter name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="w-full border border-gray-300 bg-[#F5F7FD] p-3 rounded focus:outline-none"
          placeholder="Enter description"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>



      {/* Price Field */}
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
          className="w-full border border-gray-300 bg-[#F5F7FD] p-3 rounded focus:outline-none"
          placeholder="Enter price"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>


      {/* Price Field */}
      <div>
        <label className="block mb-1 font-medium">Whats Included </label>

        <input 
          type="text"
          step="0.01"
          {...register('included', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
          className="w-full border border-gray-300 bg-[#F5F7FD] p-3 rounded focus:outline-none"
          placeholder="Enter included"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>



      {/* Submit Button */}
      <div className='flex justify-end'>
      <button type="submit" className=" bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-2.5 px-10 rounded-xl text-white cursor-pointer ">
        Update
      </button>
      </div>
    </form>

    </div>
  );
}
