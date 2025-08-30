
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Footer } from '@/components/footer';
import { ArrowRight, Diamond, LogIn, Music, Newspaper, Play, Search, WifiOff, Pause, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


interface Beat {
  id: number;
  title: string;
  producer: string;
  genre: string;
  bpm: string;
  price: string;
  imageUrl: string;
  audioUrl: string;
}

function BeatsList() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<number | null>(null);
  const [loadingTrack, setLoadingTrack] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    async function fetchBeats() {
      setIsLoading(true);
      try {
        const response = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/riddim-instrumentals?_embed');
        if (!response.ok) {
          throw new Error('Failed to fetch beats from the API.');
        }
        const data = await response.json();
        const formattedBeats = data.map((item: any) => ({
          id: item.id,
          title: item.title.rendered,
          producer: item.meta?.producer || 'N/A',
          genre: item.meta?.genre || 'N/A',
          bpm: item.meta?.bpm || 'N/A',
          price: item.meta?.price || '0',
          imageUrl: item.featured_image_url || 'https://picsum.photos/600/400',
          audioUrl: item.meta?.audio_url || '',
        }));
        setBeats(formattedBeats);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBeats();
  }, []);

  const handlePlayPause = (beatId: number, audioUrl: string) => {
    if (nowPlaying === beatId) {
      // Pause current track
      audioRef.current?.pause();
      setNowPlaying(null);
    } else {
      // Stop previous track if one is playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Start new track
      setLoadingTrack(beatId);
      const newAudio = new Audio(audioUrl);
      
      newAudio.oncanplay = () => {
        newAudio.play();
        setLoadingTrack(null);
        setNowPlaying(beatId);
      };

      newAudio.onerror = () => {
        setLoadingTrack(null);
        console.error("Error loading audio");
      };
      
      newAudio.onended = () => {
        setNowPlaying(null);
      };

      audioRef.current = newAudio;
    }
  };


  if (isLoading) {
    return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
            <div className="relative h-48 w-full bg-gray-700 rounded-t-lg"></div>
            <CardHeader>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
               <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <div className="flex items-center gap-2 text-destructive">
          <WifiOff className="h-5 w-5" />
          <h3 className="font-bold">Error Loading Beats</h3>
        </div>
        <p className="mt-1 text-destructive/80">
          {error}
        </p>
      </div>
    );
  }
  
  if (beats.length === 0) {
      return (
         <div className="mt-4 rounded-lg border border-dashed border-gray-700 p-8 text-center">
            <Music className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-bold">No Beats Found</h3>
            <p className="mt-2 text-gray-400">There are currently no beats available. Check back later!</p>
        </div>
      )
  }

  const featuredBeats = beats.slice(0, 5);
  const moreBeats = beats.slice(5);

  return (
    <>
      <Carousel
        opts={{
          align: 'start',
          loop: featuredBeats.length > 1,
        }}
        plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {featuredBeats.map((beat) => (
            <CarouselItem key={beat.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="bg-gray-800 border-gray-700 overflow-hidden group h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image 
                        src={beat.imageUrl || 'https://picsum.photos/600/400'} 
                        alt={beat.title} 
                        fill
                        style={{objectFit:"cover"}}
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                     {beat.audioUrl && (
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handlePlayPause(beat.id, beat.audioUrl)}
                        disabled={loadingTrack === beat.id}
                      >
                         {loadingTrack === beat.id ? (
                            <Loader2 className="h-8 w-8 animate-spin" />
                         ) : nowPlaying === beat.id ? (
                            <Pause className="h-8 w-8" />
                         ) : (
                            <Play className="h-8 w-8" />
                         )}
                      </Button>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{beat.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                        {beat.producer} &bull; {beat.genre} &bull; {beat.bpm} BPM
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center mt-auto">
                    <div className="text-2xl font-bold text-primary">GHS {beat.price}</div>
                    <Button>Add to Cart</Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex"/>
      </Carousel>

      {moreBeats.length > 0 && (
        <section className="mt-12">
            <h2 className="text-3xl font-bold">More Beats</h2>
            <div className="space-y-4 mt-6">
            {moreBeats.map((beat) => (
                <Card key={beat.id} className="bg-gray-800 border-gray-700 overflow-hidden group flex items-center p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                      <Image 
                          src={beat.imageUrl || 'https://picsum.photos/200'} 
                          alt={beat.title} 
                          fill
                          style={{objectFit:"cover"}}
                          className="transition-transform duration-300 group-hover:scale-110"
                      />
                  </div>
                   {beat.audioUrl && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-4"
                      onClick={() => handlePlayPause(beat.id, beat.audioUrl)}
                      disabled={loadingTrack === beat.id}
                    >
                      {loadingTrack === beat.id ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : nowPlaying === beat.id ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                  )}
                  <div className="ml-4 flex-grow">
                      <h3 className="text-xl font-bold">{beat.title}</h3>
                      <p className="text-gray-400 text-sm">
                          {beat.producer} &bull; {beat.genre} &bull; {beat.bpm} BPM
                      </p>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                     <div className="text-2xl font-bold text-primary">GHS {beat.price}</div>
                     <Button>Add to Cart</Button>
                  </div>
                </Card>
            ))}
            </div>
        </section>
      )}
    </>
  );
}


export default function BeatsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?blur=5')" }} data-ai-hint="music production background">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold md:text-7xl">RECORDING DEALS</h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              Your home for music talent exposure, recording studios, promotions, music distribution, and event management.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg">Explore Beats <ArrowRight className="ml-2 h-5 w-5" /></Button>
              <Button size="lg" variant="secondary">Our Services</Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-3xl font-bold">Search Beats</h2>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by beat name, genre, or producer..."
                  className="w-full bg-gray-800 pl-10 border-gray-700"
                />
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">All Beats</h2>
                <div className="mt-6">
                    <BeatsList />
                </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Latest News</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">No recent news.</p>
                <Link href="/news">
                  <Button variant="link" className="p-0 mt-4 text-primary">
                    View All News <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Want a Custom Beat?</CardTitle>
                <CardDescription>
                  Have a specific sound in mind? Let us create a unique, tailor-made beat just for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Diamond className="mr-2 h-4 w-4" /> Request a Custom Beat
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Producer Portal</CardTitle>
                <CardDescription>
                  Producers, log in to manage your beats and sales.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <Button className="w-full">
                   <LogIn className="mr-2 h-4 w-4" /> Producer Login
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
