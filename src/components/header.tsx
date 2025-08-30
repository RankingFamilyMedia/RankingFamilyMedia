
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-black/50 px-8 backdrop-blur-sm">
      <Link href="/home" className="flex items-center gap-2">
        <Music className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-white shrink-0">
          Ranking Family Multimedia
        </span>
      </Link>
      <nav className="hidden items-center gap-4 text-sm lg:flex">
        <Link
          href="/home"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Home className="h-4 w-4" /> Home
        </Link>
         <Link
          href="/about"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Info className="h-4 w-4" /> About
        </Link>
        <Link
          href="/services"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Users className="h-4 w-4" /> Services
        </Link>
        <Link
          href="/beats"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <ShoppingCart className="h-4 w-4" /> Buy Beats
        </Link>
         <Link
          href="/music"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Headphones className="h-4 w-4" /> Music
        </Link>
        <Link
          href="/videos"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Video className="h-4 w-4" /> Videos
        </Link>
        <Link
          href="/news"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Newspaper className="h-4 w-4" /> News
        </Link>
         <Link
          href="/promotions"
          className="flex items-center gap-2 text-white hover:text-primary"
        >
          <Megaphone className="h-4 w-4" /> Promotions
        </Link>
      </nav>
      <div className="hidden items-center gap-4 md:flex">
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
    </header>
  );
}
