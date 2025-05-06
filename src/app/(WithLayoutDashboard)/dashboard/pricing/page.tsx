import Header from "@/Components/dashboard/Header/Header"
import DashboardPricing from "@/Components/dashboard/Pricing/Pricing"
// import UserPricing from "@/Components/dashboard/Pricing/UserPricing"


const pricing = () => {
  return (
    <div>
        <Header/>
      {/* <UserPricing /> */}
      <DashboardPricing/>
    </div>
  )
}

export default pricing