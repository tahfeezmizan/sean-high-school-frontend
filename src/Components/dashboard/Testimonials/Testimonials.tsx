/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import TestimonialsModal from "@/Components/modal/TestimonialsModal"
import { useAddReviewOnHomepageMutation, useGetAllReviewQuery } from "@/Redux/apis/review.ts/reviewApi"
import { useState } from "react"
import { TTestimonialsType } from "../../../../Type"
import { Button } from "@/ui/Button"
import { toast } from "sonner"
import TableLoading from "@/Components/Loading/TableLoading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/Table"




export default function TestimonialsTable() {
  const [selectedOrder, setSelectedOrder] = useState<TTestimonialsType | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch data with pagination parameters
  const { data, isLoading, isError } = useGetAllReviewQuery({
    page: currentPage,
    limit: itemsPerPage
  })

  console.log(data?.data, 'ddd');

  // Handle modal operations
  const handleRowClick = (order: TTestimonialsType) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedOrder(null)
    setShowModal(false)
  }

  // const openModal = () => {
  //   setShowModal(true)
  //   setIsModalOpen(false)
  // }

  const [addOnHomePage] = useAddReviewOnHomepageMutation()

  const handleAddOnWebsite = async () => {
    try {
      await addOnHomePage({ id: selectedOrder?.id }).unwrap()

      toast.success("Added review on home page successfully")
      closeModal()
    } catch (error: any) {
      console.log(error);
      closeModal()
      toast.error(error.data?.message || "Failed to add review on home page")
    }
  }

  if (isLoading) {
    return <TableLoading />
  }
  if (isError) return <div>Error loading testimonials</div>

  return (
    <div>
      <div className="p-4 md:px-6 overflow-hidden relative z-20">
        <h2 className="text-[24px] font-bold text-[#333] mb-6 mt-3">
          Testimonials
        </h2>

        <div className="overflow-x-auto bg-[#fff] rounded-b-xl rounded-t-xl pb-5">
          <Table className="min-w-[800px] text-sm">
            <TableHeader className="bg-[#D3EAFF] rounded-t-2xl px-3">
              <TableRow className="text-[#414141] text-[16px]">
                <TableHead className="py-4.5 px-4 text-left">Sl.</TableHead>
                <TableHead className="py-4.5 px-4 text-left">Name</TableHead>
                <TableHead className="py-4.5 px-4 text-left">Email</TableHead>
                <TableHead className="py-4.5 px-4 text-left">Rating</TableHead>
                <TableHead className="py-4.5 px-4 text-left">Review Text</TableHead>
                <th className="py-4.5 px-4 text-left relative">Action</th>

              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((order: TTestimonialsType, index: number) => (
                <TableRow 
                  key={order.id}
                  onClick={() => handleRowClick(order)}
                  className="border-b border-gray-200 text-[#767676] text-[16px] hover:bg-gray-50 cursor-pointer"
                >
                  <TableCell className="py-4.5 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell >
                  <TableCell className="py-4.5 px-4">{order.user.name}</TableCell>
                  <TableCell className="py-4.5 px-4 text-[#2A89E2]">{order.user.email}</TableCell>
                  <TableCell className="py-4.5 px-4">{order.rating}</TableCell>
                  <TableCell className="py-4.5 px-4">{order.review}</TableCell>
                  <TableCell
                    className="py-4.5 px-4 text-right"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsModalOpen(!isModalOpen)
                    }}
                  >
                    <Button onClick={handleAddOnWebsite} className="flex items-center ">{order.isOnHomePage ? "Remove HomePage" : "Add HomePage"}</Button>
      

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

        {showModal && selectedOrder && (
          <TestimonialsModal
            selectedOrder={selectedOrder}
            closeModal={closeModal}
          />
        )}
      </div>
    
    </div>
  )
}