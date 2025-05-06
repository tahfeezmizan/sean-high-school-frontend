"use client";

import Link from "next/link";


const orders = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: "milon ahmed shuvo",
  email: "information@gmail.com",
  info: "Lorem ipsum dolor sit amet",
  plan: "Weekly",
  price: "$9.99",
  date: "01/01/2025 - 08/01/2025",
}));






export default function OverViewOrderListTable() {
  


  return (
    <div>
    <div className="p-4 md:px-6">
      <div className="flex justify-between items-center mb-2">
      <h1 className="text-2xl font-semibold text-[#333333] mb-6 mt-4">Order List</h1>
      <button>
          <Link
            href="/dashboard/orderList"
            className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-3.5 px-5 rounded-xl text-white cursor-pointer "
          >
            View all
          </Link>
        </button>

      </div>



      <div  className="overflow-x-auto bg-[#fff] rounded-b-xl rounded-t-xl  pb-5">
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
            {orders.map((order, index) => (
              <tr key={order.id}   className="border-b border-gray-200 text-[#767676] text-[16px]">
                <td className="py-4.5 px-4">{index + 1}</td>
                <td className="py-4.5 px-4">{order.name}</td>
                <td className="py-4.5 px-4 text-[#2A89E2]">{order.email}</td>
                <td className="py-4.5 px-4">{order.info}</td>
                <td className="py-4.5 px-4">{order.plan}</td>
                <td className="py-4.5 px-4">{order.price}</td>
                <td className="py-4.5 px-4 text-center !ml-[300px]">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
