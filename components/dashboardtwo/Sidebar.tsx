'use client';

import { useState } from 'react';
// import { auth } from '@clerk/nextjs/server';
import { FiMenu, FiX, FiHome, FiCreditCard, FiRepeat, FiBarChart2, FiHelpCircle, FiUsers, FiFrown } from 'react-icons/fi';
import Link from 'next/link';

// ⭐ NEW: Navigation items as objects with label, href, and icon
const navItems = [
  { label: 'Dashboard', href: '/', icon: <FiHome className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Deposit', href: '/dashboard/deposit', icon: <FiCreditCard className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Transfer Money', href: '/dashboard/transfers', icon: <FiRepeat className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'withdrawals', href: '/dashboard/withdraw', icon: <FiFrown className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Transactions', href: '/dashboard/transactions', icon: <FiRepeat className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Groups', href: '/dashboard/groups', icon: <FiUsers className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Reporting', href: '/reporting', icon: <FiBarChart2 className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Help & Support', href: '/support', icon: <FiHelpCircle className="transition-transform duration-200 group-hover:scale-110" /> },
];

const navAdmins = [
  { label: 'Admin KYC', href: '/admin/kyc', icon: <FiHome className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Users', href: '/admin/users', icon: <FiCreditCard className="transition-transform duration-200 group-hover:scale-110" /> },
  { label: 'Withdraw Request', href: '/admin/withdrawals', icon: <FiRepeat className="transition-transform duration-200 group-hover:scale-110" /> },
];

export default async function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  // const thisUser = await auth();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 top-4">
        <button onClick={() => setIsOpen(true)} className="text-red-600 text-2xl">
          <FiMenu />
        </button>
        <h2 className="hidden md:block text-lg font-extrabold text-red-600">TRUSTFUND</h2>
      </div>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-8 md:w-64 bg-white border-r border-gray-200 h-screen p-4">
        <div className='flex space-x-2'>
          <div className='h-[30px] w-[30px] rounded-full bg-red-500'/>
          <h2 className="text-xl font-bold text-red-600 mb-6">TRUSTFUND</h2>
        </div>
        <ul className='p-4'>
          {navItems.map(item => (
            <li key={item.label} className="mb-4">
              <Link
                href={item.href}
                className="flex items-center gap-3 text-gray-700 hover:text-red-600 group"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Admin Nativation Links  */}
        <div className='bg-red-500 w-full px-4 py-2 flex items-center mt-6 font-bold text-white space-x-2' ><FiMenu className='' size="26"/> <div className=''>Admin Area</div></div>
        {/* <hr className="my-2" /> */}
        <ul className='p-4'>
          {navAdmins.map(item => (
            <li key={item.label} className="mb-4">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-red-600 group"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-red-600">TRUSTFUND</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-700 text-2xl">
                <FiX />
              </button>
            </div>
            {/* User Navigations  */}
            <ul>
              {navItems.map(item => (
                <li key={item.label} className="mb-4">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 group"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
             {/* Admin Nativation Links  */}
            <div className='bg-red-500 w-full px-4 py-2 flex items-center mt-6 font-bold text-white space-x-2' ><FiMenu className='' size="26"/> <div className=''>Admin Area</div></div>
            {/* <hr className="my-2" /> */}
            <ul className='p-4'>
              {navAdmins.map(item => (
                <li key={item.label} className="mb-4">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 group"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
