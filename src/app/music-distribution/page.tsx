
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, BarChart, Mic, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'Global Reach',
    description: 'Distribute your music to over 150+ digital stores and streaming services, including Spotify, Apple Music, Tidal, and Amazon Music.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Keep 100% of Your Royalties',
    description: 'You worked hard for your music, so you keep all of your earnings. We charge a simple, flat annual fee per release.',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Dedicated Artist Support',
    description: 'Our team is here to help you with every step of the release process, ensuring your music gets to stores correctly and on time.',
  },
];

export default function MusicDistributionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="vinyl records stack"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Music Distribution</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Get your music on all major platforms worldwide. Release your sound and keep 100% of your royalties.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Simple, Fast, & Reliable Distribution</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Our streamlined process makes it easy to get your music heard by a global audience.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-gray-700 bg-gray-800 text-center">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="mt-4 text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to release your music?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Join the Ranking Family and let's get your music out to the world.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Start Distributing <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
