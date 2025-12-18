// 'use client';

// import {
//   FiX,
//   FiHome,
//   FiCreditCard,
//   FiRepeat,
//   FiBarChart2,
//   FiHelpCircle,
//   FiUsers,
//   FiFrown,
// } from 'react-icons/fi';
// import Link from 'next/link';

// // Navigation items
// const navItems = [
//   { label: 'Dashboard', href: '/', icon: <FiHome /> },
//   { label: 'Deposit', href: '/dashboard/deposit', icon: <FiCreditCard /> },
//   { label: 'Transfer Money', href: '/dashboard/transfers', icon: <FiRepeat /> },
//   { label: 'Withdrawals', href: '/dashboard/withdraw', icon: <FiFrown /> },
//   { label: 'Transactions', href: '/dashboard/transactions', icon: <FiRepeat /> },
//   { label: 'Groups', href: '/dashboard/groups', icon: <FiUsers /> },
//   { label: 'Reporting', href: '/reporting', icon: <FiBarChart2 /> },
//   { label: 'Help & Support', href: '/support', icon: <FiHelpCircle /> },
// ];

// const navAdmins = [
//   { label: 'Admin KYC', href: '/admin/kyc', icon: <FiHome /> },
//   { label: 'Users', href: '/admin/users', icon: <FiCreditCard /> },
//   { label: 'Withdraw Request', href: '/admin/withdrawals', icon: <FiRepeat /> },
// ];

// // ✅ Define component props
// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
//         <div className="flex space-x-2">
//           <div className="h-[30px] w-[30px] rounded-full bg-destructive" />
//           <h2 className="text-xl font-bold text-destructive mb-6">TRUSTFUND</h2>
//         </div>

//         <ul className="p-4">
//           {navItems.map((item) => (
//             <li key={item.label} className="mb-4">
//               <Link
//                 href={item.href}
//                 className="flex items-center gap-3 text-gray-700 hover:text-red-600"
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="bg-destructive w-full px-4 py-2 flex items-center mt-6 font-bold text-white">
//           Admin Area
//         </div>

//         <ul className="p-4">
//           {navAdmins.map((item) => (
//             <li key={item.label} className="mb-4">
//               <Link
//                 href={item.href}
//                 className="flex items-center gap-3 text-gray-700 hover:text-red-600"
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Mobile Sidebar */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
//           <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-lg">
//             {/* Close Button */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="h-[30px] w-[30px] rounded-full bg-destructive" />
//               <h2 className="text-xl font-extrabold text-red-600">TRUSTFUND</h2>
//               <button onClick={onClose} className="text-gray-700 text-2xl">
//                 <FiX />
//               </button>
//             </div>

//             {/* Nav Items */}
//             <ul className="p-4">
//               {navItems.map((item) => (
//                 <li key={item.label} className="mb-4">
//                   <Link
//                     href={item.href}
//                     className="flex items-center gap-3 text-gray-700 hover:text-red-600"
//                     onClick={onClose}
//                   >
//                     {item.icon}
//                     <span>{item.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             {/* Admin */}
//             <div className="bg-destructive w-full px-4 py-2 mt-6 font-bold text-white">
//               Admin Area
//             </div>

//             <ul className="p-4">
//               {navAdmins.map((item) => (
//                 <li key={item.label} className="mb-4">
//                   <Link
//                     href={item.href}
//                     onClick={onClose}
//                     className="flex items-center gap-3 text-gray-700 hover:text-red-600"
//                   >
//                     {item.icon}
//                     <span>{item.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


'use client';

import {
  FiX,
  FiHome,
  FiCreditCard,
  FiRepeat,
  FiBarChart2,
  FiHelpCircle,
  FiUsers,
  FiFrown,
} from 'react-icons/fi';
import Link from 'next/link';

// Navigation items
const navItems = [
  { label: 'Dashboard', href: '/', icon: <FiHome /> },
  { label: 'Deposit', href: '/dashboard/deposit', icon: <FiCreditCard /> },
  { label: 'Transfer Money', href: '/dashboard/transfers', icon: <FiRepeat /> },
  { label: 'Withdrawals', href: '/dashboard/withdraw', icon: <FiFrown /> },
  { label: 'Transactions', href: '/dashboard/transactions', icon: <FiRepeat /> },
  { label: 'Groups', href: '/dashboard/groups', icon: <FiUsers /> },
  { label: 'Reporting', href: '/reporting', icon: <FiBarChart2 /> },
  { label: 'Help & Support', href: '/support', icon: <FiHelpCircle /> },
];

const navAdmins = [
  { label: 'Admin KYC', href: '/admin/kyc', icon: <FiHome /> },
  { label: 'Users', href: '/admin/users', icon: <FiCreditCard /> },
  { label: 'Withdraw Request', href: '/admin/withdrawals', icon: <FiRepeat /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const SidebarContent = (
    <div className="relative flex flex-col p-4 space-y-6 w-full">
      {/* Logo */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-red-600 shadow-md" />
          <h2 className="text-2xl font-extrabold text-red-600 tracking-wide">TRUSTFUND</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-700 md:hidden text-2xl hover:text-red-600 transition"
        >
          <FiX />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-3">
        {navItems.map(item => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="
              flex items-center gap-3 p-3 rounded-xl text-gray-200 bg-slate-100
              hover:bg-red-700 text-gray-700 hover:text-white transition
              backdrop-blur-md
            "
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium ">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Admin Section */}
      <div>
        <div className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg mb-2">
          Admin Area
        </div>
        <nav className="flex flex-col gap-2">
          {navAdmins.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="
                flex items-center gap-3 p-3 rounded-xl text-gray-200 bg-slate-100
              hover:bg-red-700 text-gray-700 hover:text-white transition
              backdrop-blur-md
              "
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-lg">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-white/20 bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Sliding Sidebar */}
          <div className="relative flex flex-col w-64 h-full bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-lg animate-slide-in">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
