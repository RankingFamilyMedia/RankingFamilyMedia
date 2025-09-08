
"use client";

import Link from "next/link";
import { Music, Facebook, Twitter, Instagram, Youtube, Linkedin, Rss, Podcast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#121212] py-12 px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">
              Ranking Family Multimedia
            </span>
          </Link>
          <p className="mt-4 text-gray-400">
            Crafting the Sound of Tomorrow. Welcome to the Family.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="https://web.facebook.com/Rankingfamilyrecords/" target="_blank" className="text-gray-400 hover:text-white"><Facebook /></Link>
            <Link href="https://twitter.com/RankingfamilyGh" target="_blank" className="text-gray-400 hover:text-white"><Twitter /></Link>
            <Link href="https://www.instagram.com/rankingfamilyrecords/" target="_blank" className="text-gray-400 hover:text-white"><Instagram /></Link>
            <Link href="https://www.youtube.com/channel/UCU0aSYIWwnmz_Tmh_ygzp4w" target="_blank" className="text-gray-400 hover:text-white"><Youtube /></Link>
            <Link href="https://www.linkedin.com/in/mcperry-imaginations-779996233/" target="_blank" className="text-gray-400 hover:text-white"><Linkedin /></Link>
            <Link href="https://www.pinterest.com/rankingfamilyRecords" target="_blank" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pinterest"><path d="M12.54 11.53 8.62 7.6a1.27 1.27 0 0 0-1.8 0l-2.05 2.06a1.27 1.27 0 0 0 0 1.8l4.42 4.42a1.27 1.27 0 0 0 1.8 0l2.06-2.05a1.27 1.27 0 0 0 0-1.8Z"/><path d="m12.54 11.53 4.42 4.42a1.27 1.27 0 0 0 1.8 0l2.06-2.05a1.27 1.27 0 0 0 0-1.8l-4.42-4.42a1.27 1.27 0 0 0-1.8 0Z"/><path d="M16 22a2 2 0 0 0 2-2V10"/><path d="M9.32 2.15A2 2 0 0 0 7.9 3.56L2.64 8.82a2 2 0 0 0 0 2.82l8.48 8.48a2 2 0 0 0 2.82 0l5.26-5.26a2 2 0 0 0-1.4-3.42l-2.22-.38a2 2 0 0 1-1.58-1.58l-.38-2.22a2 2 0 0 0-3.42-1.41Z"/></svg>
            </Link>
            <Link href="https://vimeo.com/user203161744" target="_blank" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-vimeo"><path d="M22 6.15s-2.45-2.6-4.9-2.6A4.47 4.47 0 0 0 13.55 6c-1.54-1.8-3.5-2.55-5.55-2.55c-2.4 0-4.05 1.5-4.05 4.5c0 2.25 1.2 4.95 3.3 8.55c1.8 3.01 3.61 5.95 5.7 5.95s3.6-2.55 3.6-5.85c0-2.4-1.5-4.05-3.6-4.05s-2.7 1.2-2.7 3c0 1.5 1.05 2.25 2.4 2.25s2.4-.9 2.4-2.85c0-2.09-1.2-3.6-3-4.65c-.9-.45-1.5-.6-1.8-.6c-.3.6-.3 1.35.3 1.95c.9.9 2.1 1.2 3.3 1.2c1.2 0 2.4-.6 2.4-2.55c0-1.51-1.05-2.7-2.7-2.7s-2.4 1.2-2.4 2.7c0 .9.6 1.35 1.2 1.35c.6 0 1.2-.45 1.2-.9c0-1.2-.75-1.95-1.95-1.95c-.9 0-1.95.75-2.25 2.1c-.3 1.35-.3 3.3.6 5.1c.9 1.8 2.7 4.2 4.5 4.2s3.3-2.1 3.3-5.1c0-2.09-1.2-3.6-3-4.65c-.9-.45-1.5-.6-1.8-.6c-.3.6-.3 1.35.3 1.95c.9.9 2.1 1.2 3.3 1.2c1.2 0 2.4-.6 2.4-2.55c0-1.5-1.05-2.7-2.7-2.7s-2.4 1.2-2.4 2.7c0 .9.6 1.35 1.2 1.35c.6 0 1.2-.45 1.2-.9c0-1.2-.75-1.95-1.95-1.95c-.9 0-1.95.75-2.25 2.1c-.3 1.35-.3 3.3.6 5.1c.9 1.8 2.7 4.2 4.5 4.2s3.3-2.1 3.3-5.1Z"/></svg>
            </Link>
            <Link href="https://rss.com/podcasts/rankingfamily/" target="_blank" className="text-gray-400 hover:text-white"><Rss /></Link>
            <Link href="https://zeno.fm/podcast/ranking-family-music" target="_blank" className="text-gray-400 hover:text-white"><Podcast /></Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link href="/beats" className="text-gray-400 hover:text-white">Buy Beats</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white">Our Services</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/services" className="text-gray-400 hover:text-white">All Services</Link></li>
            <li><Link href="/promotions" className="text-gray-400 hover:text-white">Promotions</Link></li>
            <li><Link href="/music" className="text-gray-400 hover:text-white">Music Distribution</Link></li>
            <li><Link href="/services" className="text-gray-400 hover:text-white">Event Management</Link></li>
            <li><Link href="/services" className="text-gray-400 hover:text-white">Recording Studio</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white">Subscribe to our Newsletter</h3>
          <p className="mt-4 text-gray-400">Get the latest news, updates, and special offers.</p>
          <div className="mt-4 flex gap-2">
            <Input type="email" placeholder="Your email address" className="bg-gray-800 border-gray-700 text-white" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Ranking Family Multimedia. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center items-center gap-4">
            <Link href="https://subscribeonandroid.com/rankingfamily.com/feed/podcast/" target="_blank" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                <Podcast className="h-4 w-4" /> Subscribe on Android
            </Link>
        </div>
      </div>
    </footer>
  );
}
