
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { Video, WifiOff, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface VideoPost {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      try {
        const response = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/videos?_embed');
        if (!response.ok) {
          throw new Error('Failed to fetch videos from the API.');
        }
        const data = await response.json();
        
        const formattedVideos = data.map((item: any) => ({
          id: item.id,
          title: item.title.rendered,
          link: item.meta?.video_url || item.link, 
          imageUrl: item.featured_image_url || 'https://picsum.photos/600/400',
        }));
        setVideos(formattedVideos);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
              <div className="relative h-48 w-full bg-gray-700 rounded-t-lg"></div>
              <CardHeader>
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              </CardHeader>
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
            <h3 className="font-bold">Error Loading Videos</h3>
          </div>
          <p className="mt-1 text-destructive/80">{error}</p>
        </div>
      );
    }

    if (videos.length === 0) {
      return (
        <div className="mt-4 rounded-lg border border-dashed border-gray-700 p-8 text-center">
          <Video className="mx-auto h-12 w-12 text-gray-500" />
          <h3 className="mt-4 text-xl font-bold">No Videos Found</h3>
          <p className="mt-2 text-gray-400">There are currently no videos available. Check back later!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link href={`/videos/${video.id}`} key={video.id} legacyBehavior>
            <a className="block group">
              <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full flex flex-col hover:border-primary transition-colors duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={video.imageUrl}
                    alt={video.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg" dangerouslySetInnerHTML={{ __html: video.title }} />
                </CardHeader>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section className="relative h-[50vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')" }} data-ai-hint="music video production">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-bold md:text-7xl">Music Videos</h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
              Watch the latest visuals from our artists.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8">
          <div className="mx-auto max-w-7xl">{renderContent()}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
