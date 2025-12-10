"use client";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard, CreditCard, TrendingUp, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "Accounts", href: "/accounts", icon: CreditCard },
  { label: "Analytics", href: "/analytics", icon: TrendingUp },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function DashboardNav() {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUser();

  return (
    <nav className="bg-destructive border-b border-primary">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">FT</span>
              </div>
              <span className="text-primary-foreground font-semibold text-lg">FinTech</span>
            </div>
            
            <div className="flex space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeTab;
                return (
                  <Link key={item.label} href={item.href}>
                  <button
                    // key={item.label}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md transition-all",
                      isActive
                        ? "text-primary-foreground border-b-2 border-accent"
                        : "text-primary-foreground/70 hover:text-primary-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-primary-foreground hover:text-primary-foreground/90 transition-colors">
            {!user ?
                <Link href="/sign-in">
                  <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                      Login
                  </button>
                </Link> :
                <div className="hidden md:block">
                    <div className="flex items-center gap-5">
                      <UserButton />
                  </div>
                </div>
            }
            <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
