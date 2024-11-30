import { fetchLatestInvoices, fetchRevenue,fetchCardData } from "../lib/data"
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from "react";
import { RevenueChartSkeleton } from "../ui/skeletons";

export default async function Pages(){
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
//3

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl py-10 flex justify-center items-center `}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" /> 
        <Card title="Pending" value={totalPendingInvoices} type="pending" /> 
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> 
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton></RevenueChartSkeleton>}>
         <RevenueChart />
         </Suspense>
        {<Suspense fallback={<RevenueChartSkeleton></RevenueChartSkeleton>}>
          <LatestInvoices  /> 
          </Suspense>
          } 
      </div>
    </main>
  );
}
