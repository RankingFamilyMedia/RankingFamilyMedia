
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Album,
  Users,
  Calendar,
  Waves,
  Film,
  Podcast,
  ArrowRight,
  Upload,
  Radio,
  Mic,
  Headphones,
  Sparkles,
  Building,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Album className="h-12 w-12 text-primary" />,
    title: 'Record Label & Artist Management',
    description: 'Full-service support, A&R, and strategic career guidance to build and sustain musical careers.',
    link: '/record-deals',
  },
  {
    icon: <Film className="h-12 w-12 text-primary" />,
    title: 'Movie & Video Production',
    description: 'High-quality music video production, from concept development to final cut.',
    link: '/video-production',
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: 'Event Organising & Production',
    description: 'Full-scale production for concerts, festivals, and tours. We manage staging, sound, and logistics.',
    link: '/event-production',
  },
  {
    icon: <Radio className="h-12 w-12 text-primary" />,
    title: 'Media Promotions',
    description: 'Strategic media campaigns to get your music, brand, or event heard by a wider audience.',
    link: '/promotions',
  },
  {
    icon: <Upload className="h-12 w-12 text-primary" />,
    title: 'Music Distribution',
    description: 'Get your music on all major platforms worldwide, including Spotify, Apple Music, and more.',
    link: '/music-distribution',
  },
  {
    icon: <Headphones className="h-12 w-12 text-primary" />,
    title: 'Audio Production',
    description: 'Professional production of jingles, commercials, soundtracks, and voice-overs for brands and media.',
    link: '/audio-production',
  },
   {
    icon: <Waves className="h-12 w-12 text-primary" />,
    title: 'Recording Studio Rental',
    description: 'Access our state-of-the-art recording facilities for tracking, mixing, and mastering sessions.',
    link: '/studio-rental',
  },
   {
    icon: <Podcast className="h-12 w-12 text-primary" />,
    title: 'Podcast Studio Rental',
    description: 'Rent our fully-equipped podcast studio for pristine audio and video recording.',
    link: '/studio-rental',
  },
   {
    icon: <Mic className="h-12 w-12 text-primary" />,
    title: 'Equipment Rentals',
    description: 'Professional-grade media equipment available for rent for film shoots, live events, and recording.',
    link: '/equipment-rental',
  },
  {
    icon: <Sparkles className="h-12 w-12 text-primary" />,
    title: 'Mixing & Mastering',
    description: 'Our expert engineers give your tracks a professional, polished sound, ready for commercial release.',
    link: '/mixing-mastering',
  },
   {
    icon: <Building className="h-12 w-12 text-primary" />,
    title: 'Corporate & Private Events',
    description: 'Professional A/V and entertainment solutions for any function, from corporate galas to private parties.',
    link: '/corporate-events',
  }
];

export default function ServicesPage() {
  return (
      <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
        <main className="flex-1">
          <section
            className="relative h-[50vh] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://picsum.photos/1920/1080?blur=2')",
            }}
            data-ai-hint="sound mixing board"
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <h1 className="text-5xl font-bold md:text-7xl">Our Services</h1>
              <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
                From artist development to large-scale event production, we
                provide comprehensive solutions for the entertainment industry.
              </p>
            </div>
          </section>

          <section className="bg-[#121212] py-20 px-4 md:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="flex flex-col border-gray-700 bg-gray-800 text-center"
                >
                  <CardHeader className="items-center">
                    {service.icon}
                    <CardTitle className="mt-4 text-2xl h-16">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-400">{service.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                     <Link href={service.link || '/contact'}>
                      <Button variant="outline" className="w-full">
                          Learn More
                      </Button>
                     </Link>
                  </div>
                </Card>
              ))}
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
            <Link href="/contact">
              <Button size="lg" className="mt-8">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </section>
        </main>
        <Footer />
      </div>
  );
}
