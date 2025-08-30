
'use-client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Waves, Podcast, Mic, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const rentalOptions = [
  {
    icon: <Waves className="h-10 w-10 text-primary" />,
    title: 'Recording Studio Rental',
    description: 'Our main recording studio features a treated live room, vocal booth, and control room with industry-standard preamps and software.',
    rate: 'GHS 500 / 4-hour block',
  },
  {
    icon: <Podcast className="h-10 w-10 text-primary" />,
    title: 'Podcast Studio Rental',
    description: 'A dedicated, soundproofed room with professional podcasting microphones, a multi-channel mixer, and optional video recording.',
    rate: 'GHS 300 / 2-hour block',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Vocal Booth Rental',
    description: 'Need to track vocals or a solo instrument? Rent our isolated vocal booth for pristine, clean recordings.',
    rate: 'GHS 150 / hour',
  },
];

export default function StudioRentalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="recording studio interior"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Studio Rentals</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Access our state-of-the-art recording and podcasting facilities for your next project.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Our Spaces</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Choose the right space for your needs, from full band tracking to solo podcast recording.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {rentalOptions.map((option) => (
                <Card key={option.title} className="border-gray-700 bg-gray-800 text-center flex flex-col">
                  <CardHeader className="items-center">
                    {option.icon}
                    <CardTitle className="mt-4 text-2xl">{option.title}</CardTitle>
                    <CardDescription className="text-lg text-primary">{option.rate}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-300">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Book Your Session?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contact us to check availability and book your time in one of our professional studio spaces.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
