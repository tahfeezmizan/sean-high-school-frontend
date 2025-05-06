
import { TSubscription } from "../../../Type";


interface TOderModalProps {
    selectedOrder: TSubscription | null;
    closeModal: () => void;
  }


const OrderModal = ({ selectedOrder, closeModal }:TOderModalProps) => {


    console.log('order', selectedOrder)


  return (
    <div>
         <div className="fixed inset-0 flex items-center justify-center  z-50">
          <div className="bg-white px-9 pb-10 pt-12 rounded-lg shadow-lg w-full max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 cursor-pointer font-bold"
            >
              ✕
            </button>
            <h3 className="text-[32px] text-[#333333] font-semibold mb-4">User information</h3>

            <div className="border border-gray-200 rounded-lg p-6">
                 {/* user information design  */}
                 <div className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <h1 className="text-[#333] text-[19px] ">Name:</h1>
                    <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.user?.name}</h1>
                 </div>


                 <div className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <h1 className="text-[#333] text-[19px] ">Email:</h1>
                    <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.user?.email}</h1>
                 </div>


                 <div className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <h1 className="text-[#333] text-[19px] ">Info:</h1>
                    <h1 className="text-[#5C5C5C] text-[18px]">{"selectedOrder?.info"}</h1>
                 </div>

                 <div className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <h1 className="text-[#333] text-[19px] ">Plan:</h1>
                    <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.plan?.planName}</h1>
                 </div>

                 <div className="grid grid-cols-2 py-4 border-b border-gray-200">
                    <h1 className="text-[#333] text-[19px] ">Price:</h1>
                    <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.amount}</h1>
                 </div>


            </div>


          </div>
        </div>
    </div>
  )
}

export default OrderModal