
'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Diamond, LogIn, Newspaper, WifiOff, Folder } from 'lucide-react';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


interface NewsArticle {
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  date: string;
  id: string; 
}

interface Category {
    id: number;
    name: string;
    count: number;
    slug: string;
}

const ARTICLES_PER_PAGE = 9;

export default function NewsPage() {
  const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([]);
  const [paginatedArticles, setPaginatedArticles] = useState<NewsArticle[]>([]);
  const [latestArticlesForSidebar, setLatestArticlesForSidebar] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loading, setLoading]  = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        // Fetch the 5 most recent posts for the featured carousel
        const featuredResponse = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/posts?_embed&per_page=5');
        if (!featuredResponse.ok) throw new Error('Failed to fetch featured news');
        const featuredData = await featuredResponse.json();
        const formattedFeatured = featuredData.map((article: any) => ({
          id: article.id.toString(),
          title: article.title.rendered,
          description: article.excerpt.rendered.replace(/<[^>]+>/g, ''),
          imageUrl: article.featured_image_url || 'https://picsum.photos/600/400',
          imageHint: 'news article',
          date: new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          }),
        }));
        setFeaturedArticles(formattedFeatured);
        // Also use these for the sidebar
        setLatestArticlesForSidebar(formattedFeatured);

        // Fetch the paginated articles for the main grid
        const paginatedResponse = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/posts?_embed&per_page=${ARTICLES_PER_PAGE}&page=${currentPage}`);
        if (!paginatedResponse.ok) throw new Error('Failed to fetch news articles');
        
        const totalPagesHeader = paginatedResponse.headers.get('X-WP-TotalPages');
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader, 10));
        }

        const paginatedData = await paginatedResponse.json();
        const formattedPaginated = paginatedData.map((article: any) => ({
          id: article.id.toString(),
          title: article.title.rendered,
          description: article.excerpt.rendered.replace(/<[^>]+>/g, ''),
          imageUrl: article.featured_image_url || 'https://picsum.photos/600/400',
          imageHint: 'news article',
          date: new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          }),
        }));
        setPaginatedArticles(formattedPaginated);

        // Fetch categories
        const categoriesResponse = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/categories?hide_empty=true');
        if (categoriesResponse.ok) {
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [currentPage]);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
         <section className="relative w-full h-[60vh] bg-black">
           {loading && featuredArticles.length === 0 ? (
             <div className="flex items-center justify-center h-full text-white">Loading featured news...</div>
           ) : (
            <Carousel
              className="w-full h-full"
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
            >
              <CarouselContent>
                {featuredArticles.map((article, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-[60vh]">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-40"
                        data-ai-hint={article.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      <div className="relative z-10 flex h-full flex-col items-center justify-end text-center p-8 md:p-16">
                        <h1 className="text-3xl font-bold md:text-6xl text-white" dangerouslySetInnerHTML={{ __html: article.title }} />
                        <p className="mt-4 text-lg text-gray-300">{article.date}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
            </Carousel>
           )}
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-3xl font-bold">More News</h2>
              <div className="mt-6">
                {loading ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                     {[...Array(ARTICLES_PER_PAGE)].map((_, i) => (
                       <Card key={i} className="flex flex-col overflow-hidden bg-gray-800 border-gray-700">
                          <div className="relative h-48 w-full bg-gray-700"></div>
                          <CardHeader><div className="h-6 bg-gray-700 rounded w-3/4"></div></CardHeader>
                          <CardContent><div className="h-4 bg-gray-700 rounded w-full"></div></CardContent>
                       </Card>
                     ))}
                   </div>
                ) : error ? (
                   <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                      <div className="flex items-center gap-2 text-destructive">
                        <WifiOff className="h-5 w-5" />
                        <h3 className="font-bold">Error Loading News</h3>
                      </div>
                      <p className="mt-1 text-destructive/80">{error}</p>
                    </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedArticles.map((article) => (
                      <Card key={article.id} className="flex flex-col overflow-hidden bg-gray-800 border-gray-700">
                        <div className="relative h-48 w-full">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            style={{objectFit: 'cover'}}
                            data-ai-hint={article.imageHint}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg font-bold text-white h-14" dangerouslySetInnerHTML={{ __html: article.title }} />
                          <CardDescription className="text-gray-400 pt-1">{article.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-sm text-gray-300 line-clamp-3" dangerouslySetInnerHTML={{ __html: article.description }} />
                        </CardContent>
                        <CardFooter>
                           <Link href={`/news/${article.id}`}>
                              <Button variant="link" className="p-0 text-primary text-sm">
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                           </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              
              {paginatedArticles.length > 0 && totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-4">
                    <Button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1 || loading}
                        variant="outline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <span className="text-lg font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages || loading}
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
                {loading && latestArticlesForSidebar.length === 0 ? (
                    <p>Loading...</p>
                ) : latestArticlesForSidebar.length > 0 ? (
                  <ul className="space-y-3">
                    {latestArticlesForSidebar.map((article) => (
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
                    {loading && categories.length === 0 ? (
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

    