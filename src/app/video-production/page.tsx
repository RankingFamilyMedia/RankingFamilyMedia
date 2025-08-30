
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, Clapperboard, Camera, Lightbulb, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    icon: <Clapperboard className="h-10 w-10 text-primary" />,
    title: 'Music Video Production',
    description: 'From concept to final cut, we create cinematic music videos that tell your story and captivate your audience.',
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Live Performance Shoots',
    description: 'Capture the energy of your live show with multi-camera, professionally recorded and edited performance videos.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Concept & Storyboarding',
    description: 'Our creative team works with you to develop a unique concept and detailed storyboard for your visual project.',
  },
];

const portfolio = [
    {
        imageUrl: 'https://picsum.photos/800/450?random=1',
        title: 'Artist A - "City Lights"',
        hint: 'music video still'
    },
    {
        imageUrl: 'https://picsum.photos/800/450?random=2',
        title: 'Band B - Live at The Arena',
        hint: 'concert photo'
    },
    {
        imageUrl: 'https://picsum.photos/800/450?random=3',
        title: 'Artist C - "Ocean Drive"',
        hint: 'cinematic still'
    }
]

export default function VideoProductionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="film set camera"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Video Production Services</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Bringing your music to life through stunning visuals. We provide end-to-end video production for artists and brands.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <Film className="mx-auto h-16 w-16 text-primary" />
                    <h2 className="mt-6 text-3xl font-bold md:text-4xl">Our Video Services</h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">We offer a full suite of video production services tailored for the music industry.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {services.map(service => (
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

        <section className="py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">Our Work</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">A glimpse into some of the visual stories we've helped tell.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {portfolio.map(item => (
                        <div key={item.title} className="group relative overflow-hidden rounded-lg">
                           <Image 
                                src={item.imageUrl} 
                                alt={item.title}
                                width={800}
                                height={450}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                data-ai-hint={item.hint}
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-end p-4">
                                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link href="/videos">
                        <Button size="lg" variant="outline">
                            View All Videos <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to shoot your next video?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Let's discuss your vision and how we can bring it to the screen. Get in touch for a free consultation.
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
