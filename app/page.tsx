import StatsCard from '@/components/dashboardtwo/StatsCard';
import MoneyFlowChart from '@/components/dashboardtwo/MoneyFlowChart';

import { getUserAccounts, getRecentTransactions } from "@/_actions/getAccounts";
import { auth } from "@clerk/nextjs/server";
import { Card } from '@/components/ui/card';
import TransactionList from '@/components/dashboardtwo/TransactionList';


export default async function Dashboard() {
    const { userId } = await auth(); // extract the string
  
    if (!userId) {
      return <div>You must be logged in.</div>;
    }
  
    const accounts = await getUserAccounts(userId);
    const transactions = await getRecentTransactions(userId);
  
    // Identify accounts by type
    const current = accounts.find(a => a.type === "current");
    const savings = accounts.find(a => a.type === "savings");
    const targets = accounts.filter(a => a.type === "target");
  
  return (
      <div>
        <div className='md:flex p-4'>
          <div className='w-full md:w-[67%]'>
            <section className="grid md:grid-cols-2 gap-4 p-4">
              <StatsCard title="Current Account Balance"  balance={current?.balance ?? 0} change="+16%" chart={<div />} />
              <StatsCard title="Savings Account Balance"  balance={savings?.balance ?? 0} change="-0.6%" chart={<div />} />
              {/* <StorageUsage /> */}
            </section>
            <section className="p-4">
                <MoneyFlowChart />
            </section>
          </div>
          <div className='w-full md:w-[33%] p-4'>
            <Card />
          </div>
        </div>
        <section className="p-4 md:px-8">
            <TransactionList transactions={transactions} />
          </section>
      </div>
  );
}