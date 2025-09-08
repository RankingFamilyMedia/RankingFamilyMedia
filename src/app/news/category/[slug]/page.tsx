
'use client';

import { useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2, WifiOff, Newspaper } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  date: string;
}

interface Category {
  id: number;
  name: string;
}

const ARTICLES_PER_PAGE = 9;

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!params.slug) return;

    async function fetchCategoryData() {
      setIsLoading(true);
      setError(null);
      try {
        // First, find the category ID from the slug
        const categoryResponse = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/categories?slug=${params.slug}`);
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category information.');
        }
        const categoriesData = await categoryResponse.json();
        if (categoriesData.length === 0) {
          throw new Error('Category not found.');
        }
        const currentCategory = categoriesData[0];
        setCategory(currentCategory);

        // Then, fetch posts for that category
        const articlesResponse = await fetch(`https://legacy.rankingfamily.com/wp-json/wp/v2/posts?_embed&categories=${currentCategory.id}&per_page=${ARTICLES_PER_PAGE}&page=${currentPage}`);
        if (!articlesResponse.ok) {
          throw new Error('Failed to fetch articles for this category.');
        }

        const totalPagesHeader = articlesResponse.headers.get('X-WP-TotalPages');
        setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1);

        const articlesData = await articlesResponse.json();
        const formattedArticles = articlesData.map((article: any) => ({
          id: article.id.toString(),
          title: article.title.rendered,
          description: article.excerpt.rendered.replace(/<[^>]+>/g, ''),
          imageUrl: article._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/600/400',
          imageHint: 'news article',
          date: new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          }),
        }));
        setArticles(formattedArticles);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryData();
  }, [params.slug, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(ARTICLES_PER_PAGE)].map((_, i) => (
            <Card key={i} className="flex flex-col overflow-hidden bg-gray-800 border-gray-700">
              <div className="relative h-48 w-full bg-gray-700"></div>
              <CardHeader><div className="h-6 bg-gray-700 rounded w-3/4"></div></CardHeader>
              <CardContent><div className="h-4 bg-gray-700 rounded w-full"></div></CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
          <WifiOff className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-xl font-bold text-destructive">Error Loading Content</h3>
          <p className="mt-2 text-destructive/80">{error}</p>
        </div>
      );
    }
    
    if (articles.length === 0) {
        return (
            <div className="mt-4 rounded-lg border border-dashed border-gray-700 p-8 text-center">
                <Newspaper className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-4 text-xl font-bold">No Articles Found</h3>
                <p className="mt-2 text-gray-400">There are no articles in this category yet.</p>
            </div>
        )
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col overflow-hidden bg-gray-800 border-gray-700">
            <div className="relative h-48 w-full">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
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
                        Back to All News
                    </Button>
                </Link>
            </div>
             <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold">Category: <span dangerouslySetInnerHTML={{ __html: category?.name || 'Loading...' }}/></h1>
            </div>
            <div className="mx-auto max-w-7xl">
              {renderContent()}
            </div>
             {articles.length > 0 && totalPages > 1 && (
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
      </main>
      <Footer />
    </div>
  );
}
