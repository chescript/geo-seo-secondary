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

  DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {

  LayoutDashboard,

  BarChart3,

  CreditCard,

  LogOut,

  ArrowUpRight

} from 'lucide-react';





export function Navbar() {

  const { data: session, isPending } = useSession();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

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



  return (

    <nav className="sticky top-4 z-50 w-full px-4 sm:px-6">

      <div className="mx-auto w-full max-w-[1080px]">

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[322px] border border-[#f2f2f2] bg-white px-3.5 py-3 shadow-[0_25px_60px_rgba(0,0,0,0.05)]">

          <Link href="/" className="flex items-center gap-3 text-[#111111] cursor-pointer" aria-label="Geoscanner home">

            <div className="flex h-8 w-8 items-center justify-center rounded-[18px]">

              <Image src="/logos/Logo.png" alt="Geoscanner" width={24} height={24} priority className="h-6 w-6 object-contain" />

            </div>

            <span className="font-neueBit text-[28px] leading-[0.9] tracking-tight sm:text-[32px]">Geoscanner</span>

          </Link>



          <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3">

            {isPending ? (

              <div className="h-9 w-[120px] rounded-full bg-[#f2f0ea] animate-pulse" />

            ) : session ? (

              <div className="flex items-center gap-2 sm:gap-3">

                <DropdownMenu>

                  <DropdownMenuTrigger asChild>

                    <Button

                      variant="ghost"

                      aria-label="Open profile menu"

                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#111111] bg-[#111111] p-0 text-white shadow-[0_18px_35px_rgba(0,0,0,0.22)] focus-visible:ring-offset-0 hover:bg-[#111111] hover:text-white transition-none"

                    >

                      <Avatar className="h-8 w-8 border-0 bg-transparent text-white">

                        <AvatarFallback className="bg-transparent font-neueBit text-[13px] uppercase text-white">

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

                          <Link href="/dashboard" className="flex items-center justify-between gap-3 cursor-pointer">

                            <span className="inline-flex items-center gap-2">

                              <BarChart3 className="h-4 w-4" />

                              Brand Analysis

                            </span>

                            <ArrowUpRight className="h-4 w-4" />

                          </Link>

                        </DropdownMenuItem>

                      <DropdownMenuItem asChild className="rounded-[18px] border border-transparent px-3 py-3 font-apercu text-sm text-[#111111] data-[highlighted]:border-[#111111] data-[highlighted]:bg-white">

                          <Link href="/plans" className="flex items-center justify-between gap-3 cursor-pointer">

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

              </div>

            ) : (

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                <Link

                  href="/login"

                  className="inline-flex h-9 items-center justify-center rounded-full border border-transparent bg-[#f1efea] px-4 font-geist text-[14px] font-medium tracking-[-0.42px] text-[#111111] shadow-inner transition-colors duration-200 hover:border-[#111111] cursor-pointer"

                >

                  Login

                </Link>

                <Link

                  href="/register"

                  className="inline-flex h-9 items-center justify-center rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#282828] to-[#0f0f0f] px-5 font-geist text-[14px] font-medium tracking-[-0.42px] text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:brightness-110 cursor-pointer"

                >

                  Get started

                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>

  );

}





















