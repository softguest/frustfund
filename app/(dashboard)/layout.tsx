// 'use client';

// import Sidebar from '@/components/dashboardtwo/Sidebar';
// import { useState } from 'react';
// import DashboardHeader from '@/components/dashboardtwo/DashboardHeader';

// export default function Layout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
      
//       {/* Sidebar */}
//       <Sidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />
//       {/* Main content */}
//       <main className="flex-1 flex flex-col overflow-x-hidden">
//         {/* Header */}
//         <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />
//         {/* Page Content */}
//         <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import Sidebar from '@/components/dashboardtwo/Sidebar';
import { useState } from 'react';
import DashboardHeader from '@/components/dashboardtwo/DashboardHeader';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {/* Header */}
        <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Glassy page container */}
          <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-6 min-h-[calc(100vh-80px)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
