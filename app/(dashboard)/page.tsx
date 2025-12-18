// import StatsCard from '@/components/dashboardtwo/StatsCard';
// import MoneyFlowChart from '@/components/dashboardtwo/MoneyFlowChart';
// import TargetGoalsList from '@/components/TargetGoalsList';
// import TransactionList from '@/components/dashboardtwo/TransactionList';
// import AllTopGroups from '@/components/AllTopGroups';
// import { getUserAccounts, getRecentTransactions } from '@/_actions/getAccounts';
// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';

// export default async function Dashboard() {
//   const { userId } = await auth();
//   if (!userId) redirect('/sign-in');

//   const accounts = await getUserAccounts(userId);
//   const transactions = await getRecentTransactions(userId);

//   const current = accounts.find(a => a.type === 'current');
//   const savings = accounts.find(a => a.type === 'savings');
//   const targets = accounts.filter(a => a.type === 'target');

//   return (
//     <div className="space-y-6">
//       <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6'>
//         {/* Left column (2 parts on md+) */}
//         <div>
//           {/* Stats Cards */}
//           <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
//             <StatsCard title="Current Account Balance" balance={current?.balance ?? 0} change="+16%" />
//             <StatsCard title="Savings Account Balance" balance={savings?.balance ?? 0} change="-0.6%" />
//           </section>

//           {/* Money Flow Chart */}
//           <MoneyFlowChart />

//           {/* Target Goals List */}
//           <TargetGoalsList />
//         </div>

//         {/* Right column (1 part on md+) */}
//         <div>
//           <AllTopGroups />
//         </div>
//       </div>

//       {/* Transactions */}
//       <TransactionList transactions={transactions} />
//     </div>
//   );
// }



import StatsCard from '@/components/dashboardtwo/StatsCard';
import MoneyFlowChart from '@/components/dashboardtwo/MoneyFlowChart';
import TargetGoalsList from '@/components/TargetGoalsList';
import TransactionList from '@/components/dashboardtwo/TransactionList';
import AllTopGroups from '@/components/AllTopGroups';
import { getUserAccounts, getRecentTransactions } from '@/_actions/getAccounts';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const accounts = await getUserAccounts(userId);
  const transactions = await getRecentTransactions(userId);

  const current = accounts.find(a => a.type === 'current');
  const savings = accounts.find(a => a.type === 'savings');
  const targets = accounts.filter(a => a.type === 'target');

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatsCard title="Current Account Balance" balance={current?.balance ?? 0} change="+16%" />
            <StatsCard title="Savings Account Balance" balance={savings?.balance ?? 0} change="-0.6%" />
          </section>

          {/* Money Flow Chart */}
          <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
            <MoneyFlowChart />
          </div>

          {/* Target Goals List */}
          <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
            <TargetGoalsList />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
            <AllTopGroups />
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
