
'use client';

import { useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Diamond, Loader2, LogIn, Newspaper, WifiOff, Folder } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdWidget } from '@/components/ad-widget';
import { LikeShare } from '@/components/like-share';
import { DummyComments } from '@/components/dummy-comments';

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}

interface NewsArticle {
  id: string;
  title: string;
  date: string;
}

interface Category {
    id: number;
    name: string;
    count: number;
    slug: string;
}


export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    if (!params.id) return;

    async function fetchArticleData() {
      setIsLoading(true);
      try {
        // Fetch main article
        const articleResponse = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/posts/${params.id}?_embed`);
        if (!articleResponse.ok) {
          throw new Error('Failed to fetch article details.');
        }
        const item = await articleResponse.json();
        
        setArticle({
          id: item.id,
          title: item.title.rendered,
          content: item.content.rendered,
          imageUrl: item.featured_image_url || 'https://picsum.photos/1200/600',
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
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

        // Fetch categories
        const categoriesResponse = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/categories?hide_empty=true');
        if (categoriesResponse.ok) {
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
        }


      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticleData();
  }, [params.id]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg">Loading Article...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <WifiOff className="h-5 w-5" />
            <h3 className="font-bold">Error Loading Article</h3>
          </div>
          <p className="mt-1 text-destructive/80">{error}</p>
        </div>
      );
    }
    
    if (!article) {
        return <p>Article not found.</p>;
    }

    return (
        <article>
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl">
                <Image 
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    style={{objectFit: "cover"}}
                />
            </div>
            <header className="mt-8">
                <h1 className="text-3xl font-bold md:text-5xl leading-tight" dangerouslySetInnerHTML={{ __html: article.title }} />
                <div className="flex items-center gap-2 text-gray-400 mt-4">
                    <Calendar className="h-5 w-5" />
                    <p>{article.date}</p>
                </div>
            </header>
            <LikeShare title={article.title} />
            <div 
                className="prose prose-invert lg:prose-xl mt-8 max-w-none" 
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <DummyComments />
        </article>
    );
  };


  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1 pt-24">
        <section className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/news">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to News
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

                 <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Folder className="mr-2 h-5 w-5" />
                            Post Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading && categories.length === 0 ? (
                            <p>Loading categories...</p>
                        ) : categories.length > 0 ? (
                            <ul className="space-y-2">
                               {categories.map((category) => (
                                   <li key={category.id}>
                                       <Link href={`/news/category/${category.slug}`} className="text-gray-300 hover:text-primary transition-colors flex justify-between">
                                           <span>{category.name}</span>
                                           <span>({category.count})</span>
                                       </Link>
                                   </li>
                               ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No categories found.</p>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}

    