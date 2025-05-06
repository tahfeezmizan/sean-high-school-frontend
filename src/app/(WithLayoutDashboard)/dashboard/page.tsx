import Header from "@/Components/dashboard/Header/Header";
import OrdersTable from "@/Components/dashboard/OrderList/OrderList";
// import CardList from "@/Components/dashboard/OverView/CardList";
import StatisticsCards from "@/Components/dashboard/OverView/StatisticsCards";
// import OverViewOrderListTable from "@/Components/dashboard/OverView/OverViewOrderList";


const page = () => {



  return (
    <div>
        <Header/>
      {/* <CardList /> */}
      <StatisticsCards/>
        <OrdersTable/>
    </div>
  )
}

export default page;