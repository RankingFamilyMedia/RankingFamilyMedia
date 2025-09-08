
"use client";

import Link from "next/link";
import {
  Music,
  Home,
  ShoppingCart,
  Newspaper,
  Users,
  Video,
  Headphones,
  UserPlus,
  ShieldCheck,
  Megaphone,
  Info,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import React from 'react';

const navLinks = [
  { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { href: "/about", label: "About", icon: <Info className="h-5 w-5" /> },
  { href: "/services", label: "Services", icon: <Users className="h-5 w-5" /> },
  { href: "/beats", label: "Buy Beats", icon: <ShoppingCart className="h-5 w-5" /> },
  { href: "/music", label: "Music", icon: <Headphones className="h-5 w-5" /> },
  { href: "/videos", label: "Videos", icon: <Video className="h-5 w-5" /> },
  { href: "/news", label: "News", icon: <Newspaper className="h-5 w-5" /> },
  { href: "/promotions", label: "Promotions", icon: <Megaphone className="h-5 w-5" /> },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-black/50 px-4 md:px-8 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Music className="h-8 w-8 text-primary" />
          <span className="text-xl md:text-2xl font-bold text-white shrink-0">
            Ranking Family Multimedia
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm lg:flex">
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2 text-white hover:text-primary">
              {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4' })} {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
           <Link href="/contact">
              <Button>
               Contact Us
              </Button>
           </Link>
          <Link href="/admin">
            <Button variant="secondary">
              <ShieldCheck className="mr-2 h-4 w-4" /> Admin
            </Button>
          </Link>
        </div>
        <div className="lg:hidden">
            <Button onClick={toggleMobileMenu} variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-white" />
            </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMobileMenu}
      >
        <div 
          className="mobile-menu-content absolute top-0 right-0 h-full w-2/3 max-w-sm bg-gray-900/90 p-8 transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Button onClick={toggleMobileMenu} variant="ghost" size="icon" className="absolute top-4 right-4">
            <X className="h-8 w-8 text-white" />
          </Button>
          <nav className="flex flex-col items-start gap-8 mt-16">
            {navLinks.map(({ href, label, icon }) => (
              <Link key={href} href={href} onClick={toggleMobileMenu} className="flex items-center gap-4 text-white text-xl hover:text-primary">
                {icon}
                <span>{label}</span>
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-8 w-full">
              <Link href="/contact" onClick={toggleMobileMenu}>
                  <Button className="w-full text-lg h-12">Contact Us</Button>
              </Link>
              <Link href="/admin" onClick={toggleMobileMenu}>
                <Button variant="secondary" className="w-full text-lg h-12">
                  <ShieldCheck className="mr-2 h-5 w-5" /> Admin
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
