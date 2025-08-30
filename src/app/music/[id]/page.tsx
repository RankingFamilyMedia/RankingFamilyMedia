
'use client';

import { useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Diamond, Loader2, LogIn, Newspaper, Pause, Play, WifiOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdWidget } from '@/components/ad-widget';
import { LikeShare } from '@/components/like-share';
import { DummyComments } from '@/components/dummy-comments';

interface Song {
  id: number;
  title: string;
  artist: string;
  content: string;
  imageUrl: string;
  audioUrl: string;
}

interface NewsArticle {
  id: string;
  title: string;
  date: string;
}

export default function SongPage({ params }: { params: { id: string } }) {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (!params.id) return;

    async function fetchSongData() {
      setIsLoading(true);
      try {
        // Fetch song details
        const songResponse = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/songs/${params.id}?_embed`);
        if (!songResponse.ok) {
          throw new Error('Failed to fetch song details.');
        }
        const item = await songResponse.json();
        
        const songData = {
          id: item.id,
          title: item.title.rendered,
          artist: item.meta?.artist || 'Unknown Artist',
          content: item.content.rendered,
          imageUrl: item.featured_image_url || 'https://picsum.photos/600/600',
          audioUrl: item.meta?.audio_url || '',
        };
        setSong(songData);

        if (songData.audioUrl) {
          const audioInstance = new Audio(songData.audioUrl);
          audioInstance.onended = () => setIsPlaying(false);
          setAudio(audioInstance);
        }
        
        // Fetch latest news for sidebar
        const newsResponse = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/posts?_embed&per_page=5');
        if (newsResponse.ok) {
            const newsData = await newsResponse.json();
            const formattedNews = newsData.map((article: any) => ({
                id: article.id.toString(),
                title: article.title.rendered,
                date: new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                }),
            }));
            setLatestNews(formattedNews);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSongData();

    return () => {
      // Cleanup audio on component unmount
      if (audio) {
        audio.pause();
        setAudio(null);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);


  const handlePlayPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg">Loading Song...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <WifiOff className="h-5 w-5" />
            <h3 className="font-bold">Error Loading Song</h3>
          </div>
          <p className="mt-1 text-destructive/80">{error}</p>
        </div>
      );
    }
    
    if (!song) {
        return <p>Song not found.</p>;
    }

    return (
        <div>
            <div className="w-full flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-2xl">
                        <Image 
                            src={song.imageUrl}
                            alt={song.title}
                            fill
                            style={{objectFit: "cover"}}
                        />
                    </div>
                    {song.audioUrl && (
                        <Button onClick={handlePlayPause} size="lg" className="w-full mt-4">
                            {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                            {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                    )}
                </div>
                <div className="md:w-2/3">
                     <h1 className="text-3xl font-bold md:text-5xl leading-tight" dangerouslySetInnerHTML={{ __html: song.title }} />
                     <p className="text-2xl text-gray-400 mt-2">{song.artist}</p>
                     <LikeShare title={`${song.title} by ${song.artist}`} />
                     <div 
                        className="prose prose-invert lg:prose-lg mt-8 max-w-none" 
                        dangerouslySetInnerHTML={{ __html: song.content }}
                     />
                </div>
            </div>
            <DummyComments />
        </div>
    );
  };


  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1 pt-24">
        <section className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/music">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Music
                    </Button>
                </Link>
            </div>
             <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {renderContent()}
              </div>
              <aside className="space-y-8">
                 <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                       <Newspaper className="mr-2 h-5 w-5" />
                       Latest News
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {latestNews.length > 0 ? (
                      <ul className="space-y-3">
                        {latestNews.map((article) => (
                          <li key={article.id}>
                            <Link href={`/news/${article.id}`} className="text-gray-300 hover:text-primary transition-colors">
                               <span className="block font-medium line-clamp-2" dangerouslySetInnerHTML={{ __html: article.title }} />
                               <span className="text-xs text-gray-500">{article.date}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                       <p className="text-gray-400">No recent news.</p>
                    )}
                  </CardContent>
                </Card>
                
                <AdWidget />

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
                    <Link href="/producer/login" className="w-full">
                       <Button className="w-full">
                         <LogIn className="mr-2 h-4 w-4" /> Producer Login
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </aside>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
