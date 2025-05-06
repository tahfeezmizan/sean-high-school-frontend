import Header from "@/Components/dashboard/Header/Header"
import OrderList from "@/Components/dashboard/OrderList/OrderList";
// import OrderList from "@/Components/dashboard/OrderList/OrderList"


// const data = [
//     {
//       name: 'John Doe',
//       email: 'john@example.com',
//       info: 'Premium User',
//       plan: 'Gold',
//       price: '$49.99',
//       startDate: '2025-05-01',
//       endDate: '2026-05-01',
//     },
//     {
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       info: 'Basic User',
//       plan: 'Silver',
//       price: '$19.99',
//       startDate: '2025-06-01',
//       endDate: '2026-06-01',
//     },
//   ];



const page = () => {

  return (
    <div>
       <Header/> 
       {/* <Table data={data} /> */}
       <OrderList/>
    </div>
  )
}

export default page