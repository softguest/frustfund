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
        <div className='flex p-4'>
          <div className='w-[67%]'>
            <section className="grid grid-cols-2 gap-4 p-4">
              <StatsCard title="Current Account Balance"  balance={current?.balance ?? 0} change="+16%" chart={<div />} />
              <StatsCard title="Savings Account Balance"  balance={savings?.balance ?? 0} change="-0.6%" chart={<div />} />
              {/* <StorageUsage /> */}
            </section>
            <section className="p-4">
                <MoneyFlowChart />
            </section>
          </div>
          <div className='w-[33%] p-4'>
            <Card />
          </div>
        </div>
        <section className="px-8">
            <TransactionList transactions={transactions} />
          </section>
      </div>
  );
}


// import StatsCard from '@/components/dashboardtwo/StatsCard';
// import MoneyFlowChart from '@/components/dashboardtwo/MoneyFlowChart';

// import { getUserAccounts, getRecentTransactions } from "@/_actions/getAccounts";
// import { auth } from "@clerk/nextjs/server";
// import { Card } from '@/components/ui/card';
// import TransactionList from '@/components/dashboardtwo/TransactionList';

// import GroupsListServer from "@/components/GroupsListServer";

// // Fetch groups server-side
// async function getFirstThreeGroups() {
//   const res = await fetch("/api/groups", {
//     cache: "no-store",
//   });

//   const allGroups = await res.json();
//   return allGroups.slice(0, 3); // get first 3
// }

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div>You must be logged in.</div>;
//   }

//   const accounts = await getUserAccounts(userId);
//   const transactions = await getRecentTransactions(userId);

//   const current = accounts.find(a => a.type === "current");
//   const savings = accounts.find(a => a.type === "savings");

//   const groups = await getFirstThreeGroups();

//   return (
//     <div>
//       <div className="flex p-4">
//         <div className="w-[67%]">
//           <section className="grid grid-cols-2 gap-4 p-4">
//             <StatsCard title="Current Account Balance" balance={current?.balance ?? 0} change="+16%" chart={<div />} />
//             <StatsCard title="Savings Account Balance" balance={savings?.balance ?? 0} change="-0.6%" chart={<div />} />
//           </section>

//           <section className="p-4">
//             <MoneyFlowChart />
//           </section>

//           {/* NEW: Groups Section */}
//           <section className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Suggested Groups</h2>
//             <GroupsListServer groups={groups} />
//           </section>
//         </div>

//         <div className="w-[33%] p-4">
//           <Card />
//         </div>
//       </div>

//       <section className="px-8">
//         <TransactionList transactions={transactions} />
//       </section>
//     </div>
//   );
// }
