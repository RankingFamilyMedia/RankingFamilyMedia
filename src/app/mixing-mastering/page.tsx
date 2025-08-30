
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Sparkles, SlidersHorizontal, Equalizer, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Stereo Mixing',
    price: 'Starting at GHS 400 / track',
    features: [
      'Balancing individual instrument levels',
      'EQ, compression, and effects processing',
      'Vocal tuning and alignment',
      'Up to 3 revisions',
    ],
    icon: <SlidersHorizontal className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Stem Mastering',
    price: 'Starting at GHS 600 / track',
    features: [
      'Mastering from your grouped stems (e.g., drums, bass, vocals)',
      'Greater control over the final balance',
      'Competitive loudness and clarity for streaming',
      'Up to 2 revisions',
    ],
    icon: <Equalizer className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Stereo Mastering',
    price: 'Starting at GHS 300 / track',
    features: [
      'Mastering from a single stereo file',
      'Final EQ, compression, and limiting',
      'Optimized for all major streaming platforms',
      'Up to 2 revisions',
    ],
    icon: <Sparkles className="h-10 w-10 text-primary" />,
  },
];

export default function MixingMasteringPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="mixing console faders"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Mixing & Mastering</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Our expert engineers will give your tracks a professional, polished sound, ready for commercial release.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((pkg) => (
              <Card
                key={pkg.title}
                className="flex flex-col border-gray-700 bg-gray-800"
              >
                <CardHeader className="items-center text-center">
                  {pkg.icon}
                  <CardTitle className="mt-4 text-3xl font-bold">
                    {pkg.title}
                  </CardTitle>
                   <CardDescription className="text-xl font-semibold text-primary">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href="/contact">
                     <Button variant='outline' className="w-full">
                        Get Started
                     </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to finalize your track?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contact us with your project files and let's give your music the professional finish it deserves.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Upload Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
