"use client";

import OrderModal from "@/Components/modal/OrderModal";
import { useState } from "react";
import { TSubscription } from "../../../../Type";
import { useGetAllSubscriptionQuery } from "@/Redux/apis/subscription.ts/subscription";
import { formatDateTime } from "../../../../utils/formattedDate";
import TableLoading from "@/Components/Loading/TableLoading";



export default function OrdersTable() {
  const [selectOrder, setSelectedOrder] = useState<TSubscription | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch data with pagination parameters
  const { data, isLoading, isError } = useGetAllSubscriptionQuery({
    page: currentPage,
    limit: itemsPerPage
  })


  console.log(data?.data, "data");

  // handle modal 
  const handleRowClick = (order: TSubscription) => {
    setSelectedOrder(order);
    setShowModal(true)
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false)
  };

 

  if (isLoading) return <TableLoading/>
  if (isError) return <div>Error loading testimonials</div>

  return (
    <div>
      <div className="p-4 md:px-6">
        <h1 className="text-2xl font-semibold text-[#333333] mb-6 mt-4">Order List</h1>


        <div className="overflow-x-auto bg-[#fff] rounded-b-xl rounded-t-xl  pb-5">

          <table className="w-full min-w-max table-auto text-sm ">


            <thead className="bg-[#D3EAFF] rounded-t-2xl px-3 ">
              <tr className="text-[#414141] text-[16px]">
                <th className="py-4.5 px-4 text-left">Sl.</th>
                <th className="py-4.5 px-4 text-left">Name</th>
                <th className="py-4.5 px-4 text-left">Email</th>
                <th className="py-4.5 px-4 text-left">Info</th>
                <th className="py-4.5 px-4 text-left">Plan</th>
                <th className="py-4.5 px-4 text-left">Price</th>
                <th className="py-4.5 px-4 text-center">Start & End Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((order: TSubscription, index: number) => (
                <tr key={order.id} onClick={() => handleRowClick(order)} className="border-b border-gray-200 text-[#767676] text-[16px]">
                  <td className="py-4.5 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="py-4.5 px-4">{order?.user?.name}</td>
                  <td className="py-4.5 px-4 text-[#2A89E2]">{order.user?.email}</td>
                  <td className="py-4.5 px-4">{"order.info"}</td>
                  <td className="py-4.5 px-4">{order.plan?.planName}</td>
                  <td className="py-4.5 px-4">{order.amount}</td>
                  <td className="py-4.5 px-4 text-center !ml-[300px]">{formatDateTime(order.startDate).formattedDate} - {formatDateTime(order.endDate!).formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {data?.meta && (
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              &lt;
            </button>

            {Array.from({ length: data.meta.totalPage }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${currentPage === idx + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, data.meta.totalPage))
              }
              disabled={currentPage === data.meta.totalPage}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        )}

      </div>



      {/* Modal */}
      {
        showModal && selectOrder && <OrderModal
          selectedOrder={selectOrder}
          closeModal={closeModal}
        />
      }


    </div>
  );
}
