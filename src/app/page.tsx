
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ShoppingCart,
  Headset,
  Users,
  Upload,
  Calendar,
  Megaphone,
  Newspaper,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';
import { LandingVideo } from '@/components/landing-video';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  date: string;
}

export default function HomePage() {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/posts?_embed&per_page=5');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const articles = await response.json();
        const formattedArticles = articles.map((article: any) => ({
          id: article.id.toString(),
          title: article.title.rendered,
          description: article.excerpt.rendered.replace(/<[^>]+>/g, ''), // Strip HTML tags
          imageUrl: article._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/600/400',
          imageHint: 'news article',
          date: new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setLatestNews(formattedArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to static data in case of an error
        setLatestNews([
          {
            id: '1',
            title: "New Album Drop: 'Electric Dreams' by The Neon Prophets",
            description: 'The long-awaited album from the synth-pop giants is finally here.',
            imageUrl: 'https://picsum.photos/600/400',
            imageHint: 'album cover',
            date: 'October 26, 2023',
          },
          {
            id: '2',
            title: 'Behind the Scenes: The Making of a Music Video',
            description:
              'Director Jane Doe gives us an exclusive look into the creation of the latest chart-topping music video.',
            imageUrl: 'https://picsum.photos/600/400',
            imageHint: 'music video',
            date: 'October 24, 2023',
          },
          {
            id: '3',
            title: 'Ranking Family Signs Viral Sensation Lily Hayes',
            description:
              'The acoustic songstress who captured hearts on social media has officially joined the Ranking Family.',
            imageUrl: 'https://picsum.photos/600/400',
            imageHint: 'musician portrait',
            date: 'October 22, 2023',
          },
           {
            id: '4',
            title: 'Studio Tour: Inside the Legendary Sound Factory',
            description: 'We get a rare glimpse inside the studio where countless hits were born.',
            imageUrl: 'https://picsum.photos/600/400',
            imageHint: 'recording studio',
            date: 'October 20, 2023',
          },
          {
            id: '5',
            title: 'How AI is Changing Music Production',
            description: 'From generating melodies to mastering tracks, artificial intelligence is reshaping the creative process.',
            imageUrl: 'https://picsum.photos/600/400',
            imageHint: 'abstract technology',
            date: 'October 18, 2023',
          },
        ]);
      }
    }

    fetchNews();
  }, []);


  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section className="w-full">
           <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[70vh] w-full">
                   <LandingVideo />
                   <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center text-center bg-black/60">
                    <h1 className="text-5xl font-bold md:text-7xl">
                      Welcome to Ranking Family
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                      Your home for music talent exposure, recording studios,
                      promotions, music distribution, and event management.
                    </p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[70vh] w-full">
                  <Image
                    src="https://picsum.photos/1920/1080"
                    alt="Our Team"
                    fill
                    style={{objectFit: 'cover'}}
                    data-ai-hint="team portrait"
                    className="absolute z-0"
                  />
                   <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center text-center bg-black/60">
                    <h2 className="text-5xl font-bold md:text-7xl">
                      Meet the Family
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                      A passionate team of industry professionals dedicated to
                      artistic excellence.
                    </p>
                    <Button size="lg" className="mt-8">
                      Learn More About Us{' '}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[70vh] w-full">
                  <Image
                    src="https://picsum.photos/1920/1080"
                    alt="Our Services"
                    fill
                    style={{objectFit: 'cover'}}
                    data-ai-hint="music production"
                    className="absolute z-0"
                  />
                  <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center text-center bg-black/60">
                    <h2 className="text-5xl font-bold md:text-7xl">
                      Our Services
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                      From artist development to full-scale event management,
                      we are the driving force behind the sound of tomorrow.
                    </p>
                    <Button size="lg" className="mt-8">
                      Explore Our Services{' '}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 text-white" />
            <CarouselNext className="right-4 text-white" />
          </Carousel>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold">
            About Ranking Family Multimedia
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Ranking Family Multimedia is a premier record label and event
            production house dedicated to discovering and promoting the best in
            music. We are a passionate team of industry professionals committed
            to artistic excellence and creating unforgettable live experiences.
            From artist development to full-scale event management, we are the
            driving force behind the sound of tomorrow.
          </p>
          <Button size="lg" className="mt-8">
            Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Buy Beats</h3>
              <p className="mt-2 text-gray-300">
                Explore our catalog of high-quality, original beats.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8 text-center">
              <Headset className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Book Our Studio</h3>
              <p className="mt-2 text-gray-300">
                Professional recording studio available for your projects.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8 text-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Our Artists</h3>
              <p className="mt-2 text-gray-300">
                Discover the talented artists on our record label.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <h2 className="text-center text-4xl font-bold">Our Services</h2>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8 text-center">
              <Upload className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Music Distribution</h3>
              <p className="mt-2 text-gray-300">
                Get your music on all major platforms worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8 text-center">
              <Calendar className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Event Management</h3>
              <p className="mt-2 text-gray-300">
                From planning to execution, we create unforgettable events.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8 text-center">
              <Megaphone className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Promotions</h3>
              <p className="mt-2 text-gray-300">
                Strategic campaigns to elevate your brand and music.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <h2 className="text-center text-4xl font-bold">Latest News</h2>
          <div className="mx-auto mt-12 max-w-7xl px-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {latestNews.map((article) => (
                  <CarouselItem
                    key={article.title}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="flex h-full flex-col overflow-hidden border-gray-700 bg-gray-800">
                        <div className="relative h-56 w-full">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            data-ai-hint={article.imageHint}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl font-bold text-white">
                            {article.title}
                          </CardTitle>
                          <CardDescription className="pt-1 text-gray-400">
                            {article.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: article.description }} />
                        </CardContent>
                        <CardFooter>
                           <Link href={`/news/${article.id}`}>
                              <Button variant="link" className="p-0 text-primary">
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                           </Link>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="mt-12 text-center">
            <Link href="/news">
              <Button size="lg">
                <Newspaper className="mr-2 h-5 w-5" /> View All News
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to start your project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Let's build the future of music together. Contact us for a
            consultation.
          </p>
          <Button size="lg" className="mt-8">
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
