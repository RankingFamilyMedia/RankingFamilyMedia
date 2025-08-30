
'use client';

import { useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Diamond, Loader2, LogIn, Newspaper, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdWidget } from '@/components/ad-widget';
import { LikeShare } from '@/components/like-share';
import { DummyComments } from '@/components/dummy-comments';

interface VideoPost {
  id: number;
  title: string;
  content: string;
  link: string;
  youtubeId: string | null;
}

interface NewsArticle {
  id: string;
  title: string;
  date: string;
}

// Helper to extract YouTube ID from various URL formats
const getYouTubeId = (url: string) => {
  let videoId = null;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match) {
    videoId = match[1];
  }
  return videoId;
};


export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (!params.id) return;

    async function fetchVideoData() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/videos/${params.id}?_embed`);
        if (!response.ok) {
          throw new Error('Failed to fetch video details.');
        }
        const item = await response.json();
        const videoLink = item.meta?.video_url || item.link;

        setVideo({
          id: item.id,
          title: item.title.rendered,
          content: item.content.rendered,
          link: videoLink,
          youtubeId: getYouTubeId(videoLink)
        });
        
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

    fetchVideoData();
  }, [params.id]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg">Loading Video...</p>
        </div>
      )
    }

    if (error) {
       return (
        <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <WifiOff className="h-5 w-5" />
            <h3 className="font-bold">Error Loading Video</h3>
          </div>
          <p className="mt-1 text-destructive/80">{error}</p>
        </div>
      );
    }
    
    if (!video) {
        return <p>Video not found.</p>
    }
    
    const videoContent = (
      <div>
        <h1 className="mt-8 text-3xl font-bold md:text-5xl" dangerouslySetInnerHTML={{ __html: video.title }} />
        <LikeShare title={video.title} />
        <div 
            className="prose prose-invert lg:prose-xl mt-4 max-w-none" 
            dangerouslySetInnerHTML={{ __html: video.content }}
        />
        <DummyComments />
      </div>
    );
    
    if (!video.youtubeId) {
        return (
             <div className="text-center">
                <p className="text-lg text-gray-400 mt-8">Could not find a valid YouTube video to embed.</p>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                    <Button className="mt-4">Watch on External Site</Button>
                </a>
                {videoContent}
            </div>
        )
    }

    return (
        <div>
            <div className="aspect-video w-full">
                <iframe
                    className="w-full h-full rounded-lg shadow-2xl"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            {videoContent}
        </div>
    )
  };


  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1 pt-24">
        <section className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/videos">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Videos
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
                     <Button className="w-full">
                       <LogIn className="mr-2 h-4 w-4" /> Producer Login
                    </Button>
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
