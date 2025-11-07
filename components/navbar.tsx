'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  CreditCard,
  LogOut,
  User,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


export function Navbar() {
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: '/chat', label: 'Chat', icon: MessageSquare, authRequired: true },
    { href: '/brand-monitor', label: 'Brand Monitor', icon: BarChart3, authRequired: true },
    { href: '/plans', label: 'Pricing', icon: CreditCard, authRequired: false },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto w-full max-w-[888px] px-4 sm:px-6">
        <div className="flex h-[64px] items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="Geoscanner home">
              <div className="relative h-6 w-[150px]">
                <Image
                  src="/logos/Logo.png"
                  alt="Geoscanner"
                  fill
                  priority
                  className="object-contain"
                  sizes="150px"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    aria-label="Open profile menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#111111] bg-[#111111] p-0 text-white shadow-[0_18px_35px_rgba(0,0,0,0.22)] focus-visible:ring-offset-0"
                  >
                    <Avatar className="h-8 w-8 border-0 bg-transparent text-white">
                      <AvatarFallback className="bg-transparent font-neueBit text-[13px] uppercase tracking-[0.28em] text-white">
                        {session.user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="relative isolate w-72 rounded-[28px] border border-[#ece8dd] bg-[#ffffff] p-4 text-landing-base shadow-[0_35px_80px_rgba(0,0,0,0.12)]"
                  align="end"
                  sideOffset={12}
                  forceMount
                >
                  <div className="relative z-10 space-y-4">
                    <div className="rounded-[20px] border border-[#e9e3d4] bg-[#fdfbf5] px-4 py-4">
                      <p className="font-neueBit text-[18px] leading-tight">{session.user.name || 'Workspace'}</p>
                      <p
                        className="mt-2 truncate font-apercu text-[11px] uppercase tracking-[0.3em] text-[#6a665d]"
                        title={session.user.email || ''}
                      >
                        {session.user.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#8b867c]">
                        Workspace
                      </p>
                      <DropdownMenuItem asChild className="rounded-[18px] border border-transparent px-3 py-3 font-apercu text-sm text-[#111111] data-[highlighted]:border-[#111111] data-[highlighted]:bg-white">
                        <Link href="/dashboard" className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-[18px] border border-transparent px-3 py-3 font-apercu text-sm text-[#111111] data-[highlighted]:border-[#111111] data-[highlighted]:bg-white">
                        <Link href="/brand-monitor" className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Brand Monitor
                          </span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-[18px] border border-transparent px-3 py-3 font-apercu text-sm text-[#111111] data-[highlighted]:border-[#111111] data-[highlighted]:bg-white">
                        <Link href="/plans" className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Billing & plans
                          </span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </DropdownMenuItem>
                    </div>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c3] px-4 py-2 font-apercu text-sm text-[#111111] transition-colors hover:border-[#111111] disabled:opacity-60"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? 'Logging out...' : 'Log out'}
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-[#e6e6e6] px-4 font-geist text-[14px] font-medium tracking-[-0.42px] text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#111111]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-[#0f0f0f] bg-[#0f0f0f] px-4 font-geist text-[14px] font-medium tracking-[-0.42px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => {
                    const targetHref = link.authRequired && !session ? '/login' : link.href;

                    return (
                      <Link
                        key={link.href}
                        href={targetHref}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-gray-100"
                      >
                        <link.icon className="h-5 w-5 text-gray-600" />
                        <span className="text-base font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                  {session ? (
                    <>
                      <div className="border-t my-2" />
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5 text-gray-600" />
                        <span className="text-base font-medium">Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-base font-medium">
                          {isLoggingOut ? 'Logging out...' : 'Log out'}
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="border-t my-2" />
                      <Button variant="outline" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button variant="orange" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}










