import Sidebar from '@/components/dashboardtwo/Sidebar';
import DashboardHeader from '@/components/dashboardtwo/DashboardHeader';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex">
      <Sidebar />
        <main className="flex-1 bg-gray-50">
          <DashboardHeader />
            {/* Main content */}
            {children}
        </main>
    </div>
  )
}