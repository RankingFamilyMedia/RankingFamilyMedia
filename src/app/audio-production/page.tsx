
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, Music, Radio, Speaker, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const audioServices = [
  {
    icon: <Music className="h-10 w-10 text-primary" />,
    title: 'Jingles & Commercials',
    description: 'Create catchy, memorable jingles and professional audio for TV, radio, and online commercials that make your brand stand out.',
  },
  {
    icon: <Radio className="h-10 w-10 text-primary" />,
    title: 'Film & Game Soundtracks',
    description: 'Original music composition and scoring for films, documentaries, and video games to create immersive auditory experiences.',
  },
  {
    icon: <Speaker className="h-10 w-10 text-primary" />,
    title: 'Voice-Overs & ADR',
    description: 'Crisp, clear voice-over recording for narration, characters, and automated dialogue replacement (ADR) in our treated vocal booths.',
  },
];

export default function AudioProductionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="audio waveform"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Audio Production</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Professional audio solutions for media. We produce jingles, commercials, soundtracks, and crystal-clear voice-overs.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <Headphones className="mx-auto h-16 w-16 text-primary" />
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">Our Audio Services</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                From catchy brand jingles to epic film scores, our audio production services are tailored to meet the needs of any project, big or small.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {audioServices.map((service) => (
                <Card key={service.title} className="border-gray-700 bg-gray-800 text-center">
                  <CardHeader className="items-center">
                    {service.icon}
                    <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Have an audio project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Our team of engineers and producers is ready to bring your audio vision to life. Let's talk about your needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
