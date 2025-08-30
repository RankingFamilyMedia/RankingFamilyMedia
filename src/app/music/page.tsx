
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { Music, Play, Pause, WifiOff, ArrowLeft, ArrowRight, Newspaper, Diamond, LogIn, Loader2, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { AdWidget } from '@/components/ad-widget';

interface Song {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

interface NewsArticle {
  title: string;
  id: string; 
  date: string;
}


const SONGS_PER_PAGE = 10;

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<number | null>(null);
  const [loadingTrack, setLoadingTrack] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);


  useEffect(() => {
    async function fetchSongs() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch songs
        const songsResponse = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/songs?_embed&page=${currentPage}&per_page=${SONGS_PER_PAGE}`);
        if (!songsResponse.ok) {
          throw new Error('Failed to fetch songs from the API.');
        }
        
        const totalPagesHeader = songsResponse.headers.get('X-WP-TotalPages');
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader, 10));
        }

        const songsData = await songsResponse.json();
        const formattedSongs = songsData.map((item: any) => ({
          id: item.id,
          title: item.title.rendered,
          artist: item.meta?.artist || 'Unknown Artist',
          imageUrl: item.featured_image_url || 'https://picsum.photos/200',
          audioUrl: item.meta?.audio_url || '',
        }));
        setSongs(formattedSongs);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSongs();
  }, [currentPage]);

  useEffect(() => {
    async function fetchNews() {
       try {
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
       } catch (error) {
        console.error("Failed to fetch news for sidebar", error)
       }
    }
    fetchNews();
  }, []);

  const handlePlayPause = (e: React.MouseEvent, songId: number, audioUrl: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (nowPlaying === songId) {
      // Pause current track
      audioRef.current?.pause();
      setNowPlaying(null);
    } else {
      // Stop previous track if one is playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Start new track
      setLoadingTrack(songId);
      const newAudio = new Audio(audioUrl);
      
      newAudio.oncanplay = () => {
        newAudio.play();
        setLoadingTrack(null);
        setNowPlaying(songId);
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(SONGS_PER_PAGE)].map((_, i) => (
             <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse flex items-center p-3">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-700"></div>
                <div className="ml-3 h-10 w-10 bg-gray-700 rounded-full"></div>
                <div className="ml-4 flex-grow">
                    <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
                </div>
                 <div className="ml-4 h-9 w-24 bg-gray-700 rounded-md"></div>
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
            <h3 className="font-bold">Error Loading Songs</h3>
          </div>
          <p className="mt-1 text-destructive/80">{error}</p>
        </div>
      );
    }

    if (songs.length === 0) {
      return (
        <div className="mt-4 rounded-lg border border-dashed border-gray-700 p-8 text-center">
          <Music className="mx-auto h-12 w-12 text-gray-500" />
          <h3 className="mt-4 text-xl font-bold">No Songs Found</h3>
          <p className="mt-2 text-gray-400">There are currently no songs available. Check back later!</p>
        </div>
      );
    }

    return (
       <div className="space-y-4">
            {songs.map((song) => (
              <Link key={song.id} href={`/music/${song.id}`} legacyBehavior>
                <a className="block">
                  <Card className="bg-gray-800 border-gray-700 flex items-center p-3 transition-colors hover:bg-gray-700/50">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={song.imageUrl || 'https://picsum.photos/200'} alt={song.title} fill style={{objectFit:"cover"}} />
                    </div>
                    {song.audioUrl && (
                      <Button variant="ghost" size="icon" className="ml-3" onClick={(e) => handlePlayPause(e, song.id, song.audioUrl)} disabled={loadingTrack === song.id}>
                        {loadingTrack === song.id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : nowPlaying === song.id ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>
                    )}
                    <div className="flex-grow ml-4">
                      <h4 className="font-semibold" dangerouslySetInnerHTML={{ __html: song.title}} />
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="icon" className="pointer-events-none">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
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
         <section className="relative h-[50vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')" }} data-ai-hint="concert crowd">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-bold md:text-7xl">Our Music</h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
              Discover the latest tracks and releases from the Ranking Family artists. The sound of tomorrow starts here.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section>
                {renderContent()}
                {songs.length > 0 && totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <Button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1 || isLoading}
                            variant="outline"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <span className="text-lg font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages || isLoading}
                            variant="outline"
                        >
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </section>
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
                 <a href="https://grinomuzik.com" target="_blank" rel="noopener noreferrer" className="w-full">
                   <Button className="w-full">
                     <LogIn className="mr-2 h-4 w-4" /> Producer Login
                  </Button>
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
