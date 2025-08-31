import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import './video-background.css';
import { LandingVideo } from "@/components/landing-video";

export default function Home() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <LandingVideo />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-primary md:text-7xl">
          Ranking Family Multimedia
        </h1>
        <p className="mt-4 text-lg text-white md:text-xl">
          Crafting the Sound of Tomorrow. Welcome to the Family.
        </p>
        <Link href="/home">
          <Button className="mt-8" size="lg">
            Enter The Site
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
